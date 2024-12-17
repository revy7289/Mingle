import { Link } from "react-router-dom";

export default function FindPwPage() {
  return (
    <div className="w-screen h-screen bg-[#343434] flex justify-center items-center relative">
      <div className="bg-[url('/login-bg.png')] w-full h-full bg-cover"></div>
      <div className=" absolute w-[580px] h-[520px] bg-[#fcfcfc] rounded-2xl px-[50px] pt-[60px] pb-[42px] flex justify-between flex-col">
        <div className=" w-full flex justify-center">
          <div className="w-[240px] h-[80px]">
            <Link to="/">
              <img src="/login-logo.png" alt="login-logo" />
            </Link>
          </div>
        </div>
        <div className=" w-full h-[29px] flex justify-center items-center">
          <p className="text-[#222222] text-[24px] font-semibold">회원가입 시 등록한 이메일을 입력해 주세요.</p>
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="text-[#222222] text-[24px] font-semibold">이메일</p>
          <input type="text" className="w-full h-[48px] bg-[#fcfcfc] border-[#bdbdbd] border-b-[1px] outline-none" />
        </div>
        <div className="w-full h-[56px]">
          <button className="w-full h-full text-[#fcfcfc] text-[24px] font-semibold bg-[#32cbff] rounded-2xl">
            인증메일 전송하기
          </button>
        </div>
      </div>
    </div>
  );
}
