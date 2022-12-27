import React, { FC } from "react";
import {
  EditorProps,
  Tree,
  useDataModel,
  Measure,
  getMeasures,
  MdxFunction,
} from "@activeviam/activeui-sdk";
import { useIntl } from "react-intl";
import { PlotlyBoxPlotWidgetState } from "./PlotlyBoxPlot.types";

import { cloneDeep } from "lodash";
import { createMeasureCompoundIdentifier } from "@activeviam/mdx";

export const PlotlyBoxPlotEditor: FC<EditorProps<PlotlyBoxPlotWidgetState>> = (
  props
) => {
  const { formatMessage } = useIntl();

  const { mdx } = props.widgetState.query;
  const measuresNames = getMeasures(mdx).map((measure) => measure.measureName);

  const dataModel = useDataModel("Ranch 6.0");
  const cube = dataModel.catalogs[0].cubes[0];

  const measures = cube.measures.map((measure) => ({
    ...measure,
    isDisabled: measuresNames.includes(measure.name),
  }));

  const handleMeasureClicked = (
    measure: Measure & { isDisabled: boolean }
  ): void => {
    const newMdx = cloneDeep(mdx);
    const expression = newMdx.axes[1].expression as MdxFunction;
    expression.arguments.push(createMeasureCompoundIdentifier(measure.name));

    props.onWidgetChange({
      ...props.widgetState,
      query: {
        mdx: newMdx,
      },
    });
  };

  return (
    <Tree
      isSearchVisible={true}
      onClick={handleMeasureClicked}
      searchPlaceholder={formatMessage({
        id: "aui.plugins.widget.box-plot.searchMeasures",
      })}
      value={measures}
    />
  );
};
