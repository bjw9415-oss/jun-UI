import { useState } from "react";
import { Select } from "../components/data-entry";
import { PageHeader, CodeViewer } from "../components/layout";

type CodeTabType = "component" | "usage";

// 플레이그라운드에서 사용할 샘플 데이터
const fruitOptions = [
  { value: "apple", label: "🍎 사과 (Apple)" },
  { value: "banana", label: "🍌 바나나 (Banana)" },
  { value: "grape", label: "🍇 포도 (Grape)" },
  { value: "mango", label: "🥭 망고 (Mango)" },
  { value: "strawberry", label: "🍓 딸기 (Strawberry)" },
];

export default function SelectPage() {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [placeholder, setPlaceholder] = useState("과일을 선택해주세요");

  const [isDisabled, setIsDisabled] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("필수 항목을 선택해주세요.");

  const [codeTab, setCodeTab] = useState<CodeTabType>("component");

  //1. 조립된 코드 생성기
  const errorCode = hasError
    ? `\n  error\n  errorMessage="${errorMessage}"`
    : "";
  const disabledCode = isDisabled ? `\n  disabled` : "";

  const generatedCode = `const options = [
  { value: 'apple', label: '🍎 사과 (Apple)' },
  // ... 생략
];

<Select
  options={options}
  value="${selectedValue}"
  placeholder="${placeholder}"${disabledCode}${errorCode}
/>`;

  // 2-1. 에러 옵션을 켰을 때만 유효성 검사(Validation) 로직과 UI를 코드에 주입합니다.
  const validationStateStr = hasError
    ? `\n  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);`
    : "";
  const validationLogicStr = hasError
    ? `\n    setIsSubmitAttempted(true);\n    if (!country) return; // 에러: 선택 안 했으면 가입 중단\n`
    : "";
  const errorPropStr = hasError
    ? `\n        error={isSubmitAttempted && !country}\n        errorMessage="${errorMessage}"`
    : "";

  // 2-2. 비활성화 옵션을 켰을 때 Select와 제출 버튼을 모두 잠가버립니다.
  const disabledPropStr = isDisabled ? `\n        disabled` : "";
  const buttonDisabledStr = isDisabled
    ? `\n        disabled\n        className="h-11 bg-[#161b22] text-gray-500 rounded-lg font-medium cursor-not-allowed"`
    : `\n        className="h-11 bg-[#00a2ff] text-white rounded-lg font-medium hover:bg-[#008ce6] transition-colors"`;

  const usageExampleCode = `import { useState } from 'react';
import Select from '../components/Select';

const countryOptions = [
  { value: 'kr', label: '🇰🇷 대한민국' },
  { value: 'us', label: '🇺🇸 미국' },
  { value: 'jp', label: '🇯🇵 일본' },
];

export default function SignupForm() {
  const [country, setCountry] = useState<string>('');${validationStateStr}

  const handleSubmit = () => {${validationLogicStr}
    alert(\`가입 성공! 선택한 국가: \${country}\`);
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <Select
        options={countryOptions}
        value={country}
        onChange={setCountry}
        placeholder="${placeholder}"${disabledPropStr}${errorPropStr}
      />
      <button 
        onClick={handleSubmit}${buttonDisabledStr}
      >
        가입하기
      </button>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Select"
        description="여러 개의 정해진 옵션 중 하나를 선택할 때 사용하는 커스텀 드롭다운 컴포넌트입니다."
      />

      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 미리보기(Preview) 패널 */}
        <div className="flex-1 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview
          </div>
          <div className="flex-1 flex items-start justify-center p-10 pt-20 min-h-100 bg-[#0a0d12] bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-size-[16px_16px] overflow-auto">
            <div className="w-full max-w-xs">
              <Select
                options={fruitOptions}
                value={selectedValue}
                onChange={setSelectedValue}
                placeholder={placeholder}
                disabled={isDisabled}
                error={hasError}
                errorMessage={errorMessage}
              />
            </div>
          </div>
        </div>

        {/* 오른쪽: 조종판(Controls) 및 코드 뷰어 패널 */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-5">
            <h3 className="text-white font-semibold mb-2">Select Settings</h3>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Placeholder</label>
              <input
                type="text"
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                className="bg-[#0d1117] text-white border border-gray-700 rounded-lg p-2 outline-none focus:border-[#00a2ff]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">
                Selected Value (초기화 테스트용)
              </label>
              <button
                onClick={() => setSelectedValue("")}
                className="py-2 text-sm text-gray-300 bg-[#21262d] border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
              >
                선택 초기화 (Clear)
              </button>
            </div>

            <div className="border-t border-gray-800 my-1"></div>

            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDisabled}
                  onChange={(e) => setIsDisabled(e.target.checked)}
                  className="w-4 h-4 accent-[#00a2ff]"
                />
                <span className="text-gray-300 text-sm">
                  Disabled (비활성화)
                </span>
              </label>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasError}
                    onChange={(e) => setHasError(e.target.checked)}
                    className="w-4 h-4 accent-red-500"
                  />
                  <span className="text-red-400 font-medium text-sm">
                    Error (에러 발생!)
                  </span>
                </label>

                {hasError && (
                  <input
                    type="text"
                    value={errorMessage}
                    onChange={(e) => setErrorMessage(e.target.value)}
                    className="bg-[#21262d] text-red-400 border border-red-900/50 rounded-lg p-2 outline-none focus:border-red-500 text-sm mt-1"
                  />
                )}
              </div>
            </div>
          </div>

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
