import { useState } from "react";
import { Palette, RotateCcw } from "lucide-react";

const DEFAULT_COLOR = "#00a2ff";
export function ThemePicker() {
  // 기본 primary 컬러를 초깃값으로 설정

  const [color, setColor] = useState(DEFAULT_COLOR);
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);

    document.documentElement.style.setProperty("--primary", newColor);
  };
  const handleReset = () => {
    setColor(DEFAULT_COLOR);
    document.documentElement.style.setProperty("--primary", DEFAULT_COLOR);
  };
  return (
    <div className="flex items-center gap-4 bg-[#161b22] border border-gray-800 p-3 rounded-xl shadow-lg w-max">
      <div className="flex items-center gap-2">
        <Palette className="w-4 h-4 text-gray-400" />
        <span className="text-sm font-medium text-gray-300">Theme Color</span>
      </div>

      <div className="flex items-center gap-2">
        {/* 색상 선택 동그라미 */}
        <div
          className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-gray-700 cursor-pointer hover:scale-110 transition-transform shadow-inner"
          style={{ backgroundColor: color }}
        >
          {/* 진짜 input은 투명하게 만들어서 위에 덮어씌움 (클릭용) */}
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer opacity-0"
          />
        </div>

        {/* 선택된 헥스(HEX) 코드 텍스트 */}
        <span className="text-xs text-gray-500 font-mono uppercase w-16">
          {color}
        </span>
        {color !== DEFAULT_COLOR && (
          <button
            onClick={handleReset}
            className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-md transition-all duration-300 animate-in fade-in zoom-in-50"
            title="기본 색상으로 초기화"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
