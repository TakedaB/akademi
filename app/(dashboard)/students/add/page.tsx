"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StudentForm, {
  StudentFormData,
} from "../../../components/forms/StudentForm";
import ParentForm, {
  ParentFormData,
} from "../../../components/forms/ParentForm";
import { addStudent, NewStudentInput } from "@/lib/StudentsStorage";

export default function AddStudentPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [student, setStudent] = useState<StudentFormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    parentName: "",
    email: "",
    phone: "",
    address: "",
    grade: "",
  });

  const [parent, setParent] = useState<ParentFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    payment: "cash",
  });

  const handleStudentChange = (field: string, value: string) => {
    setStudent((prev) => ({ ...prev, [field]: value }));
  };

  const handleParentChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setParent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const newStudent: NewStudentInput = {
      name: `${student.firstName} ${student.lastName}`,
      email: student.email || "",
      password: student.password || "",
      birth_date: student.dateOfBirth ? `${student.dateOfBirth}T00:00:00Z` : "",
      parent_name: `${parent.firstName} ${parent.lastName}`,
      city: student.placeOfBirth || undefined,
      phone: student.phone || "",
      grade: student.grade || "VII A",
    };

    try {
      await addStudent(newStudent);
      router.push("/students");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao cadastrar aluno");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    alert("Draft saved! (Feature not implemented yet)");
  };

  return (
    <div className="min-h-screen bg-[#F3F4FF] pt-8 px-5 pb-5">
      <div className="max-w-full mx-0">
        <h1 className="text-3xl font-bold text-[#303972] mb-6">
          Add New Student
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <StudentForm student={student} onChange={handleStudentChange} />
          <ParentForm parent={parent} handleParentChange={handleParentChange} />

          <div className="flex gap-4 justify-end pt-4">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-8 py-3 bg-white border-2 border-[#6E4AE9] text-[#6E4AE9] rounded-full font-semibold hover:bg-[#F0EBFF] transition-colors"
            >
              Save as Draft
            </button>
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
