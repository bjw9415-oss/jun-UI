import {
  forwardRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/shared/lib/utils";

export interface ToggleProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
  value?: string;

  // 커스텀 옵션들
  size?: "sm" | "md" | "lg";
  activeColor?: string; // 켜졌을 때의 배경색 (Tailwind 클래스)
  thumbIcon?: ReactNode; // 손잡이 안의 아이콘 (Lucide 등)
  thumbImage?: string; // 손잡이 안의 이미지 URL
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      disabled,
      name,
      value = "on",
      size = "md",
      activeColor = "bg-primary", // 기본 파란색 유지
      thumbIcon,
      thumbImage,
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isChecked = isControlled ? controlledChecked : internalChecked;

    const handleClick = () => {
      if (disabled) return;
      const newValue = !isChecked;
      if (!isControlled) setInternalChecked(newValue);
      onChange?.(newValue);
    };

    // 사이즈별 설정 (트랙 크기, 썸 크기, 이동 거리)
    const sizeConfig = {
      sm: { track: "h-5 w-9", thumb: "h-4 w-4", translate: "translate-x-4" },
      md: { track: "h-6 w-11", thumb: "h-5 w-5", translate: "translate-x-5" },
      lg: { track: "h-8 w-14", thumb: "h-7 w-7", translate: "translate-x-6" },
    };

    const currentSize = sizeConfig[size];

    return (
      <>
        <button
          type="button"
          role="switch"
          aria-checked={isChecked}
          disabled={disabled}
          onClick={handleClick}
          ref={ref}
          className={cn(
            "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none",
            currentSize.track,
            isChecked ? activeColor : "bg-gray-600", // 커스텀 색상 적용
            "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]",
            isChecked
              ? "focus-visible:ring-primary"
              : "focus-visible:ring-gray-400",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        >
          <span
            className={cn(
              "pointer-events-none flex items-center justify-center transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out overflow-hidden",
              currentSize.thumb,
              isChecked ? currentSize.translate : "translate-x-0",
            )}
          >
            {/*  이미지나 아이콘 렌더링 로직 */}
            {thumbImage ? (
              <img
                src={thumbImage}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : thumbIcon ? (
              <span
                className={cn(
                  "flex items-center justify-center transition-colors duration-200",
                  isChecked ? "text-primary" : "text-gray-400", // 켜지면 테마색, 꺼지면 회색
                  size === "sm"
                    ? "scale-50"
                    : size === "md"
                      ? "scale-75"
                      : "scale-100",
                )}
              >
                {thumbIcon}
              </span>
            ) : null}
          </span>
        </button>

        <input
          type="checkbox"
          aria-hidden="true"
          className="sr-only"
          name={name}
          value={value}
          checked={isChecked}
          disabled={disabled}
          tabIndex={-1}
          readOnly
        />
      </>
    );
  },
);

Toggle.displayName = "Toggle";
