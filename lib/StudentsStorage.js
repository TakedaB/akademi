const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getStudents() {
  const res = await fetch(`${API_URL}/students`);
  if (!res.ok) {
    throw new Error("Erro ao buscar alunos");
  }
  return res.json();
}

export async function addStudent(newStudent) {
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

export async function deleteStudent(id) {
  const res = await fetch(`${API_URL}/students/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar aluno");
  }
}

const GRADE_COLORS = {
  "VII A": "bg-orange-500",
  "VII B": "bg-yellow-500",
  "VII C": "bg-purple-600",
};

export function getGradeColor(grade) {
  return GRADE_COLORS[grade] || "bg-blue-500";
}

export function formatToAmericanDate(isoDate) {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", { timeZone: "UTC" });
}
