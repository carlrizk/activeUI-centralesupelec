import React, { FC } from "react";
import {
  EditorProps,
  Tree,
  useDataModel,
  Measure,
  getMeasures,
  MdxFunction,
} from "@activeviam/activeui-sdk";
import { createMeasureCompoundIdentifier } from "@activeviam/mdx";
import { cloneDeep } from "lodash";
import { useIntl } from "react-intl";
import { PlotlyFunnelWidgetState } from "./PlotlyFunnel.types";

export const PlotlyFunnelEditor: FC<EditorProps<PlotlyFunnelWidgetState>> = (
  props
) => {
  const { formatMessage } = useIntl();
  const dataModel = useDataModel("Ranch 6.0");
  const { mdx } = props.widgetState.query;
  const measuresNames = getMeasures(mdx).map((measure) => measure.measureName);

  const cube = dataModel.catalogs[0].cubes[0];
  const measures = (cube != null ? cube.measures : []).map((measure) => ({
    ...measure,
    isDisabled: measuresNames.includes(measure.name),
  }));

  const handleMeasureClicked = (
    measure: Measure & { isDisabled: boolean }
  ): void => {
    if (cube == null) {
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
        id: "aui.plugins.widget.funnel-plot.searchMeasures",
      })}
      value={measures}
    />
  );
};
