"use client";

import { useState } from "react";
import {
  Home,
  BookOpen,
  User,
  Search,
  Download,
  FileText,
  Gauge,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface SidebarProps {
  userRole?: "student" | "instructor" | "admin";
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const studentNavItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: BookOpen },
    { name: "My Courses", path: "/courses", icon: BookOpen },
    { name: "Browse Courses", path: "/browse?page=1", icon: Search },
    { name: "Quizzes", path: "/quizzes", icon: FileText },
    { name: "Certificates", path: "/certificates", icon: Download },
    { name: "Profile", path: "/profile/1", icon: User },
  ];

  const adminNavItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/admin/dashboard", icon: Gauge },
    { name: "User Management", path: "/admin/user-management?page=1", icon: User },
    { name: "Course Moderation", path: "/admin/course-moderation?page=1", icon: Search },
  ];

  const instructorNavItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/instructor/dashboard", icon: BookOpen },
    { name: "Quizs", path: "/instructor/quizes", icon: BookOpen },
  ];

  const getNavItems = () => {
    switch (userRole) {
      case "student":
        return studentNavItems;
      case "instructor":
        return instructorNavItems;
      case "admin":
        return adminNavItems;
      default:
        return studentNavItems;
    }
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-black text-white rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar for Desktop and Mobile */}
      <aside
        className={clsx(
          "fixed top-0 left-0 z-40 w-64 h-full bg-[#030303]/95 backdrop-blur-sm border-r border-white/[0.08] transform transition-transform duration-300",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
            "md:translate-x-0 md:static md:block": true, // Always show on md+
          }
        )}
      >
        <div className="h-full px-3 py-5 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {getNavItems().map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center p-2 text-white/80 rounded-lg hover:bg-white/[0.05] group transition-colors ${
                    pathname === item.path
                      ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)} // close on nav click (mobile)
                >
                  <item.icon className="w-5 h-5 text-white/60 group-hover:text-white/80" />
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
