import { useState } from "react";
import Toggle from "../components/Toggle";
import PageHeader from "../components/PageHeader";
import CodeViewer from "../components/CodeViewer";

type CodeTabType = "component" | "usage";

export default function TogglePage() {
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [codeTab, setCodeTab] = useState<CodeTabType>("component");

  // 조립된 껍데기 코드
  const disabledCode = isDisabled ? `\n  disabled` : "";
  const generatedCode = `<Toggle
  checked={isChecked}
  onChange={setIsChecked}${disabledCode}
/>`;

  //  설정에 따라 진화하는 실무 적용 예시 코드
  const pushValidationStr = isDisabled
    ? `// 관리자에 의해 알림 설정이 비활성화되었습니다.`
    : `// 서버에 알림 설정 값을 전송하는 로직이 들어갑니다.\n    console.log("알림 설정 변경:", newChecked);`;

  const usageExampleCode = `import { useState } from 'react';
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
        onChange={handleToggle}${disabledCode}
      />
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Toggle (Switch)"
        description="설정을 켜거나 끌 때 사용하는 스위치 컴포넌트입니다."
      />

      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 미리보기(Preview) 패널 */}
        {/* 왼쪽: 미리보기(Preview) 패널 */}
        <div className="flex-1 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview
          </div>
          <div className="flex-1 flex items-center justify-center p-10 min-h-100 bg-[#0a0d12] bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-size-[16px_16px] overflow-auto">
            <div className="flex flex-col gap-3 w-full max-w-sm">
              {/* 1. 우리가 조종판으로 조작하는 메인 토글 */}
              <div className="flex items-center justify-between p-4 bg-[#161b22] border border-gray-800 rounded-xl transition-colors hover:border-gray-700">
                <div className="flex flex-col gap-0.5">
                  <span className="text-white font-medium text-sm">
                    마케팅 푸시 알림
                  </span>
                  <span className="text-xs text-gray-500">
                    이벤트 및 혜택 소식을 보내드립니다.
                  </span>
                </div>
                <Toggle
                  checked={isChecked}
                  onChange={setIsChecked}
                  disabled={isDisabled}
                />
              </div>

              {/* 2. 장식을 위한 가짜 토글 (설정 메뉴 느낌 내기) */}
              <div className="flex items-center justify-between p-4 bg-[#161b22] border border-gray-800 rounded-xl opacity-60">
                <div className="flex flex-col gap-0.5">
                  <span className="text-white font-medium text-sm">
                    야간 방해 금지
                  </span>
                  <span className="text-xs text-gray-500">
                    밤 10시부터 아침 8시까지 알림 무음
                  </span>
                </div>
                {/* 이건 그냥 장식용이라 동작하지 않습니다 */}
                <Toggle checked={false} onChange={() => {}} disabled />
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 조종판(Controls) 및 코드 뷰어 패널 */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-5">
            <h3 className="text-white font-semibold mb-2">Toggle Settings</h3>

            <div className="flex flex-col gap-4">
              {/* 토글 컴포넌트 자신을 조작하는 마더-토글(?) */}
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-white text-sm">현재 상태 (Checked)</span>
                <Toggle checked={isChecked} onChange={setIsChecked} />
              </label>

              <div className="border-t border-gray-800 my-1"></div>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-300 text-sm">
                  Disabled (비활성화)
                </span>
                <Toggle checked={isDisabled} onChange={setIsDisabled} />
              </label>
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
