const Modal = ({ onClickDelete, setIsModal }) => {
  return (
    <div>
      {/* <div className="absolute top-0 left-0 w-full h-screen overflow-hidden bg-black bg-opacity-50"> */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
        onClick={() => setIsModal(false)}
      >
        <div className="flex flex-col justify-center items-center w-[512px] h-[340px] bg-white absolute top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[8px]">
          <span>삭제하시겠습니까?</span>
          <div className="flex w-full h-[32px] justify-center gap-[20px] mt-[15px]">
            <button
              className="w-[100px] h-full rounded-[8px] bg-[#32CBFF] text-[#fcfcfc]"
              onClick={onClickDelete}
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
    </div>
  );
};

export default Modal;
