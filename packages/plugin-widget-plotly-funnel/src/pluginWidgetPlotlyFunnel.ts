import { WidgetPlugin } from "@activeviam/activeui-sdk";
import { IconWorld } from "./IconWorld";

import { PlotlyFunnel } from "./PlotlyFunnel";

const widgetKey = "funnel-plot";

export const pluginWidgetPlotlyFunnel: WidgetPlugin = {
  Component: PlotlyFunnel,
  Icon: IconWorld,
  initialState: {
    widgetKey,
  },
  key: widgetKey,
  translations: {
    "en-US": {
      key: "Funnel Plot",
      defaultName: "New Funnel Plot",
    },
  },
};
