import { KeyboardEvent, useState } from "react";

export default function SiteSearch() {
  // const shadowHostRef = useRef<HTMLDivElement | null>(null); // Shadow DOM을 삽입할 DOM 요소

  // const [htmlContent, setHtmlContent] = useState("");
  // const [cssContent, setCssContent] = useState([]);
  // const [images, setImages] = useState<{ url: string; contentType: string; base64: string }[]>([]);
  const [capture, setCapture] = useState({image: ""});

  async function handleEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    const url = e.currentTarget.value;

    // const requestData = {
    //   url: e.currentTarget.value,
    //   imageSelector: "img", // 모든 이미지의 CSS 선택자
    // };

    try {
      const response = await fetch("http://localhost:3001/crawler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("데이터를 불러오는 데 실패했습니다.");
      }

      const data = await response.json();
      console.log(data);

      setCapture(data);

      // setHtmlContent(data.html); // HTML 데이터 설정
      // setCssContent(data.css); // CSS 데이터 설정
      // setImages(data.images); // 이미지 데이터 설정
    } catch (error) {
      console.error("Error fetching the page:", error);
    }
  }

  // useEffect(() => {
  //   if (shadowHostRef.current && htmlContent) {
  //     // Shadow DOM이 이미 존재하면 재사용하고, 없으면 새로 생성
  //     const shadowRoot =
  //       shadowHostRef.current.shadowRoot || shadowHostRef.current.attachShadow({ mode: "open" });

  //     // 기존 HTML 업데이트
  //     const contentWrapper = shadowRoot.querySelector("div");
  //     if (contentWrapper) {
  //       contentWrapper.innerHTML = htmlContent; // HTML만 업데이트
  //     } else {
  //       const newContentWrapper = document.createElement("div");
  //       newContentWrapper.innerHTML = htmlContent;
  //       shadowRoot.appendChild(newContentWrapper); // 새로운 HTML 콘텐츠 추가
  //     }

  //     // 기존 스타일 업데이트
  //     const existingStyles = shadowRoot.querySelectorAll("style");
  //     existingStyles.forEach((style) => style.remove()); // 기존 스타일 제거

  //     // 외부 CSS 적용
  //     cssContent.forEach((css) => {
  //       const style = document.createElement("style");
  //       style.innerHTML = css;
  //       shadowRoot.appendChild(style); // 새 CSS 추가
  //     });

  //     // 이미지 업데이트: HTML 내 이미지 태그를 찾아서 base64로 변환된 이미지를 삽입
  //     const imageTags = shadowRoot.querySelectorAll("img");
  //     imageTags.forEach((img, index) => {
  //       const image = images[index];
  //       if (image) {
  //         img.src = `data:${image.contentType};base64,${image.base64}`; // 이미지 URL을 base64로 대체
  //       }
  //     });
  //   }
  // }, [htmlContent, cssContent, images]);

  return (
    <div className="w-full h-full">
      <div className="w-full h-[60px] bg-[#bdbdbd] rounded-t-2xl flex gap-2.5 items-center justify-center px-[20px]">
        <div className="w-[20px] h-[20px] bg-[#FD5F57] rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-[#FEBC2F] rounded-full"></div>
        <div className="w-[20px] h-[20px] bg-[#28C840] rounded-full"></div>
        <input
          data-id="siteSearch"
          type="text"
          className="w-[800px] h-[40px] rounded-lg px-5 py-2.5"
          placeholder="사이트를 검색해주세요."
          onKeyDown={handleEnter}
        />
      </div>

      <div className="w-full min-h-[540px] bg-[#fcfcfc] rounded-b-2xl">
        {capture.image && <img src={`data:image/png;base64,${capture.image}`} /> }
      </div>

      {/*
        <div
          className="w-full min-h-[540px] bg-[#fcfcfc] rounded-b-2xl"
          ref={shadowHostRef} // Shadow DOM을 삽입할 DOM 요소
        />
      */}
    </div>
  );
}
