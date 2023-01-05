import { MdxSelect, parse, WidgetPlugin } from "@activeviam/activeui-sdk";
import { IconWorld } from "./IconWorld";
import { PlotlyFunnel } from "./PlotlyFunnel";
import { PlotlyFunnelEditor } from "./PlotlyFunnelEditor";
import { PlotlyFunnelWidgetState } from "./PlotlyFunnel.types";

const widgetKey = "funnel-plot";

export const pluginWidgetPlotlyFunnel: WidgetPlugin<PlotlyFunnelWidgetState> = {
  Component: PlotlyFunnel,
  contentEditor: PlotlyFunnelEditor,
  Icon: IconWorld,
  initialState: {
    widgetKey,
    query: {
      mdx: parse<MdxSelect>(`SELECT
  NON EMPTY Hierarchize(
    Descendants(
      {
        [Underlyings].[Products]
      },
      1,
      SELF_BEFORE_AFTER
    )
  ) ON ROWS,
  NON EMPTY {
  } ON COLUMNS
  FROM [EquityDerivativesCube]
  CELL PROPERTIES VALUE
  `),
    },
  },
  key: widgetKey,
  translations: {
    "en-US": {
      key: "Funnel Plot",
      defaultName: "New Funnel Plot",
      searchMeasures: "Search Measures",
    },
  },
};
