"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TeacherForm, {
  TeacherFormData,
} from "../../../components/forms/TeacherForm";
import { addTeacher, NewTeacherInput } from "@/lib/TeachersStorage";

export default function AddTeacherPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [teacher, setTeacher] = useState<TeacherFormData>({
    name: "",
    email: "",
    password: "",
    subject: "",
    phone: "",
    hireDate: "",
    classAssigned: "",
    workloadHours: "",
  });

  const handleChange = (field: string, value: string) => {
    setTeacher((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const newTeacher: NewTeacherInput = {
      name: teacher.name,
      email: teacher.email,
      password: teacher.password,
      subject: teacher.subject,
      phone: teacher.phone,
      hire_date: teacher.hireDate ? `${teacher.hireDate}T00:00:00Z` : "",
      class_assigned: teacher.classAssigned,
      workload_hours: Number(teacher.workloadHours) || 0,
    };

    try {
      await addTeacher(newTeacher);
      router.push("/teachers");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao cadastrar professor",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4FF] pt-8 px-5 pb-5">
      <div className="max-w-full mx-0">
        <h1 className="text-3xl font-bold text-[#303972] mb-6">
          Add New Teacher
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <TeacherForm teacher={teacher} onChange={handleChange} />

          <div className="flex gap-4 justify-end pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-[#6E4AE9] text-white rounded-full font-semibold hover:bg-[#5A3FC0] transition-colors shadow-md disabled:opacity-50"
            >
              {submitting ? "Salvando..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
