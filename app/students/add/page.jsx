'use client';
import { useState } from 'react';

export default function AddStudentPage () {
    const [student, setStudent] = useState({
        firstName:"",
        lastName:"",
        dateOfBirth:"",
        placeOfBirth:"",
        parentName:"",
        email:"",
        phone:"",
        address:"",
    });

    const [parent, setParent] = useState({
        firstName:"",
        lastName:"",
        email:"",
        phone:"",
        address:"",
        payment:"",
    });

    const handleStudentChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleParentChange = (e) => {
        setParent({ ...parent, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Student Data:', student);
        console.log('Parent Data:', parent);
    };

    return (
        <div className='p-8 bg-[#F5F6FB] min-h-screen'>
            <h1 className='text-2xl font font-bold mb-8 text-[#0D0E25]'>
                Add New Student
            </h1>

            <form onSubmit={handleSubmit} className='space-y-8 max-w-6xl'>
                {/*Student Details */}
                <div className='bg-white rounded-xl shadow p-0 border border-gray-200'>
                    {/* Header */}
                    <div className='bg-[#4C1D95] px-6 py-3 rounded-t-xl'>
                        <h2 className='text-white text-lg font-semibold'>Student Details</h2>
                    </div>

                    {/* Body */}
                    <div className='p-6 grid grid-cols-2 gap-6'>
                        <div>
                            <label className='block text-sm font-medium text-[#0D0E25] mb-2'>
                                First Name *
                            </label>
                            <input
                                type='text'
                                name='firstName'
                                value={student.firstName}
                                onChange={handleStudentChange}
                                className='w-full border border-[#E0E0E0] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]'
                                placeholder='Gideon'
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-[#0D0E25] mb-2'>
                                Last Name *
                            </label>
                            <input 
                                type='text'
                                name='lastName'
                                value={student.lastName}
                                onChange={handleStudentChange}
                                className='w-full border border-[#E0E0E0] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]'
                                placeholder='Williams'
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-[#0D0E25] mb-2'>
                                Date of Birth *
                            </label>
                            <input 
                                type='text'
                                name='DateOfBirth'
                                value={student.dateOfBirth}
                                onChange={handleStudentChange}
                                className='w-full border border-[#E0E0E0] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]'
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-[#0D0E25] mb-2 '>
                                Place of Birth *
                            </label>
                            <input
                                type='text'
                                name='placeOfBirth'
                                value={student.placeOfBirth}
                                onChange={student.placeOfBirth}
                                className='w-full border border-[#E0E0E0] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]'
                                placeholder='Jakarta'
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-[#0D0E25] mb-2'>
                                Parent Name *
                            </label>
                            <input
                                type='text'
                                name='parentName'
                                value={student.parentName}
                                onChange={handleStudentChange}
                                className='w-full border border-[#E0E0E0] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]'
                                placeholder='Ranni Williams'
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-[#0D0E25] mb-2'>
                                Email *
                            </label>
                            <input 
                                type='email'
                                name='email'
                                value={student.email}
                                onChange={handleStudentChange}
                                className='w-full border border-[#E0E0E0] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]'
                                placeholder='williams@mail.com'
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-[#0D0E25] mb-2'>
                                Phone *
                            </label>
                            <input 
                                type='tel'
                                name='phone'
                                value={student.phone}
                                onChange={handleStudentChange}
                                className='w-full border border-[#E0E0E0] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]'
                                placeholder='+1234567890'
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-[#0D0E25] mb-2'>
                                Adress *
                            </label>
                            <textarea
                                name='address'
                                value={student.address}
                                onChange={handleStudentChange}
                                className='w-full border border-[#E0E0E0] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]'
                                rows={3}
                                placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
                                required
                            />
                            <p className='text-xs text-gray-400 text-right mt-1'>0/2000</p>
                        </div>
                    </div>
                </div>

                {/* Parent Details */}
                <div className='bg-white rounded-xl shadow p-0 border border-gray-200'>
                    {/* Header */}
                    <div className='bg-[#4C1D95] px-6 py-3 rounded-t-xl'>
                        <h2 className='text-white text-lg font-semibold'>Parent Details</h2>
                    </div>

                    { /*Body*/}
                    <div className='p-6 grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <label className='block text-sm font-medium text-[#0D0E25] mb-2'>
                                First Name *
                            </label>
                            <input
                                type='text'
                                name='firstName'
                                value={parent.firstName}
                                onChange={handleParentChange}
                                className='w-full border border-[#E0E0E0] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]'
                                placeholder='Ranni'
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-[#0D0E25] mb-2'>
                                Last Name *
                            </label>
                            <input 
                                type='text'
                                name='lastName'
                                value={parent.lastName}
                                onChange={handleParentChange}
                                className='w-full border border-[#E0E0E0] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]'
                                placeholder='Williams'
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-[#0D0E25] mb-2'>
                                Email *
                            </label>
                            <input
                                type='email'
                                name='email'
                                value={parent.email}
                                onChange={handleParentChange}
                                className='w-full border border-[#E0E0E0] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]'
                                placeholder='ranni@mail.com'
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-[#0D0E25] mb-2'>
                                Phone *
                            </label>
                            <input
                                type='tel'
                                name='phone'
                                value={parent.phone}
                                onChange={handleParentChange}
                                className='w-full border border-[#E0E0E0] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]'
                                placeholder='+1234567890'
                                required
                            />
                        </div>

                        <div className='md:col-span-2'>
                            <label className='block text-sm font-medium text-[#0D0E25] mb-2'>
                                Adress *
                            </label>
                            <textarea
                                name='address'
                                value={parent.address}
                                onChange={handleParentChange}
                                className='w-full border border-[#E0E0E0] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]'
                                rows={3}
                                placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
                                required
                            />
                            <p className='text-xs text-gray-400 text-right mt-1'>0/2000</p>
                        </div>

                        <div className='md:col-span-2'>
                            <label className='block text-sm font-medium text-[#0D0E25] mb-2'>
                                Payments *
                            </label>
                            <div className='flex gap-6'>
                                <label className='flex items-center gap-2'>
                                    <input
                                        type='radio'
                                        name='payment'
                                        value='cash'
                                        checked={parent.payment === 'cash'}
                                        onChange={handleParentChange}
                                        className='accent-[#4C1D95]'
                                    />
                                    Cash
                                </label>
                                <label className='flex items-center gap-2'>
                                    <input
                                        type='radio'
                                        name='payment'
                                        value='debit'
                                        checked={parent.payment === 'debit'}
                                        onChange={handleParentChange}
                                        className='accent-[#4C1D95]'
                                    />
                                    Debit
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className='flex justify-end gap-4 pt-2'>
                    <button
                        type='button'
                        className='px-6 py-2 rounded-full border border-gray-300 text-[#0D0E25] bg-white hover:bg-gray-100 transition'
                    >
                        Save as Draft
                    </button>
                    <button
                        type='submit'
                        className='px-6 py-2 rounded-full border border-gray-300 text-[#0D0E25] bg-white hover:bg-gray-100 transition'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}