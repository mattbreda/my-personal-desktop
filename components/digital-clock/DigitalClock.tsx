'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface DigitalClockProps {
  className?: string;
}

export function DigitalClock({ className }: DigitalClockProps) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setTime(new Date());
    requestAnimationFrame(update);
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null; // Prevent hydration mismatch

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-4',
        'bg-background text-foreground',
        'border-2 border-foreground',
        'font-mono uppercase tracking-widest',
        'select-none cursor-default',
        className
      )}
    >
      <div className="text-xl text-orange-400 font-bold leading-none">{formatTime(time)}</div>
      <div className="text-xs mt-2 opacity-80">System_Time</div>
    </div>
  );
}
