import { useState } from "react";
import { Textarea } from "@/components/data-entry";
import { PageHeader, CodeViewer } from "@/components/layout";

import { NumberSliderControl } from "@/components/layout";
type CodeTabType = "component" | "usage";

export default function TextareaPage() {
  const [placeholder, setPlaceholder] = useState("내용을 자세히 적어주세요...");
  const [inputValue, setInputValue] = useState("");

  const [rows, setRows] = useState<number | string>(4); // 기본 줄 수 제어
  const [isDisabled, setIsDisabled] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "최소 10자 이상 입력해야 합니다.",
  );

  const [codeTab, setCodeTab] = useState<CodeTabType>("component");

  // 코드 생성기
  const errorCode = hasError
    ? `\n  error\n  errorMessage="${errorMessage}"`
    : "";
  const disabledCode = isDisabled ? `\n  disabled` : "";
  const rowsCode = rows !== 4 ? `\n  rows={${rows}}` : ""; // 4가 아니면 코드에 추가

  const generatedCode = `<Textarea
  placeholder="${placeholder}"${rowsCode}${disabledCode}${errorCode}
/>`;

  //  실무 적용 예시 코드 (문의사항, 자기소개서 등 글자 수 제한 로직)
  const usageExampleCode = `import { useState } from 'react';
import Textarea from '../components/Textarea';

export default function ReviewForm() {
  const [review, setReview] = useState('');
  const [isError, setIsError] = useState(false);

  // 글자 수 제한 검사 (10자 이상 500자 이하)
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setReview(text);
    
    // 1글자라도 썼는데 10자 미만이면 에러!
    setIsError(text.length > 0 && text.length < 10);
  };

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        value={review}
        onChange={handleChange}
        placeholder="제품을 사용해 보신 솔직한 후기를 남겨주세요! (최소 10자)"
        rows={5}
        error={isError}
        errorMessage="리뷰는 최소 10자 이상 작성해 주세요."
      />
      <div className="text-right text-xs text-gray-500">
        {review.length} / 500자
      </div>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Textarea"
        description="문의사항, 자기소개서 등 여러 줄의 긴 텍스트를 입력받을 때 사용하는 컴포넌트입니다."
      />

      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 미리보기(Preview) 패널 */}
        <div className="flex-1 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview
          </div>
          <div className="flex-1 flex items-center justify-center p-10 min-h-100 bg-[#0a0d12] bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-size-[16px_16px] overflow-auto">
            <div className="w-full max-w-lg">
              <Textarea
                key={rows}
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                rows={typeof rows === "string" ? parseInt(rows, 10) : rows}
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
            <h3 className="text-white font-semibold mb-2">Textarea Settings</h3>

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
              <NumberSliderControl
                label="Rows (기본 높이/줄 수)"
                value={rows}
                onChange={setRows}
                min={2}
                max={15}
                unit="줄"
              />
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
