"use client";

interface TextInputProps {
  label: string;
  onChange: (value: string) => void;
}

function TextInput({ label, onChange }: TextInputProps) {
  return (
    <div>
      <div className="flex rounded-md shadow-sm">
        <span className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-200 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
          {label}
        </span>
        <input
          type="text"
          onChange={(event) => onChange(event.target.value)}
          className="py-2 px-3 md:py-3 md:px-4 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        />
      </div>
    </div>
  );
}

export default TextInput;
