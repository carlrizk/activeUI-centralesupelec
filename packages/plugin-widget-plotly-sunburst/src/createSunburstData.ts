import { CellSetData, DataNode } from "@activeui-cs/common";
import { SunburstData } from "./sunburst.types.js";

export function createSunburstData(cellSetData: CellSetData): SunburstData {
  const sunburstdata = new SunburstData();

  let nodeId = addNodeToSunburstData(sunburstdata, cellSetData.rootNode, "");
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
    let nodeId = addNodeToSunburstData(sunburstData, childnode, parentId);
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
