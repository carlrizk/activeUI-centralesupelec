import { CellSet, Axis, Cell } from "@activeviam/activeui-sdk";
import { extractData } from "./extractData.js";

describe(extractData, () => {
  describe("should return an empty list", () => {
    test("If data is undefined", () => {
      const data: CellSet | undefined = undefined;
      expect(extractData(data)).toStrictEqual([]);
    });

    test("If data is missing an axis", () => {
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
    test("with an unitary element (not a list)", () => {
      const ax1: Axis = {
        id: 0,
        hierarchies: [],
        positions: [
          [
            {
              captionPath: ["testingData"],
              namePath: ["testingData"],
              properties: {},
            },
          ],
        ],
        maxLevelPerHierarchy: [1],
      };

      const ax2: Axis = {
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

      const cells = [50, 10, 10, 20, -10, 15, 5].map((value, index) => {
        return {
          formattedValue: value.toString(),
          ordinal: index,
          value: value,
        } as Cell;
      });

      const data: CellSet = {
        axes: [ax1, ax2],
        cells: cells,
        cube: "nameTest",
        epoch: 1234,
        defaultMembers: [],
      };
      expect(extractData(data)).toStrictEqual([
        {
          measureName: "testingData",
          sum: 50,
          values: [10, 10, 20, -10, 15, 5],
        },
      ]);
    });
    test("with a list", () => {
      const ax1: Axis = {
        id: 0,
        hierarchies: [],
        positions: [
          [
            {
              captionPath: ["testingData1"],
              namePath: ["testingData1"],
              properties: {},
            },
          ],
          [
            {
              captionPath: ["testingData2"],
              namePath: ["testingData2"],
              properties: {},
            },
          ],
        ],
        maxLevelPerHierarchy: [1],
      };

      const ax2: Axis = {
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
      const mixmeasure: number[] = measure1
        .map((element, index) => {
          return [element, measure2[index]];
        })
        .flat();

      const cells = mixmeasure.map((value, index) => {
        return {
          formattedValue: value.toString(),
          ordinal: index,
          value: value,
        } as Cell;
      });

      const data: CellSet = {
        axes: [ax1, ax2],
        cells: cells,
        cube: "nameTest",
        epoch: 1234,
        defaultMembers: [],
      };

      expect(extractData(data)).toStrictEqual([
        {
          measureName: "testingData1",
          sum: 50,
          values: [30, 10, 10, 20, -10, -10],
        },
        {
          measureName: "testingData2",
          sum: 30,
          values: [10, 10, 40, -35, 10, -5],
        },
      ]);
    });
  });
});
