import { Eye, Heart, MessageCircle } from "lucide-react";
import { Tag } from "./tag";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FetchBoardCommentsDocument, FetchUserLoggedInDocument } from "@/commons/graphql/graphql";

const PostList = ({ Boards, tabIndex }) => {
  const navigate = useNavigate();

  const { data: dataLonginUser } = useQuery(FetchUserLoggedInDocument);

  const { data: dataBoardsComments } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      boardId: Boards._id,
      page: 1,
    },
  });

  // Date 객체 생성
  const date = new Date(Boards.createdAt);

  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedTime = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const finalFormattedDate = formattedDate + ". " + formattedTime;

  return (
    <div className="w-[1080px]">
      <div className="flex gap-[20px] items-center">
        {tabIndex === 0 && (
          <div
            className={`flex justify-center items-center w-[80px] h-[40px]  rounded-[8px] text-[#FCFCFC] text-[20px] font-semibold ${
              Boards.name === "해결"
                ? "bg-[#8BE1FF] border border-solid border-[#32CBFF]"
                : "bg-[#BDBDBD] border-solid border border-[#767676]"
            }`}
          >
            {Boards.name}
          </div>
        )}

        <span className="text-[#222222] font-semibold text-[24px]">
          {tabIndex === 0 ? Boards.remarks : Boards.title}
        </span>
      </div>

      <div
        onClick={() => navigate(`/community/${tabIndex === 0 ? "qna" : "post"}/${Boards._id}`)}
        className="flex flex-col justify-between w-full h-[140px] border border-[#E0E0E0] rounded-[16px] px-[20px] py-[10px] mt-[20px]"
      >
        <div className="line-clamp-3 ">{Boards.contents}</div>
        <div className="flex justify-between items-center">
          <div className="flex gap-[10px]">
            {(tabIndex === 0 ? Boards.tags : Boards.images)?.map((tagName, index) => (
              <div key={index} className="w-[80px]">
                <Tag tagName={tagName} />
              </div>
            ))}
          </div>
          <span className="text-[#767676] text-[12px]">
            {dataLonginUser?.fetchUserLoggedIn.name}
          </span>
        </div>
      </div>
      <div className="flex justify-between mt-[10px] px-[20px]">
        <span className="text-[#767676] text-[12px]">{finalFormattedDate}</span>
        <div className="flex gap-[16px]">
          <div className="flex gap-[8px] items-center">
            <Eye size={20} color="#767676" />
            {Boards.dislikeCount || 0}
          </div>
          <div className="flex gap-[8px] items-center">
            <MessageCircle size={20} color="#767676" />
            {dataBoardsComments?.fetchBoardComments.length}
          </div>
          <div className="flex gap-[8px] items-center">
            <Heart size={20} fill="#222" stroke="0" />
            {Boards.likeCount || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;
