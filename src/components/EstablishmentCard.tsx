import { motion } from 'framer-motion';
import { Star, MapPin, Scissors } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import type { Establishment } from '@/data/mock-establishments';

interface Props {
  establishment: Establishment;
  index: number;
}

export function EstablishmentCard({ establishment, index }: Props) {
  const initials = establishment.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        to="/$slug"
        params={{ slug: establishment.slug }}
        className="block group"
      >
        <div className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-gold/40 hover:glow-gold">
          {/* Banner area */}
          <div className="relative h-32 bg-gradient-to-br from-secondary to-accent overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            <div className="absolute bottom-3 left-3 flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center text-primary-foreground font-display font-bold text-lg shadow-lg border-2 border-card">
                {initials}
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground text-lg group-hover:text-gold transition-colors">
                  {establishment.name}
                </h3>
                <span className="text-xs text-muted-foreground capitalize">
                  {establishment.type === 'barbershop' ? 'Barbearia' : 'Salão de Beleza'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <p className="text-sm text-muted-foreground line-clamp-2">{establishment.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 text-sm font-medium text-gold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {establishment.rating}
                </span>
                <span className="text-xs text-muted-foreground">
                  {establishment.reviewCount} avaliações
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Scissors className="w-3 h-3" />
                {establishment.services.length} serviços
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{establishment.address}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
