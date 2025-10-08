'use client';
import React from "react";

const InputField = ({ label, name, placeholder, type = "text", value, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[#303972] font-medium">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none text-[#303972]"
      />
    </div>
  );
};

export default InputField;
