import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import Tag from "@/components/tag";
import { useState } from "react";

export default function NewPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-screen h-full flex flex-col items-center">
      <div className="w-[1120px] flex flex-col">
        <div className="text-[40px] font-semibold">게시글 등록</div>

        <input
          type="text"
          placeholder="제목을 입력해 주세요."
          className="w-full h-[80px] px-[20px] py-[24px] bg-[#fcfcfc] border-[#e0e0e0] border-b-[1px] outline-none text-[24px] mt-[30px]"
        />

        <div className="mt-[20px] min-h-[600px] mb-[400px] relative">
          <Editor
            initialValue="hello react editor world!"
            previewStyle="vertical"
            height="100%"
            initialEditType="markdown"
            useCommandShortcut={true}
          />

          <div
            className={`w-[80px] h-[24px] bg-[${
              isModalOpen ? "#767676" : "#bdbdbd"
            }] rounded-lg text-[#FFFFFF] flex justify-center absolute left-[20px] bottom-[40px]`}
            onClick={() => setModalOpen((prev) => !prev)}
          >
            태그 선택
          </div>

          {isModalOpen && (
            <div className="w-[450px] h-[300px] border border-[#dadde6] flex flex-col justify-between px-[50px] py-[30px] rounded-2xl absolute bottom-0px] left-[10px] bg-white">
              <div>
                <p># 라이브러리</p>

                <div className="flex mt-[10px] gap-[10px]">
                  <Tag />
                  <Tag />
                  <Tag />
                  <Tag />
                </div>
              </div>

              <div>
                <p># 프레임워크</p>

                <div className="flex mt-[10px] gap-[10px]">
                  <Tag />
                  <Tag />
                  <Tag />
                  <Tag />
                </div>
              </div>

              <div>
                <p>직접 입력하기...</p>
                <input
                  type="text"
                  className="w-full h-[48px] px-[15px] bg-[#fcfcfc] border-[#bdbdbd] border-b-[1px] outline-none mt-[10px]"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-screen h-[80px] fixed bg-[#767676] bottom-0 flex justify-center items-center">
        <div className="w-[1120px] flex justify-end gap-[20px]">
          <button className="w-[120px] h-[48px] bg-[#32CBFF] rounded-lg text-white text-[20px]">
            등록하기
          </button>
          <button className="w-[120px] h-[48px] bg-[#bdbdbd] rounded-lg text-white text-[20px]">
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
}