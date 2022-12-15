import { WidgetPlugin } from "@activeviam/activeui-sdk";
import { IconWorld } from "./IconWorld";

import { Plotly2DDensity } from "./Plotly2DDensity";

const widgetKey = "2d-density";

export const pluginWidgetPlotly2DDensity: WidgetPlugin = {
  Component: Plotly2DDensity,
  Icon: IconWorld,
  initialState: {
    widgetKey,
  },
  key: widgetKey,
  translations: {
    "en-US": {
      key: "2D Density",
      defaultName: "New 2D Density Plot",
    },
  },
};
