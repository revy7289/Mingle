import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/Signup/signup";
import MinglePage from "./Pages/Main/mingle";
import LoginPage from "./Pages/Login/login";
import FindPwPage from "./Pages/FindPw/findpw";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MinglePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/findpw" element={<FindPwPage />} />
      </Routes>
    </BrowserRouter>
  );
}
