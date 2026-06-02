import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`glass-effect-strong rounded-3xl transition-smooth hover-lift ${className}`}
    >
      {children}
    </div>
  );
}
