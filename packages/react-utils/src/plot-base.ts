import createPlotlyComponent from "react-plotly.js/factory";

// @ts-expect-error
import Plotly from "plotly.js/dist/plotly.min";
import { PlotParams } from "react-plotly.js";

export const PlotBase: React.ComponentType<PlotParams> =
  createPlotlyComponent(Plotly);
