import { FetchBoardCommentsDocument } from "@/Commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import Reply from "./reply";

const Comment = ({ el, setReply }) => {
  const time = new Date(el.createdAt);

  const { data: dataReply } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      page: 1,
      boardId: el._id as string,
    },
  });
  console.log(dataReply);

  return (
    <div className="w-[1120px] h-full border-b border-solid border-[#E0E0E0] px-[20px] py-[16px] flex flex-col gap-[10px]">
      <div className="flex items-center gap-[8px]">
        <div className="w-[40px] h-[40px] bg-[#E0E0E0] rounded-full"></div>
        <span>답변자이름도최대열두글자</span>
      </div>
      <div className="h-[50px]">{el.contents}</div>
      <div className="flex justify-between mt-[2px]">
        <div className="text-[#767676] text-[12px]">{`${time.toLocaleDateString()} ${String(
          time.getHours()
        ).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")}`}</div>
        <div className="flex gap-[20px] items-center">
          <div className="flex gap-[8px]">
            <div>
              <img src="/frame.png" />
            </div>
            <span className="text-[#767676]">{String(el.rating).padStart(3, "0")}</span>
          </div>

          <button
            className="w-[100px] h-[32px] bg-[#BDBDBD] rounded-[8px] flex justify-center items-center border border-[#767676] gap-[8px] text-[#FCFCFC] text-[16px]"
            onClick={() => setReply(el._id)}
          >
            <img src="/reply.png" />
            <span>답글</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col-reverse ">
        {dataReply?.fetchBoardComments.map((reply) => (
          <div className="mt-[20px]" key={reply._id}>
            <Reply reply={reply} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
