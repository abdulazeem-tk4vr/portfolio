import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Passthrough wrapper — content is visible immediately for fast, parseable pages. */
export function Reveal({ children, className = "" }: RevealProps) {
  return <div className={className}>{children}</div>;
}

export function Stagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  baseDelay?: number;
  step?: number;
}) {
  return <div className={className}>{children}</div>;
}
