import { Pencil, Search, ThumbsUpIcon } from "lucide-react";

export default function ListPage() {
  return (
    <>
      <div className="w-full h-full flex flex-col items-center">
        <div className="w-[1120px]">
          <div className="text-[24px]">최근 인기글</div>

          {/* 인기글 덩어리들 */}
          <div className="flex gap-[20px] mt-[30px]">
            {new Array(3).fill("인기글").map((post) => (
              <div className="w-[360px] h-[280px]">
                <div className="w-full h-[180px] bg-[#767676] rounded-t-2xl"></div>

                <div className="w-full h-[100px] rounded-b-2xl border border-solid border-[#bdbdbd] flex flex-col justify-between p-[16px]">
                  <div className="text-[24px] text-semibold">{post} 제목입니다~</div>

                  <div className="flex justify-between">
                    <div className="flex gap-[8px]">
                      {new Array(3).fill("태그").map((tag) => (
                        <div className="w-[80px] h-[24px] rounded-lg bg-[#767676] flex justify-center items-center text-white">
                          {tag}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-[8px]">
                      <ThumbsUpIcon color="#222" /> 000
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 탭바 */}
          <div className="flex mt-[80px] justify-between">
            <div className="flex gap-[20px]">
              <div className="w-[150px] h-[40px] flex justify-center items-center border-b border-solid border-[#222222] text-[24px]">
                질문과답변
              </div>
              <div className="w-[150px] h-[40px] flex justify-center items-center border-b border-solid border-[#767676] text-[24px] text-[#767676]">
                자유게시판
              </div>
            </div>

            <div className="flex gap-[40px]">
              <div className="flex gap-[4px] p-[6px] text-[#767676] w-[200px] h-[40px] rounded-2xl border border-solid border-[#32CBFF]">
                <Search color="#32CBFF" /> Search
              </div>

              <button className="w-[120px] h-[40px] flex justify-center items-center gap-[8px] rounded-2xl bg-[#32CBFF] text-white">
                <Pencil /> 글 쓰기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
