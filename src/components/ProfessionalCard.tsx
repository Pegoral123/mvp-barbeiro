import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';
import type { Professional } from '@/data/mock-establishments';

interface Props {
  professional: Professional;
  selected: boolean;
  onSelect: (professional: Professional) => void;
  index: number;
}

export function ProfessionalCard({ professional, selected, onSelect, index }: Props) {
  const initials = professional.name.split(' ').map(w => w[0]).join('').slice(0, 2);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      onClick={() => onSelect(professional)}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 min-w-[120px] ${
        selected
          ? 'border-gold bg-gold/10 glow-gold'
          : 'border-border bg-card hover:border-gold/40'
      }`}
    >
      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-display font-bold transition-colors ${
        selected
          ? 'bg-gradient-gold text-primary-foreground'
          : 'bg-secondary text-muted-foreground'
      }`}>
        {initials}
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">{professional.name}</p>
        <p className="text-xs text-muted-foreground">{professional.role}</p>
        <div className="flex items-center justify-center gap-0.5 mt-1">
          <Star className="w-3 h-3 text-gold fill-gold" />
          <span className="text-xs text-gold font-medium">{professional.rating}</span>
        </div>
      </div>
    </motion.button>
  );
}
