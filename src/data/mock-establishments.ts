export type EstablishmentType = 'barbershop' | 'salon';

export interface Professional {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  category: string;
  icon: string;
}

export interface Establishment {
  id: string;
  slug: string;
  name: string;
  type: EstablishmentType;
  description: string;
  logo: string;
  banner: string;
  address: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  rating: number;
  reviewCount: number;
  openingHours: Record<string, { open: string; close: string } | null>;
  professionals: Professional[];
  services: Service[];
}

export const establishments: Establishment[] = [
  {
    id: '1',
    slug: 'kings-barber',
    name: "King's Barber",
    type: 'barbershop',
    description: 'A melhor barbearia premium da cidade. Cortes clássicos e modernos com experiência VIP.',
    logo: '',
    banner: '',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    phone: '(11) 99999-0001',
    whatsapp: '5511999990001',
    instagram: '@kingsbarber',
    rating: 4.9,
    reviewCount: 347,
    openingHours: {
      'Seg': { open: '09:00', close: '20:00' },
      'Ter': { open: '09:00', close: '20:00' },
      'Qua': { open: '09:00', close: '20:00' },
      'Qui': { open: '09:00', close: '20:00' },
      'Sex': { open: '09:00', close: '21:00' },
      'Sáb': { open: '08:00', close: '18:00' },
      'Dom': null,
    },
    professionals: [
      { id: 'p1', name: 'Carlos Silva', role: 'Barbeiro Master', avatar: '', rating: 4.9 },
      { id: 'p2', name: 'Rafael Costa', role: 'Barbeiro Senior', avatar: '', rating: 4.8 },
      { id: 'p3', name: 'Diego Mendes', role: 'Barbeiro', avatar: '', rating: 4.7 },
    ],
    services: [
      { id: 's1', name: 'Corte Masculino', description: 'Corte moderno ou clássico', price: 55, duration: 40, category: 'Cabelo', icon: 'scissors' },
      { id: 's2', name: 'Barba Completa', description: 'Modelagem e hidratação', price: 40, duration: 30, category: 'Barba', icon: 'scissors' },
      { id: 's3', name: 'Corte + Barba', description: 'Combo completo premium', price: 85, duration: 60, category: 'Combo', icon: 'sparkles' },
      { id: 's4', name: 'Degradê Navalhado', description: 'Degradê com navalha artística', price: 65, duration: 50, category: 'Cabelo', icon: 'zap' },
      { id: 's5', name: 'Relaxamento Capilar', description: 'Tratamento para fios lisos', price: 80, duration: 45, category: 'Tratamento', icon: 'droplets' },
      { id: 's6', name: 'Pigmentação de Barba', description: 'Preenchimento com pigmento', price: 120, duration: 60, category: 'Barba', icon: 'palette' },
    ],
  },
  {
    id: '2',
    slug: 'bella-studio',
    name: 'Bella Studio',
    type: 'salon',
    description: 'Salão de beleza sofisticado com os melhores profissionais e produtos premium.',
    logo: '',
    banner: '',
    address: 'Rua Oscar Freire, 500 - São Paulo, SP',
    phone: '(11) 99999-0002',
    whatsapp: '5511999990002',
    instagram: '@bellastudio',
    rating: 4.8,
    reviewCount: 521,
    openingHours: {
      'Seg': { open: '09:00', close: '19:00' },
      'Ter': { open: '09:00', close: '19:00' },
      'Qua': { open: '09:00', close: '19:00' },
      'Qui': { open: '09:00', close: '19:00' },
      'Sex': { open: '09:00', close: '20:00' },
      'Sáb': { open: '09:00', close: '17:00' },
      'Dom': null,
    },
    professionals: [
      { id: 'p4', name: 'Ana Beatriz', role: 'Hair Stylist', avatar: '', rating: 5.0 },
      { id: 'p5', name: 'Juliana Reis', role: 'Colorista', avatar: '', rating: 4.9 },
      { id: 'p6', name: 'Mariana Lopes', role: 'Manicure', avatar: '', rating: 4.8 },
    ],
    services: [
      { id: 's7', name: 'Corte Feminino', description: 'Corte moderno com finalização', price: 90, duration: 50, category: 'Cabelo', icon: 'scissors' },
      { id: 's8', name: 'Coloração', description: 'Coloração profissional completa', price: 180, duration: 120, category: 'Cabelo', icon: 'palette' },
      { id: 's9', name: 'Manicure & Pedicure', description: 'Cuidado completo para mãos e pés', price: 70, duration: 60, category: 'Unhas', icon: 'sparkles' },
      { id: 's10', name: 'Escova Progressiva', description: 'Alisamento duradouro', price: 250, duration: 180, category: 'Tratamento', icon: 'zap' },
      { id: 's11', name: 'Hidratação Profunda', description: 'Nutrição e brilho intenso', price: 95, duration: 45, category: 'Tratamento', icon: 'droplets' },
      { id: 's12', name: 'Design de Sobrancelhas', description: 'Modelagem perfeita', price: 45, duration: 30, category: 'Estética', icon: 'eye' },
    ],
  },
  {
    id: '3',
    slug: 'vintage-barber',
    name: 'Vintage Barber Co.',
    type: 'barbershop',
    description: 'Barbearia com estilo vintage americano. Cerveja artesanal e rock clássico.',
    logo: '',
    banner: '',
    address: 'Rua Augusta, 2000 - São Paulo, SP',
    phone: '(11) 99999-0003',
    whatsapp: '5511999990003',
    instagram: '@vintagebarberco',
    rating: 4.7,
    reviewCount: 198,
    openingHours: {
      'Seg': null,
      'Ter': { open: '10:00', close: '20:00' },
      'Qua': { open: '10:00', close: '20:00' },
      'Qui': { open: '10:00', close: '20:00' },
      'Sex': { open: '10:00', close: '21:00' },
      'Sáb': { open: '09:00', close: '18:00' },
      'Dom': { open: '10:00', close: '15:00' },
    },
    professionals: [
      { id: 'p7', name: 'Thiago Rocha', role: 'Barbeiro Chefe', avatar: '', rating: 4.8 },
      { id: 'p8', name: 'Lucas Ferreira', role: 'Barbeiro', avatar: '', rating: 4.6 },
    ],
    services: [
      { id: 's13', name: 'Corte Clássico', description: 'Corte old school com estilo', price: 50, duration: 35, category: 'Cabelo', icon: 'scissors' },
      { id: 's14', name: 'Hot Towel Shave', description: 'Barbear com toalha quente', price: 60, duration: 40, category: 'Barba', icon: 'flame' },
      { id: 's15', name: 'Combo Vintage', description: 'Corte + Hot Towel Shave', price: 95, duration: 70, category: 'Combo', icon: 'sparkles' },
    ],
  },
];

export function getEstablishment(slug: string): Establishment | undefined {
  return establishments.find((e) => e.slug === slug);
}

export function generateTimeSlots(open: string, close: string, duration: number): string[] {
  const slots: string[] = [];
  const [openH, openM] = open.split(':').map(Number);
  const [closeH, closeM] = close.split(':').map(Number);
  let current = openH * 60 + openM;
  const end = closeH * 60 + closeM;

  while (current + duration <= end) {
    const h = Math.floor(current / 60);
    const m = current % 60;
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    current += 30; // 30-min intervals
  }

  // Simulate some taken slots
  const taken = new Set([slots[2], slots[5], slots[8]].filter(Boolean));
  return slots.filter((s) => !taken.has(s));
}
