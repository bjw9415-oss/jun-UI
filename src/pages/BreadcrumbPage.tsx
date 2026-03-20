import { useState, useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "../components/Breadcrumb";
import PageHeader from "../components/PageHeader";
import CodeViewer from "../components/CodeViewer";
import { ChevronRight, Slash } from "lucide-react";

export default function BreadcrumbDemo() {
  const [separatorType, setSeparatorType] = useState<"chevron" | "slash">(
    "chevron",
  );
  const [showEllipsis, setShowEllipsis] = useState(false);

  const usageExampleCode = useMemo(() => {
    const sep =
      separatorType === "slash"
        ? "\n        <BreadcrumbSeparator>\n          <Slash />\n        </BreadcrumbSeparator>"
        : "\n        <BreadcrumbSeparator />";

    return `import { 
  Breadcrumb, BreadcrumbList, BreadcrumbItem, 
  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis
} from '../components/Breadcrumb';
${separatorType === "slash" ? "import { Slash } from 'lucide-react';\n" : ""}
export default function Navigation() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>${sep}
        
        ${
          showEllipsis
            ? `<BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>${sep}`
            : `<BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>${sep}`
        }
        
        <BreadcrumbItem>
          <BreadcrumbLink href="/components/navigation">Navigation</BreadcrumbLink>
        </BreadcrumbItem>${sep}
        
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`;
  }, [separatorType, showEllipsis]);

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Breadcrumb"
        description="현재 페이지의 계층적 위치를 보여주어, 상위 페이지로 쉽게 돌아갈 수 있게 해주는 경로 탐색 UI입니다."
      />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 min-h-100 bg-[#0a0d12] bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-size-[16px_16px]">
            {/* 가상의 웹사이트 헤더 영역 구현 */}
            <div className="w-full max-w-2xl bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden shadow-2xl shadow-black/40">
              <div className="bg-[#0a0d12] px-6 py-4 border-b border-gray-800 flex items-center">
                {/* 실제 Breadcrumb 렌더링 */}
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink>Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    {separatorType === "slash" ? (
                      <BreadcrumbSeparator>
                        <Slash />
                      </BreadcrumbSeparator>
                    ) : (
                      <BreadcrumbSeparator />
                    )}

                    {showEllipsis ? (
                      <>
                        <BreadcrumbItem>
                          <BreadcrumbEllipsis />
                        </BreadcrumbItem>
                        {separatorType === "slash" ? (
                          <BreadcrumbSeparator>
                            <Slash />
                          </BreadcrumbSeparator>
                        ) : (
                          <BreadcrumbSeparator />
                        )}
                      </>
                    ) : (
                      <>
                        <BreadcrumbItem>
                          <BreadcrumbLink>Components</BreadcrumbLink>
                        </BreadcrumbItem>
                        {separatorType === "slash" ? (
                          <BreadcrumbSeparator>
                            <Slash />
                          </BreadcrumbSeparator>
                        ) : (
                          <BreadcrumbSeparator />
                        )}
                      </>
                    )}

                    <BreadcrumbItem>
                      <BreadcrumbLink>Navigation</BreadcrumbLink>
                    </BreadcrumbItem>

                    {separatorType === "slash" ? (
                      <BreadcrumbSeparator>
                        <Slash />
                      </BreadcrumbSeparator>
                    ) : (
                      <BreadcrumbSeparator />
                    )}

                    <BreadcrumbItem>
                      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Breadcrumb (경로 탐색)
                </h2>
                <p className="text-gray-400 text-sm">
                  현재 계층 구조의 끝에 도달했습니다. 상위 메뉴로 이동하려면
                  위의 링크를 클릭하세요.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 조종판 영역 */}
        <div className="w-full lg:w-md shrink-0 flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-6">
            <h3 className="text-white font-semibold mb-1">
              Breadcrumb Composer
            </h3>

            <div className="space-y-3">
              <label className="text-sm text-gray-300">
                Separator Style (구분자 모양)
              </label>
              <div className="grid grid-cols-2 gap-2 bg-[#0a0d12] p-2 rounded-xl border border-gray-800">
                <button
                  onClick={() => setSeparatorType("chevron")}
                  className={`flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-lg transition-all ${separatorType === "chevron" ? "bg-[#161b22] text-[#00a2ff] border border-[#00a2ff]/30 shadow-sm" : "text-gray-500 hover:text-gray-300 border border-transparent"}`}
                >
                  Chevron ( <ChevronRight className="w-4 h-4" /> )
                </button>
                <button
                  onClick={() => setSeparatorType("slash")}
                  className={`flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-lg transition-all ${separatorType === "slash" ? "bg-[#161b22] text-[#00a2ff] border border-[#00a2ff]/30 shadow-sm" : "text-gray-500 hover:text-gray-300 border border-transparent"}`}
                >
                  Slash ( <Slash className="w-4 h-4" /> )
                </button>
              </div>
            </div>

            <div className="border-t border-gray-800"></div>

            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-800 bg-[#0a0d12] cursor-pointer hover:border-gray-600 transition-colors">
                <input
                  type="checkbox"
                  checked={showEllipsis}
                  onChange={(e) => setShowEllipsis(e.target.checked)}
                  className="w-4 h-4 accent-[#00a2ff]"
                />
                <span className="text-sm text-gray-300 font-medium">
                  Collapse Paths (중간 경로 생략)
                </span>
              </label>
              <p className="text-xs text-gray-500">
                계층(Depth)이 너무 깊어지면{" "}
                <code className="text-[#00a2ff]">BreadcrumbEllipsis</code>{" "}
                컴포넌트를 중간에 끼워 넣어 UI를 깔끔하게 유지할 수 있습니다.
              </p>
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
