'use client';
import React, { useState } from "react";
import PaymentOptions from "../forms/PaymentOptions";

export default function ParentForm({ parent, handleParentChange }) {
  const [payment, setPayment] = useState(parent.payment || "cash");

  const validateTextOnly = (value) => {
    return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
  };
  
  const validadePhoneOnly = (value) => {
    return value.replace(/[^0-9+\-() ]/g, '');
  };

  const handlePaymentChangeInternal = (value) => {
    setPayment(value);
    handleParentChange( { target: { name: 'payment', value }});
  };
  
  const handleInputChangeWithValidation = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    switch(name) {
      case 'firstName':
      case 'lastName':
        sanitizedValue = validateTextOnly(value);
        break;
      case 'phone':
        sanitizedValue = validadePhoneOnly(value);
        break;
      default:
        sanitizedValue = value
    }

    const syntheticEvent = {
      target: {
        name: name,
        value: sanitizedValue
      }
    };

    handleParentChange(syntheticEvent);
  };

  return (
    <div className="bg-white rounded-xl shadow p-0 border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-[#4D44B5] px-6 py-3">
        <h2 className="text-white text-lg font-semibold">Parent Details</h2>
      </div>

      {/* Form Body */}
      <div className="p-6 grid grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-[#303972] mb-2">
            First Name *
          </label>
          <input
            name="firstName"
            value={parent.firstName || ''}
            onChange={handleInputChangeWithValidation}
            placeholder="Ranni"
            className="w-full border border-[#E0E0E0] rounded-lg p-3 text-[#303972] focus:outline-none focus:ring-2 focus:ring-[#A098AE]"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-[#303972] mb-2">
            Last Name *
          </label>
          <input
            name="lastName"
            value={parent.lastName || ''}
            onChange={handleInputChangeWithValidation}
            placeholder="Williams"
            className="w-full border border-[#E0E0E0] rounded-lg p-3 text-[#303972] focus:outline-none focus:ring-2 focus:ring-[#A098AE]"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[#303972] mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={parent.email || ''}
            onChange={handleParentChange}
            placeholder="williams@mail.com"
            className="w-full border border-[#E0E0E0] rounded-lg p-3 text-[#303972] focus:outline-none focus:ring-2 focus:ring-[#A098AE]"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-[#303972] mb-2">
            Phone *
          </label>
          <input
            type="tel"
            name="phone"
            value={parent.phone || ''}
            onChange={handleInputChangeWithValidation}
            placeholder="+1234567890"
            className="w-full border border-[#E0E0E0] rounded-lg p-3 text-[#303972] focus:outline-none focus:ring-2 focus:ring-[#A098AE]"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-[#303972] mb-2">
            Address *
          </label>
          <textarea
            name="address"
            value={parent.address || ''}
            onChange={handleParentChange}
            rows={4}
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
            className="w-full border border-[#E0E0E0] rounded-lg p-3 text-[#303972] focus:outline-none focus:ring-2 focus:ring-[#A098AE] resize-none"
            required
          />
          <p className="text-xs text-gray-400 text-right mt-1">0/2000</p>
        </div>

        {/* Payments */}
        <div>
          <label className="block text-sm font-medium text-[#303972] mb-2">
        
          </label>
          <PaymentOptions selected={payment} onChange={handlePaymentChangeInternal} />
        </div>
      </div>
    </div>
  );
}
