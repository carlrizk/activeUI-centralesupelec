import { PlotBase } from "@activeui-cs/react-utils";
import { WidgetPluginProps } from "@activeviam/activeui-sdk";
import useComponentSize from "@rehooks/component-size";
import React, { FC, useRef } from "react";

export const PlotlyFunnel: FC<WidgetPluginProps> = (props) => {
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
      <PlotBase
        data={[
          {
            type: "funnel",
            y: [
              "Website visit",
              "Downloads",
              "Potential customers",
              "Invoice sent",
              "Closed delas",
            ],
            x: [13873, 10533, 5443, 2703, 908],
          },
        ]}
        layout={{ margin: { l: 150 }, width, height }}
      />
    </div>
  );
};
