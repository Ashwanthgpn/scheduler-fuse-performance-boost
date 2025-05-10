
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Server, Database, BarChart } from "lucide-react";

const ResearchMethodology = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Research Design and Methodology
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Experimental Design</h3>
            <p className="text-gray-700 mb-4">
              This research employs a mixed-methods approach combining quantitative performance metrics and 
              qualitative analysis. The experimental design follows a comparative framework to evaluate three 
              distinct Kubernetes scheduling algorithms: BinPacking, Dominant Resource Fairness (DRF), and our 
              novel FUSE hybrid algorithm.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="font-medium mb-2">Independent Variables</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Scheduling algorithm type</li>
                  <li>Workload characteristics</li>
                  <li>Resource availability</li>
                  <li>Node composition</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-md">
                <h4 className="font-medium mb-2">Dependent Variables</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Resource utilization</li>
                  <li>Scheduling success rate</li>
                  <li>Scheduling latency</li>
                  <li>Energy efficiency</li>
                  <li>Makespan (total completion time)</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-md">
                <h4 className="font-medium mb-2">Control Variables</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Cluster hardware configuration</li>
                  <li>Network topology</li>
                  <li>Kubernetes version</li>
                  <li>Container runtime</li>
                </ul>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Server className="h-5 w-5 mr-2" />
              Experimental Testbed
            </h3>
            <p className="text-gray-700 mb-4">
              Experiments were conducted on a Kubernetes cluster consisting of 20 worker nodes, each equipped 
              with 32-core Intel Xeon processors, 128GB RAM, and 2TB NVMe storage. The cluster ran Kubernetes v1.26.3
              with containerd 1.6.4 as the container runtime.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border p-4 rounded-md">
                <h4 className="font-medium mb-2">Hardware Configuration</h4>
                <table className="w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="font-medium pr-4 py-1">CPU</td>
                      <td>Intel Xeon Gold 6342 @ 2.8GHz (32 cores)</td>
                    </tr>
                    <tr>
                      <td className="font-medium pr-4 py-1">Memory</td>
                      <td>128GB DDR4-3200 ECC</td>
                    </tr>
                    <tr>
                      <td className="font-medium pr-4 py-1">Storage</td>
                      <td>2TB NVMe SSD</td>
                    </tr>
                    <tr>
                      <td className="font-medium pr-4 py-1">Network</td>
                      <td>100Gbps Ethernet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="border p-4 rounded-md">
                <h4 className="font-medium mb-2">Software Stack</h4>
                <table className="w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="font-medium pr-4 py-1">OS</td>
                      <td>Ubuntu Server 22.04 LTS</td>
                    </tr>
                    <tr>
                      <td className="font-medium pr-4 py-1">Kubernetes</td>
                      <td>v1.26.3</td>
                    </tr>
                    <tr>
                      <td className="font-medium pr-4 py-1">Container Runtime</td>
                      <td>containerd 1.6.4</td>
                    </tr>
                    <tr>
                      <td className="font-medium pr-4 py-1">CNI Plugin</td>
                      <td>Calico 3.24.1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Data Collection Methods
            </h3>
            <p className="text-gray-700 mb-4">
              Metrics were collected through a combination of native Kubernetes metrics (via Metrics Server),
              Prometheus for time-series data, and custom instrumentation added to scheduler plugins. All 
              experiments were repeated 30 times to ensure statistical validity, with confidence intervals calculated
              at 95% confidence level.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="border p-4 rounded-md">
                <h4 className="font-medium mb-2">Real-time Metrics</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>CPU utilization per node</li>
                  <li>Memory consumption</li>
                  <li>Network I/O</li>
                  <li>Storage I/O operations</li>
                </ul>
              </div>
              <div className="border p-4 rounded-md">
                <h4 className="font-medium mb-2">Scheduler Metrics</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Scheduling latency</li>
                  <li>Queue wait time</li>
                  <li>Binding time</li>
                  <li>Algorithm execution time</li>
                </ul>
              </div>
              <div className="border p-4 rounded-md">
                <h4 className="font-medium mb-2">Application Metrics</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Pod startup time</li>
                  <li>Application response time</li>
                  <li>Service availability</li>
                  <li>Error rates</li>
                </ul>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Analysis Techniques
            </h3>
            <p className="text-gray-700 mb-4">
              Statistical analysis was performed using R (version 4.2.0) with specialized packages for 
              time-series analysis and comparison of means. Performance differences were evaluated using 
              ANOVA followed by post-hoc Tukey HSD tests, with significance level α=0.05.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border p-4 rounded-md">
                <h4 className="font-medium mb-2">Quantitative Analysis</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>One-way and two-way ANOVA</li>
                  <li>Tukey's Honest Significant Difference (HSD) test</li>
                  <li>Pearson correlation analysis</li>
                  <li>Multiple regression modeling</li>
                  <li>Time series decomposition</li>
                </ul>
              </div>
              <div className="border p-4 rounded-md">
                <h4 className="font-medium mb-2">Qualitative Analysis</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>Comparative case studies of algorithm behavior</li>
                  <li>Pattern recognition in resource allocation</li>
                  <li>Thematic analysis of algorithm decision processes</li>
                  <li>Root cause analysis for scheduling failures</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearchMethodology;
