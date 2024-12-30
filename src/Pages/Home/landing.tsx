import { useNavigate } from "react-router-dom";
import logo from "/logo.svg";

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-gradient-to-b from-[#343434] to-[#222222] w-screen h-full flex flex-col justify-between overflow-clip">
      <div className="flex flex-col items-center mt-[80px]">
        <img src={logo} className="w-[240px] h-[80px]" />
        <p className="text-transparent bg-gradient-to-b from-white to-transparent bg-clip-text text-[120px] font-semibold tracking-wider leading-none mt-[20px]">
          Build Test Compare
        </p>
        <p className="text-white text-[40px] font-semibold tracking-wider transform translate-y-[-20px]">
          복잡한 셋팅과 설치 없이 내 사이트에 바로 적용해 보는 UI 플랫폼
        </p>
        <button className="w-[200px] h-[56px] rounded-2xl bg-[#32CBFF] text-white text-[24px] mb-[40px]" onClick={() => navigate('/home')}>
          시작하기
        </button>
      </div>

      <div className="bg-[url(landing.png)] w-full h-full bg-cover bg-top"></div>
    </div>
  );
}
