"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  GraduationCap,
  Building2,
  ArrowRight,
  Loader2,
  LucideIcon,
} from "lucide-react";
import { login } from "@/lib/auth";

type SideKey = "aluno" | "admin";

interface Side {
  key: SideKey;
  label: string;
  subtitle: string;
  icon: LucideIcon;
  image: string;
  overlay: string;
  ring: string;
}

const SIDES: Record<SideKey, Side> = {
  aluno: {
    key: "aluno",
    label: "Portal do Aluno",
    subtitle: "Acompanhe suas turmas e informações",
    icon: GraduationCap,
    image: "/images/aluno.jpg",
    overlay: "from-[#6E4AE9]/60 to-[#2A1868]/85",
    ring: "focus:ring-[#6E4AE9]",
  },
  admin: {
    key: "admin",
    label: "Área Administrativa",
    subtitle: "Professores, financeiro e diretoria",
    icon: Building2,
    image: "/images/adm.jpg",
    overlay: "from-[#303972]/65 to-[#14182E]/85",
    ring: "focus:ring-[#303972]",
  },
};

export default function LoginPage() {
  const router = useRouter();
  const [active, setActive] = useState<SideKey | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (side: SideKey) => {
    setActive(side);
    setError(null);
  };

  const handleBack = () => {
    setActive(null);
    setEmail("");
    setPassword("");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(email, password);
      router.push("/students");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao entrar");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#F3F4FF]">
      {Object.values(SIDES).map((side) => {
        const Icon = side.icon;
        const isActive = active === side.key;
        const isCollapsed = active !== null && active !== side.key;

        return (
          <div
            key={side.key}
            onClick={() => !active && handleSelect(side.key)}
            onMouseEnter={(e) => {
              if (!active) {
                const img =
                  e.currentTarget.querySelector<HTMLElement>(".bg-photo");
                if (img) img.style.transform = "scale(1.06)";
              }
            }}
            onMouseLeave={(e) => {
              if (!active) {
                const img =
                  e.currentTarget.querySelector<HTMLElement>(".bg-photo");
                if (img) img.style.transform = "scale(1)";
              }
            }}
            className={`relative h-full transition-all duration-500 ease-in-out overflow-hidden ${
              !active ? "cursor-pointer" : ""
            } ${isCollapsed ? "w-[6%] min-w-[64px] cursor-pointer" : active ? "w-[94%]" : "w-1/2"}`}
          >
            <div className="bg-photo absolute inset-0 transition-transform duration-700 ease-out">
              <Image
                src={side.image}
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div
              className={`absolute inset-0 bg-gradient-to-b ${side.overlay}`}
            />

            {isCollapsed && (
              <button
                onClick={handleBack}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/90 hover:text-white transition-colors"
                aria-label={`Voltar para ${side.label}`}
              >
                <Icon size={22} />
                <span className="text-xs font-medium tracking-wide [writing-mode:vertical-rl] rotate-180">
                  {side.label}
                </span>
              </button>
            )}

            {!active && (
              <div className="relative h-full flex flex-col items-center justify-center gap-5 text-white px-8">
                <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <Icon size={32} />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold">{side.label}</h2>
                  <p className="text-sm text-white/75 mt-1">{side.subtitle}</p>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium">
                  Entrar <ArrowRight size={16} />
                </span>
              </div>
            )}

            {isActive && (
              <div className="relative h-full flex items-center justify-center px-6">
                <div className="w-full max-w-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
                      A
                    </div>
                    <span className="text-white font-semibold text-lg">
                      Akademi
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-1 text-white/70">
                    <Icon size={18} />
                    <span className="text-sm font-medium">{side.label}</span>
                  </div>
                  <h1 className="text-2xl font-semibold text-white mb-8">
                    Entrar na sua conta
                  </h1>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div>
                      <label className="block text-sm text-white/80 mb-1.5">
                        E-mail
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={`w-full px-4 py-2.5 rounded-lg bg-white/15 border border-white/25 text-white placeholder-white/50 outline-none focus:ring-2 focus:bg-white/20 transition-all ${side.ring}`}
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-white/80 mb-1.5">
                        Senha
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={`w-full px-4 py-2.5 rounded-lg bg-white/15 border border-white/25 text-white placeholder-white/50 outline-none focus:ring-2 focus:bg-white/20 transition-all ${side.ring}`}
                        placeholder="••••••••"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-300 bg-red-500/10 border border-red-400/30 rounded-lg px-3 py-2">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-white text-[#303972] font-medium py-2.5 rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {submitting ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <>
                          Entrar <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-full text-sm text-white/70 hover:text-white transition-colors pt-1"
                    >
                      Escolher outro acesso
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
