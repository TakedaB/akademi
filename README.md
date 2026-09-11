# Akademi

A school administration dashboard built with Next.js and TypeScript, with role-based access control across four user types: school board (`diretoria`), finance staff (`financeiro`), teachers (`professor`), and students (`aluno`).

**Live app:** [akademi-plum.vercel.app](https://akademi-plum.vercel.app)
**Backend repo:** [akademi-api](https://github.com/TakedaB/akademi-api) (Go + PostgreSQL)

> The app talks to a live Go API deployed on Render's free tier. If data seems to load slowly on first request, that's the free-tier instance spinning up after inactivity (cold start) — subsequent requests are fast.

## Features

- **Split-screen login** — separate visual entry points for students and staff, backed by a single authenticated login flow
- **Role-based UI** — sidebar navigation, page access, and in-page actions (e.g. "New Student", "Delete") are all filtered by the logged-in user's role
- **Dashboard** — at-a-glance summary cards (student/teacher counts, pending charges) tailored to what each role can see
- **Students** — list, register (with parent info and login credentials), delete
- **Teachers** — list, register (creates a login account alongside the teacher record), delete
- **Finance** — charges per student, payment method, due dates, mark-as-paid workflow
- **User profile** — logged-in user's own account details, pulled from the API
- **Auth guard** — protected routes redirect to `/login` if no valid session exists; expired JWTs are detected client-side and clear the session automatically

## Tech Stack

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS
- **Icons:** lucide-react
- **Auth:** JWT-based, decoded and stored client-side
- **Hosting:** Vercel

## Architecture

```
app/
  (auth)/login/        login screen — no sidebar
  (dashboard)/          all authenticated screens — shared sidebar layout
    dashboard/
    students/
    teachers/
    finance/
    user/
  components/
    forms/               reusable form fields, per-entity forms
    Layout/               Sidebar, Logo, MenuItem
    Icons/
lib/
  auth.ts                login, token/role storage, expiry check
  apiClient.ts            fetch wrapper — injects Authorization header
  StudentsStorage.ts       Students API calls + types
  TeachersStorage.ts       Teachers API calls + types
  FinanceStorage.ts        Finance API calls + types
  UserStorage.ts           current-user profile
```

Route groups (`(auth)` / `(dashboard)`) let each area of the app have its own layout — the login screen renders full-bleed with no sidebar, while every authenticated page shares the sidebar + auth guard defined once in `(dashboard)/layout.tsx`.

## Role-Based Access Control

| Screen                        | Aluno | Professor | Financeiro | Diretoria |
| ----------------------------- | :---: | :-------: | :--------: | :-------: |
| Dashboard                     |  ✅   |    ✅     |     ✅     |    ✅     |
| Students (view)               |  ❌   |    ✅     |     ✅     |    ✅     |
| Students (create/edit/delete) |  ❌   |    ❌     |     ✅     |    ✅     |
| Teachers (view)               |  ✅   |    ✅     |     ✅     |    ✅     |
| Teachers (create/delete)      |  ❌   |    ❌     |     ❌     |    ✅     |
| Finance                       |  ❌   |    ❌     |     ✅     |    ✅     |
| User (own profile)            |  ✅   |    ✅     |     ✅     |    ✅     |

RBAC is enforced twice: visually in the sidebar/page (hiding what a role shouldn't see or do) and authoritatively on the backend (every endpoint validates the role independently — the frontend restriction is a UX convenience, not the security boundary).

## Local Setup

**Requirements:** Node.js 18+, the [akademi-api](https://github.com/TakedaB/akademi-api) backend running locally or accessible remotely

```bash
git clone https://github.com/TakedaB/akademi.git
cd akademi
npm install

# point at your backend
echo "NEXT_PUBLIC_API_URL=http://localhost:8080" > .env.local

npm run dev
```

Opens on `http://localhost:3000`.

## Environment Variables

| Variable              | Required | Description                  |
| --------------------- | -------- | ---------------------------- |
| `NEXT_PUBLIC_API_URL` | Yes      | Base URL of the backend API. |

## Known Limitations / Future Improvements

- **JWT stored in `localStorage`** — simpler to implement than `httpOnly` cookies, but more exposed to XSS. A production-grade version would move the token to an `httpOnly` cookie set by the backend.
- **No client-side password strength validation** — any password is accepted on registration forms.
- **No logout across devices / token revocation** — logging out clears the local session, but the JWT itself remains valid until it expires (this is a backend limitation the frontend inherits).
- **Teacher's assigned class is single-value** — the UI reflects a backend limitation where a teacher can only be linked to one class at a time.
- **Sidebar's "Dashboard" link and the actual Dashboard page** were added mid-project to resolve routing/highlight inconsistencies — a fully role-aware dashboard (per-role widgets) is functional but intentionally minimal.
