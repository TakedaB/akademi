"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import Logo from "./Logo";
import { logout } from "@/lib/auth";
import {
  DashboardIcon,
  StudentsIcon,
  AddStudentIcon,
  TeachersIcon,
  FinanceIcon,
  UserIcon,
} from "../Icons/Icons";

interface MenuItem {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path: string;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: DashboardIcon, path: "/students" },
  { name: "Students", icon: StudentsIcon, path: "/students" },
  { name: "Add Student", icon: AddStudentIcon, path: "/students/add" },
  { name: "Teachers", icon: TeachersIcon, path: "/teachers" },
  { name: "Finance", icon: FinanceIcon, path: "/finance" },
  { name: "User", icon: UserIcon, path: "/user" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="bg-[#4D44B5] text-[#C1BBEB] w-60 min-h-screen p-6 flex flex-col justify-between">
      <div>
        <Logo />

        <nav className="mt-8 flex flex-col gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={`group flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-white text-[#4D44B5] font-semibold"
                      : "hover:bg-[#C1BBEB]"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive
                        ? "text-[#4F46E5]"
                        : "text-white group-hover:text-white"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-3 rounded-lg text-[#C1BBEB] hover:bg-[#C1BBEB] hover:text-[#4D44B5] transition-all"
      >
        <LogOut className="w-5 h-5" />
        <span>Sair</span>
      </button>
    </aside>
  );
}
