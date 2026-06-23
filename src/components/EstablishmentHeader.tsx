import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Phone } from 'lucide-react';
import type { Establishment } from '@/data/mock-establishments';

interface Props {
  establishment: Establishment;
}

export function EstablishmentHeader({ establishment }: Props) {
  const initials = establishment.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative">
      {/* Banner */}
      <div className="relative h-48 sm:h-64 overflow-hidden bg-gradient-to-br from-secondary to-accent">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8A962' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Info */}
      <div className="relative px-4 sm:px-6 -mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          {/* Logo */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-gold flex items-center justify-center text-primary-foreground text-2xl sm:text-3xl font-display font-bold shadow-lg glow-gold border-4 border-background shrink-0">
            {initials}
          </div>

          <div className="flex-1 pt-2">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
              {establishment.name}
            </h1>
            <p className="mt-1 text-muted-foreground text-sm sm:text-base max-w-lg">
              {establishment.description}
            </p>

            <div className="flex flex-wrap gap-3 mt-3">
              <span className="inline-flex items-center gap-1 text-sm text-gold font-medium">
                <Star className="w-4 h-4 fill-current" />
                {establishment.rating}
                <span className="text-muted-foreground">({establishment.reviewCount})</span>
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {establishment.address}
              </span>
            </div>

            <div className="flex gap-3 mt-3">
              <a href={`tel:${establishment.phone}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold transition-colors">
                <Phone className="w-4 h-4" /> Ligar
              </a>
              <a href={`https://instagram.com/${establishment.instagram.replace('@', '')}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> Instagram
              </a>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" /> Aberto agora
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
