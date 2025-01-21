import { Heart, MessageCircleReply, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import CommentWrite from "./commentWrite";
import { useMutation, useQuery } from "@apollo/client";
import {
  DeleteBoardCommentDocument,
  FetchBoardCommentsDocument,
  FetchUserLoggedInDocument,
  UpdateBoardCommentDocument,
  UpdateTravelproductDocument,
} from "@/commons/graphql/graphql";
import { useParams } from "react-router-dom";
import Modal from "./modal";
import Reply from "./reply";
import { useAccessTokenStore } from "@/commons/stores/tokenStore";

const Answer = ({
  isEdit,
  setIsEdit,
  answer,
  contents,
  setCommentId,
  commentId,
  replyId,
  setReplyId,
  onClickComment,
  onChangeComment,
  onClickUpdateComment,
}) => {
  const params = useParams();
  const time = new Date(answer.createdAt);
  const [isModal, setIsModal] = useState(false);
  const [likeActive, setLikeActive] = useState(false);
  const [answerBtn, setAnswerBtn] = useState("");

  const [deleteBoardAnswer] = useMutation(DeleteBoardCommentDocument);
  const [updateLikeComment] = useMutation(UpdateBoardCommentDocument);
  const [updateQuestionBoard] = useMutation(UpdateTravelproductDocument);

  const { accessToken } = useAccessTokenStore();

  const { data: userData } = useQuery(FetchUserLoggedInDocument);
  const { data: dataAnswerReply } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      page: 1,
      boardId: answer._id as string,
    },
  });

  //좋아요, 채택하기
  useEffect(() => {
    setLikeActive(false);

    const likeUser = JSON.parse(localStorage.getItem(`likeCount_Comment_${answer._id}`));
    if (likeUser === userData?.fetchUserLoggedIn._id) {
      setLikeActive(true);
    }
  }, [userData]);

  useEffect(() => {
    const saveAnswer = localStorage.getItem("selectedAnswer");
    if (saveAnswer) {
      setAnswerBtn(saveAnswer);
    }
  }, []);

  // 좋아요 누를때마다 댓글 업데이트함
  const onClickUpdateLike = () => {
    if (localStorage.getItem(`likeCount_Comment_${answer._id}`) === null) {
      const likeCount = answer.rating;

      updateLikeComment({
        variables: {
          updateBoardCommentInput: {
            rating: likeCount + 1,
          },
          password: "123",
          boardCommentId: answer._id as string,
        },
      });
      localStorage.setItem(
        `likeCount_Comment_${answer._id}`,
        JSON.stringify(userData?.fetchUserLoggedIn._id)
      );

      setLikeActive(true);
    }
  };

  const onClickDeleteAnswer = () => {
    deleteBoardAnswer({
      variables: {
        password: "123",
        boardCommentId: answer._id as string,
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

  const onClickAnswerBtn = async (answerId) => {
    setAnswerBtn(answerId); // 선택된 답변의 _id를 상태로 설정

    localStorage.setItem("selectedAnswer", answerId);
    alert("채택되었습니다");
    await updateQuestionBoard({
      variables: {
        updateTravelproductInput: {
          name: "해결",
        },
        travelproductId: params.boardId as string,
      },
    });
  };

  return (
    <div className="flex flex-col mt-[20px] gap-[20px] items-center">
      {/* 답변수정 컴포넌트 */}
      {isEdit && commentId === answer._id ? (
        <CommentWrite
          isEdit={isEdit}
          contents={contents}
          setCommentId={setCommentId}
          onChangeComment={onChangeComment}
          onClickUpdateComment={onClickUpdateComment}
        />
      ) : (
        <div className="w-[1120px] h-[202px] px-[20px] py-[16px] flex gap-[20px]">
          <div className="w-[200px] h-[200px] flex flex-col justify-center items-center gap-[20px]">
            <div className="w-[120px] h-[120px] bg-[#E0E0E0] rounded-[16px]"></div>
            <span>답변자이름도최대열두글자</span>
          </div>
          <div className="flex flex-col justify-between gap-[12px] w-[900px] h-[202px] px-[20px py-[16px]">
            <div className="w-[860px] h-[120px] flex justify-between">
              <div>{answer.contents}</div>
              <div className="flex gap-[20px]">
                <Pencil
                  color="#767676"
                  onClick={() => {
                    setCommentId(answer._id);
                    setIsEdit(true);
                  }}
                />
                <Trash2 color="#767676" onClick={() => setIsModal(true)} />
                {/* 삭제모달 */}
                {isModal && <Modal onClickDelete={onClickDeleteAnswer} setIsModal={setIsModal} />}
              </div>
            </div>
            <div className="flex justify-between w-[860px] h-[32px] items-center">
              <div className="text-[#767676] text-[12px]">
                {`${time.toLocaleDateString()} ${String(time.getHours()).padStart(2, "0")}:${String(
                  time.getMinutes()
                ).padStart(2, "0")}`}
              </div>
              <div className="flex gap-[20px] items-center">
                <div className="flex gap-[8px]">
                  <div className="flex w-[75px] justify-between px-[8px] gap-[8px]">
                    <div>
                      {likeActive ? (
                        <Heart fill="#ff3179" stroke="0" />
                      ) : (
                        <Heart color="#767676" onClick={onClickUpdateLike} />
                      )}
                    </div>
                    <span className="text-[#767676]">{answer.rating}</span>
                  </div>
                </div>
                {accessToken && (
                  <button
                    className={`w-[100px] h-[32px] rounded-[8px] flex justify-center items-center gap-[8px] text-[#FCFCFC] ${
                      answerBtn === answer._id
                        ? "bg-[#8BE1FF] border border-solid border-[#32CBFF]"
                        : "bg-[#32CBFF]"
                    }`}
                    onClick={() => onClickAnswerBtn(answer._id)}
                  >
                    <span>{answerBtn === answer._id ? "채택완료" : "채택하기"}</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setReplyId(answer._id);
                  }}
                  className="w-[100px] h-[32px] bg-[#BDBDBD] rounded-[8px] flex justify-center items-center border border-[#767676] gap-[8px] text-[#FCFCFC] text-[16px]"
                >
                  <MessageCircleReply />
                  <span>답글</span>
                </button>
              </div>
            </div>
            <div className="w-full border-2 border-[#E0E0E0]"></div>
          </div>
        </div>
      )}

      {/* 대댓글 */}
      <div className="flex flex-col-reverse ">
        {dataAnswerReply?.fetchBoardComments.map((reply) => (
          <div key={reply._id} className="mt-[45px]">
            {isEdit && replyId === reply._id ? (
              <CommentWrite
                onChangeComment={onChangeComment}
                onClickComment={onClickComment}
                onClickUpdateComment={onClickUpdateComment}
                setReplyId={setReplyId}
                setCommentId={setCommentId}
                isEdit={isEdit}
              />
            ) : (
              <div className="mt-[20px]">
                <Reply reply={reply} el={answer} setIsEdit={setIsEdit} setReplyId={setReplyId} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Answer;
