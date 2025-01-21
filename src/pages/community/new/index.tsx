import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { Tag } from "@/components/tag";
import { X } from "lucide-react";
import {
  CreateBoardDocument,
  CreateTravelproductDocument,
  FetchBoardDocument,
  FetchBoardsDocument,
  FetchTravelproductDocument,
  FetchTravelproductsDocument,
  UpdateBoardDocument,
  UpdateTravelproductDocument,
} from "@/commons/graphql/graphql";

export default function NewPage() {
  const location = window.location.pathname;
  const isEdit = location.includes("edit");
  const isQnA = location.includes("qna");

  const editorRef = useRef<Editor>(null);
  const params = useParams();
  const navigate = useNavigate();

  const tagList = ["MUI", "ANTD", "chakra", "shadcn", "React", "Vue", "Angular", "Svelte"];
  const [inputTag, setInputTag] = useState("");
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [checkbox, setCheckbox] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState("");

  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);
  const [createQuestionBoard] = useMutation(CreateTravelproductDocument);
  const [updateQuestionBoard] = useMutation(UpdateTravelproductDocument);

  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: params.boardId as string,
    },
  });

  const { data: dataQuestionBoard } = useQuery(FetchTravelproductDocument, {
    variables: {
      travelproductId: params.boardId as string,
    },
  });

  // 게시글 내용
  useEffect(() => {
    editorRef.current
      ?.getInstance()
      .setMarkdown(
        isQnA ? dataQuestionBoard?.fetchTravelproduct.contents : data?.fetchBoard.contents
      );
  }, [isQnA, dataQuestionBoard, data]);

  // 게시글 태그
  useEffect(() => {
    if (isQnA) {
      setSelectedTag(dataQuestionBoard?.fetchTravelproduct.tags || []);
    } else {
      setSelectedTag(data?.fetchBoard?.images || []);
    }
  }, [isQnA, dataQuestionBoard?.fetchTravelproduct.tags, data?.fetchBoard.images]);

  useEffect(() => {
    if (isQnA && isEdit) {
      setCheckbox(0);
    } else if (!isQnA && isEdit) {
      setCheckbox(1);
    }
  }, [isQnA]);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const onChangeEditor = () => {
    const content = editorRef.current?.getInstance().getMarkdown();
    setEditor(content);
  };

  const onKeyDownEnter = (e) => {
    if (
      e.key === "Enter" &&
      e.target.value.length !== 0 &&
      !e.nativeEvent.isComposing &&
      selectedTag.length < 8
    ) {
      setSelectedTag((prevArr) => [...prevArr, inputTag]);
      setInputTag("");
    }
  };

  const onDeleteTag = (tagIndex) => {
    setSelectedTag((prevArr) => prevArr.filter((_, index) => index !== tagIndex));
  };

  const onClickSubmit = async () => {
    if (checkbox === 0) {
      if (!isEdit) {
        const createQuestionResult = await createQuestionBoard({
          variables: {
            createTravelproductInput: {
              name: "미해결",
              remarks: title, // remarks -> title로 활용
              contents: editor,
              price: 123,
              tags: selectedTag,
            },
          },
          refetchQueries: [
            {
              query: FetchTravelproductsDocument,
            },
          ],
        });
        navigate(`/community/qna/${createQuestionResult.data?.createTravelproduct._id}`);
      } else {
        const updateQuestionResult = await updateQuestionBoard({
          variables: {
            updateTravelproductInput: {
              remarks: title || dataQuestionBoard?.fetchTravelproduct.remarks,
              contents: editor || dataQuestionBoard?.fetchTravelproduct.contents,
              price: 123,
              tags: selectedTag || dataQuestionBoard?.fetchTravelproduct.tags,
            },
            travelproductId: params.boardId as string,
          },
          refetchQueries: [
            {
              query: FetchTravelproductsDocument,
            },
          ],
        });
        navigate(`/community/qna/${updateQuestionResult.data?.updateTravelproduct._id}`);
      }
    } else if (checkbox === 1) {
      if (!isEdit) {
        const createResult = await createBoard({
          variables: {
            createBoardInput: {
              writer: "작성자",
              password: "123",
              title: title,
              contents: editor,
              images: selectedTag,
            },
          },
          refetchQueries: [
            {
              query: FetchBoardsDocument,
            },
          ],
        });
        navigate(`/community/post/${createResult.data?.createBoard._id}`);
      } else {
        const updateResult = await updateBoard({
          variables: {
            updateBoardInput: {
              title: title || data?.fetchBoard.title,
              contents: editor || data?.fetchBoard.contents,
              images: selectedTag || data?.fetchBoard.images,
            },
            boardId: params.boardId as string,
            password: "123",
          },
          refetchQueries: [
            {
              query: FetchBoardsDocument,
            },
          ],
        });
        navigate(`/community/post/${updateResult.data?.updateBoard._id}`);
      }
    }
  };

  return (
    <div className="w-screen h-full flex flex-col items-center">
      <div className="w-[1120px] h-full flex flex-col">
        <div className="text-[40px] font-semibold">게시글 {isEdit ? "수정" : "등록"}</div>

        <input
          type="text"
          placeholder="제목을 입력해 주세요."
          className="w-full h-[80px] px-[20px] py-[24px] bg-[#fcfcfc] border-[#e0e0e0] border-b-[1px] outline-none text-[24px] mt-[30px] "
          onChange={onChangeTitle}
          defaultValue={
            isQnA ? dataQuestionBoard?.fetchTravelproduct.remarks : data?.fetchBoard.title
          }
        />

        <div className="mt-[20px] min-h-[600px] mb-[400px]">
          <Editor
            initialValue={
              isQnA ? dataQuestionBoard?.fetchTravelproduct.contents : data?.fetchBoard.contents
            }
            placeholder="내용을 입력해주세요."
            previewStyle="vertical"
            height="100%"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            hideModeSwitch="true"
            ref={editorRef}
            onChange={onChangeEditor}
          />
        </div>
      </div>

      <div className="w-screen h-[80px] fixed bg-[#767676] bottom-0 flex flex-col justify-center items-center">
        <div className="w-[1120px] flex justify-end gap-[20px]">
          <button
            className="w-[120px] h-[48px] bg-[#32CBFF] rounded-lg text-white text-[20px]"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            {isEdit ? "수정하기" : "등록하기"}
          </button>

          <button
            className="w-[120px] h-[48px] bg-[#bdbdbd] rounded-lg text-white text-[20px]"
            onClick={() => setModalOpen(false)}
          >
            취소하기
          </button>
        </div>
        <div className="w-[1120px] flex justify-end gap-[20px] relative bottom-[0px] left-[315px]">
          {isModalOpen && (
            <div className="pt-[60px] px-[56px] w-[576px] h-[386px] border border-[#dadde6] flex flex-col justify-between rounded-2xl absolute bottom-[80px] bg-white z-10">
              <div className="flex">
                <span className="mr-[54px]">카테고리</span>
                {["질문과답변", "자유게시판"].map((boards, index) => (
                  <div key={index} className="flex gap-[8px]">
                    <input
                      onClick={() => {
                        setCheckbox(index);
                        console.log(checkbox);
                      }}
                      type="checkbox"
                      checked={checkbox === index}
                      className="w-[24px] h-[24px] accent-[#E0E0E0]"
                      id={`checkbox-${index}`}
                      disabled={isEdit ? true : false}
                    />
                    <label className="mr-[20px]" htmlFor={`checkbox-${index}`}>
                      {boards}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex mt-[40px]  gap-[54px]">
                <span>태그편집</span>
                <div className="flex w-[350px]">
                  <div className="flex flex-wrap gap-[10px]">
                    {tagList.map((tag, index) => (
                      <div key={index} className="w-[80px]">
                        <Tag
                          tagName={tag}
                          selectedTag={selectedTag}
                          setSelectedTag={setSelectedTag}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full h-full mt-[40px] flex flex-col items-center">
                <div className="flex flex-wrap items-center gap-[8px] w-[500px] h-[84px] px-[12px] py-[14px]  border-b border-[#BDBDBD] bg-[#F5F5F5] overflow-hidden">
                  {selectedTag &&
                    selectedTag.map((el, index) => (
                      <div key={index} className="w-[113px] relative">
                        <Tag tagName={el}>
                          <X
                            size={16}
                            className="absolute top-1 right-2"
                            onClick={() => onDeleteTag(index)}
                          />
                        </Tag>
                      </div>
                    ))}
                  {selectedTag.length === 8 || (
                    <input
                      className="bg-[#F5F5F5] outline-none resize-none w-[113px]"
                      placeholder="#태그(최대 8개)"
                      onKeyDown={onKeyDownEnter}
                      value={inputTag}
                      onChange={(e) => setInputTag(e.target.value)}
                    />
                  )}
                </div>
              </div>
              <div className="flex justify-center my-[20px]">
                <button
                  className="w-[80px] h-[40px] bg-[#32CBFF] rounded-[8px] text-[20px] text-[#FCFCFC]"
                  onClick={onClickSubmit}
                >
                  확인
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
