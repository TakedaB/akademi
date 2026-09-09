const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export type Role = "diretoria" | "financeiro" | "professor" | "aluno";

interface JWTClaims {
  role: Role;
  exp: number;
  [key: string]: unknown;
}

interface LoginResponse {
  token: string;
  role: Role;
}

function decodeJWT(token: string): JWTClaims | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    );
    return decoded as JWTClaims;
  } catch {
    return null;
  }
}

function isExpired(claims: JWTClaims): boolean {
  if (!claims.exp) return false;
  const nowInSeconds = Date.now() / 1000;
  return claims.exp < nowInSeconds;
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message || "E-mail ou senha inválidos");
  }

  const data = await res.json();
  const token: string = data.token;
  const claims = decodeJWT(token);

  if (!token || !claims?.role) {
    throw new Error("Resposta inválida do servidor");
  }

  localStorage.setItem("akademi_token", token);
  localStorage.setItem("akademi_role", claims.role);

  return { token, role: claims.role };
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("akademi_token");
  if (!token) return null;

  const claims = decodeJWT(token);
  if (!claims || isExpired(claims)) {
    logout();
    return null;
  }

  return token;
}

export function getRole(): Role | null {
  // getToken() já valida a expiração; se o token não for mais válido, não faz sentido devolver a role
  if (!getToken()) return null;
  if (typeof window === "undefined") return null;
  return localStorage.getItem("akademi_role") as Role | null;
}

export function logout(): void {
  localStorage.removeItem("akademi_token");
  localStorage.removeItem("akademi_role");
}
