import { DeleteBoardCommentDocument, FetchBoardCommentsDocument } from "@/Commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import Modal from "./modal";

const Reply = ({ reply, el, setIsEdit, setReplyId }) => {
  const [isModal, setIsModal] = useState(false);

  if (isModal) {
    document.body.style.overflow = "hidden"; // 스크롤 숨김
  } else {
    document.body.style.overflow = "auto"; // 스크롤 복원
  }

  const time = new Date(reply.createdAt);

  const [deleteBoardComment] = useMutation(DeleteBoardCommentDocument);

  const onClickDelPostReply = () => {
    deleteBoardComment({
      variables: {
        password: "123",
        boardCommentId: reply._id as string,
      },
      refetchQueries: [
        {
          query: FetchBoardCommentsDocument,
          variables: {
            boardId: el._id as string,
            page: 1,
          },
        },
      ],
    });
  };

  return (
    <div className="w-[1060px] h-[166px] bg-[#EEEEEE] rounded-[16px] px-[20px] py-[16px]">
      <div className="flex justify-between items-center">
        <div className="flex gap-[8px] items-center">
          <div className="bg-[#D9D9D9] rounded-full w-[40px] h-[40px]"></div>
          <span>답변자이름도최대열두글자</span>
        </div>
        <div className="flex gap-[20px] h-full items-center justify-center mr-[10px] text-[#767676]">
          <div
            onClick={() => {
              setIsEdit(true);
              setReplyId(reply._id);
              console.log("대댓글아이디", reply._id);
            }}
          >
            <Pencil />
          </div>
          <div onClick={() => setIsModal((prev) => !prev)}>
            <Trash2 />
          </div>
          {isModal && <Modal onClickDelete={onClickDelPostReply} setIsModal={setIsModal} />}
        </div>
      </div>
      <div className="mt-[14px] h-[50px]">{reply.contents}</div>
      <div className="text-[#767676] text-[12px] my-[16px]">{`${time.toLocaleDateString()} ${String(
        time.getHours()
      ).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")}`}</div>
    </div>
  );
};

export default Reply;
