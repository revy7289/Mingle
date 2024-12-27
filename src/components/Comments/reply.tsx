const Reply = ({ reply }) => {
  const time = new Date(reply.createdAt);

  return (
    <div className="w-full h-[136px] bg-[#EEEEEE] rounded-[16px] px-[20px] py-[16px]">
      <div className="flex justify-between items-center">
        <div className="flex gap-[8px] items-center">
          <div className="bg-[#D9D9D9] rounded-full w-[40px] h-[40px]"></div>
          <span>답변자이름도최대열두글자</span>
        </div>
        <div>{`${time.toLocaleDateString()} ${String(time.getHours()).padStart(2, "0")}:${String(
          time.getMinutes()
        ).padStart(2, "0")}`}</div>
      </div>
      <div className="mt-[14px]">{reply.contents}</div>
    </div>
  );
};

export default Reply;
