import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/Signup/signup";
import MinglePage from "./Pages/Main/mingle";
import LoginPage from "./Pages/Login/login";
import FindPwPage from "./Pages/FindPw/findpw";
import Mypage from "./Pages/mypage";
import Header from "./Commons/Layout/header";
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
          <Route path="/community/new" element={<NewPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
