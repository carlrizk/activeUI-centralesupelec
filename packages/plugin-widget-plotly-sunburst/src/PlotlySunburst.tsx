import { CellSetData, extractCellSetData } from "@activeui-cs/common";
import { PlotBase } from "@activeui-cs/react-utils";
import {
  WidgetWithQueryProps,
  withQueryResult,
} from "@activeviam/activeui-sdk";
import { PlotlyWidgetState, withoutIrrelevantRenders } from "@activeviam/chart";
import useComponentSize from "@rehooks/component-size";
import { Alert, Space, Spin } from "antd";
import { memo, useRef } from "react";
import { useIntl } from "react-intl";
import { createSunburstData } from "./createSunburstData.js";
import { SunburstData } from "./sunburst.types.js";

/* eslint-disable react/display-name */
export const PlotlySunburst = withQueryResult(
  withoutIrrelevantRenders(
    memo((props: WidgetWithQueryProps<PlotlyWidgetState>) => {
      const { formatMessage } = useIntl();
      const { data, error, isLoading } = props.queryResult;

      let cellSetData: CellSetData | null = null;
      if (data != null) cellSetData = extractCellSetData(data);

      let sunburstData = new SunburstData();
      if (cellSetData != null) {
        sunburstData = createSunburstData(cellSetData);
      }

      const hasMeasures =
        cellSetData != null && cellSetData?.measures.length !== 0;

      if (hasMeasures && cellSetData !== null) {
        const measureName = cellSetData.measures[0];
        sunburstData.getLabels()[0] = measureName;
      } else {
        sunburstData.getLabels()[0] = "";
      }

      const doesNotContainNegativeValue =
        sunburstData.getValues().find((value) => value < 0) === undefined;

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
          ) : doesNotContainNegativeValue ? (
            <PlotBase
              data={[
                {
                  type: "sunburst",
                  ids: sunburstData.getIDs(),
                  labels: sunburstData.getLabels(),
                  parents: sunburstData.getParents(),
                  values: hasMeasures ? sunburstData.getValues() : undefined,
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
          ) : (
            <Space direction="vertical" style={{ width: "100%" }}>
              <Alert
                message={formatMessage({
                  id: "aui.plugins.widget.plotly-sunburst.negativeValuesWarning",
                })}
                type="warning"
                showIcon
              />
            </Space>
          )}
        </div>
      );
    })
  )
);
