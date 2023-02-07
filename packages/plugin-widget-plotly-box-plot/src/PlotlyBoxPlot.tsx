import { PlotBase } from "@activeui-cs/react-utils";
import { extractData } from "@activeui-cs/common";
import {
  withQueryResult,
  WidgetWithQueryProps,
} from "@activeviam/activeui-sdk";
import { PlotlyWidgetState, withoutIrrelevantRenders } from "@activeviam/chart";
import useComponentSize from "@rehooks/component-size";
import { Spin } from "antd";
import React, { memo, useRef } from "react";

/**
 * Outputs the boxplot widget
 */
/* eslint-disable react/display-name */
export const PlotlyBoxPlot = withQueryResult(
  withoutIrrelevantRenders(
    memo((props: WidgetWithQueryProps<PlotlyWidgetState>) => {
      const { data, error, isLoading } = props.queryResult;

      const extractedData = extractData(data);

      // Possibility to add functionalities
      const plotData: Plotly.Data[] = extractedData.map((result) => {
        return { y: result.values, type: "box", name: result.measureName };
      });

      const showAxis = extractedData.length > 0;

      const container = useRef<HTMLDivElement>(null);
      const { height, width } = useComponentSize(container);

      return (
        <div
          ref={container}
          style={{
            ...props.style,
            height: "100%",
            width: "100%",
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
                height,
                width: width - 25,
                boxmode: "group",
                xaxis: {
                  visible: showAxis,
                },
                yaxis: {
                  visible: showAxis,
                },
              }}
            />
          )}
        </div>
      );
    })
  )
);
