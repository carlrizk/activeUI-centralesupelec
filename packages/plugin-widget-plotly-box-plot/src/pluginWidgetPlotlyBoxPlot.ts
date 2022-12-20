import { WidgetPlugin } from "@activeviam/activeui-sdk";
import { IconWorld } from "./IconWorld";

import { PlotlyBoxPlot } from "./PlotlyBoxPlot";

const widgetKey = "box-plot";

export const pluginWidgetPlotlyBoxPlot: WidgetPlugin = {
  Component: PlotlyBoxPlot,
  Icon: IconWorld,
  initialState: {
    widgetKey,
  },
  key: widgetKey,
  translations: {
    "en-US": {
      key: "Box Plot",
      defaultName: "New Box Plot",
    },
  },
};
