import { useEffect, type RefObject } from "react";

export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  isActive: boolean,
) {
  useEffect(() => {
    const currentElement = ref.current;
    if (!isActive || !ref.current) return;

    const focusableElements = ref.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])',
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKeyPress = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab 눌렀을 때, 현재 포커스가 첫 번째 요소면 -> 마지막 요소로 이동
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab 눌렀을 때, 현재 포커스가 마지막 요소면 -> 첫 번째 요소로 이동
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    // 드로어 열릴 때 첫 번째 요소에 자동 포커스 (접근성 표준)
    firstElement.focus();
    currentElement?.addEventListener("keydown", handleTabKeyPress);
    return () => {
      currentElement?.removeEventListener("keydown", handleTabKeyPress);
    };
  }, [isActive, ref]);
}
