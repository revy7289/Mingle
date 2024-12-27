import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-screen h-[100px] bg-[#343434] justify-center flex items-center mb-[120px]">
      <div className="flex justify-between w-[1120px]">
        <img src="/logo.svg" className="cursor-pointer" />
        <ul className="flex gap-[20px] text-[#767676] text-[24px]">
          <li className="w-[170px] h-[60px] flex justify-center items-center">Playground</li>
          <li className="w-[170px] h-[60px] flex justify-center items-center">Community</li>
          <li className="w-[170px] h-[60px] flex justify-center items-center">Gallery</li>
          <div className="flex items-center gap-[7px] w-[170px] h-[60px] text-[22px]">
            <Link to="/login">
              <button className="w-[120px] h-[48px] bg-[#222222] rounded-[8px] text-[#fcfcfc]">
                LOGIN
              </button>
            </Link>
            {/* <div className="w-[40px] h-[40px] bg-[#FCFCFC] rounded-full"></div>
            <span>유저네임이름</span> */}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
