import React, { FC } from "react";
import {
  EditorProps,
  Tree,
  useDataModel,
  Measure,
  getMeasures,
  addMeasure,
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
  const cube = dataModel ? dataModel.catalogs[0].cubes[0] : null;

  const measures = (cube ? cube.measures : []).map((measure) => ({
    ...measure,
    isDisabled: measuresNames.includes(measure.name),
  }));

  const handleMeasureClicked = (measure: Measure & { isDisabled: boolean }) => {
    if (!cube) {
      // This should normally not happen.
      // But if it does, then abort mission.
      return;
    }

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
