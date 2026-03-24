import { useState } from "react";
import {
  RadioGroup,
  Radio,
  type RadioGroupProps,
} from "@/components/data-entry/Radio";
import { PageHeader, CodeViewer } from "@/components/layout";

type CodeTabType = "component" | "usage";

// 색상 테마 옵션
const COLOR_OPTIONS = [
  { name: "Default Blue", class: "border-primary text-primary" },
  { name: "Emerald", class: "border-emerald-500 text-emerald-500" },
  { name: "Indigo", class: "border-indigo-500 text-indigo-500" },
  { name: "Pink", class: "border-pink-500 text-pink-500" },
];

export default function RadioPage() {
  const [selectedValue, setSelectedValue] = useState("pro");
  const [isDisabled, setIsDisabled] = useState(false);
  const [size, setSize] = useState<Required<RadioGroupProps>["size"]>("md");
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);

  const [codeTab, setCodeTab] = useState<CodeTabType>("component");

  // Prop 문자열 조립
  const sizePropStr = size !== "md" ? `\n  size="${size}"` : "";
  const colorPropStr =
    selectedColor.name !== "Default Blue"
      ? `\n  activeColor="${selectedColor.class}"`
      : "";

  // 조립된 컴포넌트 코드
  const generatedCode = `<RadioGroup
  value={selectedValue}
  onValueChange={setSelectedValue}${sizePropStr}${colorPropStr}
>
  <div className="flex items-center gap-2">
    <Radio value="free" disabled={isDisabled} />
    <span>Free Plan</span>
  </div>
  <div className="flex items-center gap-2">
    <Radio value="pro" disabled={isDisabled} />
    <span>Pro Plan</span>
  </div>
</RadioGroup>`;

  // 실무 예시 코드
  const usageExampleCode = `import { useState } from 'react';
import { RadioGroup, Radio } from '../components/Radio';

export default function SubscriptionPlan() {
  const [plan, setPlan] = useState("pro");

  return (
    <RadioGroup 
      value={plan} 
      onValueChange={setPlan}${sizePropStr}${colorPropStr}
      className="flex flex-col gap-3 w-full max-w-sm"
    >
      <label className="flex items-center justify-between p-4 border border-gray-800 rounded-xl bg-[#161b22] cursor-pointer hover:border-gray-600 transition-colors">
        <div className="flex items-center gap-3">
          <Radio value="free" />
          <div className="flex flex-col">
            <span className="text-white font-medium">Free</span>
            <span className="text-xs text-gray-500">기본 기능 제공</span>
          </div>
        </div>
        <span className="text-white font-bold">₩0</span>
      </label>

      <label className="flex items-center justify-between p-4 border border-primary rounded-xl bg-primary/5 cursor-pointer">
        <div className="flex items-center gap-3">
          <Radio value="pro" />
          <div className="flex flex-col">
            <span className="text-primary font-medium">Pro (추천)</span>
            <span className="text-xs text-gray-400">모든 고급 기능 포함</span>
          </div>
        </div>
        <span className="text-primary font-bold">₩9,900</span>
      </label>
    </RadioGroup>
  );
}`;

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Radio Group"
        description="여러 옵션 중 단 하나의 값만 선택해야 할 때 사용하는 컴포넌트입니다."
      />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 미리보기(Preview) */}
        <div className="flex-1 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-10 min-h-100 gap-8 bg-[#0a0d12] bg-[radial-gradient(var(--border-default)_1px,transparent_1px)] bg-size-[16px_16px]">
            {/* 🌟 실무 적용 예시: 요금제 선택 UI */}
            <div className="w-full max-w-sm space-y-4">
              <div className="text-xs text-primary font-bold tracking-wider uppercase">
                Select Plan
              </div>

              <RadioGroup
                value={selectedValue}
                onValueChange={setSelectedValue}
                size={size}
                activeColor={selectedColor.class}
                className="flex flex-col gap-3"
              >
                {/* Free Plan */}
                <label
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${selectedValue === "free" ? "border-gray-500 bg-gray-800/30" : "border-gray-800 bg-[#161b22] hover:border-gray-700"}`}
                >
                  <div className="flex items-center gap-3">
                    <Radio value="free" disabled={isDisabled} />
                    <div className="flex flex-col">
                      <span className="text-white font-medium">Free</span>
                      <span className="text-xs text-gray-500">
                        기본 기능 제공
                      </span>
                    </div>
                  </div>
                  <span className="text-white font-bold">₩0</span>
                </label>

                {/* Pro Plan */}
                <label
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${selectedValue === "pro" ? "border-primary bg-primary/5" : "border-gray-800 bg-[#161b22] hover:border-gray-700"}`}
                >
                  <div className="flex items-center gap-3">
                    <Radio value="pro" disabled={isDisabled} />
                    <div className="flex flex-col">
                      <span
                        className={
                          selectedValue === "pro"
                            ? "text-primary font-medium"
                            : "text-white font-medium"
                        }
                      >
                        Pro (추천)
                      </span>
                      <span className="text-xs text-gray-500">
                        모든 고급 기능 포함
                      </span>
                    </div>
                  </div>
                  <span
                    className={
                      selectedValue === "pro"
                        ? "text-primary font-bold"
                        : "text-white font-bold"
                    }
                  >
                    ₩9,900
                  </span>
                </label>
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* 오른쪽: 조종판(Controls) */}
        <div className="w-full lg:w-md flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-6">
            <h3 className="text-white font-semibold mb-1">Radio Settings</h3>

            {/* 사이즈 설정 */}
            <div className="space-y-3">
              <label className="text-sm text-gray-300">Size</label>
              <div className="grid grid-cols-3 gap-2 bg-[#0a0d12] p-1 rounded-lg border border-gray-800">
                {(["sm", "md", "lg"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`text-xs uppercase font-bold py-2 rounded transition-colors ${size === s ? "bg-primary text-white" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-800"></div>

            {/* 비활성화 설정 */}
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-300">Disabled All</span>
              <input
                type="checkbox"
                checked={isDisabled}
                onChange={(e) => setIsDisabled(e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
            </label>

            {/* 색상 테마 설정 */}
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
                    className={`w-8 h-8 rounded-full border-2 ${color.class.split(" ")[0]} bg-transparent flex items-center justify-center transition-all ${selectedColor.name === color.name ? "ring-2 ring-white ring-offset-2 ring-offset-[#161b22]" : "opacity-50 hover:opacity-100"}`}
                  >
                    <span
                      className={`w-3 h-3 rounded-full bg-current ${color.class.split(" ")[1]}`}
                    ></span>
                  </button>
                ))}
              </div>
            </div>
          </div>

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
