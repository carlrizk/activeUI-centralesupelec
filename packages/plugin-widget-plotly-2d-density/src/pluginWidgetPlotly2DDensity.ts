import { MdxSelect, parse, WidgetPlugin } from "@activeviam/activeui-sdk";
import { IconWorld } from "./IconWorld";

import { Plotly2DDensity } from "./Plotly2DDensity";
import { Plotly2DDensityWidgetState } from "./Plotly2DDensity.types";
import { Plotly2DDensityEditor } from "./Plotly2DDensityEditor";

const widgetKey = "2d-density";

export const pluginWidgetPlotly2DDensity: WidgetPlugin<Plotly2DDensityWidgetState> =
  {
    Component: Plotly2DDensity,
    contentEditor: Plotly2DDensityEditor,
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
          CELL PROPERTIES VALUE
      `),
      },
    },
    key: widgetKey,
    translations: {
      "en-US": {
        key: "2D Density",
        defaultName: "New 2D Density Plot",
        searchMeasures: "Search Measures",
      },
    },
  };
