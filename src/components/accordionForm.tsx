import { ChangeEventHandler } from "react";

interface AccordionData {
  title: string;
  content: string;
  label?: string;
  children?: string;
}

interface AccordionFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  accordionData: AccordionData[];
  setAccordionData: (data: AccordionData[]) => void;
  handleInputChange: (index: number, field: keyof AccordionData, value: string) => void; 
  onClickUpdate: () => void;
  handleCopyCode: () => void;
  selectedIcon?: string;
  onChangeIcon?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

type IconSelectorProps = {
  selectedIcon: string;
  onChangeIcon: ChangeEventHandler<HTMLSelectElement>;
};

const AccordionForm = ({
  isOpen,
  setIsOpen,
  accordionData,
  handleInputChange,
  onClickUpdate,
  handleCopyCode,
  selectedIcon,
  onChangeIcon,
}: AccordionFormProps) => {
  if (!isOpen) return null;

  const IconSelector = ({ selectedIcon, onChangeIcon }: IconSelectorProps) => {
    return (
      <select
        value={selectedIcon}
        onChange={onChangeIcon}
        className="p-2 border border-gray-300 rounded bg-white cursor-pointer outline-none"
      >
        <option value="Icon1">Expand More Icon</option>
        <option value="Icon2">Arrow Downward Icon</option>
        <option value="Icon3">Arrow Drop Down Icon</option>
      </select>
    );
  };

  return (
    <div className="z-10 mb-4 flex flex-col items-start gap-4 border-[2px] bg-[#f5faff] border-[#e0e0e0] w-[450px] p-[20px] rounded-[16px]">
      {selectedIcon && onChangeIcon && (
        <IconSelector selectedIcon={selectedIcon} onChangeIcon={onChangeIcon} />
      )}
      {accordionData.map((library, index) => (
        <div className="flex flex-col gap-2" key={index}>
          <p className="font-bold">{`Accordion ${index + 1}`}</p>
          <input
            type="text"
            value={library.title}
            onChange={(e) => handleInputChange(index, "title", e.target.value)}
            placeholder="Update title"
            className="px-[8px] w-[200px] h-[30px] outline-none"
          />
          <input
            type="text"
            value={library.content}
            onChange={(e) => handleInputChange(index, "content", e.target.value)}
            placeholder="Update content"
            className="px-[8px] w-[400px] h-[30px] outline-none"
          />
        </div>
      ))}
      <div className="flex gap-3">
        <button onClick={onClickUpdate} className="p-2 bg-blue-500 text-white rounded w-[80px]">
          Update
        </button>
        <button onClick={() => setIsOpen(false)} className="p-2 bg-white rounded w-[80px]">
          Close
        </button>
        <button onClick={handleCopyCode} className="p-2 bg-green-500 text-white rounded w-[80px]">
          Copy Code
        </button>
      </div>
    </div>
  );
};

export default AccordionForm;
