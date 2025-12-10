import { cn } from '@/lib/utils';
import { Check, AlertTriangle, X, Info } from 'lucide-react';
import type { RiskLevel } from '@/utils/healthAnalyzer';
import { getRiskDescription, getConditionIcon } from '@/utils/riskDescriptions';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface IngredientTagProps {
  name: string;
  riskLevel: RiskLevel;
  matchedTags?: string[];
  userConditions?: string[];
  showDescription?: boolean;
  onClick?: () => void;
}

export function IngredientTag({ 
  name, 
  riskLevel, 
  matchedTags = [], 
  userConditions = [],
  showDescription = true,
  onClick 
}: IngredientTagProps) {
  const config = {
    safe: {
      bg: 'bg-safe/10',
      border: 'border-safe/30',
      text: 'text-safe',
      icon: Check,
      label: 'Safe',
    },
    caution: {
      bg: 'bg-caution/10',
      border: 'border-caution/30',
      text: 'text-caution',
      icon: AlertTriangle,
      label: 'Limit',
    },
    avoid: {
      bg: 'bg-avoid/10',
      border: 'border-avoid/30',
      text: 'text-avoid',
      icon: X,
      label: 'Avoid',
    },
  };

  const { bg, border, text, icon: Icon, label } = config[riskLevel];
  const description = getRiskDescription(riskLevel, matchedTags, userConditions, name);

  // Get relevant condition icons
  const conditionIcons = userConditions.slice(0, 3).map(c => getConditionIcon(c)).join(' ');

  const tagContent = (
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
      {showDescription && <Info className="h-3 w-3 opacity-60" />}
    </span>
  );

  if (!showDescription) {
    return tagContent;
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          {tagContent}
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className={cn(
            'max-w-xs p-3 text-sm',
            riskLevel === 'avoid' && 'bg-avoid/95 text-white border-avoid',
            riskLevel === 'caution' && 'bg-caution/95 text-black border-caution',
            riskLevel === 'safe' && 'bg-safe/95 text-white border-safe'
          )}
        >
          <div className="space-y-1">
            <div className="font-semibold flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {label}: {name}
              {conditionIcons && <span className="ml-1">{conditionIcons}</span>}
            </div>
            <p className="text-xs opacity-90">{description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
