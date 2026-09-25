import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../theme/colors';
import Card from './ui/Card';

interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  value: string | number;
  label: string;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
}

export default function StatCard({ icon, value, label, iconColor = Colors.primary, style }: StatCardProps) {
  return (
    <Card style={[styles.card, style]}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
          <Ionicons name={icon} size={22} color={iconColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.label}>{label}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  value: {
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
    color: Colors.foreground,
    lineHeight: 28,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: Colors.mutedForeground,
  },
});
