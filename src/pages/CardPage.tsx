import { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/data-display";
import { PageHeader, CodeViewer } from "@/components/layout";

export default function CardPage() {
  const [showHeader, setShowHeader] = useState(true);
  const [showContent, setShowContent] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  const usageExampleCode = useMemo(() => {
    return `import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '../components/Card';

export default function ProjectCard() {
  return (
    <Card className="w-87.5">
${
  showHeader
    ? `      <CardHeader>
        <CardTitle>프로젝트 생성</CardTitle>
        <CardDescription>새로운 웹 프로젝트를 시작합니다.</CardDescription>
      </CardHeader>\n`
    : ""
}${
      showContent
        ? `      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-medium text-white">프로젝트 이름</label>
            <input 
              className="flex h-9 w-full rounded-md border border-gray-700 bg-[#0a0d12] px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 text-white" 
              placeholder="Jun-UI-Library" 
            />
          </div>
        </div>
      </CardContent>\n`
        : ""
    }${
      showFooter
        ? `      <CardFooter className="flex justify-between">
        <button className="px-4 py-2 bg-transparent text-gray-300 hover:text-white border border-gray-700 hover:bg-gray-800 rounded-md text-sm font-medium transition-colors">
          취소
        </button>
        <button className="px-4 py-2 bg-primary text-white hover:bg-[#0081cc] rounded-md text-sm font-medium transition-colors">
          생성하기
        </button>
      </CardFooter>\n`
        : ""
    }    </Card>
  );
}`;
  }, [showHeader, showContent, showFooter]);

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Card"
        description="콘텐츠와 액션을 그룹화하는 유연한 컨테이너입니다. 합성 컴포넌트 패턴을 통해 내부 요소를 자유롭게 조립할 수 있습니다."
      />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        {/* 미리보기 (Preview) */}
        <div className="flex-1 min-w-0 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-10 min-h-100 bg-[#0a0d12] bg-[radial-gradient(var(--border-default)_1px,transparent_1px)] bg-size-[16px_16px]">
            {/*  카드 렌더링 영역 */}
            <Card className="w-full max-w-87.5 transition-all duration-300 animate-in zoom-in-95">
              {showHeader && (
                <CardHeader>
                  <CardTitle>프로젝트 생성</CardTitle>
                  <CardDescription>
                    새로운 웹 프로젝트를 시작합니다.
                  </CardDescription>
                </CardHeader>
              )}
              {showContent && (
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-sm font-medium text-white">
                        프로젝트 이름
                      </label>
                      <input
                        className="flex h-9 w-full rounded-md border border-gray-700 bg-[#0a0d12] px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary text-white"
                        placeholder="Jun-UI-Library"
                      />
                    </div>
                  </div>
                </CardContent>
              )}
              {showFooter && (
                <CardFooter className="flex justify-between border-t border-gray-800/50 pt-6">
                  <button className="px-4 py-2 bg-transparent text-gray-300 hover:text-white border border-gray-700 hover:bg-gray-800 rounded-md text-sm font-medium transition-colors">
                    취소
                  </button>
                  <button className="px-4 py-2 bg-primary text-white hover:bg-[#0081cc] rounded-md text-sm font-medium transition-colors shadow-lg shadow-primary/20">
                    생성하기
                  </button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>

        {/* 조종판 (Controls) */}
        <div className="w-full lg:w-md shrink-0 flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-6">
            <h3 className="text-white font-semibold mb-1">
              Card Composer (레고 조립)
            </h3>

            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-800 bg-[#0a0d12] cursor-pointer hover:border-gray-600 transition-colors">
                <input
                  type="checkbox"
                  checked={showHeader}
                  onChange={(e) => setShowHeader(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-gray-300 font-medium">
                  Card Header (제목/설명)
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-800 bg-[#0a0d12] cursor-pointer hover:border-gray-600 transition-colors">
                <input
                  type="checkbox"
                  checked={showContent}
                  onChange={(e) => setShowContent(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-gray-300 font-medium">
                  Card Content (본문)
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-800 bg-[#0a0d12] cursor-pointer hover:border-gray-600 transition-colors">
                <input
                  type="checkbox"
                  checked={showFooter}
                  onChange={(e) => setShowFooter(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-gray-300 font-medium">
                  Card Footer (액션 버튼)
                </span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 px-1">
              <button className="text-xs font-medium px-3 py-1.5 rounded-t-lg transition-colors bg-[#161b22] text-primary border-t border-x border-gray-800">
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
