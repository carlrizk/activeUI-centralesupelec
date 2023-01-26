import {
  WidgetPlugin,
  CellSetSelection,
  DataVisualizationContentEditor,
  DataVisualizationQueryEditor,
  FiltersEditor,
  PlotlyWidgetState,
} from "@activeviam/activeui-sdk";
import { IconWorld } from "./IconWorld";
import { PlotlyBoxPlot } from "./PlotlyBoxPlot";

const widgetKey = "box-plot";

//Category and mapping
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
      //maxNumberOfFields: 2,
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
      xaxis: [],
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
      searchMeasures: "Search measures",
    },
  },
};
