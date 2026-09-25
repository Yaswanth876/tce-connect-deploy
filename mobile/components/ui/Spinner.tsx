import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

interface SpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  label?: string;
}

export default function Spinner({ size = 'large', color = Colors.primary, label }: SpinnerProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: Colors.mutedForeground,
  },
});
