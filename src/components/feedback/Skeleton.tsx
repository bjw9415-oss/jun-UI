import React from "react";
import { cn } from "../../shared/lib/utils";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-800/80", className)}
      {...props}
    />
  );
}
