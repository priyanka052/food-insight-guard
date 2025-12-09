import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface HealthConditionCardProps {
  id: string;
  title: string;
  description: string;
  selected: boolean;
  onToggle: (id: string) => void;
}

export function HealthConditionCard({
  id,
  title,
  description,
  selected,
  onToggle,
}: HealthConditionCardProps) {
  return (
    <button
      onClick={() => onToggle(id)}
      className={cn(
        'relative flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all duration-200',
        selected
          ? 'border-primary bg-primary/5 shadow-md'
          : 'border-border bg-card hover:border-primary/30 hover:bg-accent/30'
      )}
    >
      {/* Checkmark */}
      <div
        className={cn(
          'absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200',
          selected ? 'bg-primary text-primary-foreground' : 'border-2 border-muted-foreground/30'
        )}
      >
        {selected && <Check className="h-4 w-4" />}
      </div>

      <h3 className="font-semibold text-foreground pr-8">{title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
    </button>
  );
}
