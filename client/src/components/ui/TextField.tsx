import React from "react";
interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
}

export default function TextField({
  label,
  name,
  error,
  disabled,
  type,
  id,
  value,
  onChange,
  className,
  ...rest
}: TextFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        className={`w-full border rounded-sm outline-0 p-2 focus:border-blue-600 focus:shadow ${className}`}
        name={name}
        id={id}
        type={type}
        disabled={disabled}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
