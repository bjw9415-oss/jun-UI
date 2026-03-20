import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../shared/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean; // 에러 상태 (테두리 빨갛게!)
  errorMessage?: string; // 에러 시 밑에 띄울 경고 문구
  leftIcon?: ReactNode; // 왼쪽에 들어갈 아이콘 (예: 돋보기, 이메일)
  rightIcon?: ReactNode; // 오른쪽에 들어갈 아이콘 (예: 눈알 모양, 지우기 X)
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, errorMessage, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* 1. 실제 입력창과 아이콘들을 감싸는 껍데기 */}
        <div className="relative flex items-center w-full">
          {/* 왼쪽 아이콘 슬롯 */}
          {leftIcon && (
            <div className="absolute left-3 text-gray-400 flex items-center justify-center pointer-events-none">
              {leftIcon}
            </div>
          )}

          {/* 2. 진짜 Input 태그 */}
          <input
            ref={ref}
            className={cn(
              // 기본 스타일 (다크 테마)
              "w-full h-11 bg-[#0d1117] border border-gray-700 rounded-lg text-white text-sm transition-all duration-200 outline-none placeholder:text-gray-500",
              // 포커스(클릭) 됐을 때 스타일 (파란색)
              "focus:border-[#00a2ff] focus:ring-1 focus:ring-[#00a2ff]",
              // 비활성화(disabled) 스타일
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#161b22]",
              // 아이콘 유무에 따른 좌우 여백(Padding) 자동 조절
              leftIcon ? "pl-10" : "pl-4",
              rightIcon ? "pr-10" : "pr-4",
              // 에러 났을 때 스타일 (빨간색 )
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className,
            )}
            {...props}
          />

          {/* 오른쪽 아이콘 슬롯 (보통 비밀번호 표시/숨김 등에 씁니다) */}
          {rightIcon && (
            <div className="absolute right-3 text-gray-400 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>

        {/* 3. 에러 메시지 렌더링 구역 */}
        {error && errorMessage && (
          <span className="text-sm text-red-500 font-medium pl-1 animate-in fade-in slide-in-from-top-1">
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);

// 디버깅을 위해 이름표를 붙여줍니다.
Input.displayName = "Input";

export default Input;
