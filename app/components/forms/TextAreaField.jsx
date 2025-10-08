'use client';
import React from "react";

export default function TextAreaField({
  label,
  name,
  placeholder,
  value,
  onChange,
  rows = 4, 
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
      />
      <p className="text-right text-xs text-gray-400">0/2000</p>
    </div>
  );
}
