import { PlotBase } from "@activeui-cs/react-utils";
import { withQueryResult } from "@activeviam/activeui-sdk";
import useComponentSize from "@rehooks/component-size";
import React, { useRef } from "react";
import Spin from "antd/lib/spin";
import { PlotlyBoxPlotWidgetState } from "./PlotlyBoxPlot.types";
import { extractData } from "@activeui-cs/common";

export const PlotlyBoxPlot = withQueryResult<PlotlyBoxPlotWidgetState>(
  (props) => {
    const { data, error, isLoading } = props.queryResult;

    const extractedData = extractData(data);

    // Possibility to add functionalities
    const plotData: Plotly.Data[] = extractedData.map((result) => {
      return { y: result.values, type: "box", name: result.measureName };
    });

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
              showlegend: false,
              height,
              width,
              boxmode: "group",
            }}
          />
        )}
      </div>
    );
  }
);
