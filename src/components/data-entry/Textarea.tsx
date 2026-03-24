import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  errorMessage?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, errorMessage, rows, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            // 기본 스타일 (최소 높이 지정 및 세로로만 늘어나게 resize-y 적용)
            "w-full  p-4 bg-[#0d1117] border border-gray-700 rounded-lg text-white text-sm transition-all duration-200 outline-none placeholder:text-gray-500 resize-y",
            // 포커스 & 비활성화 스타일
            "focus:border-[#00a2ff] focus:ring-1 focus:ring-[#00a2ff]",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#161b22]",
            // 에러 상태 스타일
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className,
          )}
          {...props}
        />

        {/* 에러 메시지 렌더링 구역 */}
        {error && errorMessage && (
          <span className="text-sm text-red-500 font-medium pl-1 animate-in fade-in slide-in-from-top-1">
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
