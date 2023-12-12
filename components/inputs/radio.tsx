import React from "react";

interface RadioInputProps {
  title: string;
  name: string;
  options: string[];
  onChange: (value: string) => void;
}

function RadioInput({ title, name, options, onChange }: RadioInputProps) {
  return (
    <div>
      <span className="text-lg text-gray-700 dark:text-white">{title}</span>
      <div className="flex gap-x-6">
        {options.map((option) => (
          <div key={option} className="flex">
            <input
              type="radio"
              name={name}
              value={option}
              className="shrink-0 cursor-pointer mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
              onChange={(event) => onChange(event.target.value)}
            />
            <label className="text-sm text-gray-500 ml-2 dark:text-gray-400">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RadioInput;
