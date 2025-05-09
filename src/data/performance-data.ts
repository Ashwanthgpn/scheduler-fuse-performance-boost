
import { PerformanceComparison } from '@/types';

// Mock data for scheduler performance comparison
export const performanceData: PerformanceComparison = {
  resourceUtilization: {
    cpu: [
      { name: 'Node 1', binpacking: 78, drf: 62, fuse: 91 },
      { name: 'Node 2', binpacking: 82, drf: 59, fuse: 88 },
      { name: 'Node 3', binpacking: 71, drf: 65, fuse: 89 },
      { name: 'Node 4', binpacking: 74, drf: 58, fuse: 93 },
      { name: 'Node 5', binpacking: 79, drf: 63, fuse: 90 }
    ],
    memory: [
      { name: 'Node 1', binpacking: 72, drf: 67, fuse: 89 },
      { name: 'Node 2', binpacking: 76, drf: 63, fuse: 87 },
      { name: 'Node 3', binpacking: 69, drf: 71, fuse: 91 },
      { name: 'Node 4', binpacking: 73, drf: 68, fuse: 88 },
      { name: 'Node 5', binpacking: 75, drf: 65, fuse: 90 }
    ],
    storage: [
      { name: 'Node 1', binpacking: 65, drf: 58, fuse: 82 },
      { name: 'Node 2', binpacking: 69, drf: 62, fuse: 84 },
      { name: 'Node 3', binpacking: 72, drf: 59, fuse: 85 },
      { name: 'Node 4', binpacking: 67, drf: 61, fuse: 83 },
      { name: 'Node 5', binpacking: 70, drf: 60, fuse: 86 }
    ]
  },
  schedulingTime: [
    { name: 'Low load', binpacking: 12, drf: 15, fuse: 8 },
    { name: 'Medium load', binpacking: 25, drf: 28, fuse: 17 },
    { name: 'High load', binpacking: 42, drf: 45, fuse: 24 },
    { name: 'Burst load', binpacking: 68, drf: 72, fuse: 39 }
  ],
  makespan: [
    { name: '10 pods', binpacking: 45, drf: 52, fuse: 33 },
    { name: '50 pods', binpacking: 125, drf: 138, fuse: 94 },
    { name: '100 pods', binpacking: 245, drf: 268, fuse: 186 },
    { name: '500 pods', binpacking: 1200, drf: 1320, fuse: 880 }
  ],
  energyConsumption: [
    { name: 'Idle', binpacking: 120, drf: 125, fuse: 110 },
    { name: 'Low load', binpacking: 250, drf: 260, fuse: 215 },
    { name: 'Medium load', binpacking: 480, drf: 520, fuse: 390 },
    { name: 'High load', binpacking: 780, drf: 850, fuse: 640 },
    { name: 'Peak load', binpacking: 980, drf: 1050, fuse: 820 }
  ]
};

// Algorithm descriptions
export const algorithmDescriptions = {
  binpacking: "Bin packing is a traditional algorithm that aims to minimize the number of nodes used by packing containers as efficiently as possible. It focuses on consolidating workloads to reduce resource fragmentation, but may lead to resource contention.",
  
  drf: "Dominant Resource Fairness (DRF) is an algorithm that ensures fair allocation of multiple resources to different users based on their dominant resource needs. It provides fairness guarantees but may not optimize for overall cluster utilization.",
  
  fuse: "FUSE (Fair Utilization with Scheduling Efficiency) is a hybrid algorithm that combines the efficiency of bin packing with the fairness of DRF. It dynamically adjusts resource allocation based on cluster state and application needs, resulting in better resource utilization, reduced scheduling times, improved makespan, and lower energy consumption. FUSE implements adaptive scheduling decisions by continuously monitoring workloads and cluster health metrics.",
};
