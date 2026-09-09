import { apiFetch } from "./apiClient";

export type PaymentMethod =
  | "cash"
  | "pix"
  | "cartao"
  | "boleto"
  | "transferencia";
export type FinanceStatus = "pendente" | "pago" | "atrasado" | "isento";

export interface Finance {
  id: string;
  student_id: string;
  description: string;
  amount: number;
  payment_method: PaymentMethod;
  status: FinanceStatus;
  due_date: string;
  created_at: string;
  updated_at: string;
}

export interface NewFinanceInput {
  student_id: string;
  description: string;
  amount: number;
  payment_method: PaymentMethod;
  status: FinanceStatus;
  due_date: string;
}

export async function getFinances(): Promise<Finance[]> {
  const res = await apiFetch("/finance");
  if (!res.ok) {
    throw new Error("Erro ao buscar cobranças");
  }
  return res.json();
}

export async function addFinance(
  newFinance: NewFinanceInput,
): Promise<Finance> {
  const res = await apiFetch("/finance", {
    method: "POST",
    body: JSON.stringify(newFinance),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Erro ao criar cobrança");
  }

  return res.json();
}

export async function updateFinanceStatus(
  id: string,
  status: FinanceStatus,
): Promise<Finance> {
  const res = await apiFetch(`/finance/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Erro ao atualizar cobrança");
  }

  return res.json();
}

export async function deleteFinance(id: string): Promise<void> {
  const res = await apiFetch(`/finance/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar cobrança");
  }
}
