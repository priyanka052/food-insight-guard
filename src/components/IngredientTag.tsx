import { cn } from '@/lib/utils';
import { Check, AlertTriangle, X } from 'lucide-react';
import type { RiskLevel } from '@/utils/healthAnalyzer';

interface IngredientTagProps {
  name: string;
  riskLevel: RiskLevel;
  onClick?: () => void;
}

export function IngredientTag({ name, riskLevel, onClick }: IngredientTagProps) {
  const config = {
    safe: {
      bg: 'bg-safe/10',
      border: 'border-safe/30',
      text: 'text-safe',
      icon: Check,
    },
    caution: {
      bg: 'bg-caution/10',
      border: 'border-caution/30',
      text: 'text-caution',
      icon: AlertTriangle,
    },
    avoid: {
      bg: 'bg-avoid/10',
      border: 'border-avoid/30',
      text: 'text-avoid',
      icon: X,
    },
  };

  const { bg, border, text, icon: Icon } = config[riskLevel];

  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all',
        bg,
        border,
        text,
        onClick && 'cursor-pointer hover:opacity-80'
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {name}
    </span>
  );
}
