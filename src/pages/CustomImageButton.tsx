import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import CodeViewer from "../components/CodeViewer";

export default function CustomImageButtonPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [buttonWidth, setButtonWidth] = useState<number | string>(250);
  const [buttonHeight, setButtonHeight] = useState<number | string>(150);
  const [buttonText, setButtonText] = useState("Click Me!");
  const [overlayOpacity, setOverlayOpacity] = useState<number | string>(40);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // 🌟 빈칸일 때(에러 방지)를 대비해 기본값 0을 살짝 챙겨줍니다.
  const safeWidth = buttonWidth || 0;
  const safeHeight = buttonHeight || 0;
  const safeOpacity = overlayOpacity || 0;

  const generatedCode = `<Button 
  className="relative overflow-hidden p-0 group" 
  style={{ width: '${safeWidth}px', height: '${safeHeight}px' }}
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

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <div className="w-full max-w-5xl mb-8">
        <Link
          to="/"
          className="text-gray-400 hover:text-white transition-colors"
        >
          ← 메인으로 돌아가기
        </Link>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">
          Custom Image Button
        </h1>
        <p className="text-gray-400">
          이미지를 업로드하고 마음대로 크기를 조절해 보세요. 비율은 절대 깨지지
          않습니다!
        </p>
      </div>

      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium flex justify-between items-center">
            <span>Preview</span>
            <span className="text-xs bg-[#21262d] px-2 py-1 rounded text-gray-400">
              {safeWidth} x {safeHeight}
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center p-10 min-h-100 bg-[url('https://tailwindcss.com/_next/static/media/hero-dark@90.dba36cdf.jpg')] bg-cover bg-center overflow-auto">
            <Button
              className="relative overflow-hidden p-0 group border-0 shadow-2xl"
              style={{ width: `${safeWidth}px`, height: `${safeHeight}px` }}
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

        <div className="w-full lg:w-96 flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-5">
            <h3 className="text-white font-semibold mb-2">Image Settings</h3>

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

            <div className="flex flex-col gap-4">
              {/* 🌟 핵심 2: 입력창에 테두리(border)와 배경색을 주고, 다 지웠을 때 빈칸('')이 되도록 수정! */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400 flex justify-between items-center">
                  <span>Width (가로)</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={buttonWidth}
                      onChange={(e) =>
                        setButtonWidth(
                          e.target.value === "" ? "" : Number(e.target.value),
                        )
                      }
                      className="w-20 bg-[#0d1117] border border-gray-600 rounded-md text-center py-1 text-[#00a2ff] outline-none focus:border-[#00a2ff] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-gray-500 text-sm">px</span>
                  </div>
                </label>
                <input
                  type="range"
                  min="100"
                  max="600"
                  step="1"
                  value={Number(safeWidth)}
                  onChange={(e) => setButtonWidth(Number(e.target.value))}
                  className="w-full accent-[#00a2ff]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400 flex justify-between items-center">
                  <span>Height (세로)</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={buttonHeight}
                      onChange={(e) =>
                        setButtonHeight(
                          e.target.value === "" ? "" : Number(e.target.value),
                        )
                      }
                      className="w-20 bg-[#0d1117] border border-gray-600 rounded-md text-center py-1 text-[#00a2ff] outline-none focus:border-[#00a2ff] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-gray-500 text-sm">px</span>
                  </div>
                </label>
                <input
                  type="range"
                  min="50"
                  max="400"
                  step="1"
                  value={Number(safeHeight)}
                  onChange={(e) => setButtonHeight(Number(e.target.value))}
                  className="w-full accent-[#00a2ff]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <label className="text-sm text-gray-400 flex justify-between items-center">
                <span>Overlay Opacity</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={overlayOpacity}
                    onChange={(e) =>
                      setOverlayOpacity(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className="w-16 bg-[#0d1117] border border-gray-600 rounded-md text-center py-1 text-[#00a2ff] outline-none focus:border-[#00a2ff] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="text-gray-500 text-sm">%</span>
                </div>
              </label>
              <input
                type="range"
                min="0"
                max="90"
                step="1"
                value={Number(safeOpacity)}
                onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                className="w-full accent-[#00a2ff]"
              />
            </div>

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

          <CodeViewer code={generatedCode} />
        </div>
      </div>
    </div>
  );
}
