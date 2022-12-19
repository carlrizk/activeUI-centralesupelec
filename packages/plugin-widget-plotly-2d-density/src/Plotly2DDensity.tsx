import { WidgetPluginProps } from "@activeviam/activeui-sdk";
import useComponentSize from "@rehooks/component-size";
import React, { FC, useRef } from "react";
import Plot from "react-plotly.js";

function normal(): number {
  let x = 0;
  let y = 0;
  let rds;
  do {
    x = Math.random() * 2 - 1;
    y = Math.random() * 2 - 1;
    rds = x * x + y * y;
  } while (rds === 0 || rds > 1);
  const c = Math.sqrt((-2 * Math.log(rds)) / rds); // Box-Muller transform
  return x * c; // throw away extra sample y * c
}

export const Plotly2DDensity: FC<WidgetPluginProps> = (props) => {
  const N = 200;
  const a = -1;
  const b = 1.2;
  const step = (b - a) / (N - 1);

  const x: number[] = new Array<number>(N);
  const y: number[] = new Array<number>(N);
  const t: number[] = new Array<number>(N);

  for (let i = 0; i < N; i++) {
    t[i] = a + step * i;
    x[i] = Math.pow(t[i], 3) + 0.3 * normal();
    y[i] = Math.pow(t[i], 6) + 0.3 * normal();
  }

  const container = useRef<HTMLDivElement>(null);
  const { height, width } = useComponentSize(container);
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
            y,
            mode: "markers",
            name: "points",
            marker: {
              color: "rgb(102,0,0)",
              size: 2,
              opacity: 0.4,
            },
            type: "scatter",
          },
          {
            x,
            y,
            name: "density",
            ncontours: 20,
            colorscale: "Hot",
            reversescale: true,
            showscale: false,
            type: "histogram2dcontour",
          },
          {
            x,
            name: "x density",
            marker: { color: "rgb(102,0,0)" },
            yaxis: "y2",
            type: "histogram",
          },
          {
            y,
            name: "y density",
            marker: { color: "rgb(102,0,0)" },
            xaxis: "x2",
            type: "histogram",
          },
        ]}
        layout={{
          showlegend: false,
          width,
          height,
          margin: { t: 50 },
          hovermode: "closest",
          bargap: 0,
          xaxis: {
            domain: [0, 0.85],
            showgrid: false,
            zeroline: false,
          },
          yaxis: {
            domain: [0, 0.85],
            showgrid: false,
            zeroline: false,
          },
          xaxis2: {
            domain: [0.85, 1],
            showgrid: false,
            zeroline: false,
          },
          yaxis2: {
            domain: [0.85, 1],
            showgrid: false,
            zeroline: false,
          },
        }}
      />
    </div>
  );
};
