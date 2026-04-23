import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
}

export const Container = ({ children, className, fluid = false }: ContainerProps) => {
  return (
    <div 
      className={cn(
        'mx-auto px-4',
        fluid ? 'w-full' : 'container',
        className
      )}
    >
      {children}
    </div>
  );
};
