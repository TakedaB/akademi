"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Layout/Sidebar";
import { getToken } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
      return;
    }
    setChecking(false);
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F3FF] text-[#303972]">
        Carregando...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F5F3FF]">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
