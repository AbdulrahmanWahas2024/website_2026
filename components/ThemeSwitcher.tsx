'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Star, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themes = [
    { id: 'day', icon: Sun, label: 'Day' },
    { id: 'night', icon: Moon, label: 'Night' },
    { id: 'ramadan', icon: Star, label: 'Ramadan' },
    { id: 'eid', icon: Sparkles, label: 'Eid' },
  ];

  return (
    <div className="flex items-center gap-1 bg-bg-soft p-1 rounded-xl border border-border">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id as any)}
          className={cn(
            "p-1.5 rounded-lg transition-all",
            mounted && theme === t.id 
              ? "bg-primary text-white shadow-sm" 
              : (!mounted && t.id === 'day' ? "bg-primary text-white shadow-sm" : "text-text-secondary hover:bg-white/50")
          )}
          title={t.label}
        >
          <t.icon size={16} />
        </button>
      ))}
    </div>
  );
}
