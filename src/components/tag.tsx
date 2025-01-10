// 라이브러리: mui / antd / chakra / shardcn

export const Tag = ({ tagName, seletedTag, setSeletedTag }) => {
  const onClickTagName = (tag) => {
    if (!seletedTag.includes(tag)) {
      setSeletedTag((prev) => [...prev, tag]);
    }
  };

  const tagColor = (tagNames) => {
    switch (tagNames) {
      case "MUI":
        return "bg-[#0073E6]";
      case "ANTD":
        return "bg-[#F74152]";
      case "chakra":
        return "bg-[#10C4AB]";
      case "shardcn":
        return "bg-[#000000]";
      case "React":
        return "bg-[#64DBFE]";
      case "Vue":
        return "bg-[#E23237]";
      case "Angular":
        return "bg-[#FF3E00]";
      case "Svelte":
        return "bg-[#FF3E00]";
    }
  };
  return (
    <div
      className={`w-[80px] h-[24px] rounded-[8px] text-[#FFFFFF] flex justify-center text-[16px] cursor-pointer ${tagColor(
        tagName
      )}`}
      onClick={() => {
        onClickTagName(tagName);
      }}
    >
      {tagName}
    </div>
  );
};
