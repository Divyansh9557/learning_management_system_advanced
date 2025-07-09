'use client'
import { StatsCard } from "@/components/StatsCard"; 
import { UserTable } from "@/components/UserTable";
import { CourseTable } from "@/components/Coursetable"; 
import { Users, BookOpen, DollarSign, TrendingUp } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const AdminDashboard = () => {
  const trpc = useTRPC()

  const {data} = useSuspenseQuery(
    trpc.dashboard.getAdmin.queryOptions()
  )
  const stats = [
    {
      title: "Total Users",
      value: data.allUsers.length.toString() || "12,547",
      change: "+12%",
      icon: Users,
      trend: "up" as const
    },
    {
      title: "Active Courses",
      value: data.activeCourse.toString() || "847",
      change: "+5%",
      icon: BookOpen,
      trend: "up" as const
    },
    {
      title: "Revenue",
      value: "₹ "+ data.total.toString() ||  "$45,231",
      change: "+18%",
      icon: DollarSign,
      trend: "up" as const
    },
    {
      title: "Growth Rate",
      value: "23.1%",
      change: "+2.1%",
      icon: TrendingUp,
      trend: "up" as const
    }
  ];

 


  
  console.log("data", data);

  return (
    <div className="space-y-8 mt-5 bg-black ">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Dashboard Overview
          </h1>
          <p className="text-white/60 mt-2">
            Welcome back! Here&apos;s what&apos;s happening with your platform today.
          </p>
        </div>
      
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} {...data} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/[0.02] border border-white/[0.08] rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4 text-white">Recent Users</h2>
          <UserTable adminUser={data} compact />
        </div>

        <div className="bg-white/[0.02] border border-white/[0.08] rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4 text-white">Recent Courses</h2>
          <CourseTable adminCourseData={data}compact />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;