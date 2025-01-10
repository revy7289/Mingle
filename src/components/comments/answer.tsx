import { Heart, MessageCircleReply } from "lucide-react";

const Answer = () => {
  return (
    <div className="w-[1120px] h-[202px] px-[20px] py-[16px] flex gap-[20px]">
      <div className="w-[200px] h-[200px] flex flex-col justify-center items-center gap-[20px]">
        <div className="w-[120px] h-[120px] bg-[#E0E0E0] rounded-[16px]"></div>
        <span>답변자이름도최대열두글자</span>
      </div>
      <div className="flex flex-col justify-between gap-[12px] w-[900px] h-[202px] px-[20px py-[16px]">
        <div className="w-[860px] h-[120px] ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor
          magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa.
          Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris
          pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare
          arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse
          platea dictumst quisque sagittis purus. Pulvinar ele ...
        </div>
        <div className="flex justify-between w-[860px] h-[32px] items-center">
          <div className="text-[#767676] text-[12px]">2024. 12. 13 23:54</div>
          <div className="flex gap-[20px] items-center">
            <div className="flex gap-[8px]">
              <div>
                <Heart color="#767676" />
              </div>
              <span className="text-[#767676]">000</span>
            </div>
            <button className="w-[100px] h-[32px] bg-[#32CBFF] rounded-[8px] flex justify-center items-center gap-[8px] text-[#FCFCFC] text-[16px]">
              <span>채택하기</span>
            </button>
            <button className="w-[100px] h-[32px] bg-[#BDBDBD] rounded-[8px] flex justify-center items-center border border-[#767676] gap-[8px] text-[#FCFCFC] text-[16px]">
              <MessageCircleReply />
              <span>답글</span>
            </button>
          </div>
        </div>
        <div className="w-full border-2 border-[#E0E0E0]"></div>
      </div>
    </div>
  );
};

export default Answer;
