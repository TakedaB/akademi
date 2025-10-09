'use client';
import { useEffect, useState } from 'react';
import { ChevronDown, Phone, Mail, Trash2 } from 'lucide-react';
import { getStudents, saveStudents } from '@/lib/StudentsStorage';

export default function StudentDashboard() {
  const [selectedSort, setSelectedSort] = useState('Newest');
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;

  useEffect(() => {
    setStudents(getStudents());
  }, []);

  // Função para deletar aluno
  const handleDelete = (studentId) => {
    if (confirm('Are you sure you want to delete this student?')) {
      const updatedStudents = students.filter(student => student.id !== studentId);
      saveStudents(updatedStudents);
      setStudents(updatedStudents);
    }
  };

  // Ordena alunos
  const sortedStudents = [...students].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return selectedSort === 'Newest' ? dateB - dateA : dateA - dateB;
  });

  // Paginação
  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = sortedStudents.slice(startIndex, startIndex + studentsPerPage);

  return (
    <div className="flex h-screen bg-[#F5F3FF]">
      <main className="flex-1 overflow-auto bg-[#F3F4FF]">
        <header className="bg-[#F3F4FF] px-8 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#303972]">Students</h1>

          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setSelectedSort((prev) => (prev === 'Newest' ? 'Oldest' : 'Newest'))
              }
              className="flex items-center gap-2 px-5 py-2.5 border border-[#6E4AE9] text-[#6E4AE9] rounded-full font-medium text-sm bg-white hover:bg-[#F0EBFF] transition-colors"
            >
              <span>{selectedSort}</span>
              <ChevronDown size={16} />
            </button>

            <a
              href="/students/add"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6E4AE9] text-white font-medium text-sm shadow-md hover:bg-[#5A3FC0] transition-all"
            >
              <span className="text-base">+</span>
              <span>New Student</span>
            </a>
          </div>
        </header>

        {/* Tabela */}
        <div className="p-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-white-50 border-b">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#303972]">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">Parent Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">City</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">Grade</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#303972]">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-6 text-gray-400">
                      No students registered yet.
                    </td>
                  </tr>
                ) : (
                  currentStudents.map((student, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-semibold">
                            {student.name.charAt(0)}
                          </div>
                          <span className="font-bold text-lg text-[#303972]">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-[#4D44B5]">{student.id}</td>
                      <td className="px-6 py-4 text-xs font-medium text-[#A098AE]">{student.date}</td>
                      <td className="px-6 py-4 text-xs text-[#303972]">{student.parentName}</td>
                      <td className="px-6 py-4 text-xs text-[#303972]">{student.city}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {student.contact?.phone && (
                            <button className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors">
                              <Phone size={16} className="text-[#4D44B5]" />
                            </button>
                          )}
                          {student.contact?.email && (
                            <button className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors">
                              <Mail size={16} className="text-[#4D44B5]" />
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-4 py-1.5 ${student.gradeColor || 'bg-purple-500'} text-white rounded-full text-sm font-medium inline-block`}
                        >
                          {student.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors group"
                          title="Delete student"
                        >
                          <Trash2 size={16} className="text-red-600 group-hover:text-red-700" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Paginação numérica */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                  currentPage === pageNum
                    ? 'bg-[#6E4AE9] text-white shadow-md'
                    : 'bg-white text-[#6E4AE9] border border-[#6E4AE9] hover:bg-[#F0EBFF]'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}