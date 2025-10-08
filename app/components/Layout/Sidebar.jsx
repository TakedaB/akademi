"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";

import {DashboardIcon, StudentsIcon, AddStudentIcon,TeachersIcon,FinanceIcon,UserIcon,} from "../Icons/Icons";

const menuItems = [
  { name: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
  { name: "Students", icon: StudentsIcon, path: "/students" },
  { name: "Add Student", icon: AddStudentIcon, path: "/students/add" },
  { name: "Teachers", icon: TeachersIcon, path: "/teachers" },
  { name: "Finance", icon: FinanceIcon, path: "/finance" },
  { name: "User", icon: UserIcon, path: "/user" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-[#4F46E5] text-white w-60 min-h-screen p-6">
      {/* Logo */}
      <Logo />

      {/* Menu */}
      <nav className="mt-8 flex flex-col gap-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link key={item.path} href={item.path}>
              <div
                className={`group flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-white text-[#4F46E5] font-semibold"
                    : "hover:bg-[#635DF7]"
                }`}
              >
                <Icon 
                className={`w-5 h-5 ${
                  isActive ? 'text-[#4F46E5]' : 'text-white group-hover:text-white'
                }`} 
                />
                
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
