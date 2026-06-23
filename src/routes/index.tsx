import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { establishments } from '@/data/mock-establishments';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
  head: () => ({
    meta: [
      { title: 'AgendaPro — Agendamento Online para Salões e Barbearias' },
      { name: 'description', content: 'Acesse o link do seu salão ou barbearia para agendar online.' },
    ],
  }),
});

function Index() {
  const [slug, setSlug] = useState('');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-display font-bold">
          <span className="text-foreground">Agenda</span>
          <span className="text-gradient-gold">Pro</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          Acesse o link exclusivo do seu salão ou barbearia para agendar online.
        </p>

        <div className="mt-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Digite o código do estabelecimento..."
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s/g, '-'))}
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
          />
        </div>

        {slug.trim() && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            <Link
              to="/$slug"
              params={{ slug: slug.trim() }}
              className="inline-flex items-center justify-center w-full h-12 rounded-xl bg-gradient-gold text-primary-foreground font-medium transition-all hover:opacity-90 glow-gold"
            >
              Acessar Estabelecimento
            </Link>
          </motion.div>
        )}

        <p className="mt-6 text-xs text-muted-foreground">
          Ex: agendapro.com/<span className="text-gold">kings-barber</span>
        </p>
      </motion.div>
    </div>
  );
}
