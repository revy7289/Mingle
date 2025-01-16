import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AccordionForm from "../accordionForm";
import { AccordionData, ILibraryProps } from "@/commons/types/libraryTypes";



const items = [
  { value: "a", title: "First Item", content: "Some value 1..." },
  { value: "b", title: "Second Item", content: "Some value 2..." },
  { value: "c", title: "Third Item", content: "Some value 3..." },
];

export default function ChakraAccordion({ isOpen, setIsOpen, data, setNodes, id }: ILibraryProps) {
  useEffect(() => {
    console.log("111", data);
  }, []);

  const [accordionData, setAccordionData] = useState<AccordionData[]>(items);

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
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
  Stack,
} from "@chakra-ui/react";

export default function GeneratedAccordion() {
  return (
    <Stack className="w-[100%]" gap="4">
      <AccordionRoot>
        ${accordionData
          .map(
            (item, index) => `
        <AccordionItem
          className="border-b-[1px] border-gray-200"
          key={${index}}
          value="item-${index + 1}"
        >
          <AccordionItemTrigger className="px-4 py-2 text-lg font-semibold hover:bg-gray-100 transition-all duration-300 ease-in-out">
            ${item.title}
          </AccordionItemTrigger>
          <AccordionItemContent className="px-4 py-2 text-base text-gray-600">
            ${item.content}
          </AccordionItemContent>
        </AccordionItem>
        `
          )
          .join("")}
      </AccordionRoot>
    </Stack>
  );
}
  `;

    navigator.clipboard
      .writeText(updatedCode)
      .then(() => {
        alert("코드가 복사되었습니다!");
      })
      .catch((err) => {
        console.error("코드 복사 실패:", err);
      });
  };

  return (
    <div>
      <Stack className="w-[100%]" gap="4">
        <AccordionRoot>
          {data?.inputData && data?.inputData.length > 0
            ? data?.inputData.map((item, index) => (
                <AccordionItem
                  className="border-b-[1px] border-gray-200"
                  key={index}
                  value="item-${index + 1}"
                >
                  <AccordionItemTrigger className="px-4 py-2 text-lg font-semibold hover:bg-gray-100 transition-all duration-300 ease-in-out">
                    {item.title}
                  </AccordionItemTrigger>
                  <AccordionItemContent className="px-4 py-2 text-base text-gray-600">
                    {item.content}
                  </AccordionItemContent>
                </AccordionItem>
              ))
            : items.map((item, index) => (
                <AccordionItem
                  className="border-b-[1px] border-gray-200"
                  key={index}
                  value="item-${index + 1}"
                >
                  <AccordionItemTrigger className="px-4 py-2 text-lg font-semibold hover:bg-gray-100 transition-all duration-300 ease-in-out">
                    {item.title}
                  </AccordionItemTrigger>
                  <AccordionItemContent className="px-4 py-2 text-base text-gray-600">
                    {item.content}
                  </AccordionItemContent>
                </AccordionItem>
              ))}
        </AccordionRoot>
      </Stack>
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
