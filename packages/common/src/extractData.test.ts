import { CellSet, Axis, Cell } from "@activeviam/activeui-sdk";
import { extractData } from "./extractData.js";

/*
Transforms a vector of measures into a vector of measures with the Cell type
*/
function convertToCellFormat(measureValues: number[]): Cell[] {
  return measureValues.map((value, index) => {
    const aux: Cell = {
      formattedValue: value.toString(),
      ordinal: index,
      value,
      properties: {},
    };
    return aux;
  });
}

describe(extractData, () => {
  describe("should return an empty list", () => {
    test("if data is undefined", () => {
      const data: CellSet | undefined = undefined;
      expect(extractData(data)).toStrictEqual([]);
    });

    test("if data is missing an axis", () => {
      const data: CellSet = {
        axes: [],
        cells: [],
        cube: "",
        epoch: 0,
        defaultMembers: [],
      };
      expect(extractData(data)).toStrictEqual([]);
    });
  });

  describe("should not return an empty list", () => {
    test("with only one measure at the same time", () => {
      // Construction of both axis row and column with the necessary parameters
      const row: Axis = {
        id: 0,
        hierarchies: [],
        positions: [
          [
            {
              captionPath: ["measureData"],
              namePath: ["measureData"],
              properties: {},
            },
          ],
        ],
        maxLevelPerHierarchy: [1],
      };
      const col: Axis = {
        id: 1,
        hierarchies: [],
        positions: [
          [
            {
              captionPath: ["AllMember"],
              namePath: ["AllMember"],
              properties: {},
            },
          ],
        ],
        maxLevelPerHierarchy: [2],
      };

      // Creation of the measure values with the correct format
      const valuesUsed = [50, 10, 10, 20, -10, 15, 5];
      const cells = convertToCellFormat(valuesUsed);

      // Our function extractData expects a CellSet type to work correctly
      const data: CellSet = {
        axes: [row, col],
        cells,
        cube: "nameTest",
        epoch: 1234,
        defaultMembers: [],
      };

      expect(extractData(data)).toStrictEqual([
        {
          measureName: "measureData",
          sum: 50,
          values: [10, 10, 20, -10, 15, 5],
        },
      ]);
    });

    test("with multiple measures at the same time", () => {
      const row: Axis = {
        id: 0,
        hierarchies: [],
        positions: [
          [
            {
              captionPath: ["measureData1"],
              namePath: ["measureData1"],
              properties: {},
            },
          ],
          [
            {
              captionPath: ["measureData2"],
              namePath: ["measureData2"],
              properties: {},
            },
          ],
        ],
        maxLevelPerHierarchy: [1],
      };
      const col: Axis = {
        id: 1,
        hierarchies: [],
        positions: [
          [
            {
              captionPath: ["AllMember"],
              namePath: ["AllMember"],
              properties: {},
            },
          ],
        ],
        maxLevelPerHierarchy: [2],
      };

      const measure1 = [50, 30, 10, 10, 20, -10, -10];
      const measure2 = [30, 10, 10, 40, -35, 10, -5];
      /*
      The mdx format outputs the measure values alternating between each measure included
      We have thereby to intercalate the values of each measure
      */
      const mixmeasure: number[] = measure1
        .map((element, index) => {
          return [element, measure2[index]];
        })
        .flat();
      const cells = convertToCellFormat(mixmeasure);

      const data: CellSet = {
        axes: [row, col],
        cells,
        cube: "nameTest",
        epoch: 1234,
        defaultMembers: [],
      };

      expect(extractData(data)).toStrictEqual([
        {
          measureName: "measureData1",
          sum: 50,
          values: [30, 10, 10, 20, -10, -10],
        },
        {
          measureName: "measureData2",
          sum: 30,
          values: [10, 10, 40, -35, 10, -5],
        },
      ]);
    });
  });
});
