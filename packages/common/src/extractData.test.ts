import { CellSet } from "@activeviam/activeui-sdk";
import { extractData } from "./extractData";

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
});
