
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Algorithm } from "@/types";
import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AlgorithmCardProps {
  title: string;
  type: Algorithm;
  description: string;
  isBest?: boolean;
  onClick: (algorithm: Algorithm) => void;
  isActive: boolean;
}

const getCardStyles = (type: Algorithm, isActive: boolean) => {
  const baseStyles = "transition-all duration-200";
  
  if (isActive) {
    switch (type) {
      case "binpacking":
        return `${baseStyles} border-yellow-500 shadow-md shadow-yellow-100`;
      case "drf":
        return `${baseStyles} border-blue-500 shadow-md shadow-blue-100`;
      case "fuse":
        return `${baseStyles} border-green-500 shadow-md shadow-green-100`;
      default:
        return baseStyles;
    }
  }
  
  return `${baseStyles} hover:border-gray-300`;
};

const getBadgeStyles = (type: Algorithm) => {
  switch (type) {
    case "binpacking":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "drf":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "fuse":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    default:
      return "";
  }
};

const AlgorithmCard = ({ title, type, description, isBest = false, onClick, isActive }: AlgorithmCardProps) => {
  return (
    <Card 
      className={`${getCardStyles(type, isActive)} cursor-pointer`}
      onClick={() => onClick(type)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge className={getBadgeStyles(type)}>
            {type === "binpacking" ? "Traditional" : type === "drf" ? "Fair" : "Hybrid"}
          </Badge>
        </div>
        {isBest && (
          <Badge className="bg-green-100 text-green-800 mt-1">Recommended</Badge>
        )}
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-500 mb-3">
          {description.length > 120 ? `${description.substring(0, 120)}...` : description}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0 inline-flex">
                  <InfoIcon className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-md">
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardDescription>
        <Button 
          variant={isActive ? "default" : "outline"} 
          className={isActive ? "w-full" : "w-full"} 
          onClick={(e) => {
            e.stopPropagation();
            onClick(type);
          }}
        >
          {isActive ? "Selected" : "Compare"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AlgorithmCard;
