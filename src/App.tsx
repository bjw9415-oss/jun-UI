import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ButtonPage from "./pages/ButtonPage";
import IconButtonPage from "./pages/IconButtonPage";
import CustomImageButtonPage from "./pages/CustomImageButtonPage";
import InputPage from "./pages/InputPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 주소(/)일 때는 Home 페이지를 보여줌 */}
        <Route path="/" element={<Home />} />

        {/* /buttons 주소일 때는 ButtonPage를 보여줌 */}
        <Route path="/buttons" element={<ButtonPage />} />
        <Route path="/icon-buttons" element={<IconButtonPage />} />
        <Route path="/image-button" element={<CustomImageButtonPage />} />
        <Route path="/inputs" element={<InputPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
