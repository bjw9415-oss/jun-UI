import { useState } from "react";
import Button from "../components/Button";
import {
  Mail,
  ArrowRight,
  Trash2,
  Send,
  Image as ImageIcon,
} from "lucide-react";
import CodeViewer from "../components/CodeViewer";
import PageHeader from "../components/PageHeader";

type VariantType =
  | "primary"
  | "outline"
  | "danger"
  | "secondary"
  | "ghost"
  | "success";
type IconType = "Mail" | "ArrowRight" | "Trash2" | "Send" | "Image";
type PositionType = "left" | "right" | "icon-only";

export default function IconButtonPage() {
  const [variant, setVariant] = useState<VariantType>("primary");
  const [iconName, setIconName] = useState<IconType>("Mail");
  const [position, setPosition] = useState<PositionType>("left");
  const [buttonText, setButtonText] = useState("메일 보내기");
  const [isRounded, setIsRounded] = useState(false); // 동그란 버튼 토글

  const renderIcon = () => {
    const props = { className: "w-5 h-5" };
    switch (iconName) {
      case "Mail":
        return <Mail {...props} />;
      case "ArrowRight":
        return <ArrowRight {...props} />;
      case "Trash2":
        return <Trash2 {...props} />;
      case "Send":
        return <Send {...props} />;
      case "Image":
        return <ImageIcon {...props} />;
      default:
        return null;
    }
  };

  const iconCodeStr = `<${iconName} className="w-5 h-5" />`;
  const importCodeStr = `import { ${iconName} } from 'lucide-react';\n\n`;

  let innerCode = "";
  if (position === "left") {
    innerCode = `${iconCodeStr}\n  ${buttonText}`;
  } else if (position === "right") {
    innerCode = `${buttonText}\n  ${iconCodeStr}`;
  } else {
    innerCode = iconCodeStr; // icon-only
  }

  const generatedCode = `${importCodeStr}<Button
  variant="${variant}"${position === "icon-only" ? '\n  size="icon"' : ""}${isRounded && position === "icon-only" ? '\n  className="rounded-full"' : ""}
>
  ${innerCode}
</Button>`;

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Icon Button"
        description="Lucide 아이콘을 조합한 실무형 인터랙티브 컴포넌트입니다."
      />
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: Preview (미리보기) */}
        <div className="flex-1 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview (미리보기)
          </div>
          <div className="flex-1 flex items-center justify-center p-10 min-h-100 bg-[#0a0d12] bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-size-[16px_16px] overflow-auto">
            {/* 실제 렌더링되는 버튼 */}
            <Button
              variant={variant}
              size={position === "icon-only" ? "icon" : "md"}
              className={
                isRounded && position === "icon-only" ? "rounded-full" : ""
              }
            >
              {position === "left" && (
                <>
                  {renderIcon()} {buttonText}
                </>
              )}
              {position === "right" && (
                <>
                  {buttonText} {renderIcon()}
                </>
              )}
              {position === "icon-only" && renderIcon()}
            </Button>
          </div>
        </div>

        {/* 오른쪽: Controls & Code */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-5">
            <h3 className="text-white font-semibold mb-2">Icon Settings</h3>

            {/* 아이콘 선택 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Select Icon</label>
              <select
                className="bg-[#0d1117] text-white border border-gray-700 rounded-lg p-2 outline-none focus:border-[#00a2ff]"
                value={iconName}
                onChange={(e) => setIconName(e.target.value as IconType)}
              >
                <option value="Mail">Mail (메일)</option>
                <option value="ArrowRight">ArrowRight (화살표)</option>
                <option value="Trash2">Trash2 (휴지통)</option>
                <option value="Send">Send (전송)</option>
                <option value="Image">Image (사진)</option>
              </select>
            </div>

            {/* 아이콘 위치 및 모드 선택 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Icon Position</label>
              <div className="flex gap-2">
                <Button
                  variant={position === "left" ? "primary" : "secondary"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setPosition("left")}
                >
                  Left
                </Button>
                <Button
                  variant={position === "right" ? "primary" : "secondary"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setPosition("right")}
                >
                  Right
                </Button>
                <Button
                  variant={position === "icon-only" ? "primary" : "secondary"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setPosition("icon-only")}
                >
                  Only
                </Button>
              </div>
            </div>

            {/* 텍스트 입력 (아이콘 온리 모드일 땐 비활성화) */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Text Content</label>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                disabled={position === "icon-only"}
                className="bg-[#0d1117] text-white border border-gray-700 rounded-lg p-2 outline-none focus:border-[#00a2ff] disabled:opacity-50"
              />
            </div>

            <div className="border-t border-gray-800 my-1"></div>

            {/* 디자인(Variant) 선택 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Variant</label>
              <select
                className="bg-[#0d1117] text-white border border-gray-700 rounded-lg p-2 outline-none focus:border-[#00a2ff]"
                value={variant}
                onChange={(e) => setVariant(e.target.value as VariantType)}
              >
                <option value="primary">Primary</option>
                <option value="outline">Outline</option>
                <option value="danger">Danger</option>
                <option value="secondary">Secondary</option>
                <option value="ghost">Ghost</option>
              </select>
            </div>

            {/* 둥근 버튼 토글 (아이콘 온리 모드에서만 활성화) */}
            <label
              title={
                position !== "icon-only"
                  ? "아이콘 Only 모드에서만 사용할 수 있습니다."
                  : ""
              }
              className={`flex items-center gap-3 mt-2 ${position !== "icon-only" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <input
                type="checkbox"
                checked={isRounded}
                onChange={(e) => setIsRounded(e.target.checked)}
                disabled={position !== "icon-only"}
                className="w-4 h-4 accent-[#00a2ff]"
              />
              <span className="text-gray-300 text-sm">
                완전 둥글게 (Rounded Full)
              </span>
              {position !== "icon-only" && (
                <span className="text-xs text-[#ff5555] mt-1">
                  ※ Icon Position을 'Only'로 설정해야 합니다.
                </span>
              )}
            </label>
          </div>

          <CodeViewer code={generatedCode} />
        </div>
      </div>
    </div>
  );
}
