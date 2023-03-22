import { CellSet } from "@activeviam/activeui-sdk";
import { CellSetData, DataNode } from "./common.types.js";
import { extractCellSetData } from "./extractCellSetData.js";

describe(extractCellSetData, () => {
  test("returns null if there is no axe on the CellSet", () => {
    const result = extractCellSetData({
      axes: [],
      cells: [],
      cube: "",
      defaultMembers: [],
      epoch: 0,
    });
    expect(result).toBeNull();
  });

  test("returns the total of all measures if only measures are selected", () => {
    const cellSet: CellSet = {
      epoch: 0,
      cube: "",
      axes: [
        {
          id: 0,
          hierarchies: [
            {
              dimension: "Measures",
              hierarchy: "Measures",
            },
          ],
          positions: [
            [
              {
                namePath: ["delta.SUM"],
                captionPath: ["delta.SUM"],
                properties: {},
              },
            ],
            [
              {
                namePath: ["gamma.SUM"],
                captionPath: ["gamma.SUM"],
                properties: {},
              },
            ],
          ],
          maxLevelPerHierarchy: [1],
        },
      ],
      cells: [
        {
          ordinal: 0,
          value: 609577.58,
          formattedValue: "609,577.58",
          properties: {},
        },
        {
          ordinal: 1,
          value: 4981.443713972718,
          formattedValue: "4,981.44",
          properties: {},
        },
      ],
      defaultMembers: [],
    };

    const result = extractCellSetData(cellSet);

    expect(result).toStrictEqual(
      new CellSetData(new DataNode("Total", [609577.58, 4981.443713972718]), [
        "delta.SUM",
        "gamma.SUM",
      ])
    );
  });

  test("returns only the hierarchy value if only a hierarchy is selected", () => {
    const cellSet: CellSet = {
      epoch: 0,
      cube: "",
      axes: [
        {
          id: 1,
          hierarchies: [
            {
              dimension: "Geography",
              hierarchy: "City",
            },
          ],
          positions: [
            [
              {
                namePath: ["AllMember"],
                captionPath: ["AllMember"],
                properties: {},
              },
            ],
            [
              {
                namePath: ["AllMember", "Berlin"],
                captionPath: ["AllMember", "Berlin"],
                properties: {},
              },
            ],
            [
              {
                namePath: ["AllMember", "Johannesburg"],
                captionPath: ["AllMember", "Johannesburg"],
                properties: {},
              },
            ],
          ],
          maxLevelPerHierarchy: [2],
        },
      ],
      cells: [],
      defaultMembers: [],
    };

    const result = extractCellSetData(cellSet);

    const expextedResult = new CellSetData(new DataNode("Total", []), []);
    expextedResult.rootNode.addChild("Berlin", new DataNode("Berlin", []));
    expextedResult.rootNode.addChild(
      "Johannesburg",
      new DataNode("Johannesburg", [])
    );

    expect(result).toStrictEqual(expextedResult);
  });

  test("returns only the hierarchies values if only hierarchies are selected", () => {
    const cellSet: CellSet = {
      epoch: 0,
      cube: "",
      axes: [
        {
          id: 1,
          hierarchies: [
            {
              dimension: "Geography",
              hierarchy: "City",
            },
            {
              dimension: "Currency",
              hierarchy: "Currency",
            },
          ],
          positions: [
            [
              {
                namePath: ["AllMember"],
                captionPath: ["AllMember"],
                properties: {},
              },
              {
                namePath: ["AllMember"],
                captionPath: ["AllMember"],
                properties: {},
              },
            ],
            [
              {
                namePath: ["AllMember", "Berlin"],
                captionPath: ["AllMember", "Berlin"],
                properties: {},
              },
              {
                namePath: ["AllMember"],
                captionPath: ["AllMember"],
                properties: {},
              },
            ],
            [
              {
                namePath: ["AllMember", "Berlin"],
                captionPath: ["AllMember", "Berlin"],
                properties: {},
              },
              {
                namePath: ["AllMember", "EUR"],
                captionPath: ["AllMember", "EUR"],
                properties: {},
              },
            ],
            [
              {
                namePath: ["AllMember", "Berlin"],
                captionPath: ["AllMember", "Berlin"],
                properties: {},
              },
              {
                namePath: ["AllMember", "GBP"],
                captionPath: ["AllMember", "GBP"],
                properties: {},
              },
            ],
            [
              {
                namePath: ["AllMember", "Johannesburg"],
                captionPath: ["AllMember", "Johannesburg"],
                properties: {},
              },
              {
                namePath: ["AllMember"],
                captionPath: ["AllMember"],
                properties: {},
              },
            ],
            [
              {
                namePath: ["AllMember", "Johannesburg"],
                captionPath: ["AllMember", "Johannesburg"],
                properties: {},
              },
              {
                namePath: ["AllMember", "EUR"],
                captionPath: ["AllMember", "EUR"],
                properties: {},
              },
            ],
            [
              {
                namePath: ["AllMember", "Johannesburg"],
                captionPath: ["AllMember", "Johannesburg"],
                properties: {},
              },
              {
                namePath: ["AllMember", "GBP"],
                captionPath: ["AllMember", "GBP"],
                properties: {},
              },
            ],
          ],
          maxLevelPerHierarchy: [2, 2],
        },
      ],
      cells: [],
      defaultMembers: [],
    };

    const result = extractCellSetData(cellSet);

    const expextedResult = new CellSetData(new DataNode("Total", []), []);

    let node = new DataNode("Berlin", []);
    node.addChild("EUR", new DataNode("EUR", []));
    node.addChild("GBP", new DataNode("GBP", []));

    expextedResult.rootNode.addChild("Berlin", node);

    node = new DataNode("Johannesburg", []);
    node.addChild("EUR", new DataNode("EUR", []));
    node.addChild("GBP", new DataNode("GBP", []));
    expextedResult.rootNode.addChild("Johannesburg", node);

    expect(result).toStrictEqual(expextedResult);
  });

  test("returns the hierarchies and their corresponding measure values of both measures and hierarchies are selected", () => {
    const cellSet: CellSet = {
      epoch: 0,
      cube: "",
      axes: [
        {
          id: 0,
          hierarchies: [
            {
              dimension: "Measures",
              hierarchy: "Measures",
            },
          ],
          positions: [
            [
              {
                namePath: ["delta.SUM"],
                captionPath: ["delta.SUM"],
                properties: {},
              },
            ],
            [
              {
                namePath: ["gamma.SUM"],
                captionPath: ["gamma.SUM"],
                properties: {},
              },
            ],
          ],
          maxLevelPerHierarchy: [1],
        },
        {
          id: 1,
          hierarchies: [
            {
              dimension: "Geography",
              hierarchy: "City",
            },
            {
              dimension: "Currency",
              hierarchy: "Currency",
            },
          ],
          positions: [
            [
              {
                namePath: ["AllMember"],
                captionPath: ["AllMember"],
                properties: {},
              },
              {
                namePath: ["AllMember"],
                captionPath: ["AllMember"],
                properties: {},
              },
            ],
            [
              {
                namePath: ["AllMember", "Berlin"],
                captionPath: ["AllMember", "Berlin"],
                properties: {},
              },
              {
                namePath: ["AllMember"],
                captionPath: ["AllMember"],
                properties: {},
              },
            ],
            [
              {
                namePath: ["AllMember", "Berlin"],
                captionPath: ["AllMember", "Berlin"],
                properties: {},
              },
              {
                namePath: ["AllMember", "EUR"],
                captionPath: ["AllMember", "EUR"],
                properties: {},
              },
            ],
            [
              {
                namePath: ["AllMember", "Berlin"],
                captionPath: ["AllMember", "Berlin"],
                properties: {},
              },
              {
                namePath: ["AllMember", "GBP"],
                captionPath: ["AllMember", "GBP"],
                properties: {},
              },
            ],
            [
              {
                namePath: ["AllMember", "Johannesburg"],
                captionPath: ["AllMember", "Johannesburg"],
                properties: {},
              },
              {
                namePath: ["AllMember"],
                captionPath: ["AllMember"],
                properties: {},
              },
            ],
            [
              {
                namePath: ["AllMember", "Johannesburg"],
                captionPath: ["AllMember", "Johannesburg"],
                properties: {},
              },
              {
                namePath: ["AllMember", "EUR"],
                captionPath: ["AllMember", "EUR"],
                properties: {},
              },
            ],
            [
              {
                namePath: ["AllMember", "Johannesburg"],
                captionPath: ["AllMember", "Johannesburg"],
                properties: {},
              },
              {
                namePath: ["AllMember", "GBP"],
                captionPath: ["AllMember", "GBP"],
                properties: {},
              },
            ],
          ],
          maxLevelPerHierarchy: [2, 2],
        },
      ],
      cells: [
        {
          ordinal: 0,
          value: 1,
          formattedValue: "1",
          properties: {},
        },
        {
          ordinal: 1,
          value: 2,
          formattedValue: "2",
          properties: {},
        },
        {
          ordinal: 2,
          value: 3,
          formattedValue: "3",
          properties: {},
        },
        {
          ordinal: 3,
          value: 4,
          formattedValue: "4",
          properties: {},
        },
        {
          ordinal: 4,
          value: 5,
          formattedValue: "5",
          properties: {},
        },
        {
          ordinal: 5,
          value: 6,
          formattedValue: "6",
          properties: {},
        },
        {
          ordinal: 6,
          value: 7,
          formattedValue: "7",
          properties: {},
        },
        {
          ordinal: 7,
          value: 8,
          formattedValue: "8",
          properties: {},
        },
        {
          ordinal: 8,
          value: 9,
          formattedValue: "9",
          properties: {},
        },
        {
          ordinal: 9,
          value: 10,
          formattedValue: "10",
          properties: {},
        },
        {
          ordinal: 10,
          value: 11,
          formattedValue: "11",
          properties: {},
        },
        {
          ordinal: 11,
          value: 12,
          formattedValue: "12",
          properties: {},
        },
        {
          ordinal: 12,
          value: 13,
          formattedValue: "13",
          properties: {},
        },
        {
          ordinal: 13,
          value: 14,
          formattedValue: "14",
          properties: {},
        },
      ],
      defaultMembers: [],
    };

    const result = extractCellSetData(cellSet);

    const expextedResult = new CellSetData(new DataNode("Total", [1, 2]), [
      "delta.SUM",
      "gamma.SUM",
    ]);

    let node = new DataNode("Berlin", [3, 4]);
    node.addChild("EUR", new DataNode("EUR", [5, 6]));
    node.addChild("GBP", new DataNode("GBP", [7, 8]));

    expextedResult.rootNode.addChild("Berlin", node);

    node = new DataNode("Johannesburg", [9, 10]);
    node.addChild("EUR", new DataNode("EUR", [11, 12]));
    node.addChild("GBP", new DataNode("GBP", [13, 14]));
    expextedResult.rootNode.addChild("Johannesburg", node);

    expect(result).toStrictEqual(expextedResult);
  });
});
