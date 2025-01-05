import { FetchBoardsDocument, FetchTravelproductsDocument } from "@/Commons/graphql/graphql";
import PostList from "@/Components/postList";
import { useQuery } from "@apollo/client";
import { Heart, Pencil, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ListPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const tabs = ["질문과답변", "자유게시판"];
  const { data: dataBoards } = useQuery(FetchBoardsDocument);
  const { data: dataQuestionBoards } = useQuery(FetchTravelproductsDocument);

  const popularBoards = dataBoards?.fetchBoards
    .filter((boards) => boards.likeCount > 1)
    .sort((a, b) => b.likeCount - a.likeCount)
    .slice(0, 3);

  return (
    <>
      <div className="w-full h-full flex flex-col items-center">
        <div className="w-[1120px]">
          <div className="text-[24px]">최근 인기글</div>

          {/* 인기글 덩어리들 */}
          <div className="flex gap-[20px] mt-[30px]">
            {popularBoards?.map((post) => {
              // console.log(post);
              // const text = post.contents;
              // const imagePattern = /![](data:image\/jpeg;base64,[A-Za-z0-9+\/=]+)(?=\))/g;
              // const matches = text.match(imagePattern);

              return (
                <div className="w-[360px] h-[280px]">
                  <div className="w-full h-[180px] bg-[#767676] rounded-t-2xl"></div>

                  <div className="w-full h-[100px] rounded-b-2xl border border-solid border-[#bdbdbd] flex flex-col justify-between p-[16px]">
                    <div className="text-[24px] text-semibold">{post.title}</div>

                    <div className="flex justify-between">
                      <div className="flex gap-[8px]">
                        {new Array(3).fill("태그").map((tag) => (
                          <div className="w-[80px] h-[24px] rounded-lg bg-[#767676] flex justify-center items-center text-white">
                            {tag}
                          </div>
                        ))}
                      </div>

                      <div className="flex w-[75px] justify-between px-[8px] gap-[8px]">
                        <Heart fill="#222" stroke="0" />
                        {post.likeCount}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 탭바 */}
          <div className="flex mt-[80px] justify-between">
            <div className="flex gap-[20px]">
              {tabs.map((el, index) => (
                <div
                  key={`${el}_${index}`}
                  className={`cursor-pointer w-[150px] h-[40px] flex justify-center items-center border-b border-solid text-[24px] ${
                    index === tabIndex
                      ? "border-[#222222] text-[#222222]"
                      : "border-[#767676] text-[#767676]"
                  }`}
                  onClick={() => setTabIndex(index)}
                >
                  {el}
                </div>
              ))}
            </div>
            <div className="flex gap-[40px]">
              <div className="flex gap-[4px] p-[6px] text-[#767676] w-[200px] h-[40px] rounded-2xl border border-solid border-[#32CBFF]">
                <Search color="#32CBFF" /> Search
              </div>
              <Link to="/community/new">
                <button className="w-[120px] h-[40px] flex justify-center items-center gap-[8px] rounded-2xl bg-[#32CBFF] text-white">
                  <Pencil /> 글 쓰기
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-[50px] w-full flex flex-col justify-center items-center gap-[50px]">
            {tabIndex === 0 ? (
              //질문과답변
              <>
                {dataQuestionBoards?.fetchTravelproducts.map((questionBoards) => (
                  <PostList Boards={questionBoards} />
                ))}
              </>
            ) : (
              //자유게시판
              <>
                {dataBoards?.fetchBoards.map((freeBoards) => (
                  <PostList Boards={freeBoards} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
