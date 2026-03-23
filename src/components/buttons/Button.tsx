import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../shared/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import type { AsChildProp } from "../../types/ui";
// cva를 사용해 버튼의 "스타일 사전"을 정의
const buttonVariants = cva(
  // 공통 기본 스타일
  "rounded-lg font-medium transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      // 모양 종류
      variant: {
        primary:
          "bg-[#00a2ff] text-white hover:bg-[#008bd9] shadow-[0_0_15px_rgba(0,162,255,0.3)] hover:shadow-[0_0_20px_rgba(0,162,255,0.6)]",
        outline:
          "border-2 border-[#30363d] text-gray-300 hover:border-[#00a2ff] hover:text-[#00a2ff] bg-transparent",
        danger:
          "bg-red-500 text-white hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.3)]",
        secondary:
          "bg-[#21262d] text-gray-300 hover:bg-[#30363d] border border-gray-700",
        ghost:
          "bg-transparent text-gray-300 hover:bg-[#21262d] hover:text-white",
        success:
          "bg-[#1EC800] text-white hover:bg-[#18a300] shadow-[0_0_15px_rgba(30,200,0,0.3)]",
      },
      // 크기 종류
      size: {
        xs: "px-3 py-1 text-xs",
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-3 text-lg",
        xl: "px-10 py-4 text-xl",
        icon: "w-12 h-12 p-0",
      },
    },
    // 기본값 설정
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

//  타입 추출 :타입을 자동으로 생성
export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    AsChildProp {}

// 3. forwardRef 적용 (UI 라이브러리 버튼은 툴팁이나 팝오버를 위해 ref를 받을 수 있어야)
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref} // forwardRef로 받은 ref 연결
        className={cn(buttonVariants({ variant, size, className }))} // cva와 cn
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
