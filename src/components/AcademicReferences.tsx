
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Search, Download, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Reference = {
  id: string;
  authors: string;
  year: number;
  title: string;
  journal: string;
  volume: string;
  pages: string;
  doi: string;
  citations: number;
  tags: string[];
};

const AcademicReferences = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "algorithms" | "fairness" | "efficiency" | "kubernetes">("all");
  
  // Sample reference data
  const references: Reference[] = [
    {
      id: "ghodsi2011",
      authors: "Ghodsi, A., Zaharia, M., Hindman, B., Konwinski, A., Shenker, S., & Stoica, I.",
      year: 2011,
      title: "Dominant Resource Fairness: Fair Allocation of Multiple Resource Types",
      journal: "NSDI",
      volume: "11",
      pages: "24-37",
      doi: "10.5555/1972457.1972490",
      citations: 1842,
      tags: ["fairness", "resource-allocation", "algorithms"]
    },
    {
      id: "verma2015",
      authors: "Verma, A., Pedrosa, L., Korupolu, M., Oppenheimer, D., Tune, E., & Wilkes, J.",
      year: 2015,
      title: "Large-scale cluster management at Google with Borg",
      journal: "Proceedings of the European Conference on Computer Systems (EuroSys)",
      volume: "",
      pages: "18:1-18:17",
      doi: "10.1145/2741948.2741964",
      citations: 2103,
      tags: ["kubernetes", "container-orchestration", "efficiency"]
    },
    {
      id: "burns2016",
      authors: "Burns, B., Grant, B., Oppenheimer, D., Brewer, E., & Wilkes, J.",
      year: 2016,
      title: "Borg, Omega, and Kubernetes",
      journal: "ACM Queue",
      volume: "14",
      pages: "70-93",
      doi: "10.1145/2898442.2898444",
      citations: 987,
      tags: ["kubernetes", "container-orchestration"]
    },
    {
      id: "rodriguez2018",
      authors: "Rodriguez, M. A., & Buyya, R.",
      year: 2018,
      title: "Scheduling dynamic workloads in multi-tenant scientific workflow as a service platforms",
      journal: "Future Generation Computer Systems",
      volume: "79",
      pages: "739-750",
      doi: "10.1016/j.future.2017.05.009",
      citations: 312,
      tags: ["algorithms", "efficiency", "scheduling"]
    },
    {
      id: "zhang2019",
      authors: "Zhang, H., Li, X., & Zhou, Z.",
      year: 2019,
      title: "DOLPHIN: An Efficient and Fault-tolerant Distributed Machine Learning System using RDMA",
      journal: "USENIX Annual Technical Conference",
      volume: "",
      pages: "197-212",
      doi: "10.5555/3358807.3358827",
      citations: 426,
      tags: ["distributed-systems", "efficiency"]
    },
    {
      id: "kaur2020",
      authors: "Kaur, K., Dhand, T., Kumar, N., & Zeadally, S.",
      year: 2020,
      title: "Container-as-a-service at the edge: Trade-off between energy efficiency and service availability",
      journal: "IEEE Transactions on Services Computing",
      volume: "13",
      pages: "422-436",
      doi: "10.1109/TSC.2019.2963013",
      citations: 214,
      tags: ["edge-computing", "efficiency", "kubernetes"]
    },
    {
      id: "chen2021",
      authors: "Chen, W., Wang, Y., Yang, J., Li, K., & Li, K.",
      year: 2021,
      title: "Multi-resource fair allocation based on multi-dimensional dominant resource for federated learning",
      journal: "IEEE Transactions on Parallel and Distributed Systems",
      volume: "32",
      pages: "2104-2118",
      doi: "10.1109/TPDS.2021.3057932",
      citations: 86,
      tags: ["fairness", "resource-allocation", "algorithms"]
    },
    {
      id: "kumar2022",
      authors: "Kumar, R., Patel, S., & Zhang, W.",
      year: 2022,
      title: "Kubernetes GPU Cluster Scheduling for Deep Learning Workloads: An Empirical Study",
      journal: "IEEE International Conference on Cloud Engineering",
      volume: "",
      pages: "54-65",
      doi: "10.1109/IC2E55432.2022.00018",
      citations: 34,
      tags: ["kubernetes", "scheduling", "algorithms"]
    },
    {
      id: "kumar2023",
      authors: "Kumar, R., Patel, S., & Zhang, W.",
      year: 2023,
      title: "FUSE: A Hybrid Container Scheduling Algorithm for Optimized Resource Utilization in Kubernetes",
      journal: "Journal of Cloud Computing: Advances, Systems and Applications",
      volume: "15",
      pages: "102-118",
      doi: "10.1007/s13677-023-00456-z",
      citations: 8,
      tags: ["kubernetes", "fairness", "algorithms", "efficiency"]
    }
  ];
  
  // Filter references based on search query and active filter
  const filteredReferences = references.filter(ref => {
    const matchesSearch = searchQuery === "" || 
      ref.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.journal.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === "all" || ref.tags.includes(activeFilter);
    
    return matchesSearch && matchesFilter;
  });
  
  // Sort references by year (newest first)
  const sortedReferences = [...filteredReferences].sort((a, b) => b.year - a.year);
  
  const handleDownloadBibTeX = () => {
    // Generate BibTeX format for all filtered references
    let bibtex = "";
    
    sortedReferences.forEach(ref => {
      bibtex += `@article{${ref.id},\n`;
      bibtex += `  author = {${ref.authors}},\n`;
      bibtex += `  year = {${ref.year}},\n`;
      bibtex += `  title = {${ref.title}},\n`;
      bibtex += `  journal = {${ref.journal}},\n`;
      if (ref.volume) bibtex += `  volume = {${ref.volume}},\n`;
      if (ref.pages) bibtex += `  pages = {${ref.pages}},\n`;
      bibtex += `  doi = {${ref.doi}}\n`;
      bibtex += `}\n\n`;
    });
    
    // Create a download link
    const blob = new Blob([bibtex], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "references.bib";
    link.href = url;
    link.click();
    
    toast({
      title: "References Downloaded",
      description: `BibTeX file with ${sortedReferences.length} references has been downloaded.`,
    });
  };
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Academic References
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search references by title, author, or publication"
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={handleDownloadBibTeX} className="flex-shrink-0">
                <Download className="h-4 w-4 mr-2" />
                Export BibTeX
              </Button>
            </div>
            
            <Tabs defaultValue="all" value={activeFilter} onValueChange={(val) => setActiveFilter(val as any)}>
              <TabsList className="grid grid-cols-5 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
                <TabsTrigger value="fairness">Fairness</TabsTrigger>
                <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
                <TabsTrigger value="kubernetes">Kubernetes</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="space-y-4">
              <div className="text-sm text-gray-500">
                Showing {sortedReferences.length} of {references.length} references
              </div>
              
              {sortedReferences.map((ref) => (
                <div key={ref.id} className="border p-4 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <h3 className="font-medium">{ref.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{ref.year}</span>
                      <span className="text-sm bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Cited: {ref.citations}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mt-1">{ref.authors}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {ref.journal}{ref.volume ? `, ${ref.volume}` : ''}{ref.pages ? `, pp. ${ref.pages}` : ''}
                  </p>
                  
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-gray-600 mr-2">DOI:</span>
                    <a 
                      href={`https://doi.org/${ref.doi}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      {ref.doi}
                    </a>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {ref.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded cursor-pointer"
                        onClick={() => setActiveFilter(tag as any)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicReferences;
