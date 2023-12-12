"use client";

import { useState } from "react";

interface TextAreaInputTopLabelProps {
  label: string;
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
}

function TextAreaInputTopLabel({
  label,
  placeholder,
  onChange,
  value,
}: TextAreaInputTopLabelProps) {
  const [rows, setRows] = useState(5);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaLineHeight = 22; // Adjust this based on your font-size and line-height
    const minRows = 5;
    const maxRows = 8; // Adjust the maximum number of rows as needed

    const previousRows = event.target.rows;
    event.target.rows = minRows; // Set rows to the minimum to calculate scroll height

    const currentRows = Math.min(
      maxRows,
      Math.floor(event.target.scrollHeight / textareaLineHeight)
    );

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    setRows(currentRows);
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <div>
      <label className="block text-sm text-gray-700 font-medium dark:text-white">
        {label}
      </label>
      <textarea
        onChange={handleChange}
        rows={rows}
        placeholder={placeholder}
        value={value}
        className="py-3 px-4 block w-full bg-gray-200 resize-none border-gray-200 rounded-md text-sm focus:border-blue-500 mt-2 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      />
    </div>
  );
}

export default TextAreaInputTopLabel;
