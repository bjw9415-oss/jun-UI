import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ButtonPage from "./pages/ButtonPage";
import IconButtonPage from "./pages/IconButtonPage";
import CustomImageButtonPage from "./pages/CustomImageButtonPage";
import InputPage from "./pages/InputPage";
import TextareaPage from "./pages/TextareaPage";
import SelectPage from "./pages/SelectPage";
import TogglePage from "./pages/TogglePage";
import CheckboxPage from "./pages/CheckBoxPage";
import RadioPage from "./pages/RadioPage";
import ModalPage from "./pages/ModalPage";
import ToastPage from "./pages/ToastPage";
import { ToastProvider } from "./components/Toast";
function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* 기본 주소(/)일 때는 Home 페이지를 보여줌 */}
          <Route path="/" element={<Home />} />

          {/* /buttons 주소일 때는 ButtonPage를 보여줌 */}
          <Route path="/buttons" element={<ButtonPage />} />
          <Route path="/icon-buttons" element={<IconButtonPage />} />
          <Route path="/image-button" element={<CustomImageButtonPage />} />
          <Route path="/inputs" element={<InputPage />} />
          <Route path="/textarea" element={<TextareaPage />} />
          <Route path="/select" element={<SelectPage />} />
          <Route path="/Toggle" element={<TogglePage />} />
          <Route path="/checkbox" element={<CheckboxPage />} />
          <Route path="/radio" element={<RadioPage />} />
          <Route path="/modal" element={<ModalPage />} />
          <Route path="/toast" element={<ToastPage />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
