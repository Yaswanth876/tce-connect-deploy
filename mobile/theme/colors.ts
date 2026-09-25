// TCE Connect Design System — Color Tokens
// Mirrors the web app's Tailwind CSS variables exactly

export const Colors = {
  // TCE Maroon Primary — hsl(0, 65%, 35%) = #802020
  primary: '#802020',
  primaryLight: '#9E2828',
  primaryDark: '#601818',
  primaryForeground: '#FFFFFF',

  // TCE Gold Accent — hsl(45, 100%, 50%) = #FFC000
  accent: '#FFC000',
  accentLight: '#FFD040',
  accentForeground: '#601818',

  // Backgrounds
  background: '#FAFAFA',
  card: '#FFFFFF',
  cardForeground: '#3D1010',

  // Text
  foreground: '#3D1010',
  mutedForeground: '#7A6A60',

  // UI Elements
  border: '#E5DBD4',
  input: '#EDE5DF',
  muted: '#F5EEE8',

  // Status
  destructive: '#E53935',
  destructiveForeground: '#FFFFFF',
  success: '#2E7D32',
  successForeground: '#FFFFFF',

  // Semantic
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Event type colors
  technical: {
    bg: 'rgba(128, 32, 32, 0.10)',
    text: '#802020',
    border: 'rgba(128, 32, 32, 0.30)',
  },
  cultural: {
    bg: 'rgba(147, 51, 234, 0.10)',
    text: '#7C3AED',
    border: 'rgba(167, 139, 250, 0.50)',
  },
  sports: {
    bg: 'rgba(34, 197, 94, 0.10)',
    text: '#15803D',
    border: 'rgba(134, 239, 172, 0.50)',
  },
};

// Gradient presets
export const Gradients = {
  primaryToAccent: ['#802020', '#FFC000'] as const,
  primaryHero: ['#802020', '#601818'] as const,
  cardHover: ['rgba(128,32,32,0.05)', 'rgba(255,192,0,0.05)'] as const,
  profileHeader: ['#802020', '#9E2828', '#802020'] as const,
};

export const Shadows = {
  sm: {
    shadowColor: '#802020',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#802020',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#802020',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 8,
  },
  card: {
    shadowColor: '#802020',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
};
