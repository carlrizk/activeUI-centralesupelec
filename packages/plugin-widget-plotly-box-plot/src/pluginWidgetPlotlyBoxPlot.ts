import { MdxSelect, parse, WidgetPlugin } from "@activeviam/activeui-sdk";
import { IconWorld } from "./IconWorld";
import { PlotlyBoxPlotWidgetState } from "./PlotlyBoxPlot.types";

import { PlotlyBoxPlot } from "./PlotlyBoxPlot";
import { PlotlyBoxPlotEditor } from "./PlotlyBoxPlotEditor";

const widgetKey = "box-plot";

export const pluginWidgetPlotlyBoxPlot: WidgetPlugin<PlotlyBoxPlotWidgetState> =
  {
    Component: PlotlyBoxPlot,
    contentEditor: PlotlyBoxPlotEditor,
    Icon: IconWorld,
    initialState: {
      widgetKey,
      query: {
        mdx: parse<MdxSelect>(`
        SELECT
          NON EMPTY
            Descendants(
              {
                [Trades].[Trades]
              },
              1,
              SELF_AND_BEFORE
            ) ON ROWS,
          NON EMPTY {
          } ON COLUMNS
          FROM [EquityDerivativesCube]
          CELL PROPERTIES VALUE`),
      },
    },
    key: widgetKey,
    translations: {
      "en-US": {
        key: "Box Plot",
        defaultName: "New Box Plot",
        searchMeasures: "Search measures",
      },
    },
  };
