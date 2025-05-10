
import Layout from "@/components/Layout";
import ResearchMethodology from "@/components/ResearchMethodology";
import LiteratureReview from "@/components/LiteratureReview";
import AcademicReferences from "@/components/AcademicReferences";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const PublicationsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Research Publications</CardTitle>
            <CardDescription>
              Academic publications, methodology, and literature review related to FUSE scheduling algorithm
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Tabs defaultValue="methodology" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="methodology">Research Methodology</TabsTrigger>
            <TabsTrigger value="literature">Literature Review</TabsTrigger>
            <TabsTrigger value="references">Academic References</TabsTrigger>
          </TabsList>
          
          <TabsContent value="methodology" className="mt-6">
            <ResearchMethodology />
          </TabsContent>
          
          <TabsContent value="literature" className="mt-6">
            <LiteratureReview />
          </TabsContent>
          
          <TabsContent value="references" className="mt-6">
            <AcademicReferences />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PublicationsPage;
