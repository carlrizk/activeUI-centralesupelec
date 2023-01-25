import { extractData } from "@activeui-cs/common";
import { Data as PlotData, PlotBase } from "@activeui-cs/react-utils";
import { PlotlyWidgetState, withQueryResult } from "@activeviam/activeui-sdk";
import useComponentSize from "@rehooks/component-size";
import { Spin } from "antd";
import React, { useRef } from "react";

export const Plotly2DDensity = withQueryResult<PlotlyWidgetState>((props) => {
  const { isLoading, data, error } = props.queryResult;

  const extractedData = extractData(data);

  const x = extractedData.length >= 1 ? extractedData[0].values : [];
  const y = extractedData.length === 2 ? extractedData[1].values : [];

  const plotData: PlotData[] = [
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
