import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import AccordionForm from "../accordionForm";
import { AccordionData, ILibraryProps } from "@/commons/types/libraryTypes";

const initialData = [
  {
    title: "Is it accessible?",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    title: "Is it styled?",
    content: "Yes. It comes with default styles that matches the other components&apos;aesthetic.",
  },
  {
    title: "Is it animated?",
    content: "Yes. It's animated by default, but you can disable it if you prefer.",
  },
];

export default function ShadcnAccordion({ isOpen, setIsOpen, data, setNodes, id }: ILibraryProps) {
  // useEffect(() => {
  //   console.log("111", data);
  // }, []);

  const [accordionData, setAccordionData] = useState(initialData);
  const handleInputChange = (index: number, field: keyof AccordionData, value: string) => {
    setAccordionData((prevData) =>
      prevData.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
    );
  };
  const onClickUpdate = () => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                currentNode: data.currentNode,
                inputData: accordionData,
              },
            }
          : node
      )
    );
    setIsOpen(false);
  };

  const handleCopyCode = () => {
    const updatedCode = `
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      ${data.inputData
        .map(
          (item, index) => `
      <AccordionItem value="item-${index + 1}">
        <AccordionTrigger>${item.title}</AccordionTrigger>
        <AccordionContent>${item.content}</AccordionContent>
      </AccordionItem>
      `
        )
        .join("")}
    </Accordion>
  )
}
    `;
    navigator.clipboard.writeText(updatedCode).then(() => {
      alert("코드가 복사되었습니다!");
    });
  };

  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        {(data?.inputData || accordionData).map((item, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {isOpen && (
        <AccordionForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          accordionData={accordionData}
          setAccordionData={setAccordionData}
          handleInputChange={handleInputChange}
          onClickUpdate={onClickUpdate}
          handleCopyCode={handleCopyCode}
        />
      )}
    </div>
  );
}
