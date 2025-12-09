import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  colorClass?: string;
}

export function ActionCard({
  icon: Icon,
  title,
  description,
  onClick,
  colorClass = 'from-primary to-primary/80',
}: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center shadow-card transition-all duration-300',
        'hover:border-primary/40 hover:shadow-lg hover:-translate-y-1',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
      )}
    >
      {/* Icon Container */}
      <div
        className={cn(
          'flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110',
          colorClass
        )}
      >
        <Icon className="h-8 w-8 text-white" />
      </div>

      {/* Text */}
      <div className="space-y-1">
        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}
