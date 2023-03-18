import { CellSetData, DataNode } from "@activeui-cs/common";
import { SunburstData } from "./sunburst.types.js";

/**
 * @param {CellSetData} cellSetData
 * @returns The SunburstData object ready to be used by a Sunburst plot.
 */
export function createSunburstData(cellSetData: CellSetData): SunburstData {
  const sunburstdata = new SunburstData();

  const nodeId = addNodeToSunburstData(sunburstdata, cellSetData.rootNode, "");
  addNodeChildrenToSunburstDataRecursive(
    sunburstdata,
    cellSetData.rootNode,
    nodeId
  );

  return sunburstdata;
}

function addNodeChildrenToSunburstDataRecursive(
  sunburstData: SunburstData,
  node: DataNode,
  parentId: number
): void {
  node.getChildren().forEach((childnode) => {
    const nodeId = addNodeToSunburstData(sunburstData, childnode, parentId);
    addNodeChildrenToSunburstDataRecursive(sunburstData, childnode, nodeId);
  });
}

function addNodeToSunburstData(
  sunburstData: SunburstData,
  node: DataNode,
  parentId: number | ""
): number {
  return sunburstData.addNode(
    node.getLabel(),
    node.getValues()[0] ?? 0,
    parentId
  );
}
