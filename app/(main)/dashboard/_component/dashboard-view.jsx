"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "next-themes";

const DashboardView = ({ insights }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Transform salary data for the chart
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  // Grayscale colors for Recharts dynamic styling
  const minColor = theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
  const medianColor = theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)";
  const maxColor = theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)";
  const gridColor = theme === "dark" ? "#262626" : "#e5e5e5";
  const axisLabelColor = theme === "dark" ? "#a3a3a3" : "#525252";

  const getDemandLevelBarColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-black dark:bg-white";
      case "medium":
        return "bg-neutral-500 dark:bg-neutral-400";
      case "low":
        return "bg-neutral-300 dark:bg-neutral-700";
      default:
        return "bg-neutral-200 dark:bg-neutral-800";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-foreground" };
      case "neutral":
        return { icon: LineChart, color: "text-neutral-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-neutral-400" };
      default:
        return { icon: LineChart, color: "text-neutral-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  // Format dates using date-fns
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  // Uniform minimalist badge class name
  const badgeClass = "bg-neutral-100 text-neutral-900 border border-neutral-300 dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-800 shadow-sm transition-all duration-300";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline" className={badgeClass}>Last updated: {lastUpdatedDate}</Badge>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Market Outlook
            </CardTitle>
            <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{insights.marketOutlook}</div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Industry Growth
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress value={insights.growthRate} className="mt-2 bg-neutral-100 dark:bg-neutral-800" />
          </CardContent>
        </Card>

        <Card className="border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Demand Level</CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{insights.demandLevel}</div>
            <div
              className={`h-2 w-full rounded-full mt-2 ${getDemandLevelBarColor(
                insights.demandLevel
              )}`}
            />
          </CardContent>
        </Card>

        <Card className="border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Top Skills</CardTitle>
            <Brain className="h-4 w-4 text-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {insights.topSkills.map((skill) => (
                <Badge key={skill} className={badgeClass}>
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Ranges Chart */}
      <Card className="border border-neutral-200 dark:border-neutral-800 shadow-sm col-span-4">
        <CardHeader>
          <CardTitle className="text-foreground">Salary Ranges by Role</CardTitle>
          <CardDescription className="text-neutral-500 dark:text-neutral-400">
            Displaying minimum, median, and maximum salaries (in thousands)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis 
                    dataKey="name" 
                    stroke={axisLabelColor}
                    tick={{ fill: axisLabelColor }}
                    fontSize={12}
                  />
                  <YAxis 
                    stroke={axisLabelColor}
                    tick={{ fill: axisLabelColor }}
                    fontSize={12}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 shadow-md text-foreground">
                            <p className="font-bold border-b border-border pb-1 mb-1">{label}</p>
                            {payload.map((item) => (
                              <p key={item.name} className="text-sm">
                                {item.name}: ${item.value}K
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="min" fill={minColor} name="Min Salary (K)" />
                  <Bar dataKey="median" fill={medianColor} name="Median Salary (K)" />
                  <Bar dataKey="max" fill={maxColor} name="Max Salary (K)" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Industry Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Key Industry Trends</CardTitle>
            <CardDescription className="text-neutral-500 dark:text-neutral-400">
              Current trends shaping the industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start space-x-2 text-foreground">
                  <div className="h-2 w-2 mt-2 rounded-full bg-foreground" />
                  <span>{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Recommended Skills</CardTitle>
            <CardDescription className="text-neutral-500 dark:text-neutral-400">Skills to consider developing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.recommendedSkills.map((skill) => (
                <Badge key={skill} className={badgeClass}>
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
