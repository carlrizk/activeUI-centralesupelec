import {
  addMeasure,
  EditorProps,
  getMeasures,
  Measure,
  Tree,
  useDataModel,
} from "@activeviam/activeui-sdk";
import React, { FC } from "react";

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

    const newMdx = addMeasure(mdx, {
      cube,
      measureName: measure.name,
    });

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
