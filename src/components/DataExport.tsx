
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Download, FileDown, Table, FileJson } from "lucide-react";
import { simulationResults, scenarios, ScenarioType } from "@/data/simulation-scenarios";

interface MetricSelectOption {
  id: string;
  label: string;
  checked: boolean;
}

const DataExport = () => {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'xlsx'>('csv');
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType>('mixed-workload');
  
  const [metricOptions, setMetricOptions] = useState<MetricSelectOption[]>([
    { id: "schedulingSuccessRate", label: "Scheduling Success Rate", checked: true },
    { id: "averageSchedulingTime", label: "Average Scheduling Time", checked: true },
    { id: "resourceUtilization", label: "Resource Utilization", checked: true },
    { id: "energyEfficiency", label: "Energy Efficiency", checked: true },
    { id: "failedContainers", label: "Failed Containers", checked: true }
  ]);
  
  const toggleMetric = (id: string) => {
    setMetricOptions(metricOptions.map(option => 
      option.id === id ? { ...option, checked: !option.checked } : option
    ));
  };
  
  const selectedMetrics = metricOptions.filter(m => m.checked).map(m => m.id);
  
  const handleExport = () => {
    // In a real application, this would generate the actual file
    // For now, we'll just show a toast notification
    
    const scenarioName = scenarios.find(s => s.id === selectedScenario)?.name || selectedScenario;
    const fileExtension = exportFormat;
    const fileName = `kubernetes-simulation-${scenarioName}.${fileExtension}`;
    
    // Create a simulated delay to mimic file generation
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `File "${fileName}" has been downloaded with ${selectedMetrics.length} metrics.`,
      });
    }, 800);
  };
  
  const handleExportAll = () => {
    // Simulate exporting all scenarios and metrics
    setTimeout(() => {
      toast({
        title: "Complete Dataset Exported",
        description: "Full dataset archive has been downloaded with all scenarios and metrics.",
      });
    }, 1200);
  };
  
  // Generate preview data based on selected metrics and scenario
  const generatePreviewData = () => {
    const data = simulationResults[selectedScenario];
    
    const preview: Record<string, any> = {
      scenario: selectedScenario,
      timestamp: new Date().toISOString(),
    };
    
    // Add selected metrics for each algorithm
    ['binpacking', 'drf', 'fuse'].forEach(algorithm => {
      preview[algorithm] = {};
      selectedMetrics.forEach(metric => {
        preview[algorithm][metric] = data[algorithm as keyof typeof data][metric as keyof typeof data[keyof typeof data]];
      });
    });
    
    return preview;
  };
  
  // Format JSON with indentation for display
  const getFormattedJson = () => {
    return JSON.stringify(generatePreviewData(), null, 2);
  };
  
  // Format CSV for display
  const getFormattedCsv = () => {
    const data = generatePreviewData();
    const algorithms = ['binpacking', 'drf', 'fuse'];
    
    // Create header row
    let csv = "metric,";
    csv += algorithms.join(",");
    csv += "\n";
    
    // Add data rows
    selectedMetrics.forEach(metric => {
      csv += `${metric},`;
      algorithms.forEach((algo, index) => {
        csv += data[algo][metric];
        if (index < algorithms.length - 1) {
          csv += ",";
        }
      });
      csv += "\n";
    });
    
    return csv;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Research Data Export</span>
          <Button onClick={handleExportAll} variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export All Data
          </Button>
        </CardTitle>
        <CardDescription>
          Export research data in various formats for analysis, publication, and sharing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Export Format</h3>
                <Select value={exportFormat} onValueChange={(val) => setExportFormat(val as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV (Comma Separated Values)</SelectItem>
                    <SelectItem value="json">JSON (JavaScript Object Notation)</SelectItem>
                    <SelectItem value="xlsx">XLSX (Microsoft Excel)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Deployment Scenario</h3>
                <Select value={selectedScenario} onValueChange={(val) => setSelectedScenario(val as ScenarioType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    {scenarios.map((scenario) => (
                      <SelectItem key={scenario.id} value={scenario.id}>
                        {scenario.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Select Metrics</h3>
              <div className="space-y-3">
                {metricOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={option.checked}
                      onCheckedChange={() => toggleMetric(option.id)}
                    />
                    <label
                      htmlFor={option.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-sm font-medium mb-3">Additional Options</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-metadata" defaultChecked />
                  <label
                    htmlFor="include-metadata"
                    className="text-sm font-medium leading-none"
                  >
                    Include experiment metadata
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-timestamps" defaultChecked />
                  <label
                    htmlFor="include-timestamps"
                    className="text-sm font-medium leading-none"
                  >
                    Include timestamps
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-raw-data" />
                  <label
                    htmlFor="include-raw-data"
                    className="text-sm font-medium leading-none"
                  >
                    Include raw data points
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-statistical" defaultChecked />
                  <label
                    htmlFor="include-statistical"
                    className="text-sm font-medium leading-none"
                  >
                    Include statistical analysis
                  </label>
                </div>
              </div>
              
              <Button onClick={handleExport} className="mt-auto bg-green-600 hover:bg-green-700">
                <Download className="mr-2 h-4 w-4" />
                Export Selected Data
              </Button>
            </div>
          </div>
          
          <div className="pt-6 border-t">
            <h3 className="text-sm font-medium mb-3">Data Preview</h3>
            <Tabs defaultValue={exportFormat} value={exportFormat} onValueChange={(val) => setExportFormat(val as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="csv" className="flex items-center">
                  <Table className="mr-1 h-4 w-4" /> CSV
                </TabsTrigger>
                <TabsTrigger value="json" className="flex items-center">
                  <FileJson className="mr-1 h-4 w-4" /> JSON
                </TabsTrigger>
                <TabsTrigger value="xlsx" disabled className="flex items-center">
                  <FileDown className="mr-1 h-4 w-4" /> XLSX (Preview not available)
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="csv" className="mt-4">
                <pre className="p-4 bg-gray-50 rounded-md border overflow-auto text-xs font-mono max-h-[300px]">
                  {getFormattedCsv()}
                </pre>
              </TabsContent>
              
              <TabsContent value="json" className="mt-4">
                <pre className="p-4 bg-gray-50 rounded-md border overflow-auto text-xs font-mono max-h-[300px]">
                  {getFormattedJson()}
                </pre>
              </TabsContent>
              
              <TabsContent value="xlsx" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-md border text-center text-gray-500">
                  Preview not available for Excel format. Export the file to view.
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataExport;
