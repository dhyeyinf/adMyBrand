"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Play, 
  Pause, 
  RotateCcw,  
  Share2
} from "lucide-react";

export function QuickActions() {
  const { toast } = useToast();

  const actions = [
    {
      icon: <Play className="h-4 w-4" />,
      label: "Start Campaign",
      onClick: () => toast({
        title: "Campaign Started",
        description: "Your new campaign is now live and running.",
      }),
      variant: "default" as const,
    },
    {
      icon: <Pause className="h-4 w-4" />,
      label: "Pause All",
      onClick: () => toast({
        title: "Campaigns Paused",
        description: "All active campaigns have been paused.",
      }),
      variant: "outline" as const,
    },
    {
      icon: <RotateCcw className="h-4 w-4" />,
      label: "Auto-Optimize",
      onClick: () => toast({
        title: "Optimization Started",
        description: "AI is optimizing your campaigns for better performance.",
      }),
      variant: "outline" as const,
    },
    {
      icon: <Share2 className="h-4 w-4" />,
      label: "Share Report",
      onClick: () => toast({
        title: "Report Shared",
        description: "Dashboard report has been shared with your team.",
      }),
      variant: "outline" as const,
    }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action, index) => (
        <motion.div
          key={action.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Button
            variant={action.variant}
            size="sm"
            onClick={action.onClick}
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            {action.icon}
            {action.label}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
