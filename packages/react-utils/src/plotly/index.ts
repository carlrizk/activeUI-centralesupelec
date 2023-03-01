import PlotlyCustom from "plotly.js/lib/core.js";

// @ts-expect-error
import histogram from "plotly.js/lib/histogram.js";
// @ts-expect-error
import histogram2dcontour from "plotly.js/lib/histogram2dcontour.js";
// @ts-expect-error
import box from "plotly.js/lib/box.js";
// @ts-expect-error
import sunburst from "plotly.js/lib/sunburst.js";
// @ts-expect-error
import aggregate from "plotly.js/lib/aggregate.js";
// @ts-expect-error
import filter from "plotly.js/lib/filter.js";
// @ts-expect-error
import groupby from "plotly.js/lib/groupby.js";
// @ts-expect-error
import sort from "plotly.js/lib/sort.js";
// @ts-expect-error
import calendars from "plotly.js/lib/calendars.js";

// @ts-expect-error
PlotlyCustom.register([
  // traces
  histogram,
  histogram2dcontour,
  box,
  sunburst,
  // transforms
  aggregate,
  filter,
  groupby,
  sort,
  // components
  calendars,
]);

export default PlotlyCustom;
