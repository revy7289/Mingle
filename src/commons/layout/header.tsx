import { Link, useLocation } from "react-router-dom";
import { useAccessTokenStore } from "../stores/tokenStore";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FetchUserLoggedInDocument, LogoutUserDocument } from "../graphql/graphql";

const Header = () => {
  const location = useLocation();
  const menuItems = [
    { label: "Playground", path: "/" },
    { label: "Community", path: "/community" },
    { label: "Gallery", path: "/gallery" },
  ];

  const { accessToken } = useAccessTokenStore();

  const [dropDown, setDropDown] = useState(false);
  const openDropDown = () => {
    setDropDown(!dropDown);
  };

  // 로그아웃
  const [logout] = useMutation(LogoutUserDocument);

  const onClickLogout = async () => {
    try {
      const data = await logout();
      useAccessTokenStore.getState().resetAccessToken();
      console.log(data);
      alert("로그아웃 성공");
    } catch (error) {
      console.log(error);
    }
  };

  // 유저정보조회
  const { data: userData } = useQuery(FetchUserLoggedInDocument);
  console.log("유저정보", userData);

  return (
    <div className="h-[100px] bg-[#343434] justify-center flex items-center mb-[120px]">
      <div className="flex justify-between w-[1120px]">
        <Link to="/">
          <img src="/logoColor.svg" className="cursor-pointer" />
        </Link>
        <ul className="flex gap-[20px] text-[#767676] text-[24px]">
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`w-[170px] h-[60px] flex justify-center items-center cursor-pointer ${
                location.pathname === item.path ? "text-[#fcfcfc]" : "text-[#767676]"
              }`}
            >
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
          <div className="flex items-center gap-[7px] w-[170px] h-[60px] text-[22px]">
            {accessToken ? (
              <div
                className="relative w-auto px-[20px] h-[48px] flex rounded-[8px] items-center justify-center gap-[8px] cursor-pointer"
                onClick={openDropDown}
              >
                <div className="w-[32px] h-[32px] bg-[#FCFCFC] rounded-full"></div>
                <span className="text-[20px] text-[#fcfcfc] font-semibold">
                  {userData?.fetchUserLoggedIn.name}
                </span>
                <div
                  className={`flex absolute top-[55px] w-[165px] h-[102px] bg-[#eeeeee] text-[#222222] rounded-[8px] p-[10px] overflow-hidden transition-all duration-300 ease-in-out transform origin-top ${
                    dropDown ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                  }`}
                >
                  <ul className="flex flex-col text-[16px] font-semibold w-full">
                    <li className="w-full h-[50%] border-b-[2px] border-[#e0e0e0] flex items-center">
                      <Link to="/mypage">마이페이지</Link>
                    </li>
                    <li className="w-full h-[50%] flex items-center">
                      <button onClick={onClickLogout}>로그아웃</button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <button className="w-[120px] h-[48px] bg-[#222222] rounded-[8px] text-[#fcfcfc]">
                  LOGIN
                </button>
              </Link>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
