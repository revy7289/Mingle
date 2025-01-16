import Alert from "@mui/material/Alert";
import { useState } from "react";


type EditOpenProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MuiAlert({ isOpen, setIsOpen }: EditOpenProps) {
  const [selectedOption, setSelectedOption] = useState("");
  const onChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event?.target.value);
  };
  const onClickUpdate = () => {
    
  }
  return (
    <>
      <Alert severity="info">This is a success Alert.</Alert>

      {/* <Alert severity="info">This is an info Alert.</Alert>

            <Alert severity="warning">This is a warning Alert.</Alert>

            <Alert severity="error">This is an error Alert.</Alert> */}
      {isOpen && (
        <div className="z-10 mb-4 flex flex-col items-start gap-4 border-[2px] bg-[#f5faff] border-[#e0e0e0] w-[450px] p-[20px] rounded-[16px]">
          <div>
            <select value={selectedOption} onChange={onChangeOption}>
              <option value="option1">info</option>
              <option value="option2">warning</option>
              <option value="option3">error</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button className="p-2 bg-blue-500 text-white rounded w-[80px]">Update</button>
            <button onClick={() => setIsOpen(false)} className="p-2 bg-white rounded w-[80px]">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
