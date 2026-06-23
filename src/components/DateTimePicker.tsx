import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, startOfDay, isSameDay, isToday, isBefore, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { generateTimeSlots } from '@/data/mock-establishments';
import type { Establishment, Service } from '@/data/mock-establishments';

interface Props {
  establishment: Establishment;
  service: Service;
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
}

const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function DateTimePicker({ establishment, service, selectedDate, selectedTime, onDateSelect, onTimeSelect }: Props) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOfWeek = getDay(monthStart);

  const dayLabels = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const isDayAvailable = (date: Date) => {
    if (isBefore(startOfDay(date), startOfDay(new Date()))) return false;
    const dayName = dayNames[getDay(date)];
    return establishment.openingHours[dayName] != null;
  };

  const timeSlots = useMemo(() => {
    if (!selectedDate) return [];
    const dayName = dayNames[getDay(selectedDate)];
    const hours = establishment.openingHours[dayName];
    if (!hours) return [];
    return generateTimeSlots(hours.open, hours.close, service.duration);
  }, [selectedDate, establishment, service]);

  return (
    <div className="space-y-5">
      {/* Calendar */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="font-display font-semibold text-foreground capitalize">
            {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
          </h3>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayLabels.map((d, i) => (
            <div key={i} className="text-center text-xs text-muted-foreground font-medium py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for offset */}
          {Array.from({ length: startDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {days.map((day) => {
            const available = isDayAvailable(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const today = isToday(day);

            return (
              <button
                key={day.toISOString()}
                disabled={!available}
                onClick={() => {
                  onDateSelect(day);
                  onTimeSelect('');
                }}
                className={`h-9 rounded-lg text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-gradient-gold text-primary-foreground glow-gold'
                    : available
                      ? today
                        ? 'bg-gold/10 text-gold hover:bg-gold/20'
                        : 'text-foreground hover:bg-accent'
                      : 'text-muted-foreground/30 cursor-not-allowed'
                }`}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Horários disponíveis — {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
          </h3>
          {timeSlots.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">Nenhum horário disponível nesta data.</p>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => onTimeSelect(time)}
                  className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedTime === time
                      ? 'bg-gradient-gold text-primary-foreground glow-gold'
                      : 'bg-secondary text-foreground hover:bg-gold/10 hover:text-gold border border-border'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
