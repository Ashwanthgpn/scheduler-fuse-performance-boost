
export type ScenarioType = 'mixed-workload' | 'high-density' | 'memory-intensive' | 'cpu-intensive' | 'burst-load';

export interface SimulationScenario {
  id: ScenarioType;
  name: string;
  description: string;
  containerCount: number;
  resourceDemand: {
    cpu: 'low' | 'medium' | 'high';
    memory: 'low' | 'medium' | 'high';
    storage: 'low' | 'medium' | 'high';
  };
  simulationTime: number; // in seconds
}

export const scenarios: SimulationScenario[] = [
  {
    id: 'mixed-workload',
    name: 'Mixed Workload',
    description: 'A balanced mix of different container types with varied resource requirements.',
    containerCount: 120,
    resourceDemand: {
      cpu: 'medium',
      memory: 'medium',
      storage: 'medium'
    },
    simulationTime: 60
  },
  {
    id: 'high-density',
    name: 'High-Density Deployment',
    description: 'Large number of small containers to test scheduling efficiency at scale.',
    containerCount: 500,
    resourceDemand: {
      cpu: 'low',
      memory: 'low',
      storage: 'low'
    },
    simulationTime: 180
  },
  {
    id: 'memory-intensive',
    name: 'Memory-Intensive Applications',
    description: 'Containers with high memory demands like databases and caches.',
    containerCount: 75,
    resourceDemand: {
      cpu: 'medium',
      memory: 'high',
      storage: 'medium'
    },
    simulationTime: 90
  },
  {
    id: 'cpu-intensive',
    name: 'CPU-Intensive Workload',
    description: 'Computational heavy containers like batch processing and analytics.',
    containerCount: 85,
    resourceDemand: {
      cpu: 'high',
      memory: 'medium',
      storage: 'low'
    },
    simulationTime: 120
  },
  {
    id: 'burst-load',
    name: 'Burst Loading',
    description: 'Sudden spike in container deployment requests to test scheduler responsiveness.',
    containerCount: 300,
    resourceDemand: {
      cpu: 'high',
      memory: 'high',
      storage: 'medium'
    },
    simulationTime: 45
  }
];

export interface SimulationResult {
  scenario: ScenarioType;
  binpacking: {
    schedulingSuccessRate: number;
    averageSchedulingTime: number;
    resourceUtilization: number;
    energyEfficiency: number;
    failedContainers: number;
  };
  drf: {
    schedulingSuccessRate: number;
    averageSchedulingTime: number;
    resourceUtilization: number;
    energyEfficiency: number;
    failedContainers: number;
  };
  fuse: {
    schedulingSuccessRate: number;
    averageSchedulingTime: number;
    resourceUtilization: number;
    energyEfficiency: number;
    failedContainers: number;
  };
}

// Simulated results for each scenario
export const simulationResults: Record<ScenarioType, SimulationResult> = {
  'mixed-workload': {
    scenario: 'mixed-workload',
    binpacking: {
      schedulingSuccessRate: 88,
      averageSchedulingTime: 32,
      resourceUtilization: 76,
      energyEfficiency: 72,
      failedContainers: 14
    },
    drf: {
      schedulingSuccessRate: 86,
      averageSchedulingTime: 37,
      resourceUtilization: 72,
      energyEfficiency: 68,
      failedContainers: 17
    },
    fuse: {
      schedulingSuccessRate: 96,
      averageSchedulingTime: 18,
      resourceUtilization: 89,
      energyEfficiency: 87,
      failedContainers: 5
    }
  },
  'high-density': {
    scenario: 'high-density',
    binpacking: {
      schedulingSuccessRate: 76,
      averageSchedulingTime: 65,
      resourceUtilization: 82,
      energyEfficiency: 70,
      failedContainers: 120
    },
    drf: {
      schedulingSuccessRate: 72,
      averageSchedulingTime: 72,
      resourceUtilization: 76,
      energyEfficiency: 65,
      failedContainers: 140
    },
    fuse: {
      schedulingSuccessRate: 94,
      averageSchedulingTime: 35,
      resourceUtilization: 91,
      energyEfficiency: 88,
      failedContainers: 30
    }
  },
  'memory-intensive': {
    scenario: 'memory-intensive',
    binpacking: {
      schedulingSuccessRate: 82,
      averageSchedulingTime: 28,
      resourceUtilization: 78,
      energyEfficiency: 74,
      failedContainers: 14
    },
    drf: {
      schedulingSuccessRate: 88,
      averageSchedulingTime: 24,
      resourceUtilization: 81,
      energyEfficiency: 76,
      failedContainers: 9
    },
    fuse: {
      schedulingSuccessRate: 95,
      averageSchedulingTime: 21,
      resourceUtilization: 94,
      energyEfficiency: 89,
      failedContainers: 4
    }
  },
  'cpu-intensive': {
    scenario: 'cpu-intensive',
    binpacking: {
      schedulingSuccessRate: 86,
      averageSchedulingTime: 34,
      resourceUtilization: 85,
      energyEfficiency: 68,
      failedContainers: 12
    },
    drf: {
      schedulingSuccessRate: 80,
      averageSchedulingTime: 38,
      resourceUtilization: 79,
      energyEfficiency: 65,
      failedContainers: 17
    },
    fuse: {
      schedulingSuccessRate: 97,
      averageSchedulingTime: 22,
      resourceUtilization: 92,
      energyEfficiency: 84,
      failedContainers: 3
    }
  },
  'burst-load': {
    scenario: 'burst-load',
    binpacking: {
      schedulingSuccessRate: 68,
      averageSchedulingTime: 78,
      resourceUtilization: 72,
      energyEfficiency: 64,
      failedContainers: 96
    },
    drf: {
      schedulingSuccessRate: 62,
      averageSchedulingTime: 85,
      resourceUtilization: 68,
      energyEfficiency: 60,
      failedContainers: 114
    },
    fuse: {
      schedulingSuccessRate: 92,
      averageSchedulingTime: 41,
      resourceUtilization: 88,
      energyEfficiency: 82,
      failedContainers: 24
    }
  }
};
