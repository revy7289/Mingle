const CommentWrite = ({
  onChangeComment,
  onClickUpdateComment,
  onClickComment,
  setCommentId,
  setReplyId,
  isEdit,
}) => {
  return (
    <div>
      <textarea
        className="w-full h-[130px] rounded-[16px] resize-none border-[#bdbdbd] border-[1px] px-[20px] py-[15px]
        text-[#222222] leading-[24px]"
        onChange={onChangeComment}
        placeholder="댓글을 작성해주세요."
      ></textarea>
      <div className=" w-full h-[32px] mt-[15px] flex justify-end gap-[19px]">
        <button
          className="bg-[#bdbdbd] text-[#fcfcfc] w-[100px] h-full rounded-[8px]"
          onClick={() => {
            setCommentId(" ");
            setReplyId(" ");
          }}
        >
          취소
        </button>
        <button
          className="w-[100px] h-full rounded-[8px] bg-[#767676] text-[#fcfcfc]"
          //   onClick={onClickComment}
          onClick={!isEdit ? onClickComment : onClickUpdateComment}
        >
          작성하기
        </button>
      </div>
    </div>
  );
};

export default CommentWrite;
