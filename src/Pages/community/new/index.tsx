import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import {
  TagAngular,
  TagAntd,
  TagChakra,
  TagMui,
  TagReact,
  TagShardcn,
  TagSvelte,
  TagVue,
} from "@/Components/tag";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
} from "@/Commons/graphql/graphql";

export default function NewPage() {
  const location = window.location.pathname;
  const isEdit = location.includes("edit");

  const editorRef = useRef<Editor>(null);

  const params = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState("");
  // const [tag, setTag] = useState([""]);

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

  // const onClickSubmit = async () => {
  //   if (!isEdit) {
  //     const createResult = await createBoard({
  //       variables: {
  //         createBoardInput: {
  //           writer: "작성자",
  //           password: "123",
  //           title: title,
  //           contents: editor,
  //         },
  //       },
  //     });
  //     console.log(createResult);
  //     navigate(`/community/post/${createResult.data?.createBoard._id}`);
  //   } else {
  //     const updateResult = await updateBoard({
  //       variables: {
  //         updateBoardInput: {
  //           title: title || data?.fetchBoard.title,
  //           contents: editor || data?.fetchBoard.contents,
  //         },
  //         boardId: params.boardId as string,
  //         password: "123",
  //       },
  //     });
  //     navigate(`/community/post/${updateResult.data?.updateBoard._id}`);
  //   }
  // };

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
            <div className="pt-[60px] px-[60px] w-[576px] h-[386px] border border-[#dadde6] flex flex-col justify-between rounded-2xl absolute bottom-[80px] bg-white z-10">
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
              <div className="flex gap-[54px]">
                <span>태그편집</span>
                <div className="flex flex-col">
                  <div className="flex gap-[10px]">
                    <TagMui />
                    <TagAntd />
                    <TagChakra />
                    <TagShardcn />
                  </div>
                  <div className="flex gap-[10px] mt-[10px]">
                    <TagReact />
                    <TagVue />
                    <TagAngular />
                    <TagSvelte />
                  </div>
                </div>
              </div>
              <div>
                <input
                  type="text"
                  className="w-full h-[48px] px-[15px] bg-[#fcfcfc] border-[#bdbdbd] border-b-[1px] outline-none mt-[10px]"
                  placeholder="태그 직접 입력하기"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
