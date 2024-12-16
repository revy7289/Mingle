import { BrowserRouter, Route, Routes } from "react-router-dom";
import MinglePage from "./Main/mingle";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MinglePage />} />
            </Routes>
        </BrowserRouter>
    );
}
