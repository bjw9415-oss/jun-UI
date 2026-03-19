import { HashRouter, Routes, Route } from "react-router-dom";
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
import DrawerPage from "./pages/DrawerPage";
import TooltipPage from "./pages/TooltipPage";
import PopoverPage from "./pages/PopoverPage";
import SkeletonPage from "./pages/SkeletonPage";
import AlertBadgePage from "./pages/AlertBadgePage";
function App() {
  return (
    <ToastProvider position="top-center">
      <HashRouter>
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
          <Route path="/drawer" element={<DrawerPage />} />
          <Route path="/tooltip" element={<TooltipPage />} />
          <Route path="/popover" element={<PopoverPage />} />
          <Route path="/skeleton" element={<SkeletonPage />} />
          <Route path="/alert-badge" element={<AlertBadgePage />} />
        </Routes>
      </HashRouter>
    </ToastProvider>
  );
}

export default App;
