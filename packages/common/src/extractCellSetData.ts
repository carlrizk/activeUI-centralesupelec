import { Axis, CellSet } from "@activeviam/activeui-sdk";
import { CellSetData, DataNode } from "./common.types.js";

interface Axes {
  measures: Axis | null;
  hierarchies: Axis | null;
}

interface PositionWithValues {
  position: string[];
  values: number[];
}

function extractAxes(axes: Axis[]): Axes {
  let measures = null;
  let hierarchies = null;

  axes.forEach((ax) => {
    if (ax.hierarchies[0].dimension === "Measures") {
      measures = ax;
    } else {
      hierarchies = ax;
    }
  });

  return {
    measures,
    hierarchies,
  };
}

function groupByLength(
  array: PositionWithValues[]
): Map<number, PositionWithValues[]> {
  return array.reduce((map, element) => {
    if (!map.has(element.position.length)) {
      map.set(element.position.length, []);
    }
    map.get(element.position.length)!.push(element); // eslint-disable-line @typescript-eslint/no-non-null-assertion
    return map;
  }, new Map<number, PositionWithValues[]>());
}

function groupPositionsByLength(
  positions: PositionWithValues[]
): PositionWithValues[][] {
  const positionsGroupedByLength = groupByLength(positions);
  const lenghts = Array.from(positionsGroupedByLength.keys()).sort(undefined);
  const result = [];
  for (const length of lenghts) {
    result.push(positionsGroupedByLength.get(length)!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }
  return result;
}

function extractPositionsFromAxis(axis: Axis): string[][] {
  return axis.positions
    .map((position) => position.map((pos) => pos.namePath))
    .map((position) =>
      position.flat().filter((label) => label !== "AllMember")
    );
}

function addNodeToCellSetData(
  cellSetData: CellSetData,
  path: string[],
  values: number[]
): void {
  const parentNodes = path.slice(0, path.length - 1);
  const label = path.at(-1)!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

  let cursor = cellSetData.rootNode;
  for (const parentNode of parentNodes) {
    cursor = cursor.getChild(parentNode)!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }
  cursor.addChild(label, new DataNode(label, values));
}

/**
 * Creates a CellSetData tree from the CellSet.
 * @param {CellSet} cellSet
 * @return The CellSetData tree.
 */
export function extractCellSetData(cellSet: CellSet): CellSetData | null {
  if (cellSet.axes.length === 0) return null;

  const axes = extractAxes(cellSet.axes);

  const measures: string[] =
    axes.measures?.positions.map((pos) => pos[0].namePath[0]) ?? [];

  const values = cellSet.cells.map((cell) => cell.value as number);

  if (axes.hierarchies === null)
    return new CellSetData(new DataNode("Total", values), measures);

  const positionsWithValues: PositionWithValues[] = extractPositionsFromAxis(
    axes.hierarchies
  ).map((pos) => {
    return {
      position: pos,
      values: values.splice(0, measures.length),
    };
  });

  const positionsGroupedByLength = groupPositionsByLength(positionsWithValues);

  const total = positionsGroupedByLength.splice(0, 1)[0][0];
  const cellSetData: CellSetData = new CellSetData(
    new DataNode("Total", total.values),
    measures
  );

  for (const treeLevel of positionsGroupedByLength) {
    for (const nodeHierarchy of treeLevel) {
      addNodeToCellSetData(
        cellSetData,
        nodeHierarchy.position,
        nodeHierarchy.values
      );
    }
  }

  return cellSetData;
}
