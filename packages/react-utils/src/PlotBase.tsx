import { PlotParams } from "react-plotly.js";
import createPlotlyComponent from "react-plotly.js/factory.js";
import PlotlyCustom from "./plotly/index.js";

const CustomPlot = createPlotlyComponent.default(PlotlyCustom);

/**
 * Returns a minified plot component without the plotly logo and the reset scale button
 */
export const PlotBase = (props: PlotParams): JSX.Element => {
  const innerProps = { ...props };
  if (innerProps.config === undefined) {
    innerProps.config = {};
  }
  innerProps.config = {
    ...innerProps.config,
    displaylogo: false,
    modeBarButtonsToRemove: ["resetScale2d"],
  };
  return <CustomPlot {...innerProps} />;
};
