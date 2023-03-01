import { pluginWidgetPlotly2DDensity } from "@activeui-cs/plugin-widget-plotly-2d-density";
import { pluginWidgetPlotlyBoxPlot } from "@activeui-cs/plugin-widget-plotly-box-plot";
import { pluginWidgetPlotlySunburst } from "@activeui-cs/plugin-widget-plotly-sunburst";
import {
  CellPlugin,
  CellStylePlugin,
  MenuItemPlugin,
  pluginCellPivotTable,
  pluginCellStyleDrillthroughTable,
  pluginCellStylePivotTable,
  pluginCellStyleTable,
  pluginCellTable,
  pluginCellTreeTable,
  pluginMenuItemCopyQuery,
  pluginMenuItemDuplicateWidget,
  pluginMenuItemExportDrillthroughToCsv,
  pluginMenuItemExportToCsv,
  pluginMenuItemFilterOnEverythingButSelection,
  pluginMenuItemFilterOnSelection,
  pluginMenuItemFullScreen,
  pluginMenuItemHideColumns,
  pluginMenuItemOpenDrillthrough,
  pluginMenuItemRefreshQuery,
  pluginMenuItemRemoveSort,
  pluginMenuItemRemoveWidget,
  pluginMenuItemSaveWidget,
  pluginMenuItemSaveWidgetAs,
  pluginMenuItemShowHideTotals,
  pluginMenuItemSortChartAscendingly,
  pluginMenuItemSortChartDescendingly,
  pluginMenuItemSortDrillthroughTableAscendingly,
  pluginMenuItemSortDrillthroughTableDescendingly,
  pluginMenuItemSortPivotTableAscendingly,
  pluginMenuItemSortPivotTableDescendingly,
  pluginMenuItemSortTableAscendingly,
  pluginMenuItemSortTableDescendingly,
  pluginMenuItemSwitchQuickFilterMode,
  pluginMenuItemSynchronizeSavedWidget,
  PluginRegistry,
  pluginTitleBarButtonFullScreen,
  pluginTitleBarButtonRemoveWidget,
  pluginTitleBarButtonToggleQueryMode,
  pluginWidgetDrillthroughTable,
  pluginWidgetKpi,
  pluginWidgetPivotTable,
  pluginWidgetPlotly100StackedAreaChart,
  pluginWidgetPlotly100StackedBarChart,
  pluginWidgetPlotly100StackedColumnChart,
  pluginWidgetPlotlyAreaChart,
  pluginWidgetPlotlyBulletChart,
  pluginWidgetPlotlyClusteredBarChart,
  pluginWidgetPlotlyClusteredColumnChart,
  pluginWidgetPlotlyColumnsAndLinesChart,
  pluginWidgetPlotlyDonutChart,
  pluginWidgetPlotlyGaugeChart,
  pluginWidgetPlotlyLineChart,
  pluginWidgetPlotlyPieChart,
  pluginWidgetPlotlyRadarChart,
  pluginWidgetPlotlyScatterPlot,
  pluginWidgetPlotlyStackedAreaChart,
  pluginWidgetPlotlyStackedBarChart,
  pluginWidgetPlotlyStackedColumnChart,
  pluginWidgetPlotlyTreeMap,
  pluginWidgetPlotlyWaterfallChart,
  pluginWidgetTable,
  pluginWidgetTreeTable,
  TitleBarButtonPlugin,
  WidgetPlugin,
} from "@activeviam/activeui-sdk";
import _keyBy from "lodash/keyBy";

const cellPlugins: Array<CellPlugin<any>> = [
  pluginCellTable,
  pluginCellPivotTable,
  pluginCellTreeTable,
];

const cellStylePlugins: Array<CellStylePlugin<any>> = [
  pluginCellStyleTable,
  pluginCellStylePivotTable,
  pluginCellStyleDrillthroughTable,
];

const menuItemPlugins: Array<MenuItemPlugin<any, any>> = [
  pluginMenuItemDuplicateWidget,
  pluginMenuItemFullScreen,
  pluginMenuItemHideColumns,
  pluginMenuItemFilterOnEverythingButSelection,
  pluginMenuItemFilterOnSelection,
  pluginMenuItemRemoveWidget,
  pluginMenuItemCopyQuery,
  pluginMenuItemRefreshQuery,
  pluginMenuItemExportToCsv,
  pluginMenuItemExportDrillthroughToCsv,
  pluginMenuItemShowHideTotals,
  pluginMenuItemOpenDrillthrough,
  pluginMenuItemRemoveSort,
  pluginMenuItemSortChartAscendingly,
  pluginMenuItemSortChartDescendingly,
  pluginMenuItemSortDrillthroughTableAscendingly,
  pluginMenuItemSortDrillthroughTableDescendingly,
  pluginMenuItemSortPivotTableAscendingly,
  pluginMenuItemSortPivotTableDescendingly,
  pluginMenuItemSortTableAscendingly,
  pluginMenuItemSortTableDescendingly,
  pluginMenuItemSwitchQuickFilterMode,
  pluginMenuItemSynchronizeSavedWidget,
  pluginMenuItemSaveWidget,
  pluginMenuItemSaveWidgetAs,
];

const titleBarButtonPlugins: Array<TitleBarButtonPlugin<any>> = [
  pluginTitleBarButtonFullScreen,
  pluginTitleBarButtonRemoveWidget,
  pluginTitleBarButtonToggleQueryMode,
];

// Order matters: it controls the order of the icons in the widget list.
const widgetPlugins: Array<WidgetPlugin<any, any>> = [
  pluginWidgetPlotlySunburst,
  pluginWidgetPlotly2DDensity,
  pluginWidgetPlotlyBoxPlot,
  pluginWidgetPivotTable,
  pluginWidgetTreeTable,
  pluginWidgetTable,
  pluginWidgetKpi,
  pluginWidgetPlotlyLineChart,
  pluginWidgetPlotlyAreaChart,
  pluginWidgetPlotlyStackedAreaChart,
  pluginWidgetPlotly100StackedAreaChart,
  pluginWidgetPlotlyStackedColumnChart,
  pluginWidgetPlotlyClusteredColumnChart,
  pluginWidgetPlotly100StackedColumnChart,
  pluginWidgetPlotlyColumnsAndLinesChart,
  pluginWidgetPlotlyStackedBarChart,
  pluginWidgetPlotlyClusteredBarChart,
  pluginWidgetPlotly100StackedBarChart,
  pluginWidgetPlotlyPieChart,
  pluginWidgetPlotlyDonutChart,
  pluginWidgetPlotlyScatterPlot,
  pluginWidgetPlotlyRadarChart,
  pluginWidgetPlotlyWaterfallChart,
  pluginWidgetPlotlyBulletChart,
  pluginWidgetPlotlyGaugeChart,
  pluginWidgetPlotlyTreeMap,
  pluginWidgetDrillthroughTable,
];

const plotlyWidgetPlugins = widgetPlugins.filter(({ key }) =>
  key.startsWith("plotly")
);

plotlyWidgetPlugins.forEach((widgetPlugin) => {
  widgetPlugin.menuItems = [
    pluginMenuItemRemoveWidget.key,
    pluginMenuItemDuplicateWidget.key,
    pluginMenuItemSynchronizeSavedWidget.key,
    pluginMenuItemSaveWidget.key,
    pluginMenuItemSaveWidgetAs.key,
  ];
  widgetPlugin.titleBarButtons = [
    pluginTitleBarButtonFullScreen.key,
    pluginTitleBarButtonToggleQueryMode.key,
  ];
  widgetPlugin.contextMenuItems = [
    pluginMenuItemFilterOnEverythingButSelection.key,
    pluginMenuItemFilterOnSelection.key,
    pluginMenuItemOpenDrillthrough.key,
    pluginMenuItemSortChartAscendingly.key,
    pluginMenuItemSortChartDescendingly.key,
    pluginMenuItemRemoveSort.key,
    pluginMenuItemCopyQuery.key,
    pluginMenuItemRefreshQuery.key,
    pluginMenuItemExportToCsv.key,
  ];
});

pluginWidgetTable.cell = pluginCellTable.key;
pluginWidgetTable.cellStyle = pluginCellStyleTable.key;

pluginWidgetPivotTable.cell = pluginCellPivotTable.key;
pluginWidgetPivotTable.cellStyle = pluginCellStylePivotTable.key;

pluginWidgetTreeTable.cell = pluginCellTreeTable.key;
pluginWidgetTreeTable.cellStyle = pluginCellStylePivotTable.key;

[pluginWidgetPivotTable, pluginWidgetTreeTable, pluginWidgetTable].forEach(
  (tableWidget) => {
    tableWidget.menuItems = [
      pluginMenuItemRemoveWidget.key,
      pluginMenuItemDuplicateWidget.key,
      pluginMenuItemSynchronizeSavedWidget.key,
      pluginMenuItemSaveWidget.key,
      pluginMenuItemSaveWidgetAs.key,
    ];
    tableWidget.titleBarButtons = [
      pluginTitleBarButtonFullScreen.key,
      pluginTitleBarButtonToggleQueryMode.key,
    ];
  }
);

const contextMenuItemsForTables = [
  pluginMenuItemFilterOnEverythingButSelection.key,
  pluginMenuItemFilterOnSelection.key,
  pluginMenuItemOpenDrillthrough.key,
  pluginMenuItemRemoveSort.key,
  pluginMenuItemCopyQuery.key,
  pluginMenuItemShowHideTotals.key,
  pluginMenuItemRefreshQuery.key,
  pluginMenuItemExportToCsv.key,
  pluginMenuItemHideColumns.key,
];

// Pivot Tables and Tree Tables have a non-breaking sort
[pluginWidgetPivotTable, pluginWidgetTreeTable].forEach((tableWidget) => {
  tableWidget.contextMenuItems = [
    pluginMenuItemSortPivotTableAscendingly.key,
    pluginMenuItemSortPivotTableDescendingly.key,
    ...contextMenuItemsForTables,
  ];
});

// Tables have a breaking sort
pluginWidgetTable.contextMenuItems = [
  pluginMenuItemSortTableAscendingly.key,
  pluginMenuItemSortTableDescendingly.key,
  ...contextMenuItemsForTables,
];

pluginWidgetDrillthroughTable.menuItems = [
  pluginMenuItemRemoveWidget.key,
  pluginMenuItemDuplicateWidget.key,
  pluginMenuItemSynchronizeSavedWidget.key,
  pluginMenuItemSaveWidget.key,
  pluginMenuItemSaveWidgetAs.key,
];
pluginWidgetDrillthroughTable.titleBarButtons = [
  pluginTitleBarButtonFullScreen.key,
  pluginTitleBarButtonToggleQueryMode.key,
];
pluginWidgetDrillthroughTable.contextMenuItems = [
  pluginMenuItemSortDrillthroughTableAscendingly.key,
  pluginMenuItemSortDrillthroughTableDescendingly.key,
  pluginMenuItemExportDrillthroughToCsv.key,
];
pluginWidgetDrillthroughTable.cellStyle = pluginCellStyleDrillthroughTable.key;

pluginWidgetKpi.menuItems = [
  pluginMenuItemRemoveWidget.key,
  pluginMenuItemDuplicateWidget.key,
  pluginMenuItemSynchronizeSavedWidget.key,
  pluginMenuItemSaveWidget.key,
  pluginMenuItemSaveWidgetAs.key,
];
pluginWidgetKpi.titleBarButtons = [
  pluginTitleBarButtonFullScreen.key,
  pluginTitleBarButtonToggleQueryMode.key,
];
pluginWidgetKpi.contextMenuItems = [
  pluginMenuItemCopyQuery.key,
  pluginMenuItemRefreshQuery.key,
  pluginMenuItemExportToCsv.key,
  pluginMenuItemShowHideTotals.key,
  pluginMenuItemFilterOnSelection.key,
  pluginMenuItemFilterOnEverythingButSelection.key,
  pluginMenuItemOpenDrillthrough.key,
];

export const plugins: PluginRegistry = {
  cell: _keyBy(cellPlugins, "key"),
  "cell-style": _keyBy(cellStylePlugins, "key"),
  "menu-item": _keyBy(menuItemPlugins, "key"),
  "titlebar-button": _keyBy(titleBarButtonPlugins, "key"),
  widget: _keyBy(widgetPlugins, "key"),
};
