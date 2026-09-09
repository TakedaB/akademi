"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import Logo from "./Logo";
import { logout, getRole, Role } from "@/lib/auth";
import {
  DashboardIcon,
  StudentsIcon,
  AddStudentIcon,
  TeachersIcon,
  FinanceIcon,
  UserIcon,
} from "../Icons/Icons";
import { useEffect, useState } from "react";

interface MenuItem {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path: string;
  allowedRoles: Role[];
}

const ALL_ROLES: Role[] = ["diretoria", "financeiro", "professor", "aluno"];

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    path: "/students",
    allowedRoles: ALL_ROLES,
  },
  {
    name: "Students",
    icon: StudentsIcon,
    path: "/students",
    allowedRoles: ["diretoria", "financeiro", "professor"],
  },
  {
    name: "Add Student",
    icon: AddStudentIcon,
    path: "/students/add",
    allowedRoles: ["diretoria", "financeiro"],
  },
  {
    name: "Teachers",
    icon: TeachersIcon,
    path: "/teachers",
    allowedRoles: ALL_ROLES,
  },
  {
    name: "Finance",
    icon: FinanceIcon,
    path: "/finance",
    allowedRoles: ["diretoria", "financeiro"],
  },
  { name: "User", icon: UserIcon, path: "/user", allowedRoles: ALL_ROLES },
];
export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    setRole(getRole());
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const visibleItems = role
    ? menuItems.filter((item) => item.allowedRoles.includes(role))
    : [];

  return (
    <aside className="bg-[#4D44B5] text-[#C1BBEB] w-60 min-h-screen p-6 flex flex-col justify-between">
      <div>
        <Logo />

        <nav className="mt-8 flex flex-col gap-4">
          {visibleItems.map((item) => {
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
