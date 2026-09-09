import { apiFetch } from "./apiClient";
import { Role } from "./auth";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  created_at: string;
  updated_at: string;
}

export async function getMe(): Promise<UserProfile> {
  const res = await apiFetch("/me");
  if (!res.ok) {
    throw new Error("Erro ao buscar perfil");
  }
  return res.json();
}
