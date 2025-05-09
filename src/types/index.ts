
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

// New simulation-related types
export type ScenarioType = 'mixed-workload' | 'high-density' | 'memory-intensive' | 'cpu-intensive' | 'burst-load';

export interface Scenario {
  id: ScenarioType;
  name: string;
  description: string;
  containerCount: number;
  resourceDemand: {
    cpu: 'low' | 'medium' | 'high';
    memory: 'low' | 'medium' | 'high';
    storage: 'low' | 'medium' | 'high';
  };
  simulationTime: number;
}

export interface SimulationMetrics {
  schedulingSuccessRate: number;
  averageSchedulingTime: number;
  resourceUtilization: number;
  energyEfficiency: number;
  failedContainers: number;
}

export interface SimulationResult {
  scenario: ScenarioType;
  binpacking: SimulationMetrics;
  drf: SimulationMetrics;
  fuse: SimulationMetrics;
}
