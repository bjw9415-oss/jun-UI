import { useState, useRef } from "react";
import { Button } from "@/components/buttons";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import {
  PageHeader,
  CodeViewer,
  NumberSliderControl,
} from "../components/layout";

export default function CustomImageButtonPage() {
  // [ 상태 관리 영역 (State & Refs)] ========================================
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [buttonWidth, setButtonWidth] = useState<number | string>(250);
  const [buttonHeight, setButtonHeight] = useState<number | string>(150);
  const [borderRadius, setBorderRadius] = useState<number | string>(0);
  const [buttonText, setButtonText] = useState("Click Me!");
  const [overlayOpacity, setOverlayOpacity] = useState<number | string>(40);

  const fileInputRef = useRef<HTMLInputElement>(null);

  //  [ 이벤트 핸들러 영역 (Event Handlers)] ==================================
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // [ 코드 자동 생성 영역 (Code Generator)] =================================
  // 빈칸일 때(에러 방지)를 대비해 기본값 0을 살짝 챙겨줍니다.
  const safeWidth = buttonWidth || 0;
  const safeHeight = buttonHeight || 0;
  const safeRadius = borderRadius || 0;
  const safeOpacity = overlayOpacity || 0;

  const generatedCode = `<Button 
  className="relative overflow-hidden p-0 group" 
  style={{ width: '${safeWidth}px', height: '${safeHeight}px', borderRadius: '${safeRadius}%' }}
>
  {/* 이미지 영역 */}
  <img 
    src="${imageUrl ? "YOUR_IMAGE_URL" : "/placeholder.jpg"}" 
    alt="Button Background" 
    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
  />
  
  {/* 어두운 배경 오버레이 */}
  <div className="absolute inset-0 bg-black/${safeOpacity} transition-colors duration-300 group-hover:bg-black/${Math.max(0, Number(safeOpacity) - 20)}" />
  
  {/* 글자 영역 */}
  <span className="relative z-10 text-white font-bold tracking-wider drop-shadow-lg">
    ${buttonText}
  </span>
</Button>`;

  //  [ UI 렌더링 영역 ] ===============================================
  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      {/* --- [상단: 뒤로가기 및 제목] --- */}
      <PageHeader
        title="Custom Image Button"
        description="이미지를 업로드하고 마음대로 크기를 조절해 보세요. 비율은 절대 깨지지 않습니다!"
      />

      {/* --- [메인 레이아웃: 좌측 미리보기 / 우측 조종판] --- */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
        {/* =========================================================
            왼쪽: 미리보기(Preview) 패널 
            ========================================================= */}
        <div className="flex-1 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium flex justify-between items-center">
            <span>Preview</span>
            <span className="text-xs bg-[#21262d] px-2 py-1 rounded text-gray-400">
              {safeWidth} x {safeHeight}
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center p-10 min-h-100 bg-[#0a0d12] bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-size-[16px_16px] overflow-auto">
            {" "}
            <Button
              className="relative overflow-hidden p-0 group border-0 shadow-2xl"
              style={{
                width: `${safeWidth}px`,
                height: `${safeHeight}px`,
                borderRadius: `${safeRadius}%`,
              }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-[#21262d] flex flex-col items-center justify-center text-gray-500">
                  <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                  <span className="text-xs">No Image</span>
                </div>
              )}

              <div
                className="absolute inset-0 transition-colors duration-300"
                style={{
                  backgroundColor: `rgba(0,0,0, ${Number(safeOpacity) / 100})`,
                }}
              />

              <span className="relative z-10 text-white font-bold text-lg tracking-wider drop-shadow-md">
                {buttonText}
              </span>
            </Button>
          </div>
        </div>

        {/* =========================================================
            오른쪽: 조종판(Controls) 및 코드 뷰어(Code Viewer) 패널
            ========================================================= */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-5">
            <h3 className="text-white font-semibold mb-2">Image Settings</h3>

            {/* 1. 이미지 업로드 컨트롤 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Upload Image</label>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4" />
                  파일 찾기
                </Button>
                {imageUrl && (
                  <Button
                    variant="danger"
                    size="icon"
                    onClick={handleRemoveImage}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            <div className="border-t border-gray-800 my-1"></div>

            {/* 2. 사이즈 조절 컨트롤 (Width / Height) */}
            <div className="flex flex-col gap-4">
              <NumberSliderControl
                label="Width (가로)"
                value={buttonWidth}
                onChange={setButtonWidth}
                min={100}
                max={600}
                unit="px"
              />
              <NumberSliderControl
                label="Height (세로)"
                value={buttonHeight}
                onChange={setButtonHeight}
                min={50}
                max={600}
                unit="px"
              />
              <NumberSliderControl
                label="Border Radius (모서리 둥글기)"
                value={borderRadius}
                onChange={setBorderRadius}
                min={0}
                max={50}
                unit="%"
              />
              <NumberSliderControl
                label="Overlay Opacity (어둡기)"
                value={overlayOpacity}
                onChange={setOverlayOpacity}
                min={0}
                max={100}
                unit="%"
              />
            </div>

            {/* 4. 텍스트 내용 컨트롤 */}
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-sm text-gray-400">Text Content</label>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="bg-[#0d1117] text-white border border-gray-700 rounded-lg p-2 outline-none focus:border-[#00a2ff]"
              />
            </div>
          </div>

          {/* 5. 코드 뷰어 영역 (컴포넌트로 분리됨) */}
          <CodeViewer code={generatedCode} />
        </div>
      </div>
    </div>
  );
}
