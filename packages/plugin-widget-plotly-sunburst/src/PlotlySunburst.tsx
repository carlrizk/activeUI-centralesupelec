import { DataNode, extractCellSetData } from "@activeui-cs/common";
import { PlotBase } from "@activeui-cs/react-utils";
import {
  WidgetWithQueryProps,
  withQueryResult,
} from "@activeviam/activeui-sdk";
import { PlotlyWidgetState, withoutIrrelevantRenders } from "@activeviam/chart";
import useComponentSize from "@rehooks/component-size";
import { Spin } from "antd";
import { memo, useRef } from "react";
import { SunburstData } from "./SunburstData.js";

/* eslint-disable react/display-name */
export const PlotlySunburst = withQueryResult(
  withoutIrrelevantRenders(
    memo((props: WidgetWithQueryProps<PlotlyWidgetState>) => {
      const { data, error, isLoading } = props.queryResult;

      const cellSetData = data ? extractCellSetData(data) : null;
      const sunburstdata: SunburstData = {
        ids: [],
        labels: [],
        parents: [],
        values: [],
      };

      function addNodetoChart(node: DataNode, parent: DataNode | null): void {
        sunburstdata.ids.push(node.id);
        sunburstdata.labels.push(node.label);
        sunburstdata.parents.push(parent === null ? "" : parent.id);
        sunburstdata.values.push(node.values[0]);
      }

      function addNodeChildrentoChartRecursive(node: DataNode): void {
        node.children.forEach((childnode) => {
          addNodetoChart(childnode, node);
          addNodeChildrentoChartRecursive(childnode);
        });
      }

      if (cellSetData != null) {
        addNodetoChart(cellSetData.rootNode, null);
        addNodeChildrentoChartRecursive(cellSetData.rootNode);
      }

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
                  ids: sunburstdata.ids,
                  labels: sunburstdata.labels,
                  parents: sunburstdata.parents,
                  values: sunburstdata.values,
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
