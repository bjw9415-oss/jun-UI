import { useEffect, type RefObject } from "react";

/**
 *  특정 DOM 요소의 바깥쪽을 클릭(또는 터치)했을 때 콜백을 실행하는 훅
 * @param ref 바깥쪽인지 판단할 기준이 되는 대상 요소의 Ref
 * @param handler 바깥쪽을 클릭했을 때 실행할 함수 (예: 닫기 함수)
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      //  ref가 없거나, 클릭한 타겟이 ref 요소 내부라면 무시 (아무것도 안 함)
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      //  바깥쪽을 클릭했다면 전달받은 핸들러(닫기 함수) 실행!
      handler(event);
    };

    // 마우스 클릭과 모바일 터치 이벤트 모두 감지
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
