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

function groupByLength(array: PositionWithValues[]) {
  return array.reduce((map, element) => {
    if (!map.has(element.position.length)) {
      map.set(element.position.length, []);
    }
    map.get(element.position.length)!.push(element);
    return map;
  }, new Map<number, PositionWithValues[]>());
}

function groupPositionsByLength(
  positions: PositionWithValues[]
): PositionWithValues[][] {
  const positionsGroupedByLength = groupByLength(positions);
  const lenghts = Array.from(positionsGroupedByLength.keys()).sort();
  const result = [];
  for (let length of lenghts) {
    result.push(positionsGroupedByLength.get(length)!);
  }
  return result;
}

function extractPositionsFromAxis(axis: Axis) {
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
) {
  let parentNodes = path.slice(0, path.length - 1);
  let label = path.at(-1)!;

  let cursor = cellSetData.rootNode;
  for (let parentNode of parentNodes) {
    cursor = cursor.getChild(parentNode)!;
  }
  cursor.addChild(label, new DataNode(label, values));
}

export function extractCellSetData(cellSet: CellSet): CellSetData | null {
  if (cellSet.axes.length === 0) return null;

  const axes = extractAxes(cellSet.axes);

  const measures: string[] =
    axes.measures?.positions.map((pos) => pos[0].namePath[0]) ?? [];

  const values = cellSet.cells.map((cell) => cell.value as number);

  if (axes.hierarchies === null) return null;

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

  for (let treeLevel of positionsGroupedByLength) {
    for (let nodeHierarchy of treeLevel) {
      addNodeToCellSetData(
        cellSetData,
        nodeHierarchy.position,
        nodeHierarchy.values
      );
    }
  }

  return cellSetData;
}
