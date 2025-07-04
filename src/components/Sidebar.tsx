"use client";

import { Home, BookOpen, User, Search, Download, FileText, Gauge } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  userRole?: "student" | "instructor" | "admin";
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const pathname = usePathname();

  const studentNavItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: BookOpen },
    { name: "My Courses", path: "/courses", icon: BookOpen },
    { name: "Browse Courses", path: "/browse", icon: Search },
    { name: "Quizzes", path: "/quizzes", icon: FileText },
    { name: "Certificates", path: "/certificates", icon: Download },
    { name: "Profile", path: "/profile/1", icon: User },
  ];
  const adminNavItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/admin/dashboard", icon: Gauge },
    { name: "User Management", path: "/admin/user-management", icon: User },
    { name: "Course Moderation", path: "/admin/course-moderation", icon: Search },
  ];
  const instructorNavItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/instructor/dashboard", icon: BookOpen },
  ];

  const getNavItems = () => {
    switch (userRole) {
      case "student":
        return studentNavItems;
      case "instructor":{
        return instructorNavItems;
      }
        case "admin":
        return adminNavItems;
      default:
        return studentNavItems;
    }
  };

  return (
    <aside className="w-64 fixed top-12 left-0 h-full hidden md:block bg-[#030303]/95 backdrop-blur-sm border-r border-white/[0.08]">
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
              >
                <item.icon className="w-5 h-5 text-white/60 group-hover:text-white/80" />
                <span className="ml-3">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
