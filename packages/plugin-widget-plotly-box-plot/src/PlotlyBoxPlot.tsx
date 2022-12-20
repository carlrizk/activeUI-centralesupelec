import { WidgetPluginProps } from "@activeviam/activeui-sdk";
import useComponentSize from "@rehooks/component-size";
import React, { FC, useRef } from "react";
import Plot from "react-plotly.js";

export const PlotlyBoxPlot: FC<WidgetPluginProps> = (props) => {
  const container = useRef<HTMLDivElement>(null);
  const { height, width } = useComponentSize(container);

  const x = [];
  const y0 = [];
  const y1 = [];
  const y2 = [];

  for (let i = 0; i < 50; i++) {
    if (i < 25) {
      x[i] = "Day 1";
    } else {
      x[i] = "Day 2";
    }

    y0[i] = Math.random() * 1.5;
    y1[i] = Math.random() * 3 + 1;
    y2[i] = Math.random() * 2 + -1;
  }

  return (
    <div
      ref={container}
      style={{
        ...props.style,
        height: "100%",
      }}
    >
      <Plot
        data={[
          {
            x,
            y: y0,
            type: "box",
            name: "Film 1",
            marker: { color: "#3D9970" },
          },
          {
            x,
            y: y1,
            type: "box",
            name: "Film 2",
            marker: { color: "#FF4136" },
          },
          {
            x,
            y: y2,
            type: "box",
            name: "Film 3",
            marker: { color: "#FF851B" },
          },
        ]}
        layout={{
          showlegend: false,
          height,
          width,
          boxmode: "group",
        }}
      />
    </div>
  );
};
