import { PlotBase } from "@activeui-cs/react-utils";
import {
  useQueryResult,
  WidgetPluginProps,
  CellSet,
  stringify,
} from "@activeviam/activeui-sdk";
import useComponentSize from "@rehooks/component-size";
import React, { FC, useMemo, useRef } from "react";
import Spin from "antd/lib/spin";
import { PlotlyBoxPlotWidgetState } from "./PlotlyBoxPlot.types";
import { PlotlyBoxPlotData } from "./PlotlyBoxPlotData";

export const PlotlyBoxPlot: FC<WidgetPluginProps<PlotlyBoxPlotWidgetState>> = (
  props
) => {
  const { mdx } = props.widgetState.query;
  const stringifiedMdx = useMemo(() => stringify(mdx), [mdx]);

  const { data, error, isLoading } = useQueryResult({
    serverKey: "Ranch 6.0",
    queryId: props.queryId,
    query: {
      mdx: stringifiedMdx,
    },
  });

  const extractData = (data?: CellSet): PlotlyBoxPlotData[] => {
    if (data == null) return [];
    const result: PlotlyBoxPlotData[] = [];

    const columnsAxis = data.axes[0];
    const measures = columnsAxis.positions.map(
      (position) => position[0].captionPath[0]
    );
    console.log("Labels: ", measures);

    if (measures.length === 0) return [];
    console.log("Data inside: ", data);

    const values: number[][] = new Array(measures.length);
    for (let i = 0; i < values.length; i++) {
      values[i] = [];
    }

    console.log("Values: ", values);

    for (let i = measures.length; i < data.cells.length; i++) {
      values[i % measures.length].push(data.cells[i].value as number);
    }

    for (let i = 0; i < measures.length; i++) {
      result.push({
        name: measures[i],
        values: values[i],
      });
    }

    return result;
  };

  const extractedData = extractData(data);
  const plotData: Plotly.Data[] = extractedData.map((result) => {
    return { y: result.values, type: "box", name: result.name };
  });

  // const extractData = (data?: CellSet): any => {
  //   console.log("Extracted data: ", data)
  // }
  console.log("Extracted data: ", extractedData);

  const container = useRef<HTMLDivElement>(null);
  const { height, width } = useComponentSize(container);

  // const oldData = [
  //   {
  //     x,
  //     y: y0,
  //     type: "box",
  //     name: "Film 1",
  //     marker: { color: "#3D9970" },
  //   },
  //   {
  //     x,
  //     y: y1,
  //     type: "box",
  //     name: "Film 2",
  //     marker: { color: "#FF4136" },
  //   },
  //   {
  //     x,
  //     y: y2,
  //     type: "box",
  //     name: "Film 3",
  //     marker: { color: "#FF851B" },
  //   },
  // ];

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
            showlegend: false,
            height,
            width,
            boxmode: "group",
          }}
        />
      )}
    </div>
  );
};
