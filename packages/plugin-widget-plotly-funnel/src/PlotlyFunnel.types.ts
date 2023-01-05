import { AWidgetState, MdxSelect, Query } from "@activeviam/activeui-sdk";

export interface PlotlyFunnelWidgetState extends AWidgetState {
  query: Query<MdxSelect>;
}
