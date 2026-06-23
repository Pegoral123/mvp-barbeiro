import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Calendar, Clock, Scissors, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/ServiceCard';
import { ProfessionalCard } from '@/components/ProfessionalCard';
import { DateTimePicker } from '@/components/DateTimePicker';
import type { Establishment, Service, Professional } from '@/data/mock-establishments';

interface Props {
  establishment: Establishment;
  onClose: () => void;
}

type Step = 'phone' | 'service' | 'professional' | 'datetime' | 'confirm';

const steps: { key: Step; label: string; icon: React.ElementType }[] = [
  { key: 'phone', label: 'Seu Telefone', icon: Phone },
  { key: 'service', label: 'Serviço', icon: Scissors },
  { key: 'professional', label: 'Profissional', icon: User },
  { key: 'datetime', label: 'Data & Hora', icon: Calendar },
  { key: 'confirm', label: 'Confirmar', icon: Check },
];

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 11;
}

export function BookingFlow({ establishment, onClose }: Props) {
  const [currentStep, setCurrentStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const stepIndex = steps.findIndex((s) => s.key === currentStep);

  const canNext = () => {
    if (currentStep === 'phone') return isValidPhone(phone);
    if (currentStep === 'service') return !!selectedService;
    if (currentStep === 'professional') return !!selectedProfessional;
    if (currentStep === 'datetime') return !!selectedDate && !!selectedTime;
    return true;
  };

  const next = () => {
    if (stepIndex < steps.length - 1) setCurrentStep(steps[stepIndex + 1].key);
  };

  const prev = () => {
    if (stepIndex > 0) setCurrentStep(steps[stepIndex - 1].key);
    else onClose();
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 px-4 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center mb-6 glow-gold">
          <Check className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground">
          Agendamento Confirmado!
        </h2>
        <p className="mt-2 text-muted-foreground max-w-sm">
          Seu horário com <span className="text-gold font-medium">{selectedProfessional?.name}</span> está
          reservado.
        </p>
        <div className="mt-6 bg-card border border-border rounded-xl p-4 w-full max-w-sm space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Telefone</span>
            <span className="text-foreground font-medium">{phone}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Serviço</span>
            <span className="text-foreground font-medium">{selectedService?.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Data</span>
            <span className="text-foreground font-medium">
              {selectedDate?.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Horário</span>
            <span className="text-foreground font-medium">{selectedTime}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Valor</span>
            <span className="text-gold font-bold">R$ {selectedService?.price}</span>
          </div>
        </div>
        <Button variant="gold" size="lg" className="mt-8" onClick={onClose}>
          Voltar ao início
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Step indicator */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prev} className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1">
            {steps.map((step, i) => (
              <div key={step.key} className="flex items-center gap-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  i < stepIndex
                    ? 'bg-gradient-gold text-primary-foreground'
                    : i === stepIndex
                      ? 'bg-gold/20 text-gold border border-gold'
                      : 'bg-secondary text-muted-foreground'
                }`}>
                  {i < stepIndex ? <Check className="w-3 h-3" /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-4 h-0.5 rounded ${i < stepIndex ? 'bg-gold' : 'bg-border'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="w-5" />
        </div>
        <h2 className="text-lg font-display font-bold text-foreground">
          {steps[stepIndex].label}
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <AnimatePresence mode="wait">
          {currentStep === 'phone' && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4 pt-4"
            >
              <p className="text-sm text-muted-foreground">
                Informe seu número de telefone para vincular ao agendamento.
              </p>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="tel"
                  placeholder="(11) 99999-0000"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  className="w-full h-14 pl-12 pr-4 rounded-xl bg-card border border-border text-foreground text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                  autoFocus
                />
              </div>
              {phone && !isValidPhone(phone) && (
                <p className="text-xs text-destructive">Digite um número válido com DDD.</p>
              )}
            </motion.div>
          )}

          {currentStep === 'service' && (
            <motion.div
              key="service"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-2"
            >
              {establishment.services.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  selected={selectedService?.id === service.id}
                  onSelect={setSelectedService}
                  index={i}
                />
              ))}
            </motion.div>
          )}

          {currentStep === 'professional' && (
            <motion.div
              key="professional"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              {establishment.professionals.map((prof, i) => (
                <ProfessionalCard
                  key={prof.id}
                  professional={prof}
                  selected={selectedProfessional?.id === prof.id}
                  onSelect={setSelectedProfessional}
                  index={i}
                />
              ))}
            </motion.div>
          )}

          {currentStep === 'datetime' && selectedService && (
            <motion.div
              key="datetime"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <DateTimePicker
                establishment={establishment}
                service={selectedService}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateSelect={setSelectedDate}
                onTimeSelect={setSelectedTime}
              />
            </motion.div>
          )}

          {currentStep === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-card border border-border rounded-xl p-5 space-y-3">
                <h3 className="font-display font-bold text-foreground">Resumo do Agendamento</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Telefone</span>
                    <span className="text-foreground font-medium">{phone}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Serviço</span>
                    <span className="text-foreground font-medium">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Profissional</span>
                    <span className="text-foreground font-medium">{selectedProfessional?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Data</span>
                    <span className="text-foreground font-medium">
                      {selectedDate?.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Horário</span>
                    <span className="text-foreground font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duração</span>
                    <span className="text-foreground font-medium">{selectedService?.duration} min</span>
                  </div>
                  <div className="border-t border-border my-2" />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">Total</span>
                    <span className="text-gold font-bold text-lg">R$ {selectedService?.price}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom action */}
      <div className="p-4 border-t border-border">
        {currentStep === 'confirm' ? (
          <Button variant="gold" size="xl" className="w-full" onClick={handleConfirm}>
            Confirmar Agendamento
          </Button>
        ) : (
          <Button
            variant="gold"
            size="lg"
            className="w-full"
            disabled={!canNext()}
            onClick={next}
          >
            Continuar <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
