import { KeyboardEvent, useState } from "react";

export default function SITE_SEARCH() {
  const [url, setUrl] = useState<string>("");
  const [content, setContent] = useState<string>("");

  async function handleEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    if (!e.currentTarget.value) return;

    setUrl(e.currentTarget.value);

    try {
      const response = await fetch("https://naver.com");
      if (!response.ok) {
        throw new Error("데이터를 가져오는 데 실패했습니다.");
      }

      const data = await response.text();
      setContent(data);
    } catch (error) {
      console.error(error);
      setContent("URL 데이터를 가져오는 데 문제가 발생했습니다.");
    }
  }

  return (
    <div className="w-[960px] min-h-[540px]">
      <div className="w-full h-[60px] bg-[#bdbdbd] rounded-t-2xl flex gap-2.5 items-center justify-center">
        <div className="w-[20px] h-[20px] bg-[#FD5F57] rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-[#FEBC2F] rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-[#28C840] rounded-full"></div>
        <input
          data-id="siteSearch"
          className="w-[800px] h-[40px] rounded-lg px-5 py-2.5"
          placeholder="사이트를 검색해주세요."
          onKeyDown={handleEnter}
        />
      </div>
      <div
        className="w-full min-h-[540px] max-h-[1080px] overflow-clip relative bg-white rounded-b-2xl opacity-90"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
}
