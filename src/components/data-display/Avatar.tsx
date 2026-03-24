import { forwardRef, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { User, UserCircle } from "lucide-react";
import type { AsChildProp, StandardSize } from "@/types/ui";

export type AvatarSize = "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "circle" | "square";

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>, AsChildProp {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: StandardSize; //
  shape?: AvatarShape;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = "User Avatar",
      fallback,
      size = "md",
      shape = "circle",
      asChild = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [errorSrc, setErrorSrc] = useState<string | undefined>(undefined);
    const hasError = src && errorSrc === src;
    const sizeStyles = {
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
      xl: "h-16 w-16 text-xl",
      "2xl": "h-24 w-24 text-2xl",
    };

    const shapeStyles = {
      circle: "rounded-full",
      square: "rounded-2xl", // 약간 더 부드럽게 변경
    };

    //  1. 상태에 따른 조건부 렌더링 헬퍼 함수
    const renderContent = () => {
      // src가 아예 없는 경우 -> 누가 봐도 기본인 프로필 아이콘 (distinct style)
      if (!src) {
        return (
          <span className="flex h-full w-full items-center justify-center bg-[#0a0d12] text-gray-600">
            <UserCircle
              className="h-full w-full scale-110 opacity-70"
              strokeWidth={1.5}
            />
          </span>
        );
      }

      //  src가 있고, 에러가 나지 않은 경우 -> 사용자 이미지
      if (!hasError) {
        return (
          <img
            src={src}
            alt={alt}
            onError={() => setErrorSrc(src)}
            className="h-full w-full object-cover"
          />
        );
      }

      //  src가 있지만 깨진 경우 -> 이름 이니셜 (Fallback, 기존 로직 냅둠)
      return (
        <span className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#1c222b] to-[#0d1117] text-gray-300 font-semibold uppercase tracking-wider animate-in fade-in duration-300">
          {fallback ? (
            fallback.substring(0, 2)
          ) : (
            <User className="h-1/2 w-1/2 opacity-40" />
          )}
        </span>
      );
    };
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden bg-[#161b22] border border-gray-800 items-center justify-center shadow-inner",
          sizeStyles[size],
          shapeStyles[shape],
          className,
        )}
        {...props}
      >
        {renderContent()}
      </Comp>
    );
  },
);
Avatar.displayName = "Avatar";
