import { useState, useEffect } from "react";
import { Skeleton } from "@/components/feedback";
import { PageHeader, CodeViewer } from "@/components/layout";
import { User } from "lucide-react";

export default function SkeletonPage() {
  const [isLoading, setIsLoading] = useState(true);

  // 시뮬레이션: 버튼 누르면 3초간 로딩 상태가 됨
  const triggerLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  // 컴포넌트 마운트 시 최초 1회 로딩 시뮬레이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const usageExampleCode = `import Skeleton from '../components/Skeleton';

export default function UserCard({ isLoading }) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-4 p-4 border border-gray-800 rounded-xl">
        {/* 아바타 스켈레톤 (원형) */}
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          {/* 텍스트 스켈레톤 (막대형) */}
          <Skeleton className="h-4 w-50" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 p-4 border border-gray-800 rounded-xl">
      <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white">
        <User />
      </div>
      <div>
        <h4 className="text-white font-medium">Jun Developer</h4>
        <p className="text-sm text-gray-400">Frontend Engineer</p>
      </div>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Skeleton"
        description="데이터가 로딩되는 동안 콘텐츠의 형태를 미리 보여주어 사용자의 대기 체감 시간을 줄여주는 자리표시자(Placeholder)입니다."
      />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 미리보기(Preview) */}
        <div className="flex-1 min-w-0 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-10 min-h-100 bg-[#0a0d12] bg-[radial-gradient(var(--border-default)_1px,transparent_1px)] bg-size-[16px_16px]">
            <div className="w-full max-w-sm mx-auto flex flex-col gap-6">
              {/* 로딩 상태에 따른 UI 렌더링 */}
              {isLoading ? (
                //  스켈레톤 UI (로딩 중)
                <div className="flex flex-col gap-4 p-6 bg-[#161b22] border border-gray-800 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-4">
                    {/* 아바타 뼈대 */}
                    <Skeleton className="h-14 w-14 rounded-full shrink-0" />
                    <div className="flex flex-col gap-2 flex-1">
                      {/* 이름 뼈대 */}
                      <Skeleton className="h-4 w-3/4" />
                      {/* 직업 뼈대 */}
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                  {/* 본문 뼈대 3줄 */}
                  <div className="space-y-2 mt-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-[90%]" />
                    <Skeleton className="h-3 w-[80%]" />
                  </div>
                </div>
              ) : (
                //  실제 데이터 UI (로딩 완료)
                <div className="flex flex-col gap-4 p-6 bg-[#161b22] border border-gray-800 hover:border-gray-700 transition-colors rounded-2xl shadow-xl animate-in fade-in duration-500">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-linear-to-tr from-primary to-[#1EC800] flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                      <User size={28} />
                    </div>
                    <div className="flex flex-col flex-1">
                      <h4 className="text-white font-bold text-lg">
                        Jun Developer
                      </h4>
                      <p className="text-sm text-primary font-medium">
                        Frontend Engineer
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-400 leading-relaxed">
                    안녕하세요! 나만의 멋진 다크 테마 디자인 시스템을 구축하고
                    있는 프론트엔드 개발자입니다. 현재 Skeleton 컴포넌트를
                    테스트 중입니다.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 오른쪽: 조종판(Controls) */}
        <div className="w-full lg:w-md shrink-0 flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-6">
            <h3 className="text-white font-semibold mb-1">State Control</h3>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-4 bg-[#0a0d12] border border-gray-800 rounded-xl">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">
                    데이터 상태
                  </span>
                  <span className="text-xs text-gray-500">
                    {isLoading ? "서버에서 불러오는 중..." : "로딩 완료!"}
                  </span>
                </div>
                {/* 로딩 상태를 시각적으로 보여주는 뱃지 */}
                <div
                  className={`px-2.5 py-1 rounded-full text-xs font-bold ${isLoading ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 animate-pulse" : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"}`}
                >
                  {isLoading ? "LOADING" : "SUCCESS"}
                </div>
              </div>

              <button
                onClick={triggerLoading}
                disabled={isLoading}
                className="w-full py-2.5 bg-[#161b22] text-white border border-gray-700 font-medium rounded-xl hover:bg-gray-800 hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다시 불러오기 (Reload)
              </button>
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
