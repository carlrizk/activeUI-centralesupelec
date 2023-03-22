import { extractCellSetData, MeasureData } from "@activeui-cs/common";
import { PlotBase, PlotParams } from "@activeui-cs/react-utils";
import {
  WidgetWithQueryProps,
  withQueryResult,
} from "@activeviam/activeui-sdk";
import { PlotlyWidgetState, withoutIrrelevantRenders } from "@activeviam/chart";
import useComponentSize from "@rehooks/component-size";
import { Spin } from "antd";
import { memo, useRef } from "react";
/**
 * Outputs the boxplot widget
 */
export const PlotlyBoxPlot = withQueryResult(
  withoutIrrelevantRenders(
    memo((props: WidgetWithQueryProps<PlotlyWidgetState>) => {
      const { data, error, isLoading } = props.queryResult;

      let extractedData: MeasureData[] = [];

      if (data !== undefined) {
        const cellSetData = extractCellSetData(data);
        if (cellSetData !== null) extractedData = cellSetData.getMeasureData();
      }
      const firstMeasure = extractedData.length >= 1;

      const container = useRef<HTMLDivElement>(null);

      // @ts-expect-error
      const { height, width } = useComponentSize(container);

      const plotParams: PlotParams = {
        data: extractedData.map((result) => {
          return {
            y: result.values,
            type: "box",
            name: result.measureName,
          };
        }),
        layout: {
          showlegend: true,
          autosize: true,
          hovermode: "closest",
          height,
          width: width - 25,
          boxmode: "group",
          xaxis: {
            visible: true,
            autotick: true,
            zeroline: !firstMeasure,
            range: firstMeasure ? undefined : [0, 100],
            tickmode: firstMeasure ? "auto" : "array",
            ticktext: firstMeasure ? undefined : ["", "", "", ""],
            tickvals: firstMeasure ? undefined : [0, 25, 50, 75],
          },
          yaxis: {
            visible: true,
            autotick: true,
            zeroline: !firstMeasure,
            range: firstMeasure ? undefined : [0, 100],
            tickmode: firstMeasure ? "auto" : "array",
            ticktext: firstMeasure ? undefined : ["", "", "", ""],
            tickvals: firstMeasure ? undefined : [0, 25, 50, 75],
          },
        },
        config: {
          staticPlot: !firstMeasure,
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
