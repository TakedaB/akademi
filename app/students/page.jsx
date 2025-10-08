'use client';

import { useState } from 'react';
import { ChevronDown, Phone, Mail } from 'lucide-react';

export default function StudentDashboard() {
  const [selectedSort, setSelectedSort] = useState('Newest');

  const studentsData = [
    { id: '#123456788', name: 'Gideon Williams', date: '2020-03-23', parentName: 'Ranni Williams', city: 'Jakarta', contact: { phone: true, email: true }, grade: 'VII A', gradeColor: 'bg-orange-500' },
    { id: '#123456784', name: 'Miquella Soap', date: '2019-04-25', parentName: 'Marika Soap', city: 'Jakarta', contact: { phone: true, email: true }, grade: 'VII B', gradeColor: 'bg-yellow-500' },
    { id: '#123456778', name: 'Malenia Hope', date: '2023-01-15', parentName: 'Radagon Hope', city: 'Jakarta', contact: { phone: true, email: true }, grade: 'VII C', gradeColor: 'bg-purple-600' },
    { id: '#123456769', name: 'Renalla Nico', date: '2022-07-10', parentName: 'Rellana Nico', city: 'Jakarta', contact: { phone: true, email: true }, grade: 'VII A', gradeColor: 'bg-yellow-500' },
    { id: '#123456779', name: 'Hyetta Adja', date: '2017-02-03', parentName: 'Lyetta Adja', city: 'Jakarta', contact: { phone: true, email: true }, grade: 'VII A', gradeColor: 'bg-orange-500' },
    { id: '#123456729', name: 'Erina Ahmad', date: '2019-05-12', parentName: 'Sebastian Ahmad', city: 'Jakarta', contact: { phone: true, email: true }, grade: 'VII A', gradeColor: 'bg-yellow-500' },
  ];

  const sortedStudents = [...studentsData].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return selectedSort === 'Newest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="flex h-screen bg-[#F5F3FF]">
      <main className=" flex-1 overflow-auto bg-[#F3F4FF]">

        <header className="bg-[#F3F4FF] px-8 py-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-[#303972]">Students</h1>

            <div className="flex items-center gap-4">
                <div className="relative">
                  <button
                    onClick={() =>
                      setSelectedSort((prev) => (prev === 'Newest' ? 'Oldest' : 'Newest'))
                    }
                    className="flex items-center gap-2 px-5 py-2.5 border border-[#6E4AE9] text-[#6E4AE9] rounded-full font-medium text-sm bg-white hover:bg-[#F0EBFF] transition-colors"
                  >
                    <span>{selectedSort}</span>
                    <ChevronDown size={16} />
                </button>
             </div>

                <button className='flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6E4AE9] text-white font-medium text-sm shadow-md hover:bg-[#5A3FC0] transition-all'>
                  <span className='text-base'>+</span>
                  <span>New Student</span>
                </button>
              </div>
          </header>

        {/* Table */}
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
                </tr>
              </thead>
              
              <tbody>
                {sortedStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-semibold">
                          {student.name.charAt(0)}
                        </div>
                        <span className="font-bold text-lg text-[#303972]">{student.name}</span>
                      </div>
                    </td>

                    {/* ID */}
                    <td className="px-6 py-4 text-sm font-medium text-[#4D44B5]">
                      {student.id}
                    </td>

                    <td className="px-6 py-4 text-xs font-medium text-[#A098AE]">{student.date}</td>
                    <td className="px-6 py-4 text-xs text-[#303972]">{student.parentName}</td>
                    <td className="px-6 py-4 text-xs text-[#303972]">{student.city}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors">
                          <Phone size={16} className="text-[#4D44B5]" />
                        </button>
                        <button className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors">
                          <Mail size={16} className="text-[#4D44B5]" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-4 py-1.5 ${student.gradeColor} text-white rounded-full text-sm font-medium inline-block`}
                      >
                        {student.grade}
                      </span>
                    </td>
                  </tr>
                ))}
</tbody>

            </table>

            {/* Pagination */}
            <div className="px-6 py-4 flex items-center justify-end gap-2 border-t">
              <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-full">
                {'<'}
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-full font-medium">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full">
                3
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-full">
                {'>'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
