import { AWidgetState, MdxSelect, Query } from "@activeviam/activeui-sdk";

export interface PlotlyBoxPlotWidgetState extends AWidgetState {
  query: Query<MdxSelect>;
}
