import { AWidgetState, MdxSelect, Query } from "@activeviam/activeui-sdk";

export interface Plotly2DDensityWidgetState extends AWidgetState {
  query: Query<MdxSelect>;
  serverKey: string;
}
