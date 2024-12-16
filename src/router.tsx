import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/login";
import MinglePage from "./pages/Main/mingle";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MinglePage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}
