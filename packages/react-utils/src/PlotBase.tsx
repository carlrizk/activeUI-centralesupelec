import Plot, { PlotParams } from "react-plotly.js";

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
  // @ts-expect-error
  return <Plot.default {...innerProps} />;
};
