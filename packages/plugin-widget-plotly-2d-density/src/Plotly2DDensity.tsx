import { PlotBase } from "@activeui-cs/react-utils";
import {
  CellSet,
  PlotlyWidgetState,
  withQueryResult,
} from "@activeviam/activeui-sdk";
import useComponentSize from "@rehooks/component-size";
import { Spin } from "antd";
import React, { useRef } from "react";
import { Plotly2DDensityData } from "./Plotly2DDensityData";

export const Plotly2DDensity = withQueryResult<PlotlyWidgetState>((props) => {
  const { isLoading, data, error } = props.queryResult;

  const extractData = (data?: CellSet): Plotly2DDensityData[] => {
    if (data == null) return [];

    const result: Plotly2DDensityData[] = [];

    const columnsAxis = data.axes[0];
    const measures = columnsAxis.positions.map(
      (position) => position[0].captionPath[0]
    );

    if (measures.length === 0) return [];
    if (measures.length > 2) return [];

    const values: number[][] = new Array(measures.length);
    for (let i = 0; i < values.length; i++) {
      values[i] = [];
    }

    // Start at measures.length because the first values are total
    // TODO: Ask about this
    for (let i = measures.length; i < data.cells.length; i++) {
      if (i % measures.length === 0) {
        values[0].push(data.cells[i].value as number);
      } else {
        values[1].push(data.cells[i].value as number);
      }
    }

    for (let i = 0; i < measures.length; i++) {
      result.push({
        label: measures[i],
        values: values[i],
      });
    }

    return result;
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
      name: extractedData.length >= 1 ? extractedData[0].label : "",
      yaxis: "y2",
      type: "histogram",
    },
    {
      y,
      name: extractedData.length === 2 ? extractedData[1].label : "",
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
