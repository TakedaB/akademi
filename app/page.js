'use client'
import React, {useState} from 'react';
import { Home, Users, UserPlus, BookOpen, DollarSign, User, Phone, Mail, ChevronDown } from 'lucide-react'

export default function StudentDashboard() {
  const [selectedSort, setSelectedSort] = useState('Newest');

  const students = [
    {
// ficar atento ao gradeColor quando renderizar
      id: 1,
      name: 'Bruno Takeda',
      studentId: '#123456789',
      date:'March 25, 2001',
      parentName: 'Ranni Williams',
      city: 'Jakarta',
      contact:{ phone: true, email: true },
      grade: 'VII A',
      gradeColor: 'bg-orange-500'   
    },
     {
// ficar atento ao gradeColor quando renderizar
      id: 2,
      name: 'Miquella Soap',
      studentId: '#123456789',
      date:'March 25, 2001',
      parentName: 'Marika Soap',
      city: 'Jakarta',
      contact:{ phone: true, email: true },
      grade: 'VII B',
      gradeColor: 'bg-yellow-500'   
    },
        {
// ficar atento ao gradeColor quando renderizar
      id: 3,
      name: 'Malenia Hope',
      studentId: '#123456789',
      date:'March 25, 2001',
      parentName: 'Radagon Soap',
      city: 'Jakarta',
      contact:{ phone: true, email: true },
      grade: 'VII C',
      gradeColor: 'bg-purple-600'   
    },
        {
// ficar atento ao gradeColor quando renderizar
      id: 4,
      name: 'Renalla Nico',
      studentId: '#123456789',
      date:'March 25, 2001',
      parentName: 'Rellana Nico',
      city: 'Jakarta',
      contact:{ phone: true, email: true },
      grade: 'VII A',
      gradeColor: 'bg-yellow-500'   
    },
        {
// ficar atento ao gradeColor quando renderizar
      id: 5,
      name: 'Hyetta Adja',
      studentId: '#123456789',
      date:'March 25, 2001',
      parentName: 'Lyetta Adja',
      city: 'Jakarta',
      contact:{ phone: true, email: true },
      grade: 'VII A',
      gradeColor: 'bg-orange-500'   
    },
        {
// ficar atento ao gradeColor quando renderizar
      id: 6,
      name: 'Erina Ahmad',
      studentId: '#123456789',
      date:'March 25, 2001',
      parentName: 'Sebastian Ahmad',
      city: 'Jakarta',
      contact:{ phone: true, email: true },
      grade: 'VII A',
      gradeColor: 'bg-yellow-500'   
    },
  ];

  return (
    <div className='flex h-screen bg-gray-100'>
      {/*sidebar */}
      <aside className='w-80 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white flex flex-col'>
        {/*Logo */}
        <div className='p-6 flex items-center gap-3'>
          <div className='w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-lg'>
            A
          </div>
          <span className='text-xl font-bold'>Akademi</span>
        </div>

      {/*Menu items icones */}
      <nav className='flex-1 px-4'>
        <MenuItem icon={<Home size={20} />} label='Dashboard' />
        <MenuItem icon={<Users size={20} />} label='Students' />
        <MenuItem icon={<UserPlus size={20} />} label='Add Student' />
        <MenuItem icon={<BookOpen size={20} />} label='Teachers' />
        <MenuItem icon={<DollarSign size={20} />} label='Finance' />
        <MenuItem icon={<User size={20} />} label='User' />
      </nav>
      </aside>

      {/*Main Context */}
      <main className='flex-1 overflow-auto'>
        {/*Header */}
        <header className='bg-white border-b px-8 py-6'>
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold text-gray-800'>Students</h1>

            <div className='flex items-center gap-4'>
              {/*sort dropdown */}
              <div className='relative'>
                <button className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50'>
                  <span className='text-gray-700'>{selectedSort}</span>
                  <ChevronDown size={16} className='text-gray-500' />
                </button>
              </div>

              {/*New student button */}
              <button className='flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium'>
                <span className='text-xl'>+</span>
                <span>New Student</span>
              </button>
            </div>
          </div>
        </header>

        {/*Table */}
        <div className='p-8'>
          <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
            <table className='w-full'>
              <thead>
                <tr className='bg-gray-50 border-b'>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-purple-600'>Name</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-purple-600'>ID</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-purple-600'>Date</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-purple-600'>Parent Name</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-purple-600'>City</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-purple-600'>Contact</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-purple-600'>Grade</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id} className='border-b hover:bg-gray-50 transition-colors'>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-semibold'>
                          {student.name.charAt(0)}
                        </div>
                        <span className='font-medium text-gray-800'>{student.name}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-indigo-600 font-medium'>{student.studentId}</td>
                    <td className='px-6 py-4 text-gray-600'>{student.date}</td>
                    <td className='px-6 py-4 text-gray-600'>{student.parentName}</td>
                    <td className='px-6 py-4 text-gray-600'>{student.city}</td>
                    <td className='px-6 py-4'>
                      <div className='flex gap-2'>
                        <button className='w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center hover:bg-indigo-200 transition-colors'>
                          <Phone size={16} className='text-indigo-600'/>
                        </button>
                        <button className='w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center hover:bg-indigo-200 transition-colors'>
                          <Mail size={16} className='text-indigo-600'/>
                        </button>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <span className={`px-4 py-1.5 ${student.gradeColor} text-white rounded-full text-sm font-medium inline-block`}>
                        {student.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/*Pagination */}
            <div className='px-6 py-4 flex items-center justify-center gap-2 border-t'>
              <button className='w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg'>
                {'<'}
              </button>
              <button className='w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-lg font-medium'>
                1
              </button>
              <button className='w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg'>
                2
              </button>
              <button className='w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg'>
                3
              </button>
              <button className='w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg'>
                {'>'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function MenuItem({ icon, label, active = false }) {
  return (
    <button
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
      active
      ? 'bg-indigo-700 text-white'
      : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
    }`}
    >
      {icon}
      <span className='font-medium'>{label}</span>
    </button>
  );
}
