import { useState } from "react";
import Tooltip, { type TooltipPosition } from "../components/Tooltip";
import PageHeader from "../components/PageHeader";
import CodeViewer from "../components/CodeViewer";

type CodeTabType = "component" | "usage";

export default function TooltipPage() {
  const [position, setPosition] = useState<TooltipPosition>("top");
  const [content, setContent] = useState("이것은 툴팁입니다!");
  const [codeTab, setCodeTab] = useState<CodeTabType>("component");

  // Prop 문자열 조립
  const positionPropStr =
    position !== "top" ? `\n  position="${position}"` : "";

  // 조립된 코드
  const generatedCode = `<Tooltip
  content="${content}"${positionPropStr}
>
  <button className="px-4 py-2 bg-[#161b22] border border-gray-800 rounded-lg text-white hover:border-[#00a2ff] transition-colors">
    Hover me
  </button>
</Tooltip>`;

  // 실무 적용 코드
  const usageExampleCode = `import Tooltip from '../components/Tooltip';
import { Info, AlertCircle } from 'lucide-react';

export default function IconTooltips() {
  return (
    <div className="flex gap-4 p-6 bg-[#161b22] border border-gray-800 rounded-xl">
      
      {/* 1. 아이콘 툴팁 (상단) */}
      <Tooltip content="도움말이 필요하신가요?" position="top">
        <button className="p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white">
          <Info className="w-5 h-5" />
        </button>
      </Tooltip>

      {/* 2. 아이콘 툴팁 (하단 경고) */}
      <Tooltip content="삭제된 데이터는 복구할 수 없습니다." position="bottom">
        <button className="p-2 rounded-full hover:bg-red-500/20 transition-colors text-red-500">
          <AlertCircle className="w-5 h-5" />
        </button>
      </Tooltip>

    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Tooltip"
        description="버튼이나 아이콘에 마우스를 올렸을 때 부가적인 설명을 제공하는 작은 말풍선 오버레이입니다."
      />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 미리보기(Preview) */}
        <div className="flex-1 min-w-0 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-10 min-h-100 bg-[#0a0d12] bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-size-[16px_16px]">
            <div className="flex flex-col items-center justify-center p-12 border border-gray-800/50 rounded-3xl bg-[#161b22]/50 w-full max-w-sm mx-auto">
              <Tooltip content={content} position={position}>
                <button className="whitespace-nowrap px-5 py-3 bg-[#161b22] text-white border border-gray-700 font-semibold rounded-xl hover:border-[#00a2ff] hover:text-[#00a2ff] transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00a2ff] focus:ring-offset-2 focus:ring-offset-[#161b22]">
                  Hover me ✨
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
        {/* 오른쪽: 조종판(Controls) */}
        <div className="w-full lg:w-md shrink-0 flex flex-col gap-6">
          {" "}
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-6">
            <h3 className="text-white font-semibold mb-1">Tooltip Settings</h3>

            {/* 방향 설정 */}
            <div className="space-y-3">
              <label className="text-sm text-gray-300">Position (방향)</label>
              <div className="grid grid-cols-4 gap-1 bg-[#0a0d12] p-1 rounded-lg border border-gray-800">
                {(["top", "bottom", "left", "right"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPosition(p)}
                    className={`text-xs uppercase font-bold py-2 rounded transition-colors ${position === p ? "bg-[#00a2ff] text-white" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-800"></div>

            {/* 텍스트 내용 변경 */}
            <div className="space-y-3">
              <label className="text-sm text-gray-300">
                Content (말풍선 내용)
              </label>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-[#0a0d12] border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-[#00a2ff] outline-none transition-colors"
                placeholder="툴팁 내용을 입력하세요"
              />
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
