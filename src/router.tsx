import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ReactNode } from "react";

import Header from "./commons/layout/header";

import LandingPage from "./pages/home/landing";
import MinglePage from "./pages/home";

import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import FindPwPage from "./pages/findPw";

import Mypage from "./pages/mypage";

import ListPage from "./pages/community/list";
import PostPage from "./pages/community/post";
import NewPage from "./pages/community/new";
import GalleryPage from "./pages/gallery";

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

          <Route path="gallery" element={<GalleryPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
