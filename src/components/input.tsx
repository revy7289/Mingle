import { CircleAlert } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label?: string;
  register: UseFormRegisterReturn;
  type?: string;
  errorMessage?: string;
  placeholder?: string;
}

const UseInputField: React.FC<InputFieldProps> = ({ label, register, type = "text", errorMessage, placeholder }) => {
  return (
    <>
      <div className="flex items-center">
        {label && <label className="text-[24px] font-semibold text-[#222222] mr-[20px]">{label}</label>}
        {errorMessage && (
          <div className="flex gap-[8px]">
            <CircleAlert color="#ff5555" size={24} /> <p className="text-[16px] text-[#ff5555]">{errorMessage}</p>
          </div>
        )}
      </div>
      <input
        className="w-full h-[48px] bg-[#fcfcfc] border-[#bdbdbd] border-b-[1px] outline-none px-[10px]"
        {...register}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
};

export default UseInputField;
