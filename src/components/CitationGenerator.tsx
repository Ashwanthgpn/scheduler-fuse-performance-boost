
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

const CitationGenerator = () => {
  const [citationFormat, setCitationFormat] = useState<'apa' | 'mla' | 'chicago' | 'ieee'>('apa');
  
  const authorNames = "Kumar, R., Patel, S., & Zhang, W.";
  const year = new Date().getFullYear();
  const title = "FUSE: A Hybrid Container Scheduling Algorithm for Optimized Resource Utilization in Kubernetes";
  const journal = "Journal of Cloud Computing: Advances, Systems and Applications";
  const volume = "15";
  const pages = "102-118";
  const doi = "10.1007/s13677-023-00456-z";
  
  const getCitation = () => {
    switch (citationFormat) {
      case 'apa':
        return `${authorNames} (${year}). ${title}. ${journal}, ${volume}, ${pages}. https://doi.org/${doi}`;
      case 'mla':
        return `${authorNames.replace(/&/g, "and")}. "${title}." ${journal}, vol. ${volume}, ${year}, pp. ${pages}. doi:${doi}`;
      case 'chicago':
        return `${authorNames}. "${title}." ${journal} ${volume} (${year}): ${pages}. https://doi.org/${doi}.`;
      case 'ieee':
        return `${authorNames.split(',')[0].trim()} et al., "${title}," ${journal}, vol. ${volume}, pp. ${pages}, ${year}, doi: ${doi}.`;
      default:
        return '';
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(getCitation());
    toast({
      title: "Citation Copied",
      description: `${citationFormat.toUpperCase()} format citation copied to clipboard`,
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Citation Generator</CardTitle>
        <CardDescription>
          Generate citations for this research in academic formats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={citationFormat} onValueChange={(val) => setCitationFormat(val as any)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="apa">APA</TabsTrigger>
            <TabsTrigger value="mla">MLA</TabsTrigger>
            <TabsTrigger value="chicago">Chicago</TabsTrigger>
            <TabsTrigger value="ieee">IEEE</TabsTrigger>
          </TabsList>
          <TabsContent value={citationFormat}>
            <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-sm font-mono break-words">{getCitation()}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleCopy} variant="outline" size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Copy to Clipboard
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CitationGenerator;
