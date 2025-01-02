import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ReactNode } from "react";

import Header from "./Commons/Layout/header";

import LandingPage from "./Pages/Home/landing";
import MinglePage from "./Pages/Home/mingle";

import LoginPage from "./Pages/Login/login";
import SignupPage from "./Pages/Signup/signup";
import FindPwPage from "./Pages/FindPw/findpw";

import Mypage from "./Pages/Mypage/mypage";

import ListPage from "./Pages/Community/List/list";
import PostPage from "./Pages/Community/Post/post";
import NewPage from "./Pages/Community/New/new";

const HIDDEN_HEADER = ["/", "/home", "/login", "/signup", "/findpw"];

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const isHiddenHeader = HIDDEN_HEADER.includes(location.pathname);
  return (
    <>
      {!isHiddenHeader && <Header />}
      {children}
    </>
  );
};

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<MinglePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/findpw" element={<FindPwPage />} />

          <Route path="/mypage" element={<Mypage />} />

          <Route path="/community" element={<ListPage />} />
          <Route path="/community/post" element={<PostPage />} />
          <Route path="/community/post/:boardId" element={<PostPage />} />
          <Route path="/community/post/:boardId/edit" element={<NewPage />} />
          <Route path="/community/new" element={<NewPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
