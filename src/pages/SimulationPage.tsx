
import Layout from "@/components/Layout";
import SimulationDetail from "@/components/SimulationDetail";
import CitationGenerator from "@/components/CitationGenerator";
import DataExport from "@/components/DataExport";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const SimulationPage = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Advanced Research Tools</CardTitle>
            <CardDescription>
              Simulation, data export, and citation tools for academic research
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Tabs defaultValue="simulation" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="simulation">Simulation</TabsTrigger>
            <TabsTrigger value="export">Data Export</TabsTrigger>
            <TabsTrigger value="citation">Citation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="simulation" className="mt-6">
            <SimulationDetail />
          </TabsContent>
          
          <TabsContent value="export" className="mt-6">
            <DataExport />
          </TabsContent>
          
          <TabsContent value="citation" className="mt-6">
            <CitationGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SimulationPage;
