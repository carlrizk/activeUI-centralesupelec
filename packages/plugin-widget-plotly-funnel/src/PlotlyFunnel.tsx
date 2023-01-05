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
import { PlotlyFunnelWidgetState } from "./PlotlyFunnel.types";
import { PlotlyFunnelData, PlotlyFunnelDataMeasure } from "./PlotlyFunnelData";

export const PlotlyFunnel: FC<WidgetPluginProps<PlotlyFunnelWidgetState>> = (
  props
) => {
  const container = useRef<HTMLDivElement>(null);
  const { height, width } = useComponentSize(container);
  const { mdx } = props.widgetState.query;
  const stringigiedMdx = useMemo(() => stringify(mdx), [mdx]);
  const { data, error, isLoading } = useQueryResult({
    serverKey: "Ranch 6.0",
    queryId: props.queryId,
    query: {
      mdx: stringigiedMdx,
    },
  });

  const extractData = (data?: CellSet): PlotlyFunnelData => {
    if (data == null) return { names: [], measures: [] };
    const result: PlotlyFunnelData = { names: [], measures: [] };

    const columnsAxis = data.axes[0];
    const measures = columnsAxis.positions.map(
      (position) => position[0].captionPath[0]
    );

    const rowAxis = data.axes[1];

    result.names = rowAxis.positions
      .slice(1)
      .map((postion) => postion[0].captionPath.at(-1) as string);

    if (measures.length === 0) return { names: [], measures: [] };

    const values: number[][] = new Array(measures.length);

    for (let i = 0; i < values.length; i++) {
      values[i] = [];
    }

    for (let i = measures.length; i < data.cells.length; i++) {
      values[i % measures.length].push(data.cells[i].value as number);
    }

    for (let i = 0; i < measures.length; i++) {
      const measureData: PlotlyFunnelDataMeasure = {
        name: measures[i],
        values: values[i],
      };
      result.measures.push(measureData);
    }

    return result;
  };

  const extractedData = extractData(data);

  const funnelData: Plotly.Data[] = extractedData.measures.map((data) => {
    return {
      type: "funnel",
      name: data.name,
      y: extractedData.names,
      x: data.values,
    };
  });

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
          data={funnelData}
          layout={{ margin: { l: 150 }, width, height }}
        />
      )}
    </div>
  );
};
