import type { ReactNode } from "react";

export interface AsChildProp {
  /** * true일 경우 껍데기 DOM을 버리고 자식 요소(children)에 스타일을 병합
   * @default false
   */
  asChild?: boolean;
}

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export type StandardSize = "sm" | "md" | "lg" | "xl" | "2xl";
export type Direction = "top" | "bottom" | "left" | "right";
