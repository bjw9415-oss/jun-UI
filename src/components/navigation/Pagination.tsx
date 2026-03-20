import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../../shared/lib/utils";

//  최상위 래퍼 (nav 태그로 감싸서 접근성 향상)
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

// 탭 컨테이너 (ul)
const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

//  개별 아이템 래퍼 (li)
const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

//  실제 클릭되는 버튼/링크 영역
type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<"button">; // a 태그 대신 button으로 제어 (SPA 환경 최적화)

const PaginationLink = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ className, isActive, ...props }, ref) => (
    <button
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-[#0d1117] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a2ff] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-[#00a2ff] text-white hover:bg-[#0081cc] shadow-md"
          : "text-gray-400 hover:bg-[#161b22] hover:text-white border border-transparent hover:border-gray-800",
        className,
      )}
      {...props}
    />
  ),
);
PaginationLink.displayName = "PaginationLink";

//  이전 버튼
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn("gap-1 pl-2.5 pr-3 w-auto", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="hidden sm:inline">이전</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

// 다음 버튼
const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("gap-1 pr-2.5 pl-3 w-auto", className)}
    {...props}
  >
    <span className="hidden sm:inline">다음</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

//말줄임표 (...)
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn(
      "flex h-9 w-9 items-center justify-center text-gray-500",
      className,
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
};
