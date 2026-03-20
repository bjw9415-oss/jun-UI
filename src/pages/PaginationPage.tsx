import { useState, useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "../components/navigation/Pagination";
import PageHeader from "../components/layout/PageHeader";
import CodeViewer from "../components/layout/CodeViewer";

export default function PaginationPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10); // 테스트를 위해 기본 10페이지

  // 🌟 핵심 알고리즘: 현재 페이지 주변의 번호만 렌더링하도록 배열을 계산합니다.
  const paginationRange = useMemo(() => {
    // 1. 총 페이지가 7개 이하면 그냥 다 보여줌
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // 2. 현재 페이지가 앞쪽에 몰려있을 때 (1, 2, 3, 4, 5, ..., 10)
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    // 3. 현재 페이지가 뒤쪽에 몰려있을 때 (1, ..., 6, 7, 8, 9, 10)
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // 4. 현재 페이지가 중간에 있을 때 (1, ..., 4, 5, 6, ..., 10)
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number | string) => {
    if (typeof page === "number" && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const usageExampleCode = useMemo(() => {
    return `import { 
  Pagination, PaginationContent, PaginationItem, 
  PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis 
} from '../components/Pagination';

export default function PostList() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1} 
          />
        </PaginationItem>
        
        {/* 계산된 paginationRange 배열을 순회하며 렌더링 */}
        <PaginationItem><PaginationLink>1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationEllipsis /></PaginationItem>
        <PaginationItem><PaginationLink isActive>4</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink>5</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink>6</PaginationLink></PaginationItem>
        <PaginationItem><PaginationEllipsis /></PaginationItem>
        <PaginationItem><PaginationLink>10</PaginationLink></PaginationItem>

        <PaginationItem>
          <PaginationNext 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages} 
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}`;
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Pagination"
        description="긴 목록이나 테이블 데이터를 여러 페이지로 나누어 탐색할 수 있게 해주는 네비게이션 컴포넌트입니다."
      />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 min-h-100 bg-[#0a0d12] bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-size-[16px_16px]">
            {/* 가상의 데이터 리스트 영역 */}
            <div className="w-full max-w-2xl bg-[#161b22] border border-gray-800 rounded-xl p-6 mb-8 shadow-lg text-center">
              <p className="text-[#00a2ff] font-bold text-xl mb-2">
                현재 {currentPage} 페이지를 보고 있습니다
              </p>
              <p className="text-gray-400 text-sm">
                총 {totalPages}개의 페이지 중에서 탐색 중입니다.
              </p>
            </div>

            {/*  실제 페이지네이션 렌더링 */}
            <Pagination>
              <PaginationContent>
                {/* 이전 버튼 */}
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={
                      currentPage === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {/* 페이지 번호 및 말줄임표 */}
                {paginationRange.map((pageNumber, idx) => (
                  <PaginationItem key={idx}>
                    {pageNumber === "..." ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        isActive={pageNumber === currentPage}
                        onClick={() => handlePageChange(pageNumber)}
                        className="cursor-pointer"
                      >
                        {pageNumber}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                {/* 다음 버튼 */}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* 조종판 영역 */}
        <div className="w-full lg:w-md shrink-0 flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-6">
            <h3 className="text-white font-semibold mb-1">
              Pagination Simulator
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm text-gray-300">
                    Total Pages (총 페이지 수)
                  </label>
                  <span className="text-sm font-bold text-[#00a2ff]">
                    {totalPages}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={totalPages}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setTotalPages(val);
                    // 총 페이지가 줄어들 때 현재 페이지가 넘어가 버리지 않게 방어
                    if (currentPage > val) setCurrentPage(val);
                  }}
                  className="w-full accent-[#00a2ff]"
                />
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-800">
                <label className="text-sm text-gray-300">
                  Jump to Page (페이지 강제 이동)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => handlePageChange(Number(e.target.value))}
                    className="flex-1 h-9 rounded-md border border-gray-700 bg-[#0a0d12] px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00a2ff]"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * 7페이지를 넘어갈 때부터 알고리즘이 자동으로{" "}
                  <code className="text-[#00a2ff]">...</code>(말줄임표)을
                  생성하여 레이아웃이 깨지지 않게 방어합니다.
                </p>
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
