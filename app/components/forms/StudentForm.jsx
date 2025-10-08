import React from 'react'

export default function StudentForm({ student, handleStudentChange}) {
    return(
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
        );
    }