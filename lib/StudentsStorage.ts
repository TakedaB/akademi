const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Student {
  id: string;
  name: string;
  date: string;
  parentName: string;
  city: string;
  contact: {
    phone: string;
    email?: string;
  };
  grade: string;
  gradeColor?: string;
}

export type NewStudentInput = Omit<Student, "id" | "gradeColor">;

export async function getStudents(): Promise<Student[]> {
  const res = await fetch(`${API_URL}/students`);
  if (!res.ok) {
    throw new Error("Erro ao buscar alunos");
  }
  return res.json();
}

export async function addStudent(
  newStudent: NewStudentInput,
): Promise<Student> {
  const res = await fetch(`${API_URL}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newStudent),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Erro ao cadastrar aluno");
  }

  return res.json();
}

export async function deleteStudent(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/students/${id}`, {
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
