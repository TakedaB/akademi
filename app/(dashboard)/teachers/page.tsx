"use client";

import { useEffect, useState } from "react";
import { Phone, Mail, Trash2 } from "lucide-react";
import { getTeachers, deleteTeacher, Teacher } from "@/lib/TeachersStorage";
import { getRole } from "@/lib/auth";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [canManage, setCanManage] = useState(false);

  useEffect(() => {
    const role = getRole();
    setCanManage(role === "diretoria");
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      setLoading(true);
      const data = await getTeachers();
      setTeachers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (teacherId: string) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      try {
        await deleteTeacher(teacherId);
        setTeachers((prev) => prev.filter((t) => t.id !== teacherId));
      } catch (err) {
        alert("Erro ao deletar professor");
      }
    }
  };

  if (loading) {
    return <div className="p-8 text-[#303972]">Carregando...</div>;
  }

  return (
    <div className="flex h-screen bg-[#F5F3FF]">
      <main className="flex-1 overflow-auto bg-[#F3F4FF]">
        <header className="bg-[#F3F4FF] px-8 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#303972]">Teachers</h1>

          {canManage && (
            <a
              href="/teachers/add"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6E4AE9] text-white font-medium text-sm shadow-md hover:bg-[#5A3FC0] transition-all"
            >
              <span className="text-base">+</span>
              <span>New Teacher</span>
            </a>
          )}
        </header>

        <div className="p-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-white-50 border-b">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">
                    Class
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">
                    Workload
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">
                    Contact
                  </th>
                  {canManage && (
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {teachers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={canManage ? 6 : 5}
                      className="text-center py-6 text-gray-400"
                    >
                      No teachers registered yet.
                    </td>
                  </tr>
                ) : (
                  teachers.map((teacher) => (
                    <tr
                      key={teacher.id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-semibold">
                            {teacher.name.charAt(0)}
                          </div>
                          <span className="font-bold text-lg text-[#303972]">
                            {teacher.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#303972]">
                        {teacher.subject}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#303972]">
                        {teacher.class_assigned}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#303972]">
                        {teacher.workload_hours}h
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {teacher.phone && (
                            <button className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors">
                              <Phone size={16} className="text-[#4D44B5]" />
                            </button>
                          )}
                          {teacher.email && (
                            <button className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors">
                              <Mail size={16} className="text-[#4D44B5]" />
                            </button>
                          )}
                        </div>
                      </td>
                      {canManage && (
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(teacher.id)}
                            className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors group"
                            title="Delete teacher"
                          >
                            <Trash2
                              size={16}
                              className="text-red-600 group-hover:text-red-700"
                            />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
