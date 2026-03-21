import { useState, type ReactNode } from "react";
import { Moon, Sun, Bell, Check, Palette } from "lucide-react";
import { Toggle, type ToggleProps } from "../components/data-entry";
import { PageHeader, CodeViewer } from "../components/layout";

type CodeTabType = "component" | "usage";

//  색상 테마 옵션 정의
const COLOR_OPTIONS = [
  {
    name: "Default Blue",
    class: "bg-[#00a2ff]",
    ring: "focus-visible:ring-[#00a2ff]",
  },
  {
    name: "Emerald",
    class: "bg-emerald-500",
    ring: "focus-visible:ring-emerald-500",
  },
  {
    name: "Indigo",
    class: "bg-indigo-600",
    ring: "focus-visible:ring-indigo-600",
  },
  { name: "Pink", class: "bg-pink-500", ring: "focus-visible:ring-pink-500" },
];

//  아이콘/이미지 옵션 정의
const THUMB_CONTENT_OPTIONS: {
  name: string;
  icon?: ReactNode;
  image?: string;
}[] = [
  { name: "None", icon: null },
  { name: "Noti (Icon)", icon: <Bell /> },
  { name: "Theme (Icon)", icon: <Sun /> }, // 켜지면 Moon으로 동적 변경 예정
  { name: "Check (Icon)", icon: <Check strokeWidth={3} /> },
  { name: "Profile (Img)", image: "https://cataas.com/cat?width=100" }, // 귀여운 고양이
];

export default function TogglePage() {
  //  기본 상태 관리
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // 커스텀 속성 상태 추가
  const [size, setSize] = useState<Required<ToggleProps>["size"]>("md");
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [selectedThumb, setSelectedThumb] = useState(THUMB_CONTENT_OPTIONS[0]);

  const [codeTab, setCodeTab] = useState<CodeTabType>("component");

  // 테마 아이콘 동적 처리 (체크 상태에 따라 Sun <-> Moon)
  const getDynamicThumbIcon = () => {
    if (selectedThumb.name === "Theme (Icon)") {
      return isChecked ? <Moon fill="currentColor" /> : <Sun />;
    }
    return selectedThumb.icon;
  };

  const dynamicIcon = getDynamicThumbIcon();

  //  동적 코드 생성 로직

  // Prop 문자열 조립 (값이 기본값과 다를 때만 추가)
  const sizePropStr = size !== "md" ? `\n  size="${size}"` : "";
  const colorPropStr =
    selectedColor.name !== "Default Blue"
      ? `\n  activeColor="${selectedColor.class}"`
      : "";
  const disabledPropStr = isDisabled ? `\n  disabled` : "";

  // 아이콘/이미지 Prop 문자열 처리
  let thumbPropStr = "";
  if (selectedThumb.image) {
    thumbPropStr = `\n  thumbImage="${selectedThumb.image}"`;
  } else if (selectedThumb.name === "Theme (Icon)") {
    thumbPropStr = `\n  thumbIcon={isChecked ? <Moon fill="currentColor" /> : <Sun />}`;
  } else if (selectedThumb.icon) {
    thumbPropStr = `\n  thumbIcon={${selectedThumb.name.split(" ")[0]}}`; // 간략화
  }

  // 최종 조립된 컴포넌트 코드
  const generatedCode = `<Toggle
  checked={isChecked}
  onChange={setIsChecked}${sizePropStr}${colorPropStr}${thumbPropStr}${disabledPropStr}
/>`;

  // 설정에 따라 진화하는 실무 적용 예시 코드
  const pushValidationStr = isDisabled
    ? `// 관리자에 의해 알림 설정이 비활성화되었습니다.`
    : `// 서버에 알림 설정 값을 전송하는 로직이 들어갑니다.\n    console.log("알림 설정 변경:", newChecked);`;

  const usageExampleCode = `import { useState } from 'react';
import { Bell, Sun, Moon, Check } from 'lucide-react'; // 필요한 아이콘만
import Toggle from '../components/Toggle';

export default function NotificationSettings() {
  const [pushEnabled, setPushEnabled] = useState(false);

  const handleToggle = (newChecked: boolean) => {
    setPushEnabled(newChecked);
    ${pushValidationStr}
  };

  return (
    <div className="flex items-center justify-between p-4 bg-[#161b22] border border-gray-800 rounded-xl w-full max-w-sm">
      <div className="flex flex-col">
        <span className="text-white font-medium">마케팅 푸시 알림</span>
        <span className="text-sm text-gray-500">새로운 소식과 혜택을 보내드립니다.</span>
      </div>
      
      <Toggle 
        checked={pushEnabled} 
        onChange={handleToggle}${sizePropStr}${colorPropStr}${thumbPropStr}${disabledPropStr}
      />
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Toggle (Switch)"
        description="설정을 켜거나 끌 때 사용하는 스위치 컴포넌트입니다. 사이즈, 아이콘, 이미지, 테마색 커스텀을 지원합니다."
      />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 미리보기(Preview) 패널 */}
        <div className="flex-1 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium flex items-center gap-2">
            Preview
            <span className="text-xs text-gray-600 bg-gray-900 px-2 py-0.5 rounded">
              Interactive
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center p-10 min-h-75 bg-[#0a0d12] bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-size-[16px_16px] overflow-auto">
            <div className="flex flex-col gap-4 w-full max-w-md">
              {/*  조종판으로 조작하는 메인 토글 */}
              <div className="flex items-center justify-between p-5 bg-[#161b22] border border-gray-800 rounded-2xl transition-colors hover:border-gray-700">
                <div className="flex flex-col gap-1">
                  <span className="text-white font-medium text-base">
                    실시간 컴포넌트 미리보기
                  </span>
                  <span className="text-sm text-gray-500">
                    오른쪽 설정에서 값을 변경해 보세요.
                  </span>
                </div>
                {/*  Toggle 적용 */}
                <Toggle
                  checked={isChecked}
                  onChange={setIsChecked}
                  disabled={isDisabled}
                  size={size}
                  activeColor={selectedColor.class}
                  thumbIcon={dynamicIcon}
                  thumbImage={selectedThumb.image}
                  className={selectedColor.ring} // 포커스 링 색상도 맞춰주는 센스
                />
              </div>

              {/* 장식을 위한 가짜 토글 (설정 메뉴 느낌 내기) */}
              <div className="flex items-center justify-between p-4 bg-[#161b22] border border-gray-800 rounded-xl opacity-60">
                <div className="flex flex-col gap-0.5">
                  <span className="text-white font-medium text-sm">
                    야간 방해 금지 (Default)
                  </span>
                  <span className="text-xs text-gray-500">
                    이건 그냥 기본 스타일 장식용입니다.
                  </span>
                </div>
                <Toggle
                  checked={false}
                  onChange={() => {}}
                  disabled
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 조종판(Controls) 및 코드 뷰어 패널 */}
        <div className="w-full lg:w-md flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-6">
            <h3 className="text-white font-semibold mb-1">Toggle Settings</h3>

            {/* 조종판 섹션 1: 기본 상태 */}
            <div className="flex flex-col gap-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-white text-sm">현재 상태 (Checked)</span>
                <Toggle checked={isChecked} onChange={setIsChecked} size="sm" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-300 text-sm">
                  Disabled (비활성화)
                </span>
                <Toggle
                  checked={isDisabled}
                  onChange={setIsDisabled}
                  size="sm"
                  activeColor="bg-gray-400"
                />
              </label>
            </div>

            <div className="border-t border-gray-800"></div>

            {/* 조종판 섹션 2: 사이즈 (Segmented Control 느낌) */}
            <div className="space-y-3">
              <label className="text-sm text-gray-300">Size</label>
              <div className="grid grid-cols-3 gap-2 bg-[#0a0d12] p-1 rounded-lg border border-gray-800">
                {(["sm", "md", "lg"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`text-xs uppercase font-bold py-2 rounded ${size === s ? "bg-[#00a2ff] text-white" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* 조종판 섹션 3: 색상 테마 */}
            <div className="space-y-3">
              <label className="text-sm text-gray-300">
                Active Color (Success)
              </label>
              <div className="flex flex-wrap gap-2.5">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={`w-9 h-9 rounded-full ${color.class} flex items-center justify-center border-2 transition ${selectedColor.name === color.name ? "border-white" : "border-transparent hover:border-gray-500"}`}
                  >
                    {selectedColor.name === color.name && (
                      <Check size={16} className="text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/*조종판 섹션 4: 손잡이 내부 (아이콘/이미지) */}
            <div className="space-y-3">
              <label className="text-sm text-gray-300">Thumb Content</label>
              <div className="flex flex-wrap gap-2">
                {THUMB_CONTENT_OPTIONS.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => setSelectedThumb(option)}
                    className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs transition ${selectedThumb.name === option.name ? "bg-gray-700 border-gray-500 text-white" : "bg-[#0a0d12] border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-300"}`}
                  >
                    {option.image ? (
                      <img
                        src={option.image}
                        alt=""
                        className="w-4 h-4 rounded-full object-cover"
                      />
                    ) : option.icon ? (
                      <span className="w-4 h-4 [&>svg]:w-4 [&>svg]:h-4">
                        {option.name === "Theme (Icon)" ? (
                          <Palette />
                        ) : (
                          option.icon
                        )}
                      </span>
                    ) : (
                      <span className="w-4 h-4 border border-dashed border-gray-600 rounded-full" />
                    )}
                    {option.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 코드 뷰어 패널 (기존 유지) */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 px-1">
              <button
                onClick={() => setCodeTab("component")}
                className={`text-xs font-medium px-3 py-1.5 rounded-t-lg transition-colors ${codeTab === "component" ? "bg-[#161b22] text-[#00a2ff] border-t border-x border-gray-800" : "text-gray-500 hover:text-gray-300"}`}
              >
                조립된 코드
              </button>
              <button
                onClick={() => setCodeTab("usage")}
                className={`text-xs font-medium px-3 py-1.5 rounded-t-lg transition-colors ${codeTab === "usage" ? "bg-[#161b22] text-[#00a2ff] border-t border-x border-gray-800" : "text-gray-500 hover:text-gray-300"}`}
              >
                실무 적용 예시 💡
              </button>
            </div>
            <CodeViewer
              code={codeTab === "component" ? generatedCode : usageExampleCode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
