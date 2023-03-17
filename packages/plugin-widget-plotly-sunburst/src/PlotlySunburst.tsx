import { extractCellSetData } from "@activeui-cs/common";
import { PlotBase } from "@activeui-cs/react-utils";
import {
  WidgetWithQueryProps,
  withQueryResult,
} from "@activeviam/activeui-sdk";
import { PlotlyWidgetState, withoutIrrelevantRenders } from "@activeviam/chart";
import useComponentSize from "@rehooks/component-size";
import { Spin } from "antd";
import { memo, useRef } from "react";
import { createSunburstData } from "./createSunburstData.js";
import { SunburstData } from "./sunburst.types.js";

/* eslint-disable react/display-name */
export const PlotlySunburst = withQueryResult(
  withoutIrrelevantRenders(
    memo((props: WidgetWithQueryProps<PlotlyWidgetState>) => {
      const { data, error, isLoading } = props.queryResult;

      const cellSetData = data ? extractCellSetData(data) : null;
      let sunburstData = new SunburstData();

      if (cellSetData != null) {
        sunburstData = createSunburstData(cellSetData);
      }

      console.log(sunburstData);

      const container = useRef<HTMLDivElement>(null);
      // @ts-expect-error
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
              data={[
                {
                  type: "sunburst",
                  ids: sunburstData.getIDs(),
                  labels: sunburstData.getLabels(),
                  parents: sunburstData.getParents(),
                  values: sunburstData.getValues(),
                  branchvalues: "total",
                  // @ts-expect-error
                  sort: false,
                },
              ]}
              layout={{
                height,
                width: width - 25,
              }}
            />
          )}
        </div>
      );
    })
  )
);
