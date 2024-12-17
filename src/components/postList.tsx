import Tag from "./tag";

const PostList = () => {
  return (
    <div className="w-full">
      <div className="flex gap-[20px] items-center">
        <div className="flex justify-center items-center w-[80px] h-[40px] border-solid border border-[#767676] bg-[#BDBDBD] rounded-[8px] text-[#FCFCFC] text-[20px] font-semibold">
          미해결
        </div>
        <span className="text-[#222222] font-semibold text-[24px]">
          제목입니다~~
        </span>
      </div>

      <div className="flex flex-col justify-between w-full h-[140px] border border-[#E0E0E0] rounded-[16px] px-[20px] py-[10px] mt-[20px]">
        <div>내용입니다</div>
        <div className="flex justify-between">
          <div>
            <Tag />
          </div>
          <span>작성자이름은최대열두글자</span>
        </div>
      </div>
      <div className="flex justify-between mt-[10px] px-[20px]">
        <span>몇 분 전</span>
        <div className="flex gap-[16px]">
          <div className="w-[51px] h-[20px] flex gap-[8px]">
            <img src="../../public/hits.png" />
            000
          </div>
          <div className="w-[51px] h-[20px] flex gap-[8px]">
            <img src="../../public/comments.png" />
            000
          </div>
          <div className="w-[51px] h-[20px] flex gap-[8px]">
            <img src="../../public/frame.png" />
            000
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;
