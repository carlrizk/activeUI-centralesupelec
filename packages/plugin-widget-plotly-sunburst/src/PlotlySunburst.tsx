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

      let currentID = 0;

      const cellSetData = data ? extractCellSetData(data) : null;

      const sunburstdata: SunburstData = {
        ids: [],
        labels: [],
        parents: [],
        values: [],
      };

      function addNodetoChart(
        nodeId: number,
        nodeLabel: string,
        nodeValue: number,
        parentId: number | ""
      ): void {
        sunburstdata.ids.push(nodeId.toString());
        sunburstdata.labels.push(nodeLabel);
        sunburstdata.parents.push(parentId.toString());
        sunburstdata.values.push(nodeValue);
        currentID += 1;
      }

      function addNodeChildrentoChartRecursive(
        parentId: number,
        node: DataNode
      ): void {
        node.getChildren().forEach((childnode) => {
          let id = currentID;
          addNodetoChart(
            id,
            childnode.getLabel(),
            childnode.getValues()[0],
            parentId
          );
          addNodeChildrentoChartRecursive(id, childnode);
        });
      }

      if (cellSetData != null) {
        let id = currentID;
        addNodetoChart(
          id,
          cellSetData.rootNode.getLabel(),
          cellSetData.rootNode.getValues()[0],
          ""
        );
        addNodeChildrentoChartRecursive(id, cellSetData.rootNode);
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
