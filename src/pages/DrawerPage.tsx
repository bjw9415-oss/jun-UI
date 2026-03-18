import { useState } from "react";
import Drawer, {
  type DrawerDirection,
  type DrawerSize,
} from "../components/Drawer";
import PageHeader from "../components/PageHeader";
import CodeViewer from "../components/CodeViewer";

type CodeTabType = "component" | "usage";

export default function DrawerPage() {
  const [isOpen, setIsOpen] = useState(false);

  // 커스텀 상태
  const [direction, setDirection] = useState<DrawerDirection>("right");
  const [size, setSize] = useState<DrawerSize>("md");
  const [codeTab, setCodeTab] = useState<CodeTabType>("component");

  // Prop 문자열 조립
  const directionPropStr =
    direction !== "right" ? `\n  direction="${direction}"` : "";
  const sizePropStr = size !== "md" ? `\n  size="${size}"` : "";

  // 조립된 코드
  const generatedCode = `<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="프로필 편집"
  description="공개 프로필에 표시될 정보를 수정합니다."${directionPropStr}${sizePropStr}
  footer={
    <>
      <button className="px-4 py-2 text-sm text-gray-400 hover:text-white">취소</button>
      <button className="px-4 py-2 text-sm bg-[#00a2ff] text-white rounded-lg">저장</button>
    </>
  }
>
  <div className="space-y-4">
    {/* 폼 내용 */}
  </div>
</Drawer>`;

  // 실무 적용 코드
  const usageExampleCode = `import { useState } from 'react';
import Drawer from '../components/Drawer';

export default function UserSettings() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div>
      {/* 트리거 버튼 */}
      <button 
        onClick={() => setIsDrawerOpen(true)}
        className="px-4 py-2 bg-[#161b22] text-white border border-gray-800 rounded-lg hover:border-gray-600 transition"
      >
        ⚙️ 환경 설정 열기
      </button>

      {/* 드로어 컴포넌트 */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}${directionPropStr}${sizePropStr}
        title="환경 설정"
        description="계정 및 애플리케이션 설정을 관리합니다."
      >
        <div className="flex flex-col gap-6 py-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">사용자 이름</label>
            <input type="text" className="w-full bg-[#0d1117] border border-gray-800 rounded-lg p-2 text-sm text-white focus:border-[#00a2ff] outline-none" defaultValue="Jun" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">이메일 알림</label>
            <div className="text-xs text-gray-500">새로운 소식을 이메일로 받습니다.</div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Drawer (Side Panel)"
        description="화면의 가장자리에서 부드럽게 밀려 들어오는 오버레이 패널입니다. 긴 폼이나 상세 설정을 보여줄 때 모달 대신 사용하기 좋습니다."
      />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 미리보기(Preview) */}
        <div className="flex-1 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-10 min-h-100 bg-[#0a0d12] bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-size-[16px_16px]">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#00a2ff]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#00a2ff]/20">
                <span className="text-2xl">🗄️</span>
              </div>
              <h3 className="text-white font-bold text-lg">Side Panel</h3>
              <p className="text-sm text-gray-500 mb-6">
                아래 버튼을 눌러 드로어를 띄워보세요.
              </p>

              <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-3 bg-[#00a2ff]/10 text-[#00a2ff] border border-[#00a2ff]/30 font-semibold rounded-xl hover:bg-[#00a2ff] hover:text-white transition-all shadow-lg hover:shadow-[#00a2ff]/20"
              >
                Open Drawer
              </button>
            </div>

            {/*  실제 드로어 렌더링 영역 */}
            <Drawer
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              direction={direction}
              size={size}
              title="프로필 편집"
              description="공개 프로필에 표시될 정보를 수정합니다. 변경사항은 즉시 반영됩니다."
              footer={
                <>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-[#00a2ff] text-white hover:bg-[#0081cc] transition-all"
                  >
                    저장하기
                  </button>
                </>
              }
            >
              <div className="flex flex-col gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    이름
                  </label>
                  <input
                    type="text"
                    defaultValue="Jun-UI"
                    className="w-full bg-[#0d1117] border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-[#00a2ff] focus:ring-1 focus:ring-[#00a2ff] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    소개
                  </label>
                  <textarea
                    rows={4}
                    defaultValue="나만의 다크 테마 React 컴포넌트 라이브러리를 만들고 있습니다."
                    className="w-full bg-[#0d1117] border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-[#00a2ff] focus:ring-1 focus:ring-[#00a2ff] outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </Drawer>
          </div>
        </div>

        {/* 오른쪽: 조종판(Controls) */}
        <div className="w-full lg:w-md flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-6">
            <h3 className="text-white font-semibold mb-1">Drawer Settings</h3>

            {/* 방향 설정 */}
            <div className="space-y-3">
              <label className="text-sm text-gray-300">
                Direction (슬라이드 방향)
              </label>
              <div className="grid grid-cols-4 gap-1 bg-[#0a0d12] p-1 rounded-lg border border-gray-800">
                {(["left", "right", "top", "bottom"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDirection(d)}
                    className={`text-xs uppercase font-bold py-2 rounded transition-colors ${direction === d ? "bg-[#00a2ff] text-white" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-800"></div>

            {/* 사이즈 설정 */}
            <div className="space-y-3">
              <label className="text-sm text-gray-300">
                Size (너비 또는 높이)
              </label>
              <div className="grid grid-cols-5 gap-1 bg-[#0a0d12] p-1 rounded-lg border border-gray-800">
                {(["sm", "md", "lg", "xl", "full"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`text-xs uppercase font-bold py-2 rounded transition-colors ${size === s ? "bg-[#00a2ff] text-white" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    {s}
                  </button>
                ))}
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
