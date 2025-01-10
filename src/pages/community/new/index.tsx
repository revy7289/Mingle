import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { Tag } from "@/Components/tag";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
} from "@/commons/graphql/graphql";

export default function NewPage() {
  const tagList = ["MUI", "ANTD", "chakra", "shardcn", "React", "Vue", "Angular", "Svelte"];
  const [seletedTag, setSeletedTag] = useState([]);
  console.log(seletedTag);

  const location = window.location.pathname;
  const isEdit = location.includes("edit");

  const editorRef = useRef<Editor>(null);

  const params = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState("");

  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: params.boardId as string,
    },
  });

  useEffect(() => {
    editorRef.current?.getInstance().setMarkdown(data?.fetchBoard.contents);
  }, [data]);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const onChangeEditor = () => {
    const content = editorRef.current?.getInstance().getMarkdown();
    console.log(content);
    setEditor(content);
  };

  const onClickSubmit = async () => {
    if (!isEdit) {
      const createResult = await createBoard({
        variables: {
          createBoardInput: {
            writer: "작성자",
            password: "123",
            title: title,
            contents: editor,
            images: seletedTag,
          },
        },
      });
      console.log(createResult);
      navigate(`/community/post/${createResult.data?.createBoard._id}`);
    } else {
      const updateResult = await updateBoard({
        variables: {
          updateBoardInput: {
            title: title || data?.fetchBoard.title,
            contents: editor || data?.fetchBoard.contents,
            images: seletedTag || data?.fetchBoard.images,
          },
          boardId: params.boardId as string,
          password: "123",
        },
      });
      navigate(`/community/post/${updateResult.data?.updateBoard._id}`);
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
          defaultValue={data?.fetchBoard.title}
        />

        <div className="mt-[20px] min-h-[600px] mb-[400px]">
          <Editor
            initialValue=" "
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
              <div className="flex gap-[54px]">
                <span>카테고리</span>
                <div className="flex gap-[8px]">
                  <input type="checkbox" className="w-[24px] h-[24px] accent-[#E0E0E0]" id="QNA" />
                  <label className="mr-[12px]" for="QNA">
                    질문과답변
                  </label>
                  <input type="checkbox" className="w-[24px] h-[24px] accent-[#E0E0E0]" id="Free" />
                  <label for="Free">자유게시판</label>
                </div>
              </div>
              <div className="flex mt-[40px]  gap-[54px]">
                <span>태그편집</span>
                <div className="flex w-[350px]">
                  <div className="flex flex-wrap gap-[10px]">
                    {tagList.map((tag, index) => (
                      <div key={index}>
                        <Tag tagName={tag} seletedTag={seletedTag} setSeletedTag={setSeletedTag} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <textarea
                  type="text"
                  className="w-full h-[84px] px-[12px] py-[14px] bg-[#F5F5F5] outline-none border-b border-[#BDBDBD] mt-[40px] resize-none"
                  placeholder="#태그 직접 입력하기"
                />
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
