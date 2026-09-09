"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe, UserProfile } from "@/lib/UserStorage";
import { logout } from "@/lib/auth";

const ROLE_LABELS: Record<string, string> = {
  diretoria: "Diretoria",
  financeiro: "Financeiro",
  professor: "Professor",
  aluno: "Aluno",
};

export default function UserPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMe()
      .then(setProfile)
      .catch((err) =>
        setError(
          err instanceof Error ? err.message : "Erro ao carregar perfil",
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (loading) {
    return <div className="p-8 text-[#303972]">Carregando...</div>;
  }

  if (error || !profile) {
    return (
      <div className="p-8">
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error || "Não foi possível carregar seu perfil."}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4FF] pt-8 px-5 pb-5">
      <h1 className="text-3xl font-bold text-[#303972] mb-6">My Profile</h1>

      <div className="bg-white rounded-xl shadow p-0 border border-gray-200 overflow-hidden max-w-lg">
        <div className="bg-[#4D44B5] px-6 py-8 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white text-3xl font-bold mb-3">
            {profile.name.charAt(0)}
          </div>
          <h2 className="text-white text-xl font-semibold">{profile.name}</h2>
          <span className="text-white/70 text-sm">
            {ROLE_LABELS[profile.role] || profile.role}
          </span>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-[#A098AE] mb-1">
              E-mail
            </label>
            <p className="text-[#303972]">{profile.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#A098AE] mb-1">
              Perfil de acesso
            </label>
            <p className="text-[#303972]">
              {ROLE_LABELS[profile.role] || profile.role}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#A098AE] mb-1">
              Conta criada em
            </label>
            <p className="text-[#303972]">
              {new Date(profile.created_at).toLocaleDateString("pt-BR")}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 px-6 py-2.5 bg-red-100 text-red-600 rounded-full font-medium text-sm hover:bg-red-200 transition-colors self-start"
          >
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
}
