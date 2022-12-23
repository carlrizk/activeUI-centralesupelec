import React, { FC } from "react";
import {
  EditorProps,
  useDataModel,
  Tree,
  Measure,
  getMeasures,
  MdxFunction,
} from "@activeviam/activeui-sdk";
import { createMeasureCompoundIdentifier } from "@activeviam/mdx";
import { cloneDeep } from "lodash";

import { useIntl } from "react-intl";
import { Plotly2DDensityWidgetState } from "./Plotly2DDensity.types";

export const Plotly2DDensityEditor: FC<
  EditorProps<Plotly2DDensityWidgetState>
> = (props) => {
  const { formatMessage } = useIntl();

  const { mdx } = props.widgetState.query;
  const measuresNames = getMeasures(mdx).map((measure) => measure.measureName);

  const dataModel = useDataModel("Ranch 6.0");
  const cube = dataModel.catalogs[0].cubes[0];
  const measures = (cube != null ? cube.measures : []).map((measure) => ({
    ...measure,
    isDisabled:
      measuresNames.includes(measure.name) || measuresNames.length === 2,
  }));

  const handleMeasureClicked = (
    measure: Measure & { isDisabled: boolean }
  ): void => {
    if (cube == null) {
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
      searchPlaceholder={formatMessage({
        id: "aui.plugins.widget.2d-density.searchMeasures",
      })}
      onClick={handleMeasureClicked}
      value={measures}
    />
  );
};
