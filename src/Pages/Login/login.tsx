import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen bg-[#343434] flex justify-center items-center relative">
      <div className="bg-[url('/login-bg.png')] w-full h-full bg-cover"></div>
      <div className=" absolute w-[580px] h-[700px] bg-[#fcfcfc] rounded-2xl px-[50px] pt-[60px] pb-[70px] flex justify-between flex-col">
        <div className="w-full flex justify-center">
          <div className="w-[240px] h-[80px]">
            <img src="/login-logo.png" alt="login-logo" />
          </div>
        </div>
        <div className="w-full h-[250px] flex flex-col justify-around">
          <div className="flex gap-[8px] flex-col">
            <p className="text-[24px]">이메일</p>
            <input
              type="text"
              className="w-full h-[48px] px-[15px] bg-[#fcfcfc] border-[#bdbdbd] border-b-[1px] outline-none"
            />
          </div>
          <div className="flex gap-[8px] flex-col">
            <p className="text-[24px]">비밀번호</p>
            <input
              type="text"
              className="w-full h-[48px] px-[15px] bg-[#fcfcfc] border-[#bdbdbd] border-b-[1px] outline-none"
            />
          </div>
        </div>
        <div className=" w-full h-[150px] flex justify-between flex-col">
          <div>
            <button className="w-full h-[56px] bg-[#32cbff] rounded-2xl text-[24px] text-[#fcfcfc]">로그인</button>
          </div>
          <div className="bg-[yellow]w- full h-[80px] flex flex-col justify-around">
            <div className="flex justify-between text-[16px] text-[#222222]">
              <p>아직 회원이 아니신가요?</p>
              <Link to="/signup" className="underline underline-offset-2">
                회원가입
              </Link>
            </div>
            <div className="flex justify-between text-[16px] text-[#222222]">
              <p>비밀번호를 잊어버리셨나요?</p>
              <button className="underline underline-offset-2">비밀번호찾기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
