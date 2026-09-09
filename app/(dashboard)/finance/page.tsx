"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Trash2 } from "lucide-react";
import {
  getFinances,
  updateFinanceStatus,
  deleteFinance,
  Finance,
} from "@/lib/FinanceStorage";
import { getStudents, Student } from "@/lib/StudentsStorage";
import { getRole } from "@/lib/auth";

const STATUS_STYLES: Record<string, string> = {
  pendente: "bg-yellow-500",
  pago: "bg-green-500",
  atrasado: "bg-red-500",
  isento: "bg-blue-500",
};

export default function FinancePage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [finances, setFinances] = useState<Finance[]>([]);
  const [studentsMap, setStudentsMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = getRole();
    if (role !== "diretoria" && role !== "financeiro") {
      router.replace("/students");
      return;
    }
    setChecking(false);
    loadData();
  }, [router]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [financesData, studentsData] = await Promise.all([
        getFinances(),
        getStudents(),
      ]);
      setFinances(financesData);

      const map: Record<string, string> = {};
      studentsData.forEach((s: Student) => {
        map[s.id] = s.name;
      });
      setStudentsMap(map);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsPaid = async (id: string) => {
    try {
      await updateFinanceStatus(id, "pago");
      setFinances((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: "pago" } : f)),
      );
    } catch (err) {
      alert("Erro ao atualizar status");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this charge?")) {
      try {
        await deleteFinance(id);
        setFinances((prev) => prev.filter((f) => f.id !== id));
      } catch (err) {
        alert("Erro ao deletar cobrança");
      }
    }
  };

  if (checking || loading) {
    return <div className="p-8 text-[#303972]">Carregando...</div>;
  }

  return (
    <div className="flex h-screen bg-[#F5F3FF]">
      <main className="flex-1 overflow-auto bg-[#F3F4FF]">
        <header className="bg-[#F3F4FF] px-8 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#303972]">Finance</h1>

          <a
            href="/finance/add"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6E4AE9] text-white font-medium text-sm shadow-md hover:bg-[#5A3FC0] transition-all"
          >
            <span className="text-base">+</span>
            <span>New Charge</span>
          </a>
        </header>

        <div className="p-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-white-50 border-b">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">
                    Method
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">
                    Due Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {finances.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-400">
                      No charges registered yet.
                    </td>
                  </tr>
                ) : (
                  finances.map((f) => (
                    <tr
                      key={f.id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-[#303972]">
                        {studentsMap[f.student_id] || f.student_id}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#303972]">
                        {f.description}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#303972]">
                        R$ {f.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#303972] capitalize">
                        {f.payment_method}
                      </td>
                      <td className="px-6 py-4 text-xs text-[#A098AE]">
                        {new Date(f.due_date).toLocaleDateString("pt-BR", {
                          timeZone: "UTC",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-4 py-1.5 ${STATUS_STYLES[f.status]} text-white rounded-full text-sm font-medium inline-block capitalize`}
                        >
                          {f.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {f.status !== "pago" && (
                            <button
                              onClick={() => handleMarkAsPaid(f.id)}
                              className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
                              title="Marcar como pago"
                            >
                              <Check size={16} className="text-green-600" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(f.id)}
                            className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors group"
                            title="Delete charge"
                          >
                            <Trash2
                              size={16}
                              className="text-red-600 group-hover:text-red-700"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
