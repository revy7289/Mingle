const Header = () => {
  return (
    <div className="w-screen h-[100px] bg-[#343434] flex items-center justify-between px-[400px]">
      <img src="../../../public/logo.svg" />
      <div className="flex gap-[20px] text-[#FCFCFC] text-[24px]">
        <button className="w-[170px] h-[60px]">Community</button>
        <button className="w-[170px] h-[60px]">My Page</button>
        <button className="w-[170px] h-[60px]">Gallery</button>
        <div className="flex items-center gap-[7px] w-[170px] h-[60px] text-[22px]">
          <div className="w-[40px] h-[40px] bg-[#FCFCFC] rounded-full"></div>
          <span>유저네임이름</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
