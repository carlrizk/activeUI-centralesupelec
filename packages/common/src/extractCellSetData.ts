import { Axis, CellSet } from "@activeviam/activeui-sdk";
import { CellSetData, DataNode } from "./common.types.js";

interface Axes {
  measures: Axis | null;
  hierarchies: Axis | null;
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

export function extractCellSetData(cellSet: CellSet): CellSetData | null {
  if (cellSet.axes.length === 0) return null;

  const axes = extractAxes(cellSet.axes);

  const measures: string[] =
    axes.measures?.positions.map((pos) => pos[0].namePath[0]) ?? [];

  const totals = cellSet.cells
    .slice(0, measures.length)
    .map((cell) => cell.value as number);

  const values = cellSet.cells
    .slice(measures.length)
    .map((cell) => cell.value as number);

  const cellSetData: CellSetData = new CellSetData(
    new DataNode("Total", totals),
    measures
  );

  if (axes.hierarchies === null) return cellSetData;

  const positions = axes.hierarchies.positions
    .map((position) => position.map((pos) => pos.namePath))
    .map((position) => position.flat().filter((label) => label !== "AllMember"))
    .slice(1);

  for (let posidx = 0; posidx < positions.length; posidx++) {
    const subpositions = positions[posidx];
    let cursor = cellSetData.rootNode;
    for (let subposidx = 0; subposidx < subpositions.length; subposidx++) {
      const subposition = subpositions[subposidx];
      if (!cursor.children.has(subposition)) {
        cursor.children.set(
          subposition,
          new DataNode(
            subposition,
            values.splice(0, cellSetData.measures.length)
          )
        );
      }
      cursor = cursor.children.get(subposition) ?? cellSetData.rootNode;
    }
  }

  return cellSetData;
}
