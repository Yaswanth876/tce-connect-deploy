import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../theme/colors';

type BadgeVariant = 'technical' | 'cultural' | 'sports' | 'primary' | 'muted';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
  dot?: boolean;
}

export default function Badge({ label, variant = 'primary', style, dot = false }: BadgeProps) {
  const variantColors: Record<BadgeVariant, { bg: string; text: string; border: string }> = {
    technical: { bg: 'rgba(128,32,32,0.10)', text: Colors.primary, border: 'rgba(128,32,32,0.30)' },
    cultural: { bg: 'rgba(147,51,234,0.10)', text: '#7C3AED', border: 'rgba(167,139,250,0.50)' },
    sports: { bg: 'rgba(34,197,94,0.10)', text: '#15803D', border: 'rgba(134,239,172,0.50)' },
    primary: { bg: `${Colors.primary}15`, text: Colors.primary, border: `${Colors.primary}30` },
    muted: { bg: Colors.muted, text: Colors.mutedForeground, border: Colors.border },
  };

  const colors = variantColors[variant];

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: colors.bg, borderColor: colors.border },
        style,
      ]}
    >
      {dot && (
        <View style={[styles.dot, { backgroundColor: colors.text }]} />
      )}
      <Text style={[styles.text, { color: colors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
  },
});
