// 라이브러리: mui / antd / chakra / shadcn
// 프레임워크: React / Vue / Angular / Svelte

import { Dispatch, ReactNode, SetStateAction } from "react";

interface TagProps {
  tagName: string
  selectedTag: string[]
  setSelectedTag: Dispatch<SetStateAction<string[]>>
  children: ReactNode
}

export const Tag = ({ tagName, selectedTag, setSelectedTag, children }: TagProps) => {
  const onClickTagName = (tag: string) => {
    if (!selectedTag.includes(tag) && selectedTag.length < 8) {
      setSelectedTag((prev) => [...prev, tag]);
    }
  };

  const tagColor = (tagName: string) => {
    switch (tagName) {
      case "MUI":
        return "bg-[#0073E6]";
      case "ANTD":
        return "bg-[#F74152]";
      case "chakra":
        return "bg-[#10C4AB]";
      case "shadcn":
        return "bg-[#000000]";
      case "React":
        return "bg-[#64DBFE]";
      case "Vue":
        return "bg-[#41B883]";
      case "Angular":
        return "bg-[#E23237]";
      case "Svelte":
        return "bg-[#FF3E00]";
      default:
        return "bg-[#BDBDBD]";
    }
  };
  return (
    <div
      className={`w-full h-[24px] rounded-[8px] text-[#FFFFFF] flex justify-center text-[16px] cursor-pointer ${tagColor(
        tagName
      )}`}
      onClick={() => {
        onClickTagName(tagName);
      }}
    >
      {tagName}
      {children}
    </div>
  );
};
