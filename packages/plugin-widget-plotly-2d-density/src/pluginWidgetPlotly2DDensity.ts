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

// TODO Change max number of fields accordingly
export const pluginWidgetPlotly2DDensity: WidgetPlugin<
  PlotlyWidgetState,
  CellSetSelection
> = {
  key: widgetKey,
  category: "dataVisualization",
  attributes: {
    horizontalSubplots: {
      role: "subplot",
      maxNumberOfFields: 1,
    },
    horizontalMeasures: {
      role: "primaryNumeric",
      maxNumberOfFields: 1,
    },
    verticalSubplots: {
      role: "subplot",
      maxNumberOfFields: 1,
    },
    verticalMeasures: {
      role: "primaryNumeric",
      maxNumberOfFields: 1,
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
      horizontalSubplots: [],
      horizontalMeasures: [],
      verticalSubplots: [],
      verticalMeasures: [],
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
