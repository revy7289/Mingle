import { Collapse, CollapseProps } from "antd";
import { useState } from "react";
import AccordionForm from "../accordionForm";
import { ILibraryProps } from "@/commons/types/libraryTypes";

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "This is panel header 1",
    children: "text1",
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: "text2",
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: "text3",
  },
];

export default function AntdAccordion({ isOpen, setIsOpen, data, setNodes, id }: ILibraryProps) {
  const [accordionData, setAccordionData] = useState(items);

  // useEffect(() => {
  //   console.log("111", data);
  // }, []);

  const handleInputChange = (index: number, field: "label" | "children", value: string) => {
    setAccordionData((prevData) =>
      prevData?.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
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
    // console.log("ppp", data);
    setIsOpen(false);
  };

  const handleCopyCode = () => {
    const copyCode = `
import React from "react";
import { Collapse } from "antd";

const accordionData = ${JSON.stringify(accordionData, null, 2)};

export default function GeneratedAccordion() {
  return (
    <Collapse
      items={accordionData}
      defaultActiveKey={["1"]}
    />
  );
}`;
    navigator.clipboard.writeText(copyCode).then(() => {
      alert("코드가 복사되었습니다!");
    });
  };

  return (
    <>
      <Collapse
        items={data?.inputData ? data?.inputData : accordionData}
        defaultActiveKey={["1"]}
      />
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
    </>
  );
}
