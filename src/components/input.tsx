import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label?: string;
  register: UseFormRegisterReturn;
  type?: string;
  errorMessage?: string;
}

const UseInputField: React.FC<InputFieldProps> = ({ label, register, type = "text", errorMessage }) => {
  return (
    <>
      {label && <label className="text-[24px] text-semibold text-[#222222]">{label}</label>}
      <input
        className="w-full h-[48px] bg-[#fcfcfc] border-[#bdbdbd] border-b-[1px] outline-none"
        {...register}
        type={type}
      />
      {errorMessage && <p className="text-[10px]">{errorMessage}</p>}
    </>
  );
};

export default UseInputField;
