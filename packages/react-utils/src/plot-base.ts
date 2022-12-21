import createPlotlyComponent from "react-plotly.js/factory";

// @ts-expect-error
import Plotly from "plotly.js/dist/plotly.min";

export const PlotBase = createPlotlyComponent(Plotly);
