import {
  CellSetSelection,
  DataVisualizationContentEditor,
  DataVisualizationQueryEditor,
  FiltersEditor,
  PlotlyWidgetState,
  WidgetPlugin,
} from "@activeviam/activeui-sdk";
import { IconWorld } from "./IconWorld";

import { Plotly2DDensity } from "./Plotly2DDensity";

const widgetKey = "2d-density";

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
  Component: Plotly2DDensity,
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
      key: "2D Density",
      defaultName: "New 2D Density Plot",
      searchMeasures: "Search Measures",
    },
  },
};
