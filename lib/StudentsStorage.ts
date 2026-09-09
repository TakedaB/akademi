import { apiFetch } from "./apiClient";

export interface Student {
  id: string;
  enrollment_number: string;
  name: string;
  birth_date: string;
  parent_name: string;
  city?: string;
  phone: string;
  email?: string;
  grade: string;
  created_at: string;
  updated_at: string;
}

export interface NewStudentInput {
  name: string;
  birth_date: string;
  parent_name: string;
  city?: string;
  phone: string;
  email?: string;
  grade: string;
}

export async function getStudents(): Promise<Student[]> {
  const res = await apiFetch("/students");
  if (!res.ok) {
    throw new Error("Erro ao buscar alunos");
  }
  return res.json();
}

export async function addStudent(
  newStudent: NewStudentInput,
): Promise<Student> {
  const res = await apiFetch("/students", {
    method: "POST",
    body: JSON.stringify(newStudent),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Erro ao cadastrar aluno");
  }

  return res.json();
}

export async function deleteStudent(id: string): Promise<void> {
  const res = await apiFetch(`/students/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar aluno");
  }
}

const GRADE_COLORS: Record<string, string> = {
  "VII A": "bg-orange-500",
  "VII B": "bg-yellow-500",
  "VII C": "bg-purple-600",
};

export function getGradeColor(grade: string): string {
  return GRADE_COLORS[grade] || "bg-blue-500";
}

export function formatToAmericanDate(isoDate: string): string {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", { timeZone: "UTC" });
}
