import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      {/* header */}
      <div className="w-full h-[100px] bg-[#343434] flex justify-between items-center px-[100px] border-b-2 border-[#424242]">
        <Link to="/">
          <img src="/logoColor.svg" alt="logo" className="cursor-pointer" />
        </Link>

        <ul className="flex text-white">
          <li className="w-[200px] h-[56px] flex justify-center items-center">
            <Link to="/home">Playground</Link>
          </li>
          <li className="w-[200px] h-[56px] flex justify-center items-center">
            <Link to="/community">Community</Link>
          </li>
          <li className="w-[160px] h-[56px] flex justify-center items-center">
            <Link to="/gallery">Gallery</Link>
          </li>
          <li className="w-[160px] h-[56px] flex justify-center items-center">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>

      <div className="w-full h-full bg-gradient-to-b from-[#343434] to-[#232323]">
        {/* main visual */}
        <div className="h-[1000px] relative">
          <img
            src="/land-main-bg.png"
            className="w-full h-full object-cover object-bottom absolute"
          />

          <div className="p-[100px] relative z-1">
            <span className="text-transparent bg-gradient-to-b from-white to-transparent bg-clip-text text-[120px] font-semibold tracking-wider leading-none">
              Build Test Compare
            </span>
            <h1 className="text-white text-[40px] font-semibold tracking-wider transform translate-x-[4px] translate-y-[-20px]">
              복잡한 셋팅과 설치 없이 내 사이트에 바로 적용해 보는 UI 플랫폼
            </h1>

            <Link to="/home">
              <button className="w-[200px] h-[56px] rounded-2xl bg-[#32CBFF] text-white text-[24px]">
                시작하기
              </button>
            </Link>
          </div>
        </div>

        {/* What is Mingle */}
        <div className="p-[100px] flex justify-between gap-[40px]">
          <div className="max-w-[640px]">
            <h2 className="text-white text-[40px] font-semibold tracking-wider">
              What is Mingle ?
            </h2>

            <p className="text-white font-light leading-10 whitespace-pre-wrap mt-[40px]">
              Mingle은 Material UI, Ant Design, chakra, shadcn/ui 와 같은 <br />
              대중적이고 인기 있는 UI 라이브러리와 컴포넌트를 한 눈에 테스트하고 비교할 수 있는
              플랫폼 입니다. <br />
              <br />
              React-Flow를 기반으로 UI 요소를 시각화하여 <br />
              설치와 개발환경 셋팅 없이 웹에서 라이브 컴포넌트 테스트와 <br />
              실시간 수정 기능으로 효율적이고 빠른 개발환경을 제공합니다. <br />
              <br />
              UI 설계와 기능 검증을 단순화해, 빠르고 창의적인 프로토타이핑을 지원합니다. <br />
              신규 프론트엔드 개발자부터 백엔드 기반의 풀스택 개발자까지 누구나 쉽게 활용
              가능합니다. <br />
            </p>

            <div className="mt-[40px] border-l-2 border-[#767676] pl-[10px]">
              <p className="text-white text-[14px] text-[#bdbdbd]">
                Mingle은 섞다, 어울리다 라는 뜻을 가지고 있어요! <br />
                다양한 UI 컴포넌트들을 테스트하고 내 사이트, 프로젝트에 어울리는 프로토타입을 쉽고
                빠르게 완성할 수 있어요!
              </p>
            </div>
          </div>

          <div className="max-w-[500px]">
            <img src="/land-what-img.png" alt="img-what-mingle" />
          </div>
        </div>

        {/* Why Mingle */}
        <div className="p-[100px] flex justify-between gap-[40px]">
          <div className="max-w-[640px]">
            <h2 className="text-white text-[40px] font-semibold tracking-wider">Why Mingle ?</h2>

            <p className="text-white font-light leading-10 whitespace-pre-wrap mt-[40px]">
              복잡하고 불친절한 공식문서를 읽어보지 않아도 바로 사용해 볼 수 있어요! <br />
              <br />
              작업중인 내 사이트에서 바로 미리보기를 확인할 수 있어요! <br />
              <br />
              어떤 라이브러리, 어떤 UI를 사용할지 찾아보지 않아도 한 번에 비교 대조가 가능해요!
            </p>
          </div>

          <div className="max-w-[500px]">
            <img src="/land-why-img.png" alt="img-why-mingle" />
          </div>
        </div>

        {/* with Mingle */}
        <div className="p-[100px] flex justify-between gap-[40px]">
          <div className="max-w-[640px]">
            <h2 className="text-white text-[40px] font-semibold tracking-wider">with Mingle</h2>

            <div className="mt-[40px] flex flex-col gap-[20px]">
              <div className="text-white flex gap-[40px]">
                <h3 className="w-[90px] shrink-0 font-semibold">Playground</h3>
                <p>
                  원하는 UI 컴포넌트의 기능과 디자인을 라이브러리 별로 한 눈에 확인하고 드래그 앤
                  드랍으로 내 사이트에 적용시켜 볼 수 있어요!
                </p>
              </div>

              <div className="text-white flex gap-[40px]">
                <h3 className="w-[90px] shrink-0 font-semibold">Community</h3>
                <p>다른 개발자들과 소통하고 질문, 답변 할 수 있어요!</p>
              </div>

              <div className="text-white flex gap-[40px]">
                <h3 className="w-[90px] shrink-0 font-semibold">Gallery</h3>
                <p>UI 컴포넌트를 활용하여 작업한 예시들을 살펴 볼 수 있어요!</p>
              </div>

              <div className="text-white flex gap-[40px]">
                <h3 className="w-[90px] shrink-0 font-semibold">My mingle</h3>
                <p>작업한 내용을 저장하고 다른 사람들과 공유할 수 있어요!</p>
              </div>
            </div>
          </div>

          <div className="max-w-[500px]">
            <img src="/land-with-img.png" alt="img-with-mingle" />
          </div>
        </div>

        {/* example usage gif slider */}
        <div className="py-[60px]">
          <img src="/land-with-slide.png" alt="img-mingle-slider" />
        </div>

        {/* contributor */}
        <div className="p-[100px] flex flex-col items-center relative">
          <img src="/land-bottom-bg.png" className="absolute" />

          <h2 className="text-white text-[40px] font-semibold tracking-wider">Contributor</h2>

          <div className="py-[100px] w-[1000px] flex justify-between relative z-1">
            <div className="flex flex-col items-center gap-[40px]">
              <div className="w-[256px] h-[256px] bg-white rounded-[24px] flex justify-center items-center relative">
                <span>담당영역</span>
                <img
                  src="/land-contributor-hs.png"
                  className="absolute top-4 left-8 opacity-0 hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              <div className="flex flex-col items-center gap-[10px]">
                <span className="text-white text-[24px] font-semibold tracking-wider">이하성</span>
                <Link className="flex gap-[8px]" to="https://github.com/revy7289">
                  <img src="/github.svg" />
                  <span className="text-[#bdbdbd] text-[14px]">revy7289</span>
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center gap-[40px]">
              <div className="w-[256px] h-[256px] bg-white rounded-[24px] flex justify-center items-center relative">
                <span>담당영역</span>
                <img
                  src="/land-contributor-ay.png"
                  className="absolute top-4 left-8 opacity-0 hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              <div className="flex flex-col items-center gap-[10px]">
                <span className="text-white text-[24px] font-semibold tracking-wider">정아영</span>
                <Link className="flex gap-[8px]" to="https://github.com/SystemOutJUNG02">
                  <img src="/github.svg" />
                  <span className="text-[#bdbdbd] text-[14px]">SystemOutJUNG02</span>
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center gap-[40px]">
              <div className="w-[256px] h-[256px] bg-white rounded-[24px] flex justify-center items-center relative">
                <span>담당영역</span>
                <img
                  src="/land-contributor-sy.png"
                  className="absolute top-4 left-8 opacity-0 hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              <div className="flex flex-col items-center gap-[10px]">
                <span className="text-white text-[24px] font-semibold tracking-wider">김세연</span>
                <Link className="flex gap-[8px]" to="https://github.com/saeyeonKim">
                  <img src="/github.svg" />
                  <span className="text-[#bdbdbd] text-[14px]">saeyeonKim</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex gap-[40px] relative z-1">
            <div className="flex gap-[8px]">
              <img
                className="w-[48px] h-[48px] border-2 border-[#767676] rounded-[8px]"
                src="/land-bottom-logo.png"
              />
              <span className="text-white text-[32px]">Github</span>
            </div>

            <Link
              className="text-white text-[28px] text-[#bdbdbd]"
              to="https://github.com/Project-Mingle/Mingle"
            >
              https://github.com/Project-Mingle/Mingle
            </Link>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="w-full h-[160px] bg-[#232323] border-t-2 border-[#424242] flex justify-between items-center px-[100px]">
        <img src="/logoGray.svg" alt="logo" />

        <div className="flex gap-[80px] text-[#bdbdbd]">
          <ul className="flex flex-col gap-[10px]">
            <li>
              <Link to="/home">Playground</Link>
            </li>
            <li>
              <Link to="/community">Community</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
          </ul>

          <span>MIT License</span>

          <Link className="flex gap-[8px] h-[24px]" to="https://github.com/Project-Mingle/Mingle">
            <img src="/github.svg" />
            <span>Github</span>
          </Link>
        </div>
      </div>
    </>
  );
}
