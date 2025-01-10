import Reply from "@/components/comments/reply";
import PostList from "@/components/postList";
import { useState } from "react";

const Mypage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const tabs = ["내 작업공간", "내가 쓴 글", "내가 쓴 댓글"];

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-[115px]">
        <div className="flex flex-col justify-center items-center">
          <div className="w-[265px] h-[265px] bg-[#E0E0E0] rounded-[16px]"></div>
          <div className="flex justify-between items-center w-[245px] h-[48px] mt-[20px]">
            <span className="text-[#222222] text-[40px] font-medium">닉네임</span>
            <div>
              <img src="/edit.png" />
            </div>
          </div>
          <div className="flex flex-col gap-[8px] mt-[12px] w-[245px]">
            <div className="flex gap-[8px]">
              <span className="text-[#767676]">Lv. 00</span>
              <span className="text-[#767676]">000,000 XP</span>
            </div>
            <div className="flex gap-[10px]">
              <img src="/follow.png" />
              <div>
                <span>팔로잉 0</span>
                <span> · </span>
                <span>팔로워 0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[550px]">
          <div className="w-full h-[139px]">
            <div className="flex justify-between">
              <span className="text-[24px] font-semibold">한 줄 소개</span>
              <div>
                <img src="/edit.png" />
              </div>
            </div>
            <div className="px-[16px] py-[15px]">
              <span className="text-[24px] font-semibold">Hello, world!</span>
            </div>
          </div>

          <div className="w-full border-b border-solid border-[#BDBDBD]"></div>

          <div className="w-full h-[139px] mt-[40px]">
            <div className="flex justify-between mb-[20px]">
              <span className="text-[24px] font-semibold">기술스택</span>
              <div>
                <img src="/edit.png" />
              </div>
            </div>
            태그
          </div>
          <div className="w-full h-[70px] ">
            <span className="text-[24px] font-semibold">연락처</span>
            <div className="flex gap-[12px] mt-[17px]">
              <div>
                <img src="/email.png" />
              </div>
              <span>www.contact@mail.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[95px] w-[1060px]">
        <div className="flex gap-[20px] w-full justify-center text-[24px]">
          {tabs.map((el, index) => (
            <button
              key={`${el}_${index}`}
              className={`w-[170px] h-[39px] border-solid border-b ${
                tabIndex === index
                  ? "border-[#222222] text-[#222222]"
                  : "border-[#767676] text-[#767676]"
              }`}
              onClick={() => setTabIndex(index)}
            >
              {el}
            </button>
          ))}
        </div>
        <div className="flex mt-[40px] ">
          {/* 작업공간 */}
          {tabIndex === 0 && (
            <div>
              <div className="w-[265px] h-[170px] bg-[#E0E0E0] rounded-[16px]"></div>
              <div className="w-full px-[10px] my-[20px]">
                <div className="flex justify-between items-center">
                  <h2 className="text-[24px]">untitled.mingle</h2>
                  <div>
                    <img src="/edit.png" />
                  </div>
                </div>
                <div className="text-[#767676]">2024.12.13 23.54</div>
              </div>
            </div>
          )}
        </div>
        {tabIndex === 1 && <PostList />}
        {tabIndex === 2 && <Reply />}
      </div>
    </div>
  );
};

export default Mypage;
