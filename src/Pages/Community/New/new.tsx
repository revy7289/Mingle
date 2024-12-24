import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import Tag from "@/components/tag";
import { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BOARD } from "@/Commons/Queries/queries";
import { useNavigate } from "react-router-dom";

export default function NewPage() {
  const editorRef = useRef<Editor>();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState("");

  const [createBoard] = useMutation(CREATE_BOARD);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const onChangeEditor = () => {
    const content = editorRef.current.getInstance().getMarkdown();
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
          },
        },
      });
      console.log(createResult);
      navigate(`/community/post/${createResult.data?.createBoard._id}`);
    } else {
      console.log("수정된부분");
    }
  };

  return (
    <div className="w-screen h-full flex flex-col items-center">
      <div className="w-[1120px] flex flex-col">
        <div className="text-[40px] font-semibold">게시글 등록</div>

        <input
          type="text"
          placeholder="제목을 입력해 주세요."
          className="w-full h-[80px] px-[20px] py-[24px] bg-[#fcfcfc] border-[#e0e0e0] border-b-[1px] outline-none text-[24px] mt-[30px]"
          onChange={onChangeTitle}
          value={title}
        />

        <div className="mt-[20px] min-h-[600px] mb-[400px] relative">
          <Editor
            ref={editorRef}
            placeholder="hello react editor world!"
            hideModeSwitch="true"
            previewStyle="vertical"
            height="100%"
            initialEditType={"wysiwyg"}
            useCommandShortcut={true}
            onChange={onChangeEditor}
            initialValue=" " // 초기값 비우기
          />

          <div
            className={`w-[80px] h-[24px] bg-[${
              isModalOpen ? "#767676" : "#bdbdbd"
            }] rounded-lg text-[#FFFFFF] flex justify-center absolute left-[20px] bottom-[40px]`}
            onClick={() => setModalOpen((prev) => !prev)}
          >
            태그 선택
          </div>

          {isModalOpen && (
            <div className="w-[450px] h-[300px] border border-[#dadde6] flex flex-col justify-between px-[50px] py-[30px] rounded-2xl absolute bottom-0px] left-[10px] bg-white">
              <div>
                <p># 라이브러리</p>

                <div className="flex mt-[10px] gap-[10px]">
                  <Tag />
                  <Tag />
                  <Tag />
                  <Tag />
                </div>
              </div>

              <div>
                <p># 프레임워크</p>

                <div className="flex mt-[10px] gap-[10px]">
                  <Tag />
                  <Tag />
                  <Tag />
                  <Tag />
                </div>
              </div>

              <div>
                <p>직접 입력하기...</p>
                <input
                  type="text"
                  className="w-full h-[48px] px-[15px] bg-[#fcfcfc] border-[#bdbdbd] border-b-[1px] outline-none mt-[10px]"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-screen h-[80px] fixed bg-[#767676] bottom-0 flex justify-center items-center">
        <div className="w-[1120px] flex justify-end gap-[20px]">
          <button
            className="w-[120px] h-[48px] bg-[#32CBFF] rounded-lg text-white text-[20px]"
            onClick={onClickSubmit}
          >
            등록하기
          </button>
          <button className="w-[120px] h-[48px] bg-[#bdbdbd] rounded-lg text-white text-[20px]">
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
}
