"use client";

import InputField from "./InputField";

export interface TeacherFormData {
  name: string;
  email: string;
  password: string;
  subject: string;
  phone: string;
  hireDate: string;
  classAssigned: string;
  workloadHours: string;
}

interface TeacherFormProps {
  teacher: TeacherFormData;
  onChange: (field: string, value: string) => void;
}

export default function TeacherForm({ teacher, onChange }: TeacherFormProps) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <div className="bg-white rounded-xl shadow p-0 border border-gray-200 overflow-hidden">
      <div className="bg-[#4D44B5] px-6 py-3">
        <h2 className="text-white text-lg font-semibold">Teacher Details</h2>
      </div>

      <div className="p-6 grid grid-cols-2 gap-6">
        <InputField
          label="Nome *"
          name="name"
          value={teacher.name}
          onChange={handleChange}
          placeholder="Carlos Mendes"
        />

        <InputField
          label="E-mail *"
          name="email"
          type="email"
          value={teacher.email}
          onChange={handleChange}
          placeholder="carlos@akademi.com"
        />

        <InputField
          label="Senha inicial *"
          name="password"
          type="password"
          value={teacher.password}
          onChange={handleChange}
          placeholder="Defina uma senha temporária"
        />

        <InputField
          label="Disciplina *"
          name="subject"
          value={teacher.subject}
          onChange={handleChange}
          placeholder="Matemática"
        />

        <InputField
          label="Telefone *"
          name="phone"
          type="tel"
          value={teacher.phone}
          onChange={handleChange}
          placeholder="91988887777"
        />

        <InputField
          label="Data de contratação *"
          name="hireDate"
          type="date"
          value={teacher.hireDate}
          onChange={handleChange}
        />

        <InputField
          label="Turma *"
          name="classAssigned"
          value={teacher.classAssigned}
          onChange={handleChange}
          placeholder="VII A"
        />

        <InputField
          label="Carga horária (h/semana) *"
          name="workloadHours"
          type="number"
          value={teacher.workloadHours}
          onChange={handleChange}
          placeholder="20"
        />
      </div>

      <div className="px-6 pb-4">
        <p className="text-xs text-gray-400">
          A senha definida aqui é a senha inicial de acesso do professor —
          comunique a ele por fora do sistema (WhatsApp, presencial, etc.).
        </p>
      </div>
    </div>
  );
}
