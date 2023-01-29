import {
  CellSetSelection,
  DataVisualizationContentEditor,
  DataVisualizationQueryEditor,
  FiltersEditor,
  PlotlyWidgetState,
  WidgetPlugin,
  withQueryResult,
} from "@activeviam/activeui-sdk";
import { withoutIrrelevantRenders } from "@activeviam/chart";
import { memo } from "react";
import { IconWorld } from "./IconWorld";

import { Plotly2DDensity } from "./Plotly2DDensity";

const widgetKey = "plotly-2d-density";

export const pluginWidgetPlotly2DDensity: WidgetPlugin<
  PlotlyWidgetState,
  CellSetSelection
> = {
  key: widgetKey,
  category: "dataVisualization",
  attributes: {
    xAxis: {
      role: "primaryOrdinal",
      isMainAxis: true,
    },
    values: {
      role: "primaryNumeric",
      maxNumberOfFields: 2,
    },
  },
  Component: withQueryResult(withoutIrrelevantRenders(memo(Plotly2DDensity))),
  contentEditor: DataVisualizationContentEditor,
  contextMenuItems: [],
  menuItems: [],
  titleBarButtons: [],
  doesSupportMeasuresRedirection: true,
  filtersEditor: FiltersEditor,
  Icon: IconWorld,
  initialState: {
    widgetKey,
    mapping: {
      xAxis: [],
      values: [],
    },
    query: {},
  },
  queryEditor: DataVisualizationQueryEditor,
  translations: {
    "en-US": {
      key: "2D Density",
      defaultName: "New 2D Density Plot",
    },
  },
};
