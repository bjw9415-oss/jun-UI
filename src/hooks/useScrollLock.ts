import { useEffect } from "react";

/**
 *  모달이나 드로어가 열렸을 때 배경 스크롤을 막아주는 커스텀 훅
 * @param isLocked 스크롤을 잠글지 여부 (true면 잠금, false면 해제)
 */
export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    //  잠금 상태가 아니면 아무것도 안 함
    if (!isLocked) return;

    //  잠금 상태면 기존 body의 overflow 속성을 저장하고 hidden으로 바꿈
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    //  컴포넌트가 꺼질 때(언마운트) 원래 상태로 롤백 (클린업)
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLocked]);
}
