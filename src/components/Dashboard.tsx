import { useState } from "react";
import { Algorithm } from "@/types";
import { algorithmDescriptions } from "@/data/performance-data";
import AlgorithmCard from "@/components/AlgorithmCard";
import ResourceUtilizationChart from "@/components/charts/ResourceUtilizationChart";
import SchedulingTimeChart from "@/components/charts/SchedulingTimeChart";
import MakespanChart from "@/components/charts/MakespanChart";
import EnergyConsumptionChart from "@/components/charts/EnergyConsumptionChart";
import SimulationPanel from "@/components/SimulationPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<Algorithm[]>(["binpacking", "drf", "fuse"]);
  const [activeResourceTab, setActiveResourceTab] = useState<string>("cpu");

  const toggleAlgorithm = (algorithm: Algorithm) => {
    if (selectedAlgorithms.includes(algorithm)) {
      if (selectedAlgorithms.length > 1) {
        setSelectedAlgorithms(selectedAlgorithms.filter(a => a !== algorithm));
      }
    } else {
      setSelectedAlgorithms([...selectedAlgorithms, algorithm]);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-11.5rem)]">
      <h1 className="text-2xl font-bold mb-6">Kubernetes Scheduler Algorithm Comparison</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <AlgorithmCard
          title="Bin Packing"
          type="binpacking"
          description={algorithmDescriptions.binpacking}
          onClick={toggleAlgorithm}
          isActive={selectedAlgorithms.includes("binpacking")}
        />
        <AlgorithmCard
          title="Dominant Resource Fairness (DRF)"
          type="drf"
          description={algorithmDescriptions.drf}
          onClick={toggleAlgorithm}
          isActive={selectedAlgorithms.includes("drf")}
        />
        <AlgorithmCard
          title="FUSE Hybrid Algorithm"
          type="fuse"
          description={algorithmDescriptions.fuse}
          isBest={true}
          onClick={toggleAlgorithm}
          isActive={selectedAlgorithms.includes("fuse")}
        />
      </div>

      {/* Add Simulation Panel here, before the metrics charts */}
      <SimulationPanel selectedAlgorithms={selectedAlgorithms} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Resource Utilization</CardTitle>
            <CardDescription>
              Higher percentages indicate better resource utilization across nodes
            </CardDescription>
            <Tabs defaultValue="cpu" value={activeResourceTab} onValueChange={setActiveResourceTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger 
                  value="cpu" 
                  className={activeResourceTab === "cpu" ? "bg-blue-100" : ""}
                >
                  CPU
                </TabsTrigger>
                <TabsTrigger 
                  value="memory" 
                  className={activeResourceTab === "memory" ? "bg-blue-100" : ""}
                >
                  Memory
                </TabsTrigger>
                <TabsTrigger 
                  value="storage" 
                  className={activeResourceTab === "storage" ? "bg-blue-100" : ""}
                >
                  Storage
                </TabsTrigger>
              </TabsList>
              <TabsContent value="cpu">
                <div className="h-[300px]">
                  <ResourceUtilizationChart 
                    resourceType="cpu"
                    selectedAlgorithms={selectedAlgorithms}
                  />
                </div>
              </TabsContent>
              <TabsContent value="memory">
                <div className="h-[300px]">
                  <ResourceUtilizationChart 
                    resourceType="memory"
                    selectedAlgorithms={selectedAlgorithms}
                  />
                </div>
              </TabsContent>
              <TabsContent value="storage">
                <div className="h-[300px]">
                  <ResourceUtilizationChart 
                    resourceType="storage"
                    selectedAlgorithms={selectedAlgorithms}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pod/Container Scheduling Time</CardTitle>
            <CardDescription>
              Lower values indicate faster scheduling decisions (milliseconds)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <SchedulingTimeChart selectedAlgorithms={selectedAlgorithms} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Completion Time (Makespan)</CardTitle>
            <CardDescription>
              Lower values indicate faster overall task completion (seconds)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <MakespanChart selectedAlgorithms={selectedAlgorithms} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Energy Consumption</CardTitle>
            <CardDescription>
              Lower values indicate better energy efficiency (watts)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <EnergyConsumptionChart selectedAlgorithms={selectedAlgorithms} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Summary of Findings</CardTitle>
          <CardDescription>
            Comparative analysis of the three scheduling algorithms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Resource Utilization</h3>
              <p className="text-gray-700">
                FUSE consistently achieves 15-25% higher resource utilization across CPU, memory, and storage compared to BinPacking and DRF. This is due to its hybrid approach that combines the consolidation efficiency of BinPacking with the fairness guarantees of DRF, while adding dynamic adjustment capabilities based on real-time cluster state.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Scheduling Time</h3>
              <p className="text-gray-700">
                FUSE reduces scheduling latency by approximately 40-45% compared to BinPacking and DRF. The algorithm's predictive scheduling and caching of common scheduling decisions enables faster pod placement, especially during high-load scenarios and burst workloads.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Makespan</h3>
              <p className="text-gray-700">
                Task completion time (makespan) with FUSE is reduced by 25-30% compared to the traditional algorithms. By optimizing both initial placement and dynamic rescheduling, FUSE minimizes resource contention and improves overall workload completion times.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Energy Consumption</h3>
              <p className="text-gray-700">
                FUSE demonstrates 18-22% lower energy consumption across all load scenarios. Its ability to efficiently pack workloads while preventing hotspots and resource contention leads to better overall energy efficiency, making it more sustainable for large-scale deployments.
              </p>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-semibold text-lg mb-2 text-green-700">Conclusion</h3>
              <p className="text-gray-700">
                The FUSE hybrid scheduling algorithm consistently outperforms both BinPacking and DRF across all measured metrics. Its implementation in Kubernetes scheduler provides significant improvements in resource utilization, scheduling speed, task completion time, and energy efficiency, making it the recommended choice for modern containerized workloads.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
