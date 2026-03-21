import { useState, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "../../shared/lib/utils";
import { useClickOutside } from "../../hooks/useClickOutside";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "선택해주세요",
  disabled = false,
  error = false,
  errorMessage,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 현재 선택된 옵션의 라벨(글자)을 찾는다.
  const selectedOption = options.find((opt) => opt.value === value);
  // 외부 클릭 감지 로직: 드롭다운 밖을 클릭하면 메뉴가 닫히게 만든다.
  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleSelect = (optionValue: string) => {
    if (onChange) onChange(optionValue);
    setIsOpen(false); // 선택하면 창 닫기
  };

  return (
    <div className="flex flex-col gap-1.5 w-full" ref={dropdownRef}>
      {/* 1. 트리거 버튼 (클릭하면 열리는 부분) */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative w-full h-11 px-4 flex items-center justify-between bg-[#0d1117] border border-gray-700 rounded-lg text-sm transition-all duration-200 outline-none",
          // 선택된 값이 있으면 흰색, 없으면 회색(placeholder 색상)
          selectedOption ? "text-white" : "text-gray-500",
          // 포커스/오픈 상태 스타일
          isOpen && "border-[#00a2ff] ring-1 ring-[#00a2ff]",
          // 비활성화 스타일
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#161b22]",
          // 에러 스타일
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className,
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        {/* 화살표 아이콘 (열리면 180도 휙 돌아가는 애니메이션) */}
        <ChevronDown
          className={cn(
            "w-4 h-4 text-gray-400 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* 2. 드롭다운 메뉴 (옵션 리스트) */}
      {isOpen && (
        <div className="relative w-full z-50">
          <ul className="absolute top-1 left-0 w-full max-h-60 overflow-y-auto bg-[#161b22] border border-gray-800 rounded-lg shadow-xl py-1 animate-in fade-in slide-in-from-top-2">
            {options.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-500 text-center">
                옵션이 없습니다.
              </li>
            ) : (
              options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full px-4 py-2.5 text-sm flex items-center justify-between cursor-pointer transition-colors",
                    // 선택된 아이템은 파란 글씨, 마우스 올리면 배경색 변경
                    option.value === value
                      ? "text-[#00a2ff] bg-[#00a2ff]/10 font-medium"
                      : "text-gray-300 hover:bg-[#21262d] hover:text-white",
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {/* 선택된 항목 우측에 체크마크 띄우기 */}
                  {option.value === value && <Check className="w-4 h-4" />}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* 3. 에러 메시지 렌더링 구역 */}
      {error && errorMessage && (
        <span className="text-sm text-red-500 font-medium pl-1 animate-in fade-in slide-in-from-top-1">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
