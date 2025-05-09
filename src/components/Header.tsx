
import { Button } from "@/components/ui/button";
import { GithubIcon, InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Header = () => {
  return (
    <header className="bg-k8s-blue text-white p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-4">
        <div className="font-bold text-2xl flex items-center">
          <svg className="w-8 h-8 mr-2" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="white"/>
            <path d="M15.9999 4C15.3799 4 14.7799 4.08 14.1999 4.22L14.6799 7.26C15.0999 7.17 15.5399 7.12 15.9999 7.12C16.4599 7.12 16.8999 7.17 17.3199 7.26L17.7999 4.22C17.2199 4.08 16.6199 4 15.9999 4Z" fill="#326CE5"/>
            <path d="M11.4202 4.92L10.0002 7.68C10.8202 8.04 11.5602 8.53 12.2002 9.14L14.7402 7.22C13.7602 6.27 12.6202 5.47 11.4202 4.92Z" fill="#326CE5"/>
            <path d="M7.22023 14.74L9.14023 12.2C8.53023 11.56 8.04023 10.82 7.68023 10L4.92023 11.42C5.47023 12.62 6.27023 13.76 7.22023 14.74Z" fill="#326CE5"/>
            <path d="M4.22 14.2L7.26 14.68C7.17 14.28 7.12 13.84 7.12 13.38C7.12 12.92 7.17 12.48 7.26 12.06L4.22 11.58C4.08 12.16 4 12.76 4 13.38C4 14 4.08 14.6 4.22 15.18V14.2Z" fill="#326CE5"/>
            <path d="M20.7998 9.14002C21.4398 8.53002 22.1798 8.04002 22.9998 7.68002L21.5798 4.92002C20.3798 5.47002 19.2398 6.27002 18.2598 7.22002L20.7998 9.14002Z" fill="#326CE5"/>
            <path d="M24.74 11.42L21.98 10C21.62 10.82 21.13 11.56 20.52 12.2L22.44 14.74C23.39 13.76 24.19 12.62 24.74 11.42Z" fill="#326CE5"/>
            <path d="M27.7803 11.58L24.7403 12.06C24.8303 12.48 24.8803 12.92 24.8803 13.38C24.8803 13.84 24.8303 14.28 24.7403 14.68L27.7803 15.16C27.9203 14.58 28.0003 13.98 28.0003 13.36C28.0003 12.74 27.9203 12.14 27.7803 11.56V11.58Z" fill="#326CE5"/>
            <path d="M11.42 24.74L10 21.98C10.82 21.62 11.56 21.13 12.2 20.52L14.74 22.44C13.76 23.39 12.62 24.19 11.42 24.74Z" fill="#326CE5"/>
            <path d="M14.2004 27.78L14.6804 24.74C14.2804 24.83 13.8404 24.88 13.3804 24.88C12.9204 24.88 12.4804 24.83 12.0804 24.74L12.5604 27.78C13.1404 27.92 13.7404 28 14.3604 28C14.9804 28 15.5804 27.92 16.1604 27.78H14.2004Z" fill="#326CE5"/>
            <path d="M22.44 20.52C23.05 21.16 23.54 21.9 23.9 22.72L26.66 21.3C26.11 20.1 25.31 18.96 24.36 17.98L22.44 20.52Z" fill="#326CE5"/>
            <path d="M18.2598 22.44L20.7998 20.52C20.1898 19.88 19.6998 19.14 19.3398 18.32L16.5798 19.74C17.1298 20.94 17.9298 21.46 18.2598 22.44Z" fill="#326CE5"/>
            <path d="M16 19.14C17.9106 19.14 19.46 17.5906 19.46 15.68C19.46 13.7694 17.9106 12.22 16 12.22C14.0894 12.22 12.54 13.7694 12.54 15.68C12.54 17.5906 14.0894 19.14 16 19.14Z" fill="#326CE5"/>
          </svg>
          K8s Scheduler Comparison
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-blue-600">
                <InfoIcon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Comparing BinPacking, DRF, and FUSE scheduling algorithms</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button variant="outline" className="bg-white text-k8s-blue hover:bg-gray-100">
          <GithubIcon className="mr-2 h-4 w-4" />
          <span>Github</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
