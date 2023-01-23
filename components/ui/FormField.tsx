import React from "react";
import { FC } from "react";

type Props = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  isSurpriseMe?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSurpriseMe?: () => void;
};

const FormField: FC<Props> = ({
  label,
  type,
  name,
  placeholder,
  value,
  isSurpriseMe,
  onChange,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          className="block font-medium text-gray-900 text-sm"
          htmlFor={name}
        >
          {label}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="bg-[#ECECF1] font-semibold text-xs py-1 px-2 rounded-[5px] text-black"
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full border bg-gray-100 border-gray-300 rounded-[5px] py-2 px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6449ff] focus:border-transparent"
      />
    </div>
  );
};

export default FormField;
