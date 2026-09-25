import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { Event } from '../types';
import { Colors, Shadows } from '../theme/colors';
import Badge from './ui/Badge';

interface EventCardProps {
  event: Event;
}

function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

const EventCard = ({ event }: EventCardProps) => {
  const router = useRouter();
  const eventId = event._id || event.id || '';

  const typeColors: Record<string, string> = {
    technical: '#802020',
    cultural: '#7C3AED',
    sports: '#15803D',
  };

  const topBarColor = typeColors[event.type] || typeColors.technical;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/(tabs)/events/${eventId}` as any)}
      activeOpacity={0.85}
    >
      {/* Top color bar like web app */}
      <View style={[styles.topBar, { backgroundColor: topBarColor }]} />

      <View style={styles.content}>
        {/* Title + Badge */}
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>
            {event.title}
          </Text>
          <Badge
            label={event.type ? event.type.charAt(0).toUpperCase() + event.type.slice(1) : 'Technical'}
            variant={(event.type as any) || 'technical'}
            dot
          />
        </View>

        {/* Meta */}
        <View style={styles.meta}>
          <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={14} color={Colors.primary} />
            <Text style={styles.metaText}>{formatDate(event.date)}</Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={14} color={Colors.primary} />
            <Text style={styles.metaText} numberOfLines={1}>
              {event.venue || 'TBA'}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.department} numberOfLines={1}>
            {event.department || 'General'}
          </Text>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => router.push(`/(tabs)/events/${eventId}` as any)}
            activeOpacity={0.8}
          >
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(EventCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    ...Shadows.card,
  },
  topBar: {
    height: 4,
    width: '100%',
  },
  content: {
    padding: 16,
    gap: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.foreground,
    lineHeight: 22,
  },
  meta: {
    gap: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: Colors.mutedForeground,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  department: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: Colors.primary,
    flex: 1,
  },
  viewButton: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  viewButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: Colors.primary,
  },
});
