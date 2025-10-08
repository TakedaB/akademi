'use client';
import { useState } from 'react';

export default function AddStudentPage() {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    parentName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [parent, setParent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    payment: '',
  });

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

        <form onSubmit={handleSubmit} className="space-y-8 w-full">
          {/* Student Details */}
          <div className="bg-white rounded-xl shadow p-0 border border-gray-200 overflow-hidden">
            <div className="bg-[#4D44B5] px-6 py-3">
              <h2 className="text-white text-lg font-semibold">Student Details</h2>
            </div>

            <div className="p-6 grid grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-[#303972] mb-2">First Name *</label>
                <input
                  name="firstName"
                  value={student.firstName}
                  onChange={handleStudentChange}
                  className="w-full border border-[#E0E0E0] rounded-lg p-3 text-[#303972] focus:outline-none focus:ring-2 focus:ring-[#A098AE]"
                  placeholder="Gideon"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#303972] mb-2">Last Name *</label>
                <input
                  name="lastName"
                  value={student.lastName}
                  onChange={handleStudentChange}
                  className="w-full border border-[#E0E0E0] rounded-lg p-3 text-[#303972] focus:outline-none focus:ring-2 focus:ring-[#A098AE]"
                  placeholder="Williams"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#303972] mb-2">Date &amp; Place of Birth *</label>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    name="dateOfBirth"
                    value={student.dateOfBirth}
                    onChange={handleStudentChange}
                    className="col-span-1 border border-[#E0E0E0] rounded-lg p-3 text-[#303972] focus:outline-none focus:ring-2 focus:ring-[#A098AE]"
                    placeholder="24 February 1997"
                    required
                  />
                  <input
                    name="placeOfBirth"
                    value={student.placeOfBirth}
                    onChange={handleStudentChange}
                    className="col-span-2 border border-[#E0E0E0] rounded-lg p-3 text-[#303972] focus:outline-none focus:ring-2 focus:ring-[#A098AE]"
                    placeholder="Jakarta"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#303972] mb-2">Parent Name *</label>
                <input
                  name="parentName"
                  value={student.parentName}
                  onChange={handleStudentChange}
                  className="w-full border border-[#E0E0E0] rounded-lg p-3 text-[#303972] focus:outline-none focus:ring-2 focus:ring-[#A098AE]"
                  placeholder="Ranni Williams"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#303972] mb-2">Email *</label>
                <input
                  name="email"
                  value={student.email}
                  onChange={handleStudentChange}
                  type="email"
                  className="w-full border border-[#E0E0E0] rounded-lg p-3 text-[#303972] focus:outline-none focus:ring-2 focus:ring-[#A098AE]"
                  placeholder="williams@mail.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#303972] mb-2">Phone *</label>
                <input
                  name="phone"
                  value={student.phone}
                  onChange={handleStudentChange}
                  type="tel"
                  className="w-full border border-[#E0E0E0] rounded-lg p-3 text-[#303972] focus:outline-none focus:ring-2 focus:ring-[#A098AE]"
                  placeholder="+1234567890"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#303972] mb-2">Address *</label>
                <textarea
                  name="address"
                  value={student.address}
                  onChange={handleStudentChange}
                  rows={4}
                  className="w-full border border-[#E0E0E0] rounded-lg p-3 text-[#303972] focus:outline-none focus:ring-2 focus:ring-[#A098AE]"
                  placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                  required
                />
                <p className="text-xs text-gray-400 text-right mt-1">0/2000</p>
              </div>
              <></>
            </div>
          </div>

          {/* Parent Details */}
          <div className="bg-white rounded-xl shadow p-0 border border-gray-200 overflow-hidden">
            <div className="bg-[#4D44B5] px-6 py-3">
              <h2 className="text-white text-lg font-semibold">Parent Details</h2>
            </div>

           
            <div className="p-6 grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#303972] mb-2">First Name *</label>
                <input
                  name="firstName"
                  value={parent.firstName}
                  onChange={handleParentChange}
                  className="w-full border border-[#E0E0E0] rounded-lg p-3 text-[#303972] focus:outline-none focus:ring-2 focus:ring-[#A098AE]"
                  placeholder="Ranni"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#303972] mb-2">Last Name *</label>
                <input
                  name="lastName"
                  value={parent.lastName}
                  onChange={handleParentChange}
                  className="w-full border border-[#E0E0E0] rounded-lg p-3 text-[#303972] focus:outline-none focus:ring-2 focus:ring-[#A098AE]"
                  placeholder="Williams"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#303972] mb-2">Email *</label>
                <input
                  name="email"
                  type="email"
                  value={parent.email}
                  onChange={handleParentChange}
                  className="w-full border border-[#E0E0E0] rounded-lg p-3 text-[#303972] focus:outline-none focus:ring-2 focus:ring-[#A098AE]"
                  placeholder="williams@mail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#303972] mb-2">Phone *</label>
                <input
                  name="phone"
                  type="tel"
                  value={parent.phone}
                  onChange={handleParentChange}
                  className="w-full border border-[#E0E0E0] rounded-lg p-3 text-[#303972] focus:outline-none focus:ring-2 focus:ring-[#A098AE]"
                  placeholder="+1234567890"
                />
              </div>

              
              <div>
                <label className="block text-sm font-medium text-[#303972] mb-2">Address *</label>
                <textarea
                  name="address"
                  value={parent.address}
                  onChange={handleParentChange}
                  rows={4}
                  className="w-full border border-[#E0E0E0] rounded-lg p-3 text-[#303972] focus:outline-none focus:ring-2 focus:ring-[#A098AE]"
                  placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
                />
                <p className="text-xs text-gray-400 text-right mt-1">0/2000</p>
              </div>

              {/* Payments section*/}
                            
              <div className="flex flex-col gap-2">
                <label className="block font-medium text-[#303972]">Payments *</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      onChange={handleParentChange}
                      className="accent-purple-600 w-4 h-4"
                    />
                    <span className="text-[#A098AE] font-medium">Cash</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="debit"
                      onChange={handleParentChange}
                      className="accent-purple-600 w-4 h-4"
                    />
                    <span className="text-[#A098AE] font-medium">Debit</span>
                  </label>
                </div>
              </div>
            </div> 
          </div> 

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              className="px-6 py-2 rounded-full border border-gray-300 text-[#303972] bg-white hover:bg-gray-100 transition"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-[#4C1D95] text-white hover:bg-[#3a1370] transition"
            >
              Submit
            </button>
          </div>
        </form> 
      </div>
    </div>
  );
}
