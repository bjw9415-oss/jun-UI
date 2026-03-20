import * as React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../../shared/lib/utils";

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  children?: React.ReactNode;
}
const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, children, ...props }, ref) => (
    <nav ref={ref} aria-label="breadcrumb" className={className} {...props}>
      {children}
    </nav>
  ),
);
Breadcrumb.displayName = "Breadcrumb";

export interface BreadcrumbListProps extends React.ComponentPropsWithoutRef<"ol"> {
  children?: React.ReactNode;
}
const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, children, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 wrap-break-word text-sm text-gray-400 sm:gap-2.5",
        className,
      )}
      {...props}
    >
      {children}
    </ol>
  ),
);
BreadcrumbList.displayName = "BreadcrumbList";

export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<"li"> {
  children?: React.ReactNode;
}
const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, children, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    >
      {children}
    </li>
  ),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  children?: React.ReactNode;
}
const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "transition-colors hover:text-white hover:underline underline-offset-4 cursor-pointer",
          className,
        )}
        {...props}
      >
        {children}
      </a>
    );
  },
);
BreadcrumbLink.displayName = "BreadcrumbLink";

export interface BreadcrumbPageProps extends React.ComponentPropsWithoutRef<"span"> {
  children?: React.ReactNode;
}
const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-medium text-white", className)}
      {...props}
    >
      {children}
    </span>
  ),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:w-4 [&>svg]:h-4 text-gray-600", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
