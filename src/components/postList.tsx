import { Eye, Heart, MessageCircle } from "lucide-react";
import { TagReact } from "./tag";

const PostList = ({ Boards }) => {
  return (
    <div className="w-[1080px]">
      <div className="flex gap-[20px] items-center">
        <div className="flex justify-center items-center w-[80px] h-[40px] border-solid border border-[#767676] bg-[#BDBDBD] rounded-[8px] text-[#FCFCFC] text-[20px] font-semibold">
          미해결
        </div>
        <span className="text-[#222222] font-semibold text-[24px]">{Boards.title}</span>
      </div>

      <div className="flex flex-col justify-between w-full h-[140px] border border-[#E0E0E0] rounded-[16px] px-[20px] py-[10px] mt-[20px]">
        <div className="line-clamp-3 ">{Boards.contents}</div>
        <div className="flex justify-between">
          <div>
            <TagReact />
          </div>
          <span className="text-[#767676] text-[12px]">작성자이름은최대열두글자</span>
        </div>
      </div>
      <div className="flex justify-between mt-[10px] px-[20px]">
        <span className="text-[#767676] text-[12px]">몇 분 전</span>
        <div className="flex gap-[16px]">
          <div className="flex gap-[8px]">
            <Eye size={20} color="#767676" />
            000
          </div>
          <div className="flex gap-[8px]">
            <MessageCircle size={20} color="#767676" />
            000
          </div>
          <div className="flex gap-[8px]">
            <Heart size={20} color="#767676" />
            {Boards.likeCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;
