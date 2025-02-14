import { FetchBoardsDocument, FetchTravelproductsDocument } from "@/commons/graphql/graphql";
import PostList from "@/components/postList";
import { Tag } from "@/components/tag";
import { useQuery } from "@apollo/client";
import { Heart, Pencil, Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ListPage() {
  const tabs = ["질문과답변", "자유게시판"];
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [search, setSearch] = useState("");

  const { data: dataPopularBoards } = useQuery(FetchBoardsDocument);
  const { data: dataBoards, refetch: refetchBoards } = useQuery(FetchBoardsDocument);
  const { data: dataQuestionBoards, refetch: refetchQuestionBoards } = useQuery(
    FetchTravelproductsDocument
  );

  const popularBoards = dataPopularBoards?.fetchBoards
    .filter((boards) => boards.likeCount > 0)
    .sort((a, b) => b.likeCount - a.likeCount)
    .slice(0, 3);

  const onClickSearch = () => {
    if (!tabIndex) {
      refetchQuestionBoards({ search });
    } else {
      refetchBoards({ search });
    }
  };

  const onkeyDownEnter = (e) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col items-center">
        <div className="w-[1120px]">
          <div className="text-[24px]">최근 인기글</div>

          {/* 인기글 덩어리들 */}
          <div className="flex gap-[20px] mt-[30px]">
            {popularBoards?.map((post) => {
              const text = post.contents || "";
              const imagePattern = /!\[.*?\]\(data:image\/jpeg;base64,[A-Za-z0-9+\/=]+\)/g;
              const matches = text.match(imagePattern);

              return (
                <div
                  className="w-[360px] h-[280px] overflow-hidden"
                  onClick={() => navigate(`/community/post/${post._id}`)}
                >
                  {matches ? (
                    matches?.map((match) => {
                      const imgSrc = match.replace("![](", "").replace(")", "");
                      return (
                        <img
                          className="w-full h-[180px] rounded-t-2xl object-cover  border-[#BDBDBD] border-x border-t"
                          src={imgSrc}
                        />
                      );
                    })
                  ) : (
                    <div className="w-full h-[180px] bg-[#767676] rounded-t-2xl ">
                      <img
                        src="/noImage.png"
                        className="w-full h-full rounded-t-2xl object-cover  border-[#BDBDBD] border-x border-t"
                      />
                    </div>
                  )}

                  <div className="w-full h-[100px] rounded-b-2xl border border-solid border-[#bdbdbd] flex flex-col justify-between p-[16px]">
                    <div className="text-[24px] text-semibold whitespace-pre overflow-hidden">
                      {post.title}
                    </div>

                    <div className="flex justify-between">
                      <div className="flex gap-[8px]">
                        {post?.images?.map((tagName, index) => (
                          <div key={index} className="w-[80px]">
                            <Tag tagName={tagName} />
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
              <div className="flex gap-[4px] p-[6px] overflow-hidden text-[#767676] w-[200px] h-[40px] rounded-2xl border border-solid border-[#32CBFF]">
                <div className="ml-[6px]">
                  <Search size={24} color="#32CBFF" onClick={onClickSearch} />
                </div>
                <input
                  placeholder="Search"
                  className="outline-none"
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={onkeyDownEnter}
                />
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
                {dataQuestionBoards?.fetchTravelproducts.map((questionBoards, index) => (
                  <div key={index}>
                    <PostList
                      Boards={questionBoards}
                      tabIndex={0}
                      refetch={refetchQuestionBoards}
                    />
                  </div>
                ))}
              </>
            ) : (
              //자유게시판
              <>
                {dataBoards?.fetchBoards.map((freeBoards, index) => (
                  <div key={index}>
                    <PostList Boards={freeBoards} tabIndex={1} refetch={refetchBoards} />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
