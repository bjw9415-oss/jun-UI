import { useState } from "react";
import Modal, { type ModalProps } from "../components/feedback/Modal";
import PageHeader from "../components/layout/PageHeader";
import CodeViewer from "../components/layout/CodeViewer";

type CodeTabType = "component" | "usage";

export default function ModalPage() {
  const [isOpen, setIsOpen] = useState(false);

  // 커스텀 상태
  const [size, setSize] = useState<Required<ModalProps>["size"]>("md");
  const [showDescription, setShowDescription] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  const [codeTab, setCodeTab] = useState<CodeTabType>("component");

  // Prop 문자열 조립
  const sizePropStr = size !== "md" ? `\n  size="${size}"` : "";
  const descPropStr = showDescription
    ? `\n  description="정말로 이 프로젝트를 영구적으로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."`
    : "";
  const footerPropStr = showFooter
    ? `\n  footer={
    <>
      <button onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors">취소</button>
      <button onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">삭제하기</button>
    </>
  }`
    : "";

  // 조립된 코드
  const generatedCode = `<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="프로젝트 삭제"${descPropStr}${sizePropStr}${footerPropStr}
>
  <div className="bg-[#0d1117] p-4 rounded-xl border border-gray-800 text-sm">
    <p>삭제할 프로젝트명: <span className="font-bold text-white">Jun-UI-Library</span></p>
  </div>
</Modal>`;

  // 실무 적용 코드
  const usageExampleCode = `import { useState } from 'react';
import Modal from '../components/Modal';

export default function DangerZone() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 bg-[#161b22] border border-red-500/30 rounded-xl">
      <h3 className="text-red-500 font-bold mb-2">Danger Zone</h3>
      <p className="text-sm text-gray-400 mb-4">프로젝트를 삭제하면 모든 데이터가 날아갑니다.</p>
      
      {/* 트리거 버튼 */}
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
      >
        프로젝트 삭제
      </button>

      {/* 모달 컴포넌트 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="프로젝트 삭제"${descPropStr}${sizePropStr}${footerPropStr}
      >
        <div className="bg-[#0d1117] p-4 rounded-xl border border-gray-800 text-sm">
          <p>삭제할 프로젝트명: <span className="font-bold text-white">Jun-UI-Library</span></p>
        </div>
      </Modal>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Modal (Dialog)"
        description="중요한 정보를 확인하거나 사용자에게 액션을 요구할 때 현재 화면 위에 띄우는 오버레이 창입니다."
      />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 미리보기(Preview) */}
        <div className="flex-1 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-10 min-h-100 bg-[#0a0d12] bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-size-[16px_16px]">
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-500 mb-6">
                아래 버튼을 눌러 모달을 띄워보세요.
              </p>

              <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/30 font-semibold rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg hover:shadow-red-500/20"
              >
                Open Modal
              </button>
            </div>

            {/* 실제 모달 렌더링 영역 */}
            <Modal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="프로젝트 삭제"
              description={
                showDescription
                  ? "정말로 이 프로젝트를 영구적으로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
                  : undefined
              }
              size={size}
              footer={
                showFooter ? (
                  <>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
                    >
                      삭제하기
                    </button>
                  </>
                ) : undefined
              }
            >
              <div className="bg-[#0d1117] p-4 rounded-xl border border-gray-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#161b22] flex items-center justify-center text-xl">
                  📁
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Target Project</span>
                  <span className="text-sm font-bold text-white">
                    Jun-UI-Library
                  </span>
                </div>
              </div>
            </Modal>
          </div>
        </div>

        {/* 오른쪽: 조종판(Controls) */}
        <div className="w-full lg:w-md flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-6">
            <h3 className="text-white font-semibold mb-1">Modal Settings</h3>

            {/* 사이즈 설정 */}
            <div className="space-y-3">
              <label className="text-sm text-gray-300">Max Width (Size)</label>
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

            <div className="border-t border-gray-800"></div>

            {/* 요소 표시 토글 */}
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-300">Show Description</span>
                <input
                  type="checkbox"
                  checked={showDescription}
                  onChange={(e) => setShowDescription(e.target.checked)}
                  className="w-4 h-4 accent-[#00a2ff]"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-300">
                  Show Footer (Buttons)
                </span>
                <input
                  type="checkbox"
                  checked={showFooter}
                  onChange={(e) => setShowFooter(e.target.checked)}
                  className="w-4 h-4 accent-[#00a2ff]"
                />
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
