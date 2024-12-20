import { BrowserRouter, Route, Routes } from "react-router-dom";

import MinglePage from "./Pages/Main/mingle";
import Header from "./Commons/Layout/header";

import LoginPage from "./Pages/Login/login";
import SignupPage from "./Pages/Signup/signup";
import FindPwPage from "./Pages/FindPw/findpw";

import Mypage from "./Pages/mypage";

import ListPage from "./Pages/Community/List/list";
import PostPage from "./Pages/Community/Post/post";
import NewPage from "./Pages/Community/New/new";

const HIDDEN_HEADER = ["/", "/login", "/signup", "/findpw"];

const Layout = ({ children }) => {
  const location = window.location.pathname;
  const isHiddenHeader = HIDDEN_HEADER.includes(location);
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
          <Route path="/" element={<MinglePage />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/findpw" element={<FindPwPage />} />
          
          <Route path="/mypage" element={<Mypage />} />
          
          <Route path="/community" element={<ListPage />} />
          <Route path="/community/post" element={<PostPage />} />
          <Route path="/community/new" element={<NewPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
