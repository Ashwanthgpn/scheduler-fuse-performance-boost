
import { ExternalLinkIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t p-4 text-sm text-gray-600">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p>© 2025 K8s Scheduler Algorithm Comparison</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-k8s-blue flex items-center">
            <span>Kubernetes Docs</span>
            <ExternalLinkIcon className="ml-1 h-3 w-3" />
          </a>
          <a href="#" className="hover:text-k8s-blue flex items-center">
            <span>GitHub Repository</span>
            <ExternalLinkIcon className="ml-1 h-3 w-3" />
          </a>
          <a href="#" className="hover:text-k8s-blue flex items-center">
            <span>Research Paper</span>
            <ExternalLinkIcon className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
