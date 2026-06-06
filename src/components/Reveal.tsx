import type { ReactNode } from "react";
import { Children } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Stagger({
  children,
  className = "",
  baseDelay = 0,
  step = 80,
}: {
  children: ReactNode;
  className?: string;
  baseDelay?: number;
  step?: number;
}) {
  return (
    <div className={className}>
      {Children.toArray(children).map((child, index) => (
        <Reveal key={index} delay={baseDelay + index * step}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
