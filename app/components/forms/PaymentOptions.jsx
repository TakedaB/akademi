'use client'
import React from "react"

export default function PaymentOptions ({ selected, onChange}){
    return(
        <div className="flex flex-col gap-2">
            <label className="block font-medium text-[#303972]">Payments *</label>
            <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={selected === 'cash'}
                      onChange={(e) => onChange(e.target.value)}
                      className="accent-purple-600 w-4 h-4"
                    />
                    <span className="text-[#A098AE] font-medium">Cash</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="debit"
                      checked={selected === 'debit'}
                      onChange={(e) => onChange(e.target.value)}
                      className="accent-purple-600 w-4 h-4"
                    />
                    <span className="text-[#A098AE] font-medium">Debit</span>
                  </label>
                </div>
              </div>
          );
        }