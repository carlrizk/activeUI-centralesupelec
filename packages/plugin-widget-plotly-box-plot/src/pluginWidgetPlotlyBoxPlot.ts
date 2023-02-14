import {
  CellSetSelection,
  DataVisualizationContentEditor,
  DataVisualizationQueryEditor,
  FiltersEditor,
  PlotlyWidgetState,
  WidgetPlugin,
} from "@activeviam/activeui-sdk";
import { IconWorld } from "./IconWorld.js";
import { PlotlyBoxPlot } from "./PlotlyBoxPlot.js";

const widgetKey = "plotly-box-plot";

// Category and mapping
export const pluginWidgetPlotlyBoxPlot: WidgetPlugin<
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
    },
  },
  Component: PlotlyBoxPlot,
  contentEditor: DataVisualizationContentEditor,
  contextMenuItems: [],
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
  menuItems: [],
  queryEditor: DataVisualizationQueryEditor,
  titleBarButtons: [],
  translations: {
    "en-US": {
      key: "Box Plot",
      defaultName: "New Box Plot",
    },
  },
};
