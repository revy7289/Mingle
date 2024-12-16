import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className="w-screen h-screen bg-[#343434] flex justify-center items-center relative">
      <div className="bg-[url('/login-bg.png')] w-full h-full bg-cover"></div>
      <div className=" absolute w-[580px] h-[700px] bg-[#fcfcfc] rounded-2xl p-[50px] flex justify-between flex-col">
        <div className="flex  justify-center relative">
          <p onClick={handleGoBack} className="text-[#767676] flex absolute left-0 cursor-pointer">
            <ChevronLeft className="text-[#767676]" /> 뒤로가기
          </p>
          <Link to='/'>
            <img src="/login-logo.png" alt="logo" className="w-[180px] h-[60px]" />
          </Link>
        </div>
        <div className="w-full h-[400px] flex flex-col justify-between">
          <div className="flex flex-col gap-[8px]">
            <p className="text-[24px] text-semibold text-[#222222]">이메일</p>
            <input type="text" className="w-full h-[48px] bg-[#fcfcfc] border-[#bdbdbd] border-b-[1px] outline-none" />
          </div>
          <div className="flex flex-col gap-[8px]">
            <p className="text-[24px] text-semibold text-[#222222]">이름</p>
            <input type="text" className="w-full h-[48px] bg-[#fcfcfc] border-[#bdbdbd] border-b-[1px] outline-none" />
          </div>
          <div className="flex flex-col gap-[8px]">
            <p className="text-[24px] text-semibold text-[#222222]">비밀번호</p>
            <input type="text" className="w-full h-[48px] bg-[#fcfcfc] border-[#bdbdbd] border-b-[1px] outline-none" />
          </div>
          <div className="flex flex-col gap-[8px]">
            <p className="text-[24px] text-semibold text-[#222222]">비밀번호 확인</p>
            <input type="text" className="w-full h-[48px] bg-[#fcfcfc] border-[#bdbdbd] border-b-[1px] outline-none" />
          </div>
        </div>
        <div className="w-full h-[56px]">
          <button className="w-full h-full rounded-2xl bg-[#32cbff] text-[#fcfcfc] text-[24px] text-semibold">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
