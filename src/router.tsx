import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/Signup/signup";
import MinglePage from "./Pages/Main/mingle";
import LoginPage from "./Pages/Login/login";
import Header from "./Commons/Layout/header";
import Mypage from "./Pages/mypage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MinglePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/header" element={<Header />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}
