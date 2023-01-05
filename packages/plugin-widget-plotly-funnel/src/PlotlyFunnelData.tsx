export interface PlotlyFunnelData {
  names: string[];
  measures: PlotlyFunnelDataMeasure[];
}

export interface PlotlyFunnelDataMeasure {
  name: string;
  values: number[];
}
