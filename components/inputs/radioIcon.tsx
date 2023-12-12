"use client";

import React, { useState, ReactElement } from "react";

interface RadioIconInputProps {
  title: string;
  name: string;
  value: string;
  options: { label: string; icon: ReactElement }[];
  onChange: (value: string) => void;
}

function RadioIconInput({
  title,
  name,
  value,
  options,
  onChange,
}: RadioIconInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <>
      <span className="block text-sm mb-2 text-gray-700 font-medium dark:text-white">
        {title}
      </span>
      <div className="flex gap-x-6">
        {options.map((option) => (
          <label key={option.label} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={option.label}
              onChange={handleChange}
              className="hidden"
            />
            <div
              className={`cursor-pointer py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold dark:text-white hover:bg-blue-600 transition-all text-sm ${
                value === option.label
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700  dark:hover:bg-gray-600 hover:bg-gray-500 hover:text-white text-gray-500"
              }`}
            >
              <span>{option.icon}</span>
              {option.label}
            </div>
          </label>
        ))}
      </div>
    </>
  );
}

export default RadioIconInput;
