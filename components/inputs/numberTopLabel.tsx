import React from "react";

interface NumberInputTopLabelProps {
  label: string;
  onChange: (value: number) => void;
  value: number | string; // Add this line to include the value property
}

function NumberInputTopLabel({
  label,
  onChange,
  value,
}: NumberInputTopLabelProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    onChange(newValue);
  };

  return (
    <>
      <label className="block text-sm text-gray-700 font-medium dark:text-white">
        {label}
      </label>
      <input
        type="text"
        onChange={handleChange}
        placeholder={`${value}`}
        value={value} // Use the value prop here
        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 mt-2 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      />
    </>
  );
}

export default NumberInputTopLabel;
