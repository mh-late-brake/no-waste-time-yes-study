"use client";

import { ChangeEvent, useState } from "react";

export default function InputText({
  initialValue = "",
  label,
  placeholder = "",
}: {
  initialValue?: string;
  label: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="mb-5">
      <label
        htmlFor={label}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type="text"
        id={label}
        name={label}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder={placeholder}
        required
        autoComplete="off"
        value={value}
        onChange={handleValueChange}
      />
    </div>
  );
}
