'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StudentForm from '../../components/forms/StudentForm';
import ParentForm from '../../components/forms/ParentForm';
import { addStudent } from '@/lib/StudentsStorage';

export default function AddStudentPage() {
  const router = useRouter();
  
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    parentName: '',
    email: '',
    phone: '',
    address: '',
    grade: '',
  });

  const [parent, setParent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    payment: 'cash',
  });

  const handleStudentChange = (field, value) => {
    setStudent(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setParent(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para gerar ID único
  const generateId = () => {
    return '#' + Math.floor(100000000 + Math.random() * 900000000);
  };

  // Função para definir cor do grade
  const getGradeColor = (grade) => {
    const colors = ['bg-orange-500', 'bg-yellow-500', 'bg-purple-600', 'bg-blue-500', 'bg-green-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const formatToAmericanDate = (isoDate) => {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-');
    return `${month}/${day}/${year}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Monta o objeto do novo aluno no formato correto
    const newStudent = {
      id: generateId(),
      name: `${student.firstName} ${student.lastName}`,
      date: formatToAmericanDate(student.dateOfBirth),
      parentName: `${parent.firstName} ${parent.lastName}`,
      city: student.placeOfBirth || 'Jakarta',
      contact: {
        phone: student.phone ? true : false,
        email: student.email ? true : false,
      },
      grade: student.grade || 'VII A',
      gradeColor: getGradeColor(student.grade),
    };

    // Adiciona o aluno ao storage
    addStudent(newStudent);

    // Redireciona para a dashboard
    router.push('/students');
  };

  const handleSaveDraft = () => {
    alert('Draft saved! (Feature not implemented yet)');
  };

  return (
    <div className="min-h-screen bg-[#F3F4FF] pt-8 px-5 pb-5">
      <div className="max-w-full mx-0">
        <h1 className="text-3xl font-bold text-[#303972] mb-6">Add New Student</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seção do estudante */}
          <StudentForm student={student} onChange={handleStudentChange} />

          {/* Seção dos pais */}
          <ParentForm parent={parent} handleParentChange={handleParentChange} />

          {/* Botões de ação */}
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
              className="px-8 py-3 bg-[#6E4AE9] text-white rounded-full font-semibold hover:bg-[#5A3FC0] transition-colors shadow-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}