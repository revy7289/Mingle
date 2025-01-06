import { KeyboardEvent, useState } from "react";

export default function SITE_SEARCH() {
  const [page, setPage] = useState<string>("");

  async function handleEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    // let search = e.currentTarget.value;
    // if (!search.startsWith("http://") && !search.startsWith("https://")) {
    //   search = `http://${search}`;
    // }

    await fetch("/proxy") // Vite 프록시를 통해 요청
      .then((response) => response.text())
      .then((html) => setPage(html))
      .catch((error) => console.error("Error fetching content:", error));
  }

  return (
    <div className="w-[960px] h-full">
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
        className="w-full min-h-[540px] bg-[#fcfcfc] rounded-b-2xl"
        dangerouslySetInnerHTML={{ __html: page }}
      ></div>
    </div>
  );
}
