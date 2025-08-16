'use client'
import { ReactNode } from "react";
import { cn } from '@/lib/utils'

interface DarkSectionThemeProviderProps {
  children?: ReactNode;
  theme?: 'dark' | 'light';
  className?: string;
}

export function SectionThemeProvider({ children, theme='dark', className}: DarkSectionThemeProviderProps) {
  return (
    <div className={`${theme} ${cn('text-foreground bg-background', className)}`} style={{ colorScheme: theme }}>
      {children}
    </div>
  )
}