"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FinanceForm, {
  FinanceFormData,
} from "../../../components/forms/FinanceForm";
import { addFinance, NewFinanceInput } from "@/lib/FinanceStorage";
import { getStudents, Student } from "@/lib/StudentsStorage";

export default function AddFinancePage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [finance, setFinance] = useState<FinanceFormData>({
    studentId: "",
    description: "",
    amount: "",
    paymentMethod: "pix",
    status: "pendente",
    dueDate: "",
  });

  useEffect(() => {
    getStudents().then(setStudents).catch(console.error);
  }, []);

  const handleChange = (field: string, value: string) => {
    setFinance((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const newFinance: NewFinanceInput = {
      student_id: finance.studentId,
      description: finance.description,
      amount: Number(finance.amount) || 0,
      payment_method: finance.paymentMethod,
      status: finance.status,
      due_date: finance.dueDate ? `${finance.dueDate}T00:00:00Z` : "",
    };

    try {
      await addFinance(newFinance);
      router.push("/finance");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar cobrança");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4FF] pt-8 px-5 pb-5">
      <div className="max-w-full mx-0">
        <h1 className="text-3xl font-bold text-[#303972] mb-6">New Charge</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <FinanceForm
            finance={finance}
            students={students}
            onChange={handleChange}
          />

          <div className="flex gap-4 justify-end pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-[#6E4AE9] text-white rounded-full font-semibold hover:bg-[#5A3FC0] transition-colors shadow-md disabled:opacity-50"
            >
              {submitting ? "Salvando..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
