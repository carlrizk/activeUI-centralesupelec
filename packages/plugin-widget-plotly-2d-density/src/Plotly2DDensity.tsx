import { PlotBase } from "@activeui-cs/react-utils";
import {
  CellSet,
  PlotlyWidgetState,
  withQueryResult,
} from "@activeviam/activeui-sdk";
import useComponentSize from "@rehooks/component-size";
import { Spin } from "antd";
import React, { useRef } from "react";
import { MeasureData } from "./MeasureData";

export const Plotly2DDensity = withQueryResult<PlotlyWidgetState>((props) => {
  const { isLoading, data, error } = props.queryResult;

  const extractData = (data?: CellSet): MeasureData[] => {
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
  };

  const extractedData = extractData(data);

  const x = extractedData.length >= 1 ? extractedData[0].values : [];
  const y = extractedData.length === 2 ? extractedData[1].values : [];

  const plotData: Plotly.Data[] = [
    {
      x,
      y,
      mode: "markers",
      name: "Points",
      marker: {
        color: "rgb(102,0,0)",
        size: 2,
        opacity: 0.4,
      },
      type: "scatter",
      selectedpoints: undefined,
    },
    {
      x,
      y,
      name: "density",
      ncontours: 20,
      colorscale: "Hot",
      reversescale: true,
      showscale: false,
      type: "histogram2dcontour",
      selectedpoints: undefined,
    },
    {
      x,
      name: extractedData.length >= 1 ? extractedData[0].measureName : "",
      yaxis: "y2",
      type: "histogram",
    },
    {
      y,
      name: extractedData.length === 2 ? extractedData[1].measureName : "",
      xaxis: "x2",
      type: "histogram",
    },
  ];

  const container = useRef<HTMLDivElement>(null);
  const { height, width } = useComponentSize(container);

  return (
    <div
      ref={container}
      style={{
        ...props.style,
        height: "100%",
      }}
    >
      {error != null ? (
        <div>{error.stackTrace}</div>
      ) : isLoading ? (
        <Spin />
      ) : (
        <PlotBase
          data={plotData}
          layout={{
            showlegend: true,
            hovermode: "closest",
            bargap: 0,
            width: width - 25,
            height,
            xaxis: {
              domain: [0, 0.85],
              showgrid: false,
              zeroline: false,
            },
            yaxis: {
              domain: [0, 0.85],
              showgrid: false,
              zeroline: false,
            },
            xaxis2: {
              domain: [0.85, 1],
              showgrid: false,
              zeroline: false,
            },
            yaxis2: {
              domain: [0.85, 1],
              showgrid: false,
              zeroline: false,
            },
          }}
        />
      )}
    </div>
  );
});
