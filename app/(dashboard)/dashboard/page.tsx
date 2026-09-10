"use client";

import { useEffect, useState } from "react";
import { Users, GraduationCap, DollarSign, AlertCircle } from "lucide-react";
import { getStudents } from "@/lib/StudentsStorage";
import { getTeachers } from "@/lib/TeachersStorage";
import { getFinances } from "@/lib/FinanceStorage";
import { getRole, Role } from "@/lib/auth";

interface SummaryCard {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

export default function DashboardPage() {
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<SummaryCard[]>([]);

  useEffect(() => {
    const currentRole = getRole();
    setRole(currentRole);
    loadSummary(currentRole);
  }, []);

  const loadSummary = async (currentRole: Role | null) => {
    setLoading(true);
    const newCards: SummaryCard[] = [];

    const canViewStudents =
      currentRole === "diretoria" ||
      currentRole === "financeiro" ||
      currentRole === "professor";
    const canViewFinance =
      currentRole === "diretoria" || currentRole === "financeiro";

    try {
      const requests: Promise<void>[] = [];

      if (canViewStudents) {
        requests.push(
          getStudents().then((students) => {
            newCards.push({
              label: "Total Students",
              value: students.length,
              icon: Users,
              color: "bg-[#6E4AE9]",
            });
          }),
        );
      }

      requests.push(
        getTeachers().then((teachers) => {
          newCards.push({
            label: "Total Teachers",
            value: teachers.length,
            icon: GraduationCap,
            color: "bg-[#4D44B5]",
          });
        }),
      );

      if (canViewFinance) {
        requests.push(
          getFinances().then((finances) => {
            const pending = finances.filter(
              (f) => f.status === "pendente" || f.status === "atrasado",
            );
            const totalPending = pending.reduce((sum, f) => sum + f.amount, 0);

            newCards.push({
              label: "Pending Charges",
              value: pending.length,
              icon: AlertCircle,
              color: "bg-yellow-500",
            });
            newCards.push({
              label: "Pending Amount",
              value: `R$ ${totalPending.toFixed(2)}`,
              icon: DollarSign,
              color: "bg-green-600",
            });
          }),
        );
      }

      await Promise.all(requests);
      setCards(newCards);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-[#303972]">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F3F4FF] pt-8 px-5 pb-5">
      <h1 className="text-3xl font-bold text-[#303972] mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4 border border-gray-100"
            >
              <div
                className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center text-white`}
              >
                <Icon size={22} />
              </div>
              <div>
                <p className="text-sm text-[#A098AE] font-medium">
                  {card.label}
                </p>
                <p className="text-2xl font-bold text-[#303972]">
                  {card.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {cards.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400 mt-4">
          Nenhum dado disponível pro seu perfil de acesso.
        </div>
      )}
    </div>
  );
}
