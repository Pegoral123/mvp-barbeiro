import { motion } from 'framer-motion';
import { Scissors, Sparkles, Zap, Droplets, Palette, Flame, Eye, Clock } from 'lucide-react';
import type { Service } from '@/data/mock-establishments';

const iconMap: Record<string, React.ElementType> = {
  scissors: Scissors,
  sparkles: Sparkles,
  zap: Zap,
  droplets: Droplets,
  palette: Palette,
  flame: Flame,
  eye: Eye,
};

interface Props {
  service: Service;
  selected: boolean;
  onSelect: (service: Service) => void;
  index: number;
}

export function ServiceCard({ service, selected, onSelect, index }: Props) {
  const Icon = iconMap[service.icon] || Scissors;

  return (
    <motion.button
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={() => onSelect(service)}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group ${
        selected
          ? 'border-gold bg-gold/10 glow-gold'
          : 'border-border bg-card hover:border-gold/40 hover:bg-card/80'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
          selected ? 'bg-gradient-gold text-primary-foreground' : 'bg-secondary text-gold'
        }`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-sm text-foreground truncate">{service.name}</h3>
            <span className="text-gold font-bold text-sm whitespace-nowrap">
              R$ {service.price}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{service.description}</p>
          <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {service.duration} min
          </div>
        </div>
      </div>
    </motion.button>
  );
}
