import { Heart, Bone, Brain, Flame, Droplets, Shield, Eye, Zap, Leaf, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HealthIconInfo {
  icon: React.ElementType;
  label: string;
  color: string;
  bgColor: string;
  description: string;
}

export const healthIconsMap: Record<string, HealthIconInfo> = {
  heart: { 
    icon: Heart, 
    label: '❤️', 
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    description: 'Heart Health'
  },
  bones: { 
    icon: Bone, 
    label: '🦴', 
    color: 'text-amber-600',
    bgColor: 'bg-amber-600/10',
    description: 'Bone Health'
  },
  brain: { 
    icon: Brain, 
    label: '🧠', 
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    description: 'Brain Function'
  },
  inflammation: { 
    icon: Flame, 
    label: '🔥', 
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    description: 'Anti-Inflammatory'
  },
  hydration: { 
    icon: Droplets, 
    label: '💧', 
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    description: 'Hydration'
  },
  immunity: { 
    icon: Shield, 
    label: '🛡️', 
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    description: 'Immunity Boost'
  },
  eyes: { 
    icon: Eye, 
    label: '👁️', 
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    description: 'Eye Health'
  },
  energy: { 
    icon: Zap, 
    label: '⚡', 
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    description: 'Energy Boost'
  },
  digestion: { 
    icon: Leaf, 
    label: '🍃', 
    color: 'text-lime-500',
    bgColor: 'bg-lime-500/10',
    description: 'Digestive Health'
  },
  metabolism: { 
    icon: Activity, 
    label: '📊', 
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    description: 'Metabolism'
  },
};

// Map ingredient tags to health icons
export function getHealthIconsForTags(tags: string[]): HealthIconInfo[] {
  const icons: HealthIconInfo[] = [];
  const tagsLower = tags.map(t => t.toLowerCase());

  if (tagsLower.some(t => t.includes('heart') || t.includes('cardiovascular') || t.includes('bp'))) {
    icons.push(healthIconsMap.heart);
  }
  if (tagsLower.some(t => t.includes('bone') || t.includes('calcium') || t.includes('vitamin_d'))) {
    icons.push(healthIconsMap.bones);
  }
  if (tagsLower.some(t => t.includes('brain') || t.includes('memory') || t.includes('cognitive'))) {
    icons.push(healthIconsMap.brain);
  }
  if (tagsLower.some(t => t.includes('inflammat') || t.includes('anti_inflammatory'))) {
    icons.push(healthIconsMap.inflammation);
  }
  if (tagsLower.some(t => t.includes('hydrat') || t.includes('water') || t.includes('electrolyte'))) {
    icons.push(healthIconsMap.hydration);
  }
  if (tagsLower.some(t => t.includes('immun') || t.includes('antioxidant'))) {
    icons.push(healthIconsMap.immunity);
  }
  if (tagsLower.some(t => t.includes('eye') || t.includes('vision') || t.includes('vitamin_a'))) {
    icons.push(healthIconsMap.eyes);
  }
  if (tagsLower.some(t => t.includes('energy') || t.includes('metabolism') || t.includes('iron'))) {
    icons.push(healthIconsMap.energy);
  }
  if (tagsLower.some(t => t.includes('digest') || t.includes('fiber') || t.includes('probiotic'))) {
    icons.push(healthIconsMap.digestion);
  }

  return icons.slice(0, 3); // Return max 3 icons
}

interface HealthIconBadgeProps {
  iconInfo: HealthIconInfo;
  showEmoji?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function HealthIconBadge({ iconInfo, showEmoji = true, size = 'md', showLabel = false }: HealthIconBadgeProps) {
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div className="flex items-center gap-1.5">
      <div 
        className={cn(
          "rounded-full flex items-center justify-center",
          iconInfo.bgColor,
          sizeClasses[size]
        )}
        title={iconInfo.description}
      >
        {showEmoji ? (
          <span>{iconInfo.label}</span>
        ) : (
          <iconInfo.icon className={cn(iconInfo.color, iconSizes[size])} />
        )}
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground">{iconInfo.description}</span>
      )}
    </div>
  );
}

interface HealthIconsRowProps {
  tags: string[];
  showEmoji?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function HealthIconsRow({ tags, showEmoji = true, size = 'sm' }: HealthIconsRowProps) {
  const icons = getHealthIconsForTags(tags);
  
  if (icons.length === 0) return null;

  return (
    <div className="flex items-center gap-1">
      {icons.map((iconInfo, index) => (
        <HealthIconBadge 
          key={index} 
          iconInfo={iconInfo} 
          showEmoji={showEmoji}
          size={size}
        />
      ))}
    </div>
  );
}
