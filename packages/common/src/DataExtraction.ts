import { CellSet } from "@activeviam/activeui-sdk";
import { MeasureData } from "./MeasureData";

export function extractData(data?: CellSet): MeasureData[] {
  if (data == null) return [];

  const columnsAxis = data.axes.at(0);
  const rowAxis = data.axes.at(1);

  if (columnsAxis === undefined || rowAxis === undefined) {
    return [];
  }
  const columnCount = columnsAxis.positions.length;
  // const rowCount = rowAxis.positions.length;

  const sums = data.cells.slice(0, columnCount);
  const values = data.cells.slice(columnCount);

  return columnsAxis.positions.map((measure, measureIndex) => {
    return {
      measureName: measure[0].captionPath[0],
      sum: sums[measureIndex].value as number,
      values: values
        .filter((value) => {
          return value.ordinal % columnCount === measureIndex;
        })
        .map((value) => value.value as number),
    };
  });
}
