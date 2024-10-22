import React from "react";

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  styles?: string;
  rows?: number;
  error?: string;
};

const TextArea = ({
  placeholder = "",
  value,
  onChange,
  styles = "",
  label,
  name,
  rows = 4,
  error,
  disabled = false,
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
        <textarea
          rows={rows}
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          disabled={disabled}
          placeholder={placeholder}
          className={`py-3 px-4 border-2 border-dark rounded-l-[50px] rounded-tr-[10px] rounded-br-[30px] shadow-[0px_4px_var(--dark)] custom-transition 
              ${
                error
                  ? "bg-state-error-200 text-state-error"
                  : "bg-transparent text-customGray-700"
              }
                ${
                  disabled
                    ? "cursor-not-allowed opacity-60"
                    : "hover:shadow-[0px_5px_var(--dark)] focus:shadow-[0px_2px_var(--dark)] focus:outline-none"
                }
            ${styles}`}
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

export default TextArea;
