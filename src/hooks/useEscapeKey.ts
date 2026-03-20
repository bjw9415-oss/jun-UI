import { useEffect } from "react";

/**
 *  ESC 키를 눌렀을 때 특정 동작(보통 창 닫기)을 실행하는 훅
 * @param callback ESC를 눌렀을 때 실행할 함수 (예: onClose)
 * @param condition 이 리스너를 켤 조건 (예: isOpen이 true일 때만 켜짐)
 */
export function useEscapeKey(callback: () => void, condition: boolean = true) {
  useEffect(() => {
    // 조건이 false면 이벤트 리스너를 아예 달지 않음 (성능 최적화)
    if (!condition) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") callback();
    };

    window.addEventListener("keydown", handleEsc);

    // 클린업: 컴포넌트가 꺼지거나 조건이 바뀌면 리스너 제거
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [callback, condition]);
}
