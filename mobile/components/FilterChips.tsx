import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

interface FilterChipsProps {
  filters: readonly string[];
  selected: string;
  onSelect: (filter: string) => void;
}

export default function FilterChips({ filters, selected, onSelect }: FilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter) => {
        const isSelected = filter === selected;
        return (
          <TouchableOpacity
            key={filter}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelect(filter)}
            activeOpacity={0.8}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {filter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  chipSelected: {
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  chipText: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: Colors.foreground,
  },
  chipTextSelected: {
    fontFamily: 'Poppins_700Bold',
    color: Colors.primary,
  },
});
