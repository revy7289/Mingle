import { getViewportForBounds, useReactFlow } from "@xyflow/react";
import { toPng } from "html-to-image";
import { SquareArrowOutUpRight } from "lucide-react";
import { ChangeEvent, useState } from "react";

export default function SharePanel({ user }) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState({
    popupTitle: "",
    popupDesc: "",
    popupChecked: false,
  });

  const { getNodes, getNodesBounds } = useReactFlow();

  function onChangePopup(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setPopupData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setPopupData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  async function createNotionData() {
    const url = window.location.href;
    const username = user.fetchUserLoggedIn.name;

    // 입력 데이터 검증
    if (!popupData.popupTitle) {
      alert("프로젝트 이름과 설명을 입력해주세요.");
      return;
    }

    const target = document.querySelector(".react-flow__viewport");
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      nodesBounds.width,
      nodesBounds.height,
      0.5,
      2,
      0
    );

    try {
      const image = await toPng(target as HTMLElement, {
        backgroundColor: "transparent",
        width: nodesBounds.width,
        height: nodesBounds.height,
        style: {
          width: `${nodesBounds.width}`,
          height: `${nodesBounds.height}`,
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
      });
      await handleOrder(image); // 이미지 생성 후 데이터 처리
    } catch (error) {
      console.error("Error generating thumbnail:", error);
    }

    async function handleOrder(thumbnail) {
      // 갤러리와 플레이그라운드 데이터 처리
      if (popupData.popupChecked) {
        await createNotion("playground", thumbnail);
        await createNotion("gallery", thumbnail);
      } else {
        await createNotion("playground", thumbnail);
      }
    }

    async function createNotion(db, thumbnail) {
      try {
        const response = await fetch("http://localhost:3001/notion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ db, popupData, url, thumbnail, username }),
        });

        const data = await response.json();
        console.log("Response from server:", data);
      } catch (error) {
        console.error("Error fail to create notion data:", error);
      }
    }
  }

  return (
    <>
      <div
        className="w-[36px] h-[36px] bg-[#767676] rounded-[8px] flex justify-center items-center"
        onClick={() => setPopupOpen((prev) => !prev)}
      >
        <SquareArrowOutUpRight color="#fff" />
      </div>

      {isPopupOpen && (
        <div className="w-[500px] h-[400px] bg-[#fff] rounded-[16px] p-[40px] flex flex-col gap-[20px] absolute bottom-0 right-0">
          <div>
            <div className="text-[24px] text-semibold">프로젝트 이름</div>
            <input
              type="text"
              className="w-full h-[48px] bg-[#fcfcfc] border-b border-[#bdbdbd] p-[12px]"
              name="popupTitle"
              onChange={onChangePopup}
            />
          </div>

          <div>
            <div className="text-[24px] text-semibold">프로젝트 설명</div>
            <textarea
              className="w-full h-[100px] bg-[#fcfcfc] border-b border-[#bdbdbd] p-[12px] resize-none overflow-scroll"
              name="popupDesc"
              onChange={onChangePopup}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-[8px]">
              <input
                type="checkbox"
                className="w-[24px] h-[24px] rounded-[4px]"
                name="popupChecked"
                onChange={onChangePopup}
              />
              <span>갤러리에 공유하기</span>
            </div>

            <button
              className="w-[120px] h-[48px] bg-[#32CBFF] rounded-2xl text-white text-[20px]"
              onClick={createNotionData}
            >
              등록하기
            </button>
            <button
              className="w-[120px] h-[48px] bg-[#bdbdbd] rounded-2xl text-white text-[20px]"
              onClick={() => {
                setPopupOpen((prev) => !prev);
                setPopupData({
                  popupTitle: "",
                  popupDesc: "",
                  popupChecked: false,
                });
              }}
            >
              취소하기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
