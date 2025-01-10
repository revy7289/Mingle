import {
  DeleteBoardCommentDocument,
  FetchBoardCommentsDocument,
  FetchUserLoggedInDocument,
  UpdateBoardCommentDocument,
} from "@/commons/graphql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import Reply from "./reply";
import { Heart, MessageCircleReply, Pencil, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import CommentWrite from "./commentWrite";
import { useEffect, useState } from "react";
import Modal from "./modal";

const Comment = ({
  el,
  onChangeComment,
  onClickUpdateComment,
  onClickComment,
  replyId,
  setReplyId,
  setIsEdit,
  isEdit,
  commentId,
  setCommentId,
}) => {
  const params = useParams();
  const time = new Date(el.createdAt);
  const [isModal, setIsModal] = useState(false);
  const [likeActive, setLikeActive] = useState(false);

  const { data: userData } = useQuery(FetchUserLoggedInDocument);
  const { data: dataReply } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      page: 1,
      boardId: el._id as string,
    },
  });
  const [updateLikeComment] = useMutation(UpdateBoardCommentDocument);

  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden"; // 스크롤 숨김
    } else {
      document.body.style.overflow = "auto"; // 스크롤 복원
    }
  }, [isModal]);

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem(`likeCount_Comment_${el._id}`));
    if (a === userData?.fetchUserLoggedIn._id) {
      setLikeActive(true);
    }
  }, [userData]);

  const [deleteBoardComment] = useMutation(DeleteBoardCommentDocument);

  const onClickDelPostComment = () => {
    deleteBoardComment({
      variables: {
        password: "123",
        boardCommentId: el._id as string,
      },
      refetchQueries: [
        {
          query: FetchBoardCommentsDocument,
          variables: {
            boardId: params.boardId as string,
            page: 1,
          },
        },
      ],
    });
  };

  // 좋아요 누를때마다 댓글 업데이트함
  const onClickUpdateLike = () => {
    if (localStorage.getItem(`likeCount_Comment_${el._id}`) === null) {
      const likeCount = el.rating;
      setLikeActive(true);
      updateLikeComment({
        variables: {
          updateBoardCommentInput: {
            rating: likeCount + 1,
          },
          password: "123",
          boardCommentId: el._id as string,
        },
      });
      localStorage.setItem(
        `likeCount_Comment_${el._id}`,
        JSON.stringify(userData?.fetchUserLoggedIn._id)
      );
    }
  };

  return (
    <div className="w-[1120px] h-full border-b border-solid border-[#E0E0E0] px-[20px] py-[16px] flex flex-col gap-[10px]">
      {isEdit && commentId === el._id ? (
        <CommentWrite
          onChangeComment={onChangeComment}
          onClickComment={onClickComment}
          setReplyId={setReplyId}
          setCommentId={setCommentId}
          isEdit={isEdit}
          onClickUpdateComment={onClickUpdateComment}
        />
      ) : (
        <div>
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-[8px]">
              <div className="w-[40px] h-[40px] bg-[#E0E0E0] rounded-full"></div>
              <span>답변자이름도최대열두글자</span>
            </div>
            <div className="flex gap-[20px] h-full items-center justify-center mr-[10px] text-[#767676]">
              <div
                onClick={() => {
                  setCommentId(el._id);
                  setIsEdit(true);
                  console.log(isEdit);
                }}
              >
                <Pencil />
              </div>
              <div onClick={() => setIsModal(true)}>
                <Trash2 />
              </div>
              {isModal && <Modal onClickDelete={onClickDelPostComment} setIsModal={setIsModal} />}
            </div>
          </div>
          <div className="h-[50px] flex items-center">{el.contents}</div>
          <div className="flex justify-between mt-[2px]">
            <div className="text-[#767676] text-[12px] flex items-center">{`${time.toLocaleDateString()} ${String(
              time.getHours()
            ).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")}`}</div>
            <div className="flex gap-[20px] items-center">
              <div className="flex w-[75px] justify-between px-[8px] gap-[8px]">
                <div>
                  {likeActive ? (
                    <Heart fill="#ff3179" stroke="0" />
                  ) : (
                    <Heart color="#767676" onClick={onClickUpdateLike} />
                  )}
                </div>
                <span className="text-[#767676]">{String(el.rating)}</span>
              </div>

              <button
                className="w-[100px] h-[32px] bg-[#BDBDBD] rounded-[8px] flex justify-center items-center border border-[#767676] gap-[8px] text-[#FCFCFC] text-[16px]"
                onClick={() => {
                  setIsEdit(false);
                  setReplyId(el._id);
                }}
              >
                <MessageCircleReply />
                <span>답글</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 대댓글 */}
      <div className="flex flex-col-reverse ">
        {dataReply?.fetchBoardComments.map((reply) => (
          <div key={reply._id} className="mt-[45px]">
            {isEdit && replyId === reply._id ? (
              <CommentWrite
                onChangeComment={onChangeComment}
                onClickComment={onClickComment}
                setReplyId={setReplyId}
                setCommentId={setCommentId}
                isEdit={isEdit}
                onClickUpdateComment={onClickUpdateComment}
              />
            ) : (
              <div className="mt-[20px]">
                <Reply reply={reply} el={el} setIsEdit={setIsEdit} setReplyId={setReplyId} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
