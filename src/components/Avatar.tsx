import { useState } from "react";
import { cn } from "../shared/lib/utils";
import { User } from "lucide-react";

export type AvatarSize = "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "circle" | "square";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 프로필 이미지 URL */
  src?: string;
  /** 시각 장애인 및 엑스박스 대비용 텍스트 */
  alt?: string;
  /** 이미지가 없을 때 보여줄 대체 텍스트 (주로 이름 이니셜) */
  fallback?: string;
  /** 아바타 크기 */
  size?: AvatarSize;
  /** 아바타 모양 */
  shape?: AvatarShape;
}

export default function Avatar({
  src,
  alt = "User Avatar",
  fallback,
  size = "md",
  shape = "circle",
  className,
  ...props
}: AvatarProps) {
  //  이미지 로딩 실패 여부 추적
  const [hasError, setHasError] = useState(false);

  // 크기별 스타일 매핑
  const sizeStyles = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-xl",
    "2xl": "h-24 w-24 text-2xl",
  };

  // 모양별 스타일 매핑
  const shapeStyles = {
    circle: "rounded-full",
    square: "rounded-xl",
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden bg-[#161b22] border border-gray-800 items-center justify-center",
        sizeStyles[size],
        shapeStyles[shape],
        className,
      )}
      {...props}
    >
      {/* src가 있고, 에러가 나지 않았을 때만 이미지를 보여줍니다 */}
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)} //  이미지 로드 실패 시 에러 상태를 true로 변경!
          className="h-full w-full object-cover"
        />
      ) : (
        // 이미지가 없거나 깨졌을 때 보여줄 Fallback 영역
        <span className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#1c222b] to-[#0d1117] text-gray-300 font-semibold uppercase tracking-wider">
          {fallback ? (
            fallback.substring(0, 2) // 보통 이니셜은 최대 2글자
          ) : (
            <User className="h-1/2 w-1/2 opacity-40" />
          )}
        </span>
      )}
    </div>
  );
}
