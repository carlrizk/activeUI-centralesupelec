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

      const showAxis = extractedData.length > 0;

      const container = useRef<HTMLDivElement>(null);
      // @ts-expect-error
      const { height, width } = useComponentSize(container);

      // Possibility to add functionalities
      const plotParams: PlotParams = {
        data: extractedData.map((result) => {
          return { y: result.values, type: "box", name: result.measureName };
        }),
        layout: {
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
