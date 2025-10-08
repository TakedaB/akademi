'use client';
import { useState } from 'react';
import StudentForm from '../../components/forms/StudentForm';
import ParentForm from '../../components/forms/ParentForm';
import PaymentOptions from '../../components/forms/PaymentOptions';

export default function AddStudentPage() {
    const [student, setStudent] = useState({});
    const [parent, setParent] = useState({});

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudent((s) => ({ ...s, [name]: value }));
  };

  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setParent((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Student Data:', student);
    console.log('Parent Data:', parent);
  
  };

  return (
    <div className="p-3 bg-[#F5F6FB] min-h-screen">
      <div className="w-full px-3">
        <h1 className="text-2xl font-bold mb-8 text-[#303972]">Add New Student</h1>

        {/* Formulário principal */}
        <form onSubmit={handleSubmit} className='space-y-8 w-full'> 
              {/* Seção do estudante */}
          <StudentForm student={student} onChange={handleStudentChange} />
                {/* Seção dos pais */}
            <ParentForm parent={parent} onChange={handleParentChange} />

             
             <div className='flex justify-end gap-4 pt-2'>
                <button
                    type='button'
                    className='px-6 py-2 rounded-full border border-gray-300 text-[#303972] bg-white hover:bg-gray-100 transition'
                >
                    Save as Draft
                </button>
                <button
                    type="submit"
                    className='px-6 py-2 rounded-full bg-[#4C1D95] text-white hover:bg-[#3a1370] transition'
                 >
                    Submit
                </button>
            </div>
        </form> 
      </div>
    </div>
  );
}
