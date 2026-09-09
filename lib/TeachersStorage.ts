import { apiFetch } from "./apiClient";

export interface Teacher {
  id: string;
  user_id: string;
  name: string;
  email: string;
  subject: string;
  phone: string;
  hire_date: string;
  class_assigned: string;
  workload_hours: number;
  created_at: string;
  updated_at: string;
}

export interface NewTeacherInput {
  name: string;
  email: string;
  password: string;
  subject: string;
  phone: string;
  hire_date: string;
  class_assigned: string;
  workload_hours: number;
}

export async function getTeachers(): Promise<Teacher[]> {
  const res = await apiFetch("/teachers");
  if (!res.ok) {
    throw new Error("Erro ao buscar professores");
  }
  return res.json();
}

export async function addTeacher(
  newTeacher: NewTeacherInput,
): Promise<Teacher> {
  const res = await apiFetch("/teachers", {
    method: "POST",
    body: JSON.stringify(newTeacher),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Erro ao cadastrar professor");
  }

  return res.json();
}

export async function deleteTeacher(id: string): Promise<void> {
  const res = await apiFetch(`/teachers/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar professor");
  }
}
