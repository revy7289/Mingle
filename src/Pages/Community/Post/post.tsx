import {
  CreateBoardCommentDocument,
  DeleteBoardDocument,
  FetchBoardCommentsDocument,
  FetchBoardDocument,
} from "@/Commons/graphql/graphql";
import Comment from "@/components/Comments/comment";
import CommentWrite from "@/components/Comments/commentWrite";
import { useMutation, useQuery } from "@apollo/client";
import { Eye, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function PostPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [contents, setContents] = useState("");
  const [reply, setReply] = useState("");

  const [deleteBoard] = useMutation(DeleteBoardDocument);
  const [createBoardComment] = useMutation(CreateBoardCommentDocument);

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

  // 게시글 삭제
  const onClickDelPost = () => {
    console.log(isModal);
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
          rating: 22321, // 임의로적어둠 -> 댓글 좋아요로 사용?
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

  const onClickReply = () => {
    createBoardComment({
      variables: {
        createBoardCommentInput: {
          writer: "작성자",
          password: "123",
          contents: contents,
          rating: 22321, // 임의로적어둠 -> 댓글 좋아요로 사용?
        },
        boardId: String(reply),
      },
      refetchQueries: [
        {
          query: FetchBoardCommentsDocument,
          variables: {
            boardId: String(reply),
            page: 1,
          },
        },
      ],
    });
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
              <div className="flex gap-[8px]">
                <ThumbsUp color="#767676" />{" "}
                <p className="text-[#767676] text-[16px]">
                  {String(data?.fetchBoard.likeCount).padStart(3, "0")}
                </p>
              </div>
              <div className="flex gap-[8px]">
                <Eye color="#767676" />{" "}
                <p className="text-[#767676] text-[16px]">
                  {String(data?.fetchBoard.dislikeCount).padStart(3, "0")}
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
              {isModal && (
                <div className="absolute top-0 left-0 w-full h-screen overflow-hidden bg-black bg-opacity-50">
                  <div className="flex flex-col justify-center items-center w-[512px] h-[340px] bg-white absolute top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[8px]">
                    <span>삭제하시겠습니까?</span>
                    <div className="flex w-full h-[32px] justify-center gap-[20px] mt-[15px]">
                      <button
                        className="w-[100px] h-full rounded-[8px] bg-[#32CBFF] text-[#fcfcfc]"
                        onClick={onClickDelPost}
                      >
                        삭제
                      </button>
                      <button
                        className="w-[100px] h-full rounded-[8px] bg-[#767676] text-[#fcfcfc]"
                        onClick={() => setIsModal((prev) => !prev)}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full h-[325px] border-[#bdbdbd] border-b-[1px] px-[20px] pt-[60px] pb-[45px] flex flex-col gap-[10px]">
          <p className="text-[24px] text-[#222222] font-semibold w-[68px] h-[29px] ml-[20px]">
            답변 4
          </p>
          <CommentWrite
            onChangeComment={onChangeComment}
            onClickComment={onClickComment}
            setReply={setReply} // 필요없긴함
          />
        </div>
        <div>
          {dataComments?.fetchBoardComments.map((el) => (
            <div key={el._id} className="mt-[45px]">
              <Comment el={el} setReply={setReply} />
              {reply === el._id && (
                <div key={el._id} className="mt-[20px]">
                  {/* createBoardComment API로 대댓글 등록 */}
                  <CommentWrite
                    onChangeComment={onChangeComment}
                    onClickComment={onClickReply}
                    setReply={setReply}
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
