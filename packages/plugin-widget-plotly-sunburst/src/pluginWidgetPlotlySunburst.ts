import {
  CellSetSelection,
  DataVisualizationContentEditor,
  DataVisualizationQueryEditor,
  FiltersEditor,
  PlotlyWidgetState,
  WidgetPlugin,
} from "@activeviam/activeui-sdk";
import { IconWorld } from "./IconWorld.js";

import { PlotlySunburst } from "./PlotlySunburst.js";

const widgetKey = "plotly-sunburst";

export const pluginWidgetPlotlySunburst: WidgetPlugin<
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
      maxNumberOfFields: 1,
    },
  },
  Component: PlotlySunburst,
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
      key: "Sunburst Chart",
      defaultName: "New Sunburst Chart",
    },
  },
};
