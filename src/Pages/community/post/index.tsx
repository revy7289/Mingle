import {
  CreateBoardCommentDocument,
  DeleteBoardDocument,
  DislikeBoardDocument,
  FetchBoardCommentsDocument,
  FetchBoardDocument,
  FetchUserLoggedInDocument,
  LikeBoardDocument,
  UpdateBoardCommentDocument,
} from "@/commons/graphql/graphql";
import Comment from "@/components/comments/comment";
import CommentWrite from "@/components/comments/commentWrite";
import { useMutation, useQuery } from "@apollo/client";
import { Eye, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function PostPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [contents, setContents] = useState("");
  const [commentId, setCommentId] = useState("");
  const [replyId, setReplyId] = useState("");
  const [likeCountActive, setLikeCountActive] = useState(false);

  const [deleteBoard] = useMutation(DeleteBoardDocument);
  const [createBoardComment] = useMutation(CreateBoardCommentDocument);
  const [updateBoardComment] = useMutation(UpdateBoardCommentDocument);
  const [likeBoard] = useMutation(LikeBoardDocument);
  const [viewBoard] = useMutation(DislikeBoardDocument);

  const { data: userData } = useQuery(FetchUserLoggedInDocument);
  console.log("유저정보", userData);

  //조회수
  const mount = useRef(false);
  useEffect(() => {
    if (!mount.current) {
      // 처음 마운트될 때 실행 // 본인도 업, 여러번 업
      console.log("조회수 업");
      viewBoard({
        variables: {
          boardId: params.boardId as string,
        },
      });
      mount.current = true;
    }
  }, []);

  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden"; // 스크롤 숨김
    } else {
      document.body.style.overflow = "auto"; // 스크롤 복원
    }
  }, [isModal]);

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem(`likeCount_${params.boardId}`));
    console.log(a);
    if (a === userData?.fetchUserLoggedIn._id) {
      setLikeCountActive(true);
    }
  }, [userData]);

  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: params.boardId as string,
    },
  });

  const time = new Date(data?.fetchBoard.createdAt);

  const { data: dataComments } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      page: 1,
      boardId: params.boardId as string,
    },
  });
  console.log(dataComments);

  // 게시글 삭제
  const onClickDelPost = () => {
    deleteBoard({
      variables: {
        boardId: params.boardId as string,
      },
    });
    setIsModal((prev) => !prev);
    navigate("/community");
  };

  //댓글
  const onChangeComment = (e) => {
    setContents(e.target.value);
    console.log(e.target.value);
  };

  const onClickComment = () => {
    createBoardComment({
      variables: {
        createBoardCommentInput: {
          writer: "작성자",
          password: "123",
          contents: contents,
          rating: 0, // 임의로적어둠 -> 댓글 좋아요로 사용,처음생성될때 무조건0
        },
        boardId: params.boardId as string,
      },
      refetchQueries: [
        {
          query: FetchBoardCommentsDocument,
          variables: {
            boardId: String(params.boardId),
            page: 1,
          },
        },
      ],
    });
  };

  const onClickUpdateComment = () => {
    updateBoardComment({
      variables: {
        updateBoardCommentInput: {
          contents: contents,
          rating: 0, // 디비에있는 좋아요가져오기
        },
        password: "123",
        boardCommentId: String(commentId),
      },
      refetchQueries: [
        {
          query: FetchBoardCommentsDocument,
          variables: {
            boardId: String(commentId),
            page: 1,
          },
        },
      ],
    });
    setIsEdit(false);
  };

  //대댓글
  const onClickReply = () => {
    createBoardComment({
      variables: {
        createBoardCommentInput: {
          writer: "작성자",
          password: "123",
          contents: contents,
          rating: 22321, // 임의로적어둠 -> 댓글 좋아요로 사용?
        },
        boardId: String(replyId),
      },
      refetchQueries: [
        {
          query: FetchBoardCommentsDocument,
          variables: {
            boardId: String(replyId),
            page: 1,
          },
        },
      ],
    });
  };

  const onClickUpdateReply = () => {
    updateBoardComment({
      variables: {
        updateBoardCommentInput: {
          contents: contents,
          rating: 0,
        },
        password: "123",
        boardCommentId: String(replyId),
      },
    });
    setIsEdit(false);
  };

  const handleUpdate = () => {
    if (isEdit) {
      if (commentId) {
        onClickUpdateComment(); // 댓글 업데이트 함수 호출
      } else {
        onClickUpdateReply(); // 대댓글 업데이트 함수 호출
      }
      // commentId 초기화
      setCommentId("");
    }
  };

  const onClickLikeCount = () => {
    // TODO: 로그인 되어있을때만, 좋아요 처리
    if (localStorage.getItem(`likeCount_${params.boardId}`) === null) {
      likeBoard({
        variables: {
          boardId: String(params.boardId),
        },
        refetchQueries: [
          {
            query: FetchBoardDocument,
            variables: {
              boardId: String(params.boardId),
              page: 1,
            },
          },
        ],
      });
      setLikeCountActive(true);
    }
    localStorage.setItem(
      `likeCount_${params.boardId}`,
      JSON.stringify(userData?.fetchUserLoggedIn._id)
    );
  };

  return (
    <div className="w-full h-auto flex flex-col items-center">
      <div className=" w-[1120px] h-[1500px]">
        <div className=" w-full h-[102px] border-[#bdbdbd] border-b-[1px] flex justify-between">
          <div className="w-[900px] h-[80px] flex flex-col justify-between">
            <p className="text-[#222222] text-[40px] font-semibold">{data?.fetchBoard.title}</p>
            <p className="text-[#222222] text-[16px] ">작성자이름은최대열두글자</p>
          </div>
          <div className="w-[170px] h-[68px] flex flex-col justify-between mt-[15px]">
            <div className="flex w-full h-[24px] justify-between mt-[7px]">
              <div className="flex w-[75px] justify-between px-[8px] gap-[8px]">
                {likeCountActive ? (
                  <Heart fill="#ff3179" stroke="0" />
                ) : (
                  <Heart color="#767676" onClick={onClickLikeCount} />
                )}

                <p className="text-[#767676] text-[16px]">{String(data?.fetchBoard.likeCount)}</p>
              </div>
              <div className="flex w-[75px] justify-between px-[8px] gap-[8px]">
                <Eye color="#767676" />{" "}
                <p className="text-[#767676] text-[16px]">
                  {String(data?.fetchBoard.dislikeCount)}
                </p>
              </div>
            </div>
            <div className="flex justify-center text-[#767676]">
              {`${time.toLocaleDateString()} ${String(time.getHours()).padStart(2, "0")}:${String(
                time.getMinutes()
              ).padStart(2, "0")}`}
            </div>
          </div>
        </div>
        <div className=" w-full h-[468px] border-[#bdbdbd] border-b-[1px] px-[20px] pt-[60px]">
          <div className=" w-full h-[320px] text-[#222222] leading-[32px] tracking-[-0.5px]">
            {data?.fetchBoard.contents}
          </div>
          <div className="w-full h-[24px] mt-[30px] flex justify-between">
            <div className="w-[350px] h-full flex gap-[10px]">태그</div>
            <div className="flex gap-[20px]">
              <Link to={`/community/post/${params.boardId}/edit`}>
                <button className="text-[#767676]">수정하기</button>
              </Link>
              <button className="text-[#767676]" onClick={() => setIsModal((prev) => !prev)}>
                삭제하기
              </button>
              {isModal && <Modal onClickDelete={onClickDelPost} setIsModal={setIsModal} />}
            </div>
          </div>
        </div>
        <div className="w-full h-[325px] border-[#bdbdbd] border-b-[1px] px-[20px] pt-[60px] pb-[45px] flex flex-col gap-[10px]">
          <div className="flex text-[24px] text-[#222222] font-semibold h-[29px] ml-[20px]">
            답변 {dataComments?.fetchBoardComments.length}
          </div>
          {/* 댓글처음 다는부분 */}
          <CommentWrite
            onChangeComment={onChangeComment}
            onClickComment={onClickComment}
            // onClickUpdateComment={onClickUpdateComment}// 업데이트 필요없음
            // setReplyId={setReplyId} // 필요없긴함
            // isEdit={isEdit}// 필요없음
          />
        </div>
        <div>
          {dataComments?.fetchBoardComments.map((el) => (
            <div key={el._id} className="mt-[45px]">
              <Comment
                el={el}
                replyId={replyId}
                setReplyId={setReplyId}
                onChangeComment={onChangeComment}
                onClickComment={onClickReply} // 대댓글 onClickReply
                onClickUpdateComment={handleUpdate}
                setIsEdit={setIsEdit}
                isEdit={isEdit}
                setCommentId={setCommentId}
                commentId={commentId}
              />
              {/* 댓글등록 */}
              {!isEdit && replyId === el._id && (
                <div className="mt-[20px]">
                  {/* createBoardComment API로 대댓글 등록 */}
                  <CommentWrite
                    onChangeComment={onChangeComment}
                    onClickComment={onClickReply}
                    onClickUpdateComment={onClickUpdateComment}
                    setReplyId={setReplyId}
                    setCommentId={setCommentId}
                    isEdit={isEdit}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
