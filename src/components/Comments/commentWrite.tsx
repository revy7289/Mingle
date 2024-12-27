const CommentWrite = ({ onChangeComment, onClickComment }) => {
  return (
    <div>
      <input
        className="w-full h-[130px] rounded-[16px] border-[#bdbdbd] border-[1px] px-[20px] py-[15px] text-[#222222] leading-[24px]"
        onChange={onChangeComment}
      />
      <div className=" w-full h-[32px] mt-[15px] flex justify-end gap-[19px]">
        <button className="bg-[#bdbdbd] text-[#fcfcfc] w-[100px] h-full rounded-[8px]">취소</button>
        <button
          className="w-[100px] h-full rounded-[8px] bg-[#767676] text-[#fcfcfc]"
          onClick={onClickComment}
        >
          작성하기
        </button>
      </div>
    </div>
  );
};

export default CommentWrite;
