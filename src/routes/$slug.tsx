import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Calendar } from 'lucide-react';
import { getEstablishment } from '@/data/mock-establishments';
import { EstablishmentHeader } from '@/components/EstablishmentHeader';
import { ServiceCard } from '@/components/ServiceCard';
import { ProfessionalCard } from '@/components/ProfessionalCard';
import { BookingFlow } from '@/components/BookingFlow';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/$slug')({
  component: EstablishmentPage,
  head: () => ({
    meta: [
      { title: 'Agende seu horário' },
      { name: 'description', content: 'Agende seu horário online de forma rápida e fácil.' },
    ],
  }),
});

function EstablishmentPage() {
  const { slug } = Route.useParams();
  const establishment = getEstablishment(slug);
  const [showBooking, setShowBooking] = useState(false);

  if (!establishment) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-foreground">Não encontrado</h1>
          <p className="mt-2 text-muted-foreground">Estabelecimento não encontrado.</p>
        </div>
      </div>
    );
  }

  const themeClass = establishment.type === 'salon' ? 'theme-salon' : '';

  if (showBooking) {
    return (
      <div className={`min-h-screen bg-background ${themeClass}`}>
        <div className="max-w-lg mx-auto min-h-screen flex flex-col">
          <BookingFlow establishment={establishment} onClose={() => setShowBooking(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background ${themeClass}`}>
      <div className="max-w-3xl mx-auto pb-24">
        <EstablishmentHeader establishment={establishment} />

        {/* Services */}
        <section className="px-4 sm:px-6 mt-8">
          <h2 className="text-xl font-display font-bold text-foreground mb-4">Serviços</h2>
          <div className="space-y-2">
            {establishment.services.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                selected={false}
                onSelect={() => setShowBooking(true)}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Professionals */}
        <section className="px-4 sm:px-6 mt-8">
          <h2 className="text-xl font-display font-bold text-foreground mb-4">Nosso Time</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {establishment.professionals.map((prof, i) => (
              <ProfessionalCard
                key={prof.id}
                professional={prof}
                selected={false}
                onSelect={() => {}}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Opening Hours */}
        <section className="px-4 sm:px-6 mt-8">
          <h2 className="text-xl font-display font-bold text-foreground mb-4">Horário de Funcionamento</h2>
          <div className="bg-card border border-border rounded-xl p-4 space-y-2">
            {Object.entries(establishment.openingHours).map(([day, hours]) => (
              <div key={day} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{day}</span>
                <span className={hours ? 'text-foreground font-medium' : 'text-muted-foreground/50'}>
                  {hours ? `${hours.open} – ${hours.close}` : 'Fechado'}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-3xl mx-auto">
          <Button variant="gold" size="xl" className="w-full" onClick={() => setShowBooking(true)}>
            <Calendar className="w-5 h-5 mr-2" />
            Agendar Horário
          </Button>
        </div>
      </div>
    </div>
  );
}
