import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../shared/lib/utils";

export interface ToggleProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, checked, onChange, disabled, ...props }, ref) => {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        ref={ref}
        className={cn(
          // 배경 트랙(Track) 기본 스타일
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none",
          // 켜졌을 때 파란색, 꺼졌을 때 어두운 회색
          checked ? "bg-[#00a2ff]" : "bg-gray-600",
          // 포커스 & 비활성화 스타일
          "focus-visible:ring-2 focus-visible:ring-[#00a2ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <span
          // 스위치 동그라미(Thumb) 스타일
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out",
            // 켜지면 오른쪽으로 20px 이동, 꺼지면 제자리(0px)
            checked ? "translate-x-5" : "translate-x-0",
          )}
        />
      </button>
    );
  },
);

Toggle.displayName = "Toggle";

export default Toggle;
