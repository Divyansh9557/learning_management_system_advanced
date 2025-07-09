'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: "up" | "down";
}

export function StatsCard({ title, value, change, icon: Icon, trend, }: StatsCardProps) {
  return (
    <Card className="bg-white/[0.02] border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.03] transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white/80">{title}</CardTitle>
        <Icon className="h-4 w-4 text-white/60" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="flex items-center space-x-2">
          <Badge 
            variant={trend === "up" ? "default" : "destructive"}
            className={trend === "up" 
              ? "bg-green-500/20 text-green-300 border-green-500/30" 
              : "bg-red-500/20 text-red-300 border-red-500/30"
            }
          >
            {change}
          </Badge>
          <p className="text-xs text-white/60">from last month</p>
        </div>
      </CardContent>
    </Card>
  );
}
