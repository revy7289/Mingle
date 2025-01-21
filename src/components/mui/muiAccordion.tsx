import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ILibraryProps } from "@/commons/types/libraryTypes";

const initialData = [
  { title: "Accordion 1", content: "Default Content 1" },
  { title: "Accordion 2", content: "Default Content 2" },
  { title: "Accordion Actions", content: "Default Content 3" },
];

const iconsMap: { [key: string]: JSX.Element } = {
  Icon1: <ExpandMoreIcon />,
  Icon2: <ArrowDownwardIcon />,
  Icon3: <ArrowDropDownIcon />,
};

export default function MuiAccordion({ isOpen, setIsOpen, data, setNodes, id }: ILibraryProps) {
  useEffect(() => {
    console.log("111", data);
  }, []);

  const [selectedIcon, setSelectedIcon] = useState<string>("Icon1");
  const [accordionData, setAccordionData] = useState(initialData);

  const onChangeIcon = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const iconKey = event.target.value;
    setSelectedIcon(iconKey);
  };

  const handleInputChange = (index: number, field: "title" | "content", value: string) => {
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
                icon: selectedIcon,
              },
            }
          : node
      )
    );
    setIsOpen(false);
  };

  const handleCopyCode = () => {
    const copyCode = `
import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const iconsMap = {
  Icon1: <ExpandMoreIcon />,
  Icon2: <ArrowDownwardIcon />,
  Icon3: <ArrowDropDownIcon />,
};

export default function MuiAccordion() {
  const accordionData = ${JSON.stringify(accordionData, null, 2)}; 

  return (
    <div>
      {accordionData.map((accordion, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={iconsMap["${selectedIcon}"]}
            aria-controls={\`panel\${index + 1}-content\`}
            id={\`panel\${index + 1}-header\`}
          >
            <Typography>{accordion.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{accordion.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}`;
    navigator.clipboard.writeText(copyCode).then(() => {
      alert("코드가 복사되었습니다!");
    });
  };

  return (
    <div>
      {data?.inputData && data?.inputData.length > 0
        ? data?.inputData.map((item, index) => (
            <Accordion key={index} defaultExpanded={index === 2}>
              <AccordionSummary
                expandIcon={data.icon ? iconsMap[data.icon] : iconsMap["Icon1"]}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
              >
                <Typography component="span">{item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>{item.content}</AccordionDetails>
              {index === accordionData.length - 1 && (
                <AccordionActions>
                  <Button>Cancel</Button>
                  <Button>Agree</Button>
                </AccordionActions>
              )}
            </Accordion>
          ))
        : accordionData.map((item, index) => (
            <Accordion key={index} defaultExpanded={index === 2}>
              <AccordionSummary
                expandIcon={data?.icon ? iconsMap[data.icon] : iconsMap["Icon1"]}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
              >
                <Typography component="span">{item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>{item.content}</AccordionDetails>
              {index === accordionData.length - 1 && (
                <AccordionActions>
                  <Button>Cancel</Button>
                  <Button>Agree</Button>
                </AccordionActions>
              )}
            </Accordion>
          ))}

      {isOpen && (
        <div className="z-10 mb-4 flex flex-col items-start gap-4 border-[2px] bg-[#f5faff] border-[#e0e0e0] w-[450px] p-[20px] rounded-[16px]">
          <select
            value={selectedIcon}
            onChange={onChangeIcon}
            className="p-2 border border-gray-300 rounded bg-white cursor-pointer outline-none"
          >
            <option value="Icon1">Expand More Icon</option>
            <option value="Icon2">Arrow Downward Icon</option>
            <option value="Icon3">Arrow Drop Down Icon</option>
          </select>
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
            <button
              onClick={handleCopyCode}
              className="p-2 bg-green-500 text-white rounded w-[80px]"
            >
              Copy Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
