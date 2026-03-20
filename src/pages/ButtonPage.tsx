import { useState } from "react";
import Button from "../components/buttons/Button";
import CodeViewer from "../components/CodeViewer";
import PageHeader from "../components/PageHeader";

type VariantType = "primary" | "outline" | "danger";
type SizeType = "sm" | "md" | "lg" | "icon";

export default function ButtonPage() {
  const [variant, setVariant] = useState<VariantType>("primary");
  const [size, setSize] = useState<SizeType>("md");
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("버튼입니다");

  const generatedCode = `<Button
  variant="${variant}"
  size="${size}"${isDisabled ? "\n  disabled" : ""}
>
  ${size === "icon" ? "😻" : buttonText}
</Button>`;

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Button"
        description="사용자의 액션을 유도하는 가장 기본적인 컴포넌트입니다."
      />

      {/*  플레이그라운드 영역 시작 */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 버튼을 미리보는 화면 (Preview) */}
        <div className="flex-1 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview (미리보기)
          </div>
          <div className="flex-1 flex items-center justify-center p-10 min-h-100 bg-[#0a0d12] bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-size-[16px_16px] overflow-auto">
            <Button variant={variant} size={size} disabled={isDisabled}>
              {size === "icon" ? "😻" : buttonText}
            </Button>
          </div>
        </div>

        {/* 오른쪽: 조종판 (Controls) & 코드 뷰어 */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          {/* 조종판 패널 */}
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-5">
            <h3 className="text-white font-semibold mb-2">Props Control</h3>

            {/* 1. 디자인(Variant) 선택 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Variant</label>
              <select
                className="bg-[#0d1117] text-white border border-gray-700 rounded-lg p-2 outline-none focus:border-[#00a2ff]"
                value={variant}
                onChange={(e) => setVariant(e.target.value as VariantType)}
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary (서브용)</option>
                <option value="outline">Outline</option>
                <option value="danger">Danger</option>
                <option value="ghost">Ghost (투명)</option>
                <option value="success">Success (그린)</option>
              </select>
            </div>

            {/* 2. 크기(Size) 선택 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Size</label>
              <select
                className="bg-[#0d1117] text-white border border-gray-700 rounded-lg p-2 outline-none focus:border-[#00a2ff]"
                value={size}
                onChange={(e) => setSize(e.target.value as SizeType)}
              >
                <option value="xs">Extra Small (xs)</option>
                <option value="sm">Small (sm)</option>
                <option value="md">Medium (md)</option>
                <option value="lg">Large (lg)</option>
                <option value="xl">Extra Large (xl)</option>
                <option value="icon">Icon Only (icon)</option>
              </select>
            </div>

            {/* 3. 텍스트 입력 및 Disabled 토글 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Text Content</label>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                disabled={size === "icon"}
                className="bg-[#0d1117] text-white border border-gray-700 rounded-lg p-2 outline-none focus:border-[#00a2ff] disabled:opacity-50"
              />
            </div>

            <label className="flex items-center gap-3 mt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isDisabled}
                onChange={(e) => setIsDisabled(e.target.checked)}
                className="w-4 h-4 accent-[#00a2ff]"
              />
              <span className="text-gray-300 text-sm">Disabled (비활성화)</span>
            </label>
          </div>

          {/* 코드 뷰어 패널 */}
          <CodeViewer code={generatedCode} />
        </div>
      </div>
    </div>
  );
}
