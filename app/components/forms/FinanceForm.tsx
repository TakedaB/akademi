"use client";

import InputField from "./InputField";
import { Student } from "@/lib/StudentsStorage";
import { PaymentMethod, FinanceStatus } from "@/lib/FinanceStorage";

export interface FinanceFormData {
  studentId: string;
  description: string;
  amount: string;
  paymentMethod: PaymentMethod;
  status: FinanceStatus;
  dueDate: string;
}

interface FinanceFormProps {
  finance: FinanceFormData;
  students: Student[];
  onChange: (field: string, value: string) => void;
}

const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: "cash", label: "Dinheiro" },
  { value: "pix", label: "Pix" },
  { value: "cartao", label: "Cartão" },
  { value: "boleto", label: "Boleto" },
  { value: "transferencia", label: "Transferência" },
];

const STATUS_OPTIONS: { value: FinanceStatus; label: string }[] = [
  { value: "pendente", label: "Pendente" },
  { value: "pago", label: "Pago" },
  { value: "atrasado", label: "Atrasado" },
  { value: "isento", label: "Isento (bolsista)" },
];

export default function FinanceForm({
  finance,
  students,
  onChange,
}: FinanceFormProps) {
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.name, e.target.value);
  };

  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e,
  ) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <div className="bg-white rounded-xl shadow p-0 border border-gray-200 overflow-hidden">
      <div className="bg-[#4D44B5] px-6 py-3">
        <h2 className="text-white text-lg font-semibold">Charge Details</h2>
      </div>

      <div className="p-6 grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label className="text-[#303972] font-medium">Aluno *</label>
          <select
            name="studentId"
            value={finance.studentId}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none text-[#303972]"
            required
          >
            <option value="">Selecione um aluno</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.enrollment_number})
              </option>
            ))}
          </select>
        </div>

        <InputField
          label="Descrição *"
          name="description"
          value={finance.description}
          onChange={handleInputChange}
          placeholder="Mensalidade Março"
        />

        <InputField
          label="Valor (R$) *"
          name="amount"
          type="number"
          value={finance.amount}
          onChange={handleInputChange}
          placeholder="450"
        />

        <div className="flex flex-col gap-1">
          <label className="text-[#303972] font-medium">
            Forma de pagamento *
          </label>
          <select
            name="paymentMethod"
            value={finance.paymentMethod}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none text-[#303972]"
            required
          >
            {PAYMENT_METHODS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[#303972] font-medium">Status *</label>
          <select
            name="status"
            value={finance.status}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none text-[#303972]"
            required
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <InputField
          label="Data de vencimento *"
          name="dueDate"
          type="date"
          value={finance.dueDate}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
