import { CellSetData, DataNode, MeasureData } from "./common.types.js";

describe(DataNode, () => {
  test("getLeafNodes returns a the leaf nodes in the correct order", () => {
    const rootNode = new DataNode("Root", []);
    rootNode.addChild("LeftChild", new DataNode("LeftChild", []));
    rootNode.addChild("RightChild", new DataNode("RightChild", []));

    const result = rootNode.getLeafNodes();
    expect(result).toStrictEqual([
      new DataNode("LeftChild", []),
      new DataNode("RightChild", []),
    ]);
  });
});

describe(CellSetData, () => {
  test("getMeasureData returns a list of MeasureData representing the leafs of the tree", () => {
    const cellSetData = new CellSetData(new DataNode("Root", [10]), [
      "measure",
    ]);
    cellSetData.rootNode.addChild("LeftChild", new DataNode("LeftChild", [20]));
    cellSetData.rootNode.addChild(
      "RightChild",
      new DataNode("RightChild", [30])
    );

    const result = cellSetData.getMeasureData();
    const expextedResult: MeasureData[] = [
      {
        measureName: "measure",
        total: 10,
        values: [20, 30],
      },
    ];
    expect(result).toStrictEqual(expextedResult);
  });
});
