import React from "react";

type Props = {
  label: string;
  name: string;
  type: "text" | "password" | "email" | "number";
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  styles?: string;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
};

const Input = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  styles = "",
  label,
  name,
  max,
  min = 0,
  step,
  required,
  error,
}: Props) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-1">
        <label
          htmlFor={name}
          className={`text-bodyMain
           ${error ? "text-state-error" : "text-dark"}
           ${disabled && "opacity-60"}
          `}
        >
          {label}
        </label>
        <input
          formNoValidate
          value={value}
          onChange={onChange}
          type={type}
          name={name}
          id={name}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          {...(min !== undefined && { min })} // Only add `min` if it's defined
          {...(max !== undefined && { max })} // Only add `max` if it's defined
          {...(step !== undefined && { step })} // Only add `step` if it's defined
          className={`py-3 px-4 border-2 border-dark rounded-l-[50px] rounded-tr-[10px] rounded-br-[30px] shadow-[0px_4px_var(--dark)] custom-transition disabled:opacity-50 
            ${
              error
                ? "bg-state-error-200 text-state-error"
                : "bg-transparent text-customGray-700"
            }
            ${
              disabled
                ? "cursor-not-allowed opacity-60"
                : "hover:shadow-[0px_5px_var(--dark)] focus:shadow-[0px_2px_var(--dark)] focus:outline-none"
            } ${styles}`}
        />
        {error && (
          <small className="text-state-error text-captionMain mt-1">
            {error}
          </small>
        )}
      </div>
    </div>
  );
};

export default Input;
