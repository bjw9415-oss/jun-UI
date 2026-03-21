import { useState } from "react";
import { useToast, type ToastVariant } from "../components/feedback";
import PageHeader from "../components/layout/PageHeader";
import CodeViewer from "../components/layout/CodeViewer";

export default function ToastPage() {
  //  토스트 훅 가져오기 (이것만 있으면 어디서든 토스트를 띄울 수 있습니다)
  const { toast } = useToast();

  const [variant, setVariant] = useState<ToastVariant>("default");
  const [showDescription, setShowDescription] = useState(true);

  // 실무 적용 코드
  const usageExampleCode = `import { useToast } from '../components/Toast';

export default function SaveProfile() {
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      // API 통신 로직 대기...
      await new Promise(resolve => setTimeout(resolve, 500));
      
      //  성공 토스트 띄우기
      toast({
        variant: "success",
        title: "저장 완료",
        description: "프로필 설정이 성공적으로 저장되었습니다.",
        duration: 3000,
      });
    } catch (error) {
      // 에러 토스트 띄우기
      toast({
        variant: "danger",
        title: "저장 실패",
        description: "서버에 문제가 발생했습니다. 다시 시도해주세요.",
      });
    }
  };

  return (
    <button onClick={handleSave} className="px-4 py-2 bg-[#00a2ff] text-white rounded-lg">
      프로필 저장하기
    </button>
  );
}`;

  // 토스트 실행 핸들러 (조종판의 설정값을 바탕으로 실행)
  const handleFireToast = () => {
    const contentMap = {
      default: { title: "새로운 알림", desc: "새로운 메시지가 도착했습니다." },
      success: {
        title: "저장 완료",
        desc: "데이터가 성공적으로 서버에 반영되었습니다.",
      },
      danger: {
        title: "삭제 실패",
        desc: "권한이 부족하여 삭제할 수 없습니다.",
      },
      warning: {
        title: "세션 만료 임박",
        desc: "5분 뒤에 로그아웃 됩니다. 작업을 저장해주세요.",
      },
    };

    toast({
      variant,
      title: contentMap[variant].title,
      description: showDescription ? contentMap[variant].desc : undefined,
    });
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Toast"
        description="사용자의 액션에 대한 피드백을 화면 모서리에 잠깐 띄웠다가 사라지게 하는 알림 컴포넌트입니다."
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
                <span className="text-2xl">🍞</span>
              </div>
              <h3 className="text-white font-bold text-lg">Toast Playground</h3>
              <p className="text-sm text-gray-500 mb-6">
                아래 버튼을 누르면 우측 하단에 토스트가 나타납니다.
              </p>

              <button
                onClick={handleFireToast}
                className="px-6 py-3 bg-[#00a2ff] text-white font-semibold rounded-xl hover:bg-[#0081cc] transition-all shadow-lg hover:shadow-[#00a2ff]/20 active:scale-95"
              >
                Show Toast
              </button>
            </div>
          </div>
        </div>

        {/* 오른쪽: 조종판(Controls) */}
        <div className="w-full lg:w-md flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-6">
            <h3 className="text-white font-semibold mb-1">Toast Settings</h3>

            {/* Variant 설정 */}
            <div className="space-y-3">
              <label className="text-sm text-gray-300">Variant (상태)</label>
              <div className="grid grid-cols-2 gap-2">
                {(["default", "success", "danger", "warning"] as const).map(
                  (v) => (
                    <button
                      key={v}
                      onClick={() => setVariant(v)}
                      className={`text-xs uppercase font-bold py-2.5 rounded-lg border transition-all ${
                        variant === v
                          ? "bg-[#00a2ff] text-white border-[#00a2ff]"
                          : "bg-[#0a0d12] border-gray-800 text-gray-400 hover:border-gray-600"
                      }`}
                    >
                      {v}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="border-t border-gray-800"></div>

            {/* 요소 표시 토글 */}
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-300">Show Description</span>
              <input
                type="checkbox"
                checked={showDescription}
                onChange={(e) => setShowDescription(e.target.checked)}
                className="w-4 h-4 accent-[#00a2ff]"
              />
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 px-1">
              <button
                className={`text-xs font-medium px-3 py-1.5 rounded-t-lg transition-colors bg-[#161b22] text-[#00a2ff] border-t border-x border-gray-800`}
              >
                어디서든 Hook으로 호출 💡
              </button>
            </div>
            {/* 토스트는 선언형 컴포넌트가 아니므로 usage 코드만 보여줍니다 */}
            <CodeViewer code={usageExampleCode} />
          </div>
        </div>
      </div>
    </div>
  );
}
