import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface HealthScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export function HealthScoreGauge({ score, size = 'md' }: HealthScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = (value: number) => {
    if (value >= 80) return 'hsl(var(--safe))';
    if (value >= 60) return 'hsl(142, 71%, 45%)';
    if (value >= 40) return 'hsl(var(--caution))';
    return 'hsl(var(--avoid))';
  };

  const getLabel = (value: number) => {
    if (value >= 80) return 'Excellent';
    if (value >= 60) return 'Good';
    if (value >= 40) return 'Fair';
    return 'Poor';
  };

  const sizeConfig = {
    sm: { container: 'w-24 h-24', text: 'text-2xl', label: 'text-xs' },
    md: { container: 'w-36 h-36', text: 'text-4xl', label: 'text-sm' },
    lg: { container: 'w-48 h-48', text: 'text-5xl', label: 'text-base' },
  };

  const { container, text, label } = sizeConfig[size];
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className={cn('relative', container)}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={getColor(animatedScore)}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: 'stroke-dashoffset 1s ease-out, stroke 0.5s ease-out',
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={cn('font-bold', text)}
          style={{ color: getColor(animatedScore), transition: 'color 0.5s ease-out' }}
        >
          {animatedScore}%
        </span>
        <span className={cn('font-medium text-muted-foreground', label)}>
          {getLabel(animatedScore)}
        </span>
      </div>
    </div>
  );
}
