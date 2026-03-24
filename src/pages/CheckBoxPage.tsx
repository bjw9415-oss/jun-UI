import { useState } from "react";
import { Check } from "lucide-react";
import { Checkbox, type CheckboxProps } from "@/components/data-entry";
import { PageHeader, CodeViewer } from "@/components/layout";

type CodeTabType = "component" | "usage";
type CheckedState = boolean | "indeterminate";

//  색상 테마 옵션 정의
const COLOR_OPTIONS = [
  {
    name: "Default Blue",
    class: "bg-primary border-primary",
    ring: "focus-visible:ring-primary",
  },
  {
    name: "Emerald",
    class: "bg-emerald-500 border-emerald-500",
    ring: "focus-visible:ring-emerald-500",
  },
  {
    name: "Indigo",
    class: "bg-indigo-600 border-indigo-600",
    ring: "focus-visible:ring-indigo-600",
  },
  {
    name: "Pink",
    class: "bg-pink-500 border-pink-500",
    ring: "focus-visible:ring-pink-500",
  },
];

export default function CheckboxPage() {
  // 1. 기본 상태 관리
  const [checkedState, setCheckedState] = useState<CheckedState>(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // 2. 커스텀 속성 상태 추가
  const [size, setSize] = useState<Required<CheckboxProps>["size"]>("md");
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);

  const [codeTab, setCodeTab] = useState<CodeTabType>("component");

  // --- [실무 예시용 상태] 약관 동의 로직 ---
  const [terms, setTerms] = useState({ service: false, privacy: false });
  const allChecked = terms.service && terms.privacy;
  const someChecked = terms.service || terms.privacy;
  const masterState = allChecked ? true : someChecked ? "indeterminate" : false;

  const handleMasterChange = (c: CheckedState) => {
    const newValue = c === true;
    setTerms({ service: newValue, privacy: newValue });
  };
  // ----------------------------------------

  //  3. 동적 코드 생성 로직

  // Prop 문자열 조립
  const sizePropStr = size !== "md" ? `\n  size="${size}"` : "";
  const colorPropStr =
    selectedColor.name !== "Default Blue"
      ? `\n  activeColor="${selectedColor.class}"`
      : "";
  const disabledPropStr = isDisabled ? `\n  disabled` : "";

  // checked 상태 문자열 처리 (indeterminate는 문자열, 나머지는 boolean)
  const checkedPropStr =
    checkedState === "indeterminate"
      ? `\n  checked="indeterminate"`
      : `\n  checked={${checkedState}}`;

  // 최종 조립된 컴포넌트 코드
  const generatedCode = `<Checkbox${checkedPropStr}
  onCheckedChange={setCheckedState}${sizePropStr}${colorPropStr}${disabledPropStr}
/>`;

  //  설정에 따라 진화하는 실무 적용 예시 코드 (전체 동의 로직)
  const usageExampleCode = `import { useState } from 'react';
import Checkbox from '../components/Checkbox';

export default function TermsAgreement() {
  const [terms, setTerms] = useState({
    service: false,
    privacy: false,
  });

  // 상태 파악 로직
  const allChecked = terms.service && terms.privacy;
  const someChecked = terms.service || terms.privacy;
  const masterState = allChecked ? true : someChecked ? "indeterminate" : false;

  const handleMasterChange = (checked: boolean | "indeterminate") => {
    const newValue = checked === true;
    setTerms({ service: newValue, privacy: newValue });
  };

  return (
    <div className="flex flex-col gap-4 bg-[#161b22] p-5 border border-gray-800 rounded-xl w-full max-w-sm">
      {/* 마스터 체크박스 (전체 동의) */}
      <label className="flex items-center gap-3 cursor-pointer pb-4 border-b border-gray-800">
        <Checkbox 
          checked={masterState} 
          onCheckedChange={handleMasterChange}${sizePropStr}${colorPropStr}${disabledPropStr}
        />
        <span className="font-semibold text-white">전체 약관에 동의합니다.</span>
      </label>

      {/* 개별 체크박스들 */}
      <div className="flex flex-col gap-3 pl-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox 
            checked={terms.service} 
            onCheckedChange={(c) => setTerms({ ...terms, service: c as boolean })}${sizePropStr}${colorPropStr}${disabledPropStr}
          />
          <span className="text-sm text-gray-300">(필수) 서비스 이용약관 동의</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox 
            checked={terms.privacy} 
            onCheckedChange={(c) => setTerms({ ...terms, privacy: c as boolean })}${sizePropStr}${colorPropStr}${disabledPropStr}
          />
          <span className="text-sm text-gray-300">(필수) 개인정보 처리방침 동의</span>
        </label>
      </div>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Checkbox"
        description="다중 선택이나 약관 동의를 받을 때 사용하는 체크박스 컴포넌트입니다. indeterminate(부분 선택) 상태를 완벽하게 지원합니다."
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
          <div className="flex-1 flex flex-col items-center justify-center p-10 min-h-100 gap-8 bg-[#0a0d12] bg-[radial-gradient(var(--border-default)_1px,transparent_1px)] bg-size-[16px_16px] overflow-auto">
            {/*  1. 우리가 조종판으로 조작하는 메인 체크박스 */}
            <div className="flex items-center justify-between p-5 bg-[#161b22] border border-gray-800 rounded-2xl w-full max-w-sm transition-colors hover:border-gray-700">
              <div className="flex flex-col gap-1">
                <span className="text-white font-medium text-base">
                  단일 체크박스
                </span>
                <span className="text-sm text-gray-500">
                  우측 조종판으로 조작해보세요.
                </span>
              </div>
              <Checkbox
                checked={checkedState}
                onCheckedChange={setCheckedState}
                disabled={isDisabled}
                size={size}
                activeColor={selectedColor.class}
                className={selectedColor.ring}
              />
            </div>

            {/*  2. 실무 적용 예시: 전체 동의 로직 (독립적으로 동작) */}
            <div className="flex flex-col gap-4 bg-[#161b22] p-5 border border-gray-800 rounded-2xl w-full max-w-sm opacity-90">
              <div className="text-xs text-primary font-bold mb-1 tracking-wider uppercase">
                Real-world Example
              </div>

              <label className="flex items-center gap-3 cursor-pointer pb-4 border-b border-gray-800">
                <Checkbox
                  checked={masterState}
                  onCheckedChange={handleMasterChange}
                  size={size}
                  activeColor={selectedColor.class}
                  disabled={isDisabled}
                />
                <span className="font-semibold text-white">
                  전체 약관에 동의합니다.
                </span>
              </label>

              <div className="flex flex-col gap-3 pl-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={terms.service}
                    onCheckedChange={(c) =>
                      setTerms({ ...terms, service: c as boolean })
                    }
                    size={size}
                    activeColor={selectedColor.class}
                    disabled={isDisabled}
                  />
                  <span className="text-sm text-gray-300">
                    (필수) 서비스 이용약관 동의
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={terms.privacy}
                    onCheckedChange={(c) =>
                      setTerms({ ...terms, privacy: c as boolean })
                    }
                    size={size}
                    activeColor={selectedColor.class}
                    disabled={isDisabled}
                  />
                  <span className="text-sm text-gray-300">
                    (필수) 개인정보 처리방침 동의
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 조종판(Controls) 및 코드 뷰어 패널 */}
        <div className="w-full lg:w-md flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-6">
            <h3 className="text-white font-semibold mb-1">Checkbox Settings</h3>

            {/*  조종판 섹션 1: 체크 상태 (Segmented Control 방식 적용) */}
            <div className="space-y-3">
              <label className="text-sm text-gray-300">Checked State</label>
              <div className="grid grid-cols-3 gap-2 bg-[#0a0d12] p-1 rounded-lg border border-gray-800">
                <button
                  onClick={() => setCheckedState(false)}
                  className={`text-xs font-bold py-2 rounded transition-colors ${checkedState === false ? "bg-gray-700 text-white" : "text-gray-500 hover:text-gray-300"}`}
                >
                  False
                </button>
                <button
                  onClick={() => setCheckedState("indeterminate")}
                  className={`text-xs font-bold py-2 rounded transition-colors ${checkedState === "indeterminate" ? "bg-primary text-white" : "text-gray-500 hover:text-gray-300"}`}
                >
                  Indeterminate
                </button>
                <button
                  onClick={() => setCheckedState(true)}
                  className={`text-xs font-bold py-2 rounded transition-colors ${checkedState === true ? "bg-primary text-white" : "text-gray-500 hover:text-gray-300"}`}
                >
                  True
                </button>
              </div>
            </div>

            <div className="border-t border-gray-800"></div>

            {/*  조종판 섹션 2: 사이즈 & 비활성화 */}
            <div className="flex items-center justify-between">
              <div className="space-y-3 flex-1">
                <label className="text-sm text-gray-300">Size</label>
                <div className="flex gap-2">
                  {(["sm", "md", "lg"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`text-xs uppercase font-bold px-4 py-2 rounded bg-[#0a0d12] border transition-colors ${size === s ? "border-primary text-primary" : "border-gray-800 text-gray-500 hover:border-gray-600"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Disabled 토글 */}
              <div className="space-y-3 flex items-center flex-col pt-1">
                <label className="text-sm text-gray-300">Disabled</label>
                {/* 체크박스 비활성화 상태는 토글로 제어하면 어색해서 
                  간단한 네이티브 체크박스나 직접 만든 체크박스를 쓰면 좋습니다. 
                  여기서는 조종용으로 사이즈 sm의 자체 Checkbox를 사용합니다.
                */}
                <Checkbox
                  checked={isDisabled}
                  onCheckedChange={(c) => setIsDisabled(c as boolean)}
                  size="sm"
                />
              </div>
            </div>

            {/*  조종판 섹션 3: 색상 테마 */}
            <div className="space-y-3">
              <label className="text-sm text-gray-300">
                Active Color Theme
              </label>
              <div className="flex flex-wrap gap-2.5">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={`w-9 h-9 rounded-full ${color.class.split(" ")[0]} flex items-center justify-center border-2 transition ${selectedColor.name === color.name ? "border-white" : "border-transparent hover:border-gray-500"}`}
                  >
                    {selectedColor.name === color.name && (
                      <Check size={16} className="text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 코드 뷰어 패널 */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 px-1">
              <button
                onClick={() => setCodeTab("component")}
                className={`text-xs font-medium px-3 py-1.5 rounded-t-lg transition-colors ${codeTab === "component" ? "bg-[#161b22] text-primary border-t border-x border-gray-800" : "text-gray-500 hover:text-gray-300"}`}
              >
                조립된 코드
              </button>
              <button
                onClick={() => setCodeTab("usage")}
                className={`text-xs font-medium px-3 py-1.5 rounded-t-lg transition-colors ${codeTab === "usage" ? "bg-[#161b22] text-primary border-t border-x border-gray-800" : "text-gray-500 hover:text-gray-300"}`}
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
