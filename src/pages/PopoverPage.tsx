import { useMemo, useState } from "react";
import { Popover, type PopoverPosition } from "../components/feedback";
import { PageHeader, CodeViewer } from "../components/layout";

export default function PopoverPage() {
  const [position, setPosition] = useState<PopoverPosition>("bottom");
  const usageExampleCode = useMemo(() => {
    return `import Popover from '../components/Popover';
import { Settings2 } from 'lucide-react';

export default function QuickSettings() {
  return (
    <Popover
      position="${position}" 
      content={
        <div className="flex flex-col gap-4 p-1">
          <div className="space-y-1">
            <h4 className="font-semibold text-white">빠른 설정</h4>
            <p className="text-xs text-gray-400">자주 사용하는 옵션을 변경하세요.</p>
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-300">알림 받기</span>
              <input type="checkbox" className="accent-[#00a2ff] w-4 h-4 rounded" defaultChecked />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-300">다크 모드</span>
              <input type="checkbox" className="accent-[#00a2ff] w-4 h-4 rounded" defaultChecked />
            </label>
          </div>
        </div>
      }
    >
      <button className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-gray-800 rounded-lg hover:border-gray-600 transition-colors text-white text-sm">
        <Settings2 className="w-4 h-4" />
        설정 열기
      </button>
    </Popover>
  );
}`;
  }, [position]);

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Popover"
        description="클릭 시 나타나며, 내부에 폼이나 메뉴 등 복잡한 컨텐츠를 담을 수 있는 오버레이 카드입니다."
      />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 미리보기(Preview) */}
        <div className="flex-1 min-w-0 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-10 min-h-100 bg-[#0a0d12] bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-size-[16px_16px]">
            {/* 중앙 배치용 컨테이너 */}
            <div className="flex flex-col items-center justify-center p-12 border border-gray-800/50 rounded-3xl bg-[#161b22]/50 w-full max-w-md mx-auto h-80">
              {/*  실제 팝오버 렌더링 영역 */}
              <Popover
                position={position}
                content={
                  <div className="flex flex-col gap-4">
                    <div className="space-y-1">
                      <h4 className="font-semibold text-white">Dimensions</h4>
                      <p className="text-xs text-gray-400">
                        요소의 크기를 설정합니다.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-xs text-gray-400">Width</label>
                        <input
                          defaultValue="100%"
                          className="col-span-2 h-8 rounded-md bg-[#0d1117] border border-gray-700 px-2 text-xs text-white focus:border-[#00a2ff] outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-xs text-gray-400">Height</label>
                        <input
                          defaultValue="200px"
                          className="col-span-2 h-8 rounded-md bg-[#0d1117] border border-gray-700 px-2 text-xs text-white focus:border-[#00a2ff] outline-none"
                        />
                      </div>
                    </div>
                    <button className="mt-2 w-full bg-[#00a2ff] text-white py-1.5 rounded-lg text-xs font-semibold hover:bg-[#0081cc] transition-colors">
                      적용하기
                    </button>
                  </div>
                }
              >
                <button className="px-5 py-2.5 bg-[#161b22] text-white border border-gray-700 font-medium rounded-xl hover:border-[#00a2ff] transition-all shadow-lg">
                  설정 열기 (Click)
                </button>
              </Popover>
            </div>
          </div>
        </div>

        {/* 오른쪽: 조종판(Controls) */}
        <div className="w-full lg:w-md shrink-0 flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-6">
            <h3 className="text-white font-semibold mb-1">Popover Settings</h3>

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
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 px-1">
              <button className="text-xs font-medium px-3 py-1.5 rounded-t-lg transition-colors bg-[#161b22] text-[#00a2ff] border-t border-x border-gray-800">
                실무 적용 예시 💡
              </button>
            </div>
            <CodeViewer code={usageExampleCode} />
          </div>
        </div>
      </div>
    </div>
  );
}
