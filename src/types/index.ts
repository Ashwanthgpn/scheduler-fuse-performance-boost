
export type Algorithm = 'binpacking' | 'drf' | 'fuse';

export interface MetricData {
  name: string;
  binpacking: number;
  drf: number;
  fuse: number;
}

export interface ResourceUtilization {
  cpu: MetricData[];
  memory: MetricData[];
  storage: MetricData[];
}

export interface TimeMetric {
  name: string;
  binpacking: number;
  drf: number;
  fuse: number;
}

export interface PerformanceComparison {
  resourceUtilization: ResourceUtilization;
  schedulingTime: TimeMetric[];
  makespan: TimeMetric[];
  energyConsumption: MetricData[];
}
