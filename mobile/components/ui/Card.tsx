import React from 'react';
import { View, StyleSheet, ViewProps, ViewStyle, StyleProp } from 'react-native';
import { Colors, Shadows } from '../../theme/colors';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  noPadding?: boolean;
  elevated?: boolean;
}

export default function Card({ children, style, noPadding = false, elevated = false, ...props }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        !noPadding && styles.padding,
        elevated && styles.elevated,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  padding: {
    padding: 16,
  },
  elevated: {
    ...Shadows.lg,
  },
});
