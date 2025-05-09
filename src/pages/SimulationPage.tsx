
import Layout from "@/components/Layout";
import SimulationDetail from "@/components/SimulationDetail";
import CitationGenerator from "@/components/CitationGenerator";

const SimulationPage = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <SimulationDetail />
        <div className="mt-8">
          <CitationGenerator />
        </div>
      </div>
    </Layout>
  );
};

export default SimulationPage;
