import { useState } from "react";
import { Input } from "@/components/data-entry";
import { PageHeader, CodeViewer } from "@/components/layout";
import { Search, Mail, Lock, Eye, EyeOff } from "lucide-react";

type InputType = "text" | "password" | "email";
type LeftIconType = "none" | "Search" | "Mail" | "Lock";
type RightIconType = "none" | "Eye";
type CodeTabType = "component" | "usage";

export default function InputPage() {
  const [inputType, setInputType] = useState<InputType>("text");
  const [placeholder, setPlaceholder] = useState("여기에 입력해 보세요...");
  const [inputValue, setInputValue] = useState("");

  const [isDisabled, setIsDisabled] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("올바른 형식이 아닙니다.");

  const [leftIconName, setLeftIconName] = useState<LeftIconType>("none");
  const [rightIconName, setRightIconName] = useState<RightIconType>("none");
  const [showPassword, setShowPassword] = useState(false);

  const [codeTab, setCodeTab] = useState<CodeTabType>("component");

  const renderLeftIcon = () => {
    const props = { className: "w-4 h-4" };
    switch (leftIconName) {
      case "Search":
        return <Search {...props} />;
      case "Mail":
        return <Mail {...props} />;
      case "Lock":
        return <Lock {...props} />;
      default:
        return undefined;
    }
  };

  const renderRightIcon = () => {
    if (rightIconName === "Eye") {
      return (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="hover:text-white transition-colors outline-none"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      );
    }
    return undefined;
  };

  const actualType =
    inputType === "password" && showPassword ? "text" : inputType;

  // 현재 조작 중인 컴포넌트 코드
  const leftIconCode =
    leftIconName !== "none"
      ? `\n  leftIcon={<${leftIconName} className="w-4 h-4" />}`
      : "";
  const rightIconCode =
    rightIconName !== "none"
      ? `\n  rightIcon={<button onClick={...}><Eye className="w-4 h-4" /></button>}`
      : "";
  const errorCode = hasError
    ? `\n  error\n  errorMessage="${errorMessage}"`
    : "";
  const disabledCode = isDisabled ? `\n  disabled` : "";
  const typeCode = inputType !== "text" ? `\n  type="${inputType}"` : "";
  let stateName = "textValue";
  let setStateName = "setTextValue";
  let validationRule = `text.trim() === ''`;
  let validationComment = `// 값이 비어있는지 검사`;

  if (inputType === "email") {
    stateName = "email";
    setStateName = "setEmail";
    validationRule = `!text.includes('@') && text.length > 0`;
    validationComment = `// 이메일에 '@'가 없는지 검사`;
  } else if (inputType === "password") {
    stateName = "password";
    setStateName = "setPassword";
    validationRule = `text.length > 0 && text.length < 8`;
    validationComment = `// 비밀번호가 8자리 미만인지 검사`;
  }

  const iconsToImport = [];
  if (leftIconName !== "none") iconsToImport.push(leftIconName);
  if (rightIconName === "Eye") iconsToImport.push("Eye", "EyeOff");
  const importLucideStr =
    iconsToImport.length > 0
      ? `\nimport { ${[...new Set(iconsToImport)].join(", ")} } from 'lucide-react';`
      : "";

  const showPasswordStateStr =
    rightIconName === "Eye"
      ? `\n  const [showPassword, setShowPassword] = useState(false);`
      : "";
  const dynamicTypeStr =
    rightIconName === "Eye" && inputType === "password"
      ? `{showPassword ? "text" : "password"}`
      : `"${inputType}"`;
  const rightIconUsageStr =
    rightIconName === "Eye"
      ? `\n      rightIcon={
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      }`
      : "";
  const generatedCode = `<Input
  placeholder="${placeholder}"${typeCode}${disabledCode}${errorCode}${leftIconCode}${rightIconCode}
/>`;

  // 다른 개발자들을 위한 '실무 적용 예시' 코드
  const usageExampleCode = `import { useState } from 'react';
import Input from '../components/Input';${importLucideStr}

export default function DynamicInputExample() {
  const [${stateName}, ${setStateName}] = useState('');
  const [isError, setIsError] = useState(false);${showPasswordStateStr}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    ${setStateName}(text);
    
    ${validationComment}
    setIsError(${validationRule});
  };

  return (
    <Input
      type=${dynamicTypeStr}
      value={${stateName}}
      onChange={handleChange}
      placeholder="${placeholder}"${leftIconName !== "none" ? `\n      leftIcon={<${leftIconName} className="w-4 h-4" />}` : ""}${rightIconUsageStr}
      error={isError}
      errorMessage="${errorMessage}"${isDisabled ? "\n      disabled" : ""}
    />
  );
}`;

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Input"
        description="사용자의 데이터를 입력받는 컴포넌트입니다. 에러 상태와 아이콘 슬롯을 지원합니다."
      />

      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 미리보기(Preview) 패널 */}
        <div className="flex-1 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview
          </div>
          <div className="flex-1 flex items-center justify-center p-10 min-h-100  bg-[#0a0d12] bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-size-[16px_16px] overflow-auto">
            <div className="w-full max-w-sm">
              <Input
                type={actualType}
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isDisabled}
                error={hasError}
                errorMessage={errorMessage}
                leftIcon={renderLeftIcon()}
                rightIcon={renderRightIcon()}
              />
            </div>
          </div>
        </div>

        {/* 오른쪽: 조종판(Controls) 및 코드 뷰어 패널 */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-5">
            <h3 className="text-white font-semibold mb-2">Input Settings</h3>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Type</label>
              <select
                value={inputType}
                onChange={(e) => setInputType(e.target.value as InputType)}
                className="bg-[#0d1117] text-white border border-gray-700 rounded-lg p-2 outline-none focus:border-[#00a2ff]"
              >
                <option value="text">Text (기본)</option>
                <option value="password">Password (비밀번호)</option>
                <option value="email">Email (이메일)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Placeholder</label>
              <input
                type="text"
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                className="bg-[#0d1117] text-white border border-gray-700 rounded-lg p-2 outline-none focus:border-[#00a2ff]"
              />
            </div>

            <div className="border-t border-gray-800 my-1"></div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">
                  Left Icon (좌측 아이콘)
                </label>
                <div className="flex gap-2">
                  {(["none", "Search", "Mail", "Lock"] as LeftIconType[]).map(
                    (icon) => (
                      <button
                        key={icon}
                        onClick={() => setLeftIconName(icon)}
                        className={`flex-1 py-1.5 text-xs rounded-md border transition-colors ${leftIconName === icon ? "bg-[#00a2ff] border-[#00a2ff] text-white" : "border-gray-700 text-gray-400 hover:bg-[#21262d]"}`}
                      >
                        {icon}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">
                  Right Icon (우측 아이콘)
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setRightIconName("none")}
                    className={`flex-1 py-1.5 text-xs rounded-md border transition-colors ${rightIconName === "none" ? "bg-[#00a2ff] border-[#00a2ff] text-white" : "border-gray-700 text-gray-400 hover:bg-[#21262d]"}`}
                  >
                    없음
                  </button>
                  <button
                    onClick={() => setRightIconName("Eye")}
                    className={`flex-1 py-1.5 text-xs rounded-md border transition-colors ${rightIconName === "Eye" ? "bg-[#00a2ff] border-[#00a2ff] text-white" : "border-gray-700 text-gray-400 hover:bg-[#21262d]"}`}
                  >
                    눈알 (Eye)
                  </button>
                </div>
              </div>
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

          {/* 업그레이드된 코드 뷰어  */}
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
            {/* 선택된 탭에 따라 다른 코드를 뷰어에 전달 */}
            <CodeViewer
              code={codeTab === "component" ? generatedCode : usageExampleCode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
