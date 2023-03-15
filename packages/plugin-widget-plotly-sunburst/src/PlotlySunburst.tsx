import { PlotBase } from "@activeui-cs/react-utils";
import {
  WidgetWithQueryProps,
  withQueryResult,
} from "@activeviam/activeui-sdk";
import { PlotlyWidgetState, withoutIrrelevantRenders } from "@activeviam/chart";
import useComponentSize from "@rehooks/component-size";
import { Spin, Alert, Space } from "antd";
import { memo, useRef } from "react";
import {
  extractHierarchyData,
  DataNode,
  HierarchyData,
} from "@activeui-cs/common";

/* eslint-disable react/display-name */
export const PlotlySunburst = withQueryResult(
  withoutIrrelevantRenders(
    memo((props: WidgetWithQueryProps<PlotlyWidgetState>) => {
      const { data, error, isLoading } = props.queryResult;

      const rootNode = extractHierarchyData(data);
      const sunburstdata: HierarchyData = {
        ids: [],
        labels: [],
        parents: [],
        values: [],
      };

      function addNodetoChart(
        node: DataNode,
        parent: DataNode | null
      ): boolean {
        if (node.value <= 0) return false;
        sunburstdata.ids.push(node.id);
        sunburstdata.labels.push(node.label);
        sunburstdata.parents.push(parent === null ? "" : parent.id);
        sunburstdata.values.push(node.value);
        return true;
      }

      function addNodeChildrentoChartRecursive(node: DataNode): boolean {
        if (node.value <= 0) return false;
        for (let [, childnode] of node.children) {
          if (!addNodetoChart(childnode, node)) return false;
          if (!addNodeChildrentoChartRecursive(childnode)) return false;
        }
        return true;
      }

      let doesNotContainNegativeValue = true;
      if (rootNode != null) {
        if (
          !addNodetoChart(rootNode, null) ||
          !addNodeChildrentoChartRecursive(rootNode)
        )
          doesNotContainNegativeValue = false;
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
          ) : doesNotContainNegativeValue ? (
            <PlotBase
              data={[
                {
                  type: "sunburst",
                  ids: sunburstdata.ids,
                  labels: sunburstdata.labels,
                  parents: sunburstdata.parents,
                  values: sunburstdata.values,
                  branchvalues: "total",
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
                message="Warning : measure with negative values!"
                type="warning"
                showIcon
                closable
              />
            </Space>
          )}
        </div>
      );
    })
  )
);
