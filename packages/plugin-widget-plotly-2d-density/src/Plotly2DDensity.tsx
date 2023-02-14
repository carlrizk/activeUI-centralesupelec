import { extractData } from "@activeui-cs/common";
import { PlotBase, PlotParams } from "@activeui-cs/react-utils";
import {
  WidgetWithQueryProps,
  withQueryResult,
} from "@activeviam/activeui-sdk";
import { PlotlyWidgetState, withoutIrrelevantRenders } from "@activeviam/chart";
import useComponentSize from "@rehooks/component-size";
import { Spin } from "antd";
import { memo, useRef } from "react";

export const Plotly2DDensity = withQueryResult(
  withoutIrrelevantRenders(
    memo((props: WidgetWithQueryProps<PlotlyWidgetState>) => {
      const { data, error, isLoading } = props.queryResult;

      const extractedData = extractData(data);

      const firstMeasure =
        extractedData.length >= 1 ? extractedData[0].values : [];
      const secondMeasure =
        extractedData.length === 2 ? extractedData[1].values : [];

      const showFirstMeasureAxis = firstMeasure.length > 0;
      const showSecondMeasureAxis = secondMeasure.length > 0;

      const container = useRef<HTMLDivElement>(null);
      // @ts-expect-error
      const { height, width } = useComponentSize(container);

      const plotParams: PlotParams = {
        data: [
          {
            x: firstMeasure,
            y: secondMeasure,
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
            x: firstMeasure,
            y: secondMeasure,
            name: "density",
            colorscale: "Hot",
            reversescale: true,
            showscale: false,
            type: "histogram2dcontour",
          },
          {
            x: firstMeasure,
            name: extractedData.length >= 1 ? extractedData[0].measureName : "",
            yaxis: "y2",
            type: "histogram",
          },
          {
            y: secondMeasure,
            name:
              extractedData.length === 2 ? extractedData[1].measureName : "",
            xaxis: "x2",
            type: "histogram",
          },
        ],
        layout: {
          showlegend: true,
          hovermode: "closest",
          width: width - 25,
          height,
          xaxis: {
            domain: [0, 0.8],
            zeroline: false,
            showgrid: true,
            automargin: true,
            autotick: true,
            visible: showFirstMeasureAxis,
          },
          yaxis: {
            domain: [0, 0.8],
            zeroline: false,
            showgrid: true,
            automargin: true,
            autotick: true,
            visible: showSecondMeasureAxis,
          },
          xaxis2: {
            domain: [0.85, 1],
            zeroline: false,
            showgrid: true,
            automargin: true,
            autotick: true,
            visible: showSecondMeasureAxis,
          },
          yaxis2: {
            domain: [0.85, 1],
            zeroline: false,
            showgrid: true,
            automargin: true,
            autotick: true,
            visible: showFirstMeasureAxis,
          },
        },
      };

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
            <PlotBase {...plotParams} />
          )}
        </div>
      );
    })
  )
);
