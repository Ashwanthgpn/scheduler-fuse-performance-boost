import { useState } from "react";
import { Algorithm } from "@/types";
import { scenarios, simulationResults, ScenarioType } from "@/data/simulation-scenarios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Cpu, HardDrive, Clock, Container } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface SimulationPanelProps {
  selectedAlgorithms: Algorithm[];
}

const SimulationPanel = ({ selectedAlgorithms }: SimulationPanelProps) => {
  const [activeScenario, setActiveScenario] = useState<ScenarioType>('mixed-workload');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  
  const currentScenario = scenarios.find(s => s.id === activeScenario)!;
  const results = simulationResults[activeScenario];
  
  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationComplete(false);
    
    // Simulate the process with a loading state
    toast({
      title: "Simulation Started",
      description: `Running ${currentScenario.name} scenario with ${currentScenario.containerCount} containers...`,
    });
    
    // Fake the simulation time with a setTimeout
    const timer = setTimeout(() => {
      setIsSimulating(false);
      setSimulationComplete(true);
      toast({
        title: "Simulation Complete",
        description: "All scenarios show FUSE outperforming traditional algorithms.",
        variant: "default",
      });
    }, 2000); // 2 second simulation for demo
    
    return () => clearTimeout(timer);
  };
  
  const formatResultsForChart = (metric: 'schedulingSuccessRate' | 'averageSchedulingTime' | 'resourceUtilization' | 'energyEfficiency' | 'failedContainers') => {
    return [
      {
        name: metric === 'averageSchedulingTime' ? 'Scheduling Time (ms)' : 
              metric === 'failedContainers' ? 'Failed Containers' :
              metric === 'schedulingSuccessRate' ? 'Success Rate (%)' :
              metric === 'resourceUtilization' ? 'Resource Usage (%)' :
              'Energy Efficiency (%)',
        binpacking: results.binpacking[metric],
        drf: results.drf[metric],
        fuse: results.fuse[metric]
      }
    ];
  };
  
  const getBarColor = (algorithm: Algorithm) => {
    switch (algorithm) {
      case 'binpacking':
        return '#ECC94B';
      case 'drf':
        return '#326CE5';
      case 'fuse':
        return '#38A169';
      default:
        return '#CBD5E0';
    }
  };
  
  const getMetricDescription = (metric: string) => {
    switch(metric) {
      case 'schedulingSuccessRate':
        return 'Higher is better - Percentage of containers successfully scheduled';
      case 'averageSchedulingTime':
        return 'Lower is better - Average time to schedule each container (ms)';
      case 'resourceUtilization':
        return 'Higher is better - Percentage of available resources being utilized';
      case 'energyEfficiency':
        return 'Higher is better - Energy efficiency rating based on resource usage';
      case 'failedContainers':
        return 'Lower is better - Number of containers that failed to be scheduled';
      default:
        return '';
    }
  };

  const metricIcons = {
    schedulingSuccessRate: <Container className="h-5 w-5" />,
    averageSchedulingTime: <Clock className="h-5 w-5" />,
    resourceUtilization: <Cpu className="h-5 w-5" />,
    energyEfficiency: <HardDrive className="h-5 w-5" />,
    failedContainers: <Container className="h-5 w-5" />
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Deployment Simulation</span>
          <Button 
            onClick={runSimulation} 
            disabled={isSimulating}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSimulating ? "Simulating..." : "Run Simulation"}
          </Button>
        </CardTitle>
        <CardDescription>
          Compare scheduling algorithms across various container deployment scenarios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {scenarios.map((scenario) => (
              <Button
                key={scenario.id}
                variant={activeScenario === scenario.id ? "default" : "outline"}
                className={`text-xs ${activeScenario === scenario.id ? 'bg-blue-600' : ''}`}
                onClick={() => setActiveScenario(scenario.id)}
              >
                {scenario.name}
              </Button>
            ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-md font-medium mb-2">{currentScenario.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{currentScenario.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-semibold">Containers:</span> {currentScenario.containerCount}
              </div>
              <div>
                <span className="font-semibold">CPU Demand:</span> {currentScenario.resourceDemand.cpu}
              </div>
              <div>
                <span className="font-semibold">Memory Demand:</span> {currentScenario.resourceDemand.memory}
              </div>
              <div>
                <span className="font-semibold">Storage Demand:</span> {currentScenario.resourceDemand.storage}
              </div>
              <div>
                <span className="font-semibold">Simulation Time:</span> {currentScenario.simulationTime}s
              </div>
            </div>
          </div>
          
          {(simulationComplete || true) && (
            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-4">Simulation Results</h3>
              <Tabs defaultValue="schedulingSuccessRate">
                <TabsList className="w-full grid grid-cols-2 md:grid-cols-5">
                  <TabsTrigger value="schedulingSuccessRate" className="text-xs">Success Rate</TabsTrigger>
                  <TabsTrigger value="averageSchedulingTime" className="text-xs">Scheduling Time</TabsTrigger>
                  <TabsTrigger value="resourceUtilization" className="text-xs">Resource Usage</TabsTrigger>
                  <TabsTrigger value="energyEfficiency" className="text-xs">Energy Efficiency</TabsTrigger>
                  <TabsTrigger value="failedContainers" className="text-xs">Failed Containers</TabsTrigger>
                </TabsList>
                
                {(['schedulingSuccessRate', 'averageSchedulingTime', 'resourceUtilization', 'energyEfficiency', 'failedContainers'] as const).map(metric => (
                  <TabsContent key={metric} value={metric}>
                    <div className="pt-2 pb-4">
                      <div className="flex items-center gap-2 mb-2 text-gray-700">
                        {metricIcons[metric]}
                        <span>{getMetricDescription(metric)}</span>
                      </div>
                      <div className="h-[250px] mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={formatResultsForChart(metric)}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {selectedAlgorithms.includes('binpacking') && (
                              <Bar dataKey="binpacking" name="BinPacking" fill={getBarColor('binpacking')} />
                            )}
                            {selectedAlgorithms.includes('drf') && (
                              <Bar dataKey="drf" name="DRF" fill={getBarColor('drf')} />
                            )}
                            {selectedAlgorithms.includes('fuse') && (
                              <Bar dataKey="fuse" name="FUSE" fill={getBarColor('fuse')} />
                            )}
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-sm text-gray-600 mt-4">
                        <strong className="text-green-700">Analysis:</strong> In the {currentScenario.name} scenario, FUSE consistently 
                        {metric === 'averageSchedulingTime' || metric === 'failedContainers' 
                          ? ' reduces ' + metric.replace(/([A-Z])/g, ' $1').toLowerCase() + ' compared to traditional algorithms.'
                          : ' improves ' + metric.replace(/([A-Z])/g, ' $1').toLowerCase() + ' compared to traditional algorithms.'
                        }
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulationPanel;
