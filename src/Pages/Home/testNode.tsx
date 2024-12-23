import img from "/naver.png";
import { KeyboardEvent, useState } from "react";

export default function TEST_NODE() {
  const [testToggle, setTestToggle] = useState(false);

  function handleEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      setTestToggle(true);
    }
  }

  return (
    <div className="w-[960px] min-h-[540px]">
      <div className="w-full h-[60px] bg-[#bdbdbd] rounded-t-2xl flex gap-2.5 items-center justify-center">
        <div className="w-[20px] h-[20px] bg-[#FD5F57] rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-[#FEBC2F] rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-[#28C840] rounded-full"></div>
        <input
          className="w-[800px] h-[40px] rounded-lg px-5 py-2.5"
          placeholder="사이트를 검색해주세요."
          onKeyDown={handleEnter}
        />
      </div>
      <div className="w-full min-h-[540px] max-h-[1080px] overflow-clip relative bg-white rounded-b-2xl opacity-90">
        {testToggle && (
          <>
            <div className="absolute text-[#ff0000] text-5xl left-[10%]">
              테스트용 쌩캡쳐 이미지 입니다.
            </div>
            <img src={img} />
          </>
        )}
      </div>
    </div>
  );
}
