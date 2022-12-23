import { PlotBase } from "@activeui-cs/react-utils";
import {
  WidgetPluginProps,
  useQueryResult,
  CellSet,
  stringify,
} from "@activeviam/activeui-sdk";
import useComponentSize from "@rehooks/component-size";
import React, { FC, useMemo, useRef } from "react";
import Spin from "antd/lib/spin";
import { Plotly2DDensityWidgetState } from "./Plotly2DDensity.types";
import { Plotly2DDensityData } from "./Plotly2DDensityData";

export const Plotly2DDensity: FC<
  WidgetPluginProps<Plotly2DDensityWidgetState>
> = (props) => {
  const { mdx } = props.widgetState.query;
  const stringifiedMdx = useMemo(() => stringify(mdx), [mdx]);

  const { data, error, isLoading } = useQueryResult({
    serverKey: "Ranch 6.0",
    queryId: props.queryId,
    query: {
      mdx: stringifiedMdx,
    },
  });

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
  const plotData: Plotly.Data[] = [
    {
      x: extractedData.length >= 1 ? extractedData[0].values : [],
      y: extractedData.length === 2 ? extractedData[1].values : [],
      mode: "markers",
      name: "Points",
      marker: {
        color: "rgb(102,0,0)",
        size: 2,
        opacity: 0.4,
      },
      type: "scatter",
    },
    {
      x: extractedData.length >= 1 ? extractedData[0].values : [],
      y: extractedData.length === 2 ? extractedData[1].values : [],
      name: "density",
      ncontours: 20,
      colorscale: "Hot",
      reversescale: true,
      showscale: false,
      type: "histogram2dcontour",
    },
    {
      x: extractedData.length >= 1 ? extractedData[0].values : [],
      name: extractedData.length >= 1 ? extractedData[0].label : "",
      yaxis: "y2",
      type: "histogram",
    },
    {
      y: extractedData.length === 2 ? extractedData[1].values : [],
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
};
