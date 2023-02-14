import PlotlyCustom from "plotly.js/lib/core.js";

// @ts-expect-error
import histogram from "plotly.js/lib/histogram.js";
// @ts-expect-error
import histogram2dcontour from "plotly.js/lib/histogram2dcontour.js";
// @ts-expect-error
import box from "plotly.js/lib/box.js";

// @ts-expect-error
PlotlyCustom.register([
  // traces
  histogram,
  histogram2dcontour,
  box,
  // transforms
  // components
]);

export default PlotlyCustom;
