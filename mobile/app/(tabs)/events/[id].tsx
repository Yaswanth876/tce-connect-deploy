import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { eventService } from '../../../services/eventService';
import { useAuth } from '../../../context/AuthContext';
import Spinner from '../../../components/ui/Spinner';
import ErrorState from '../../../components/ui/ErrorState';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { Colors } from '../../../theme/colors';

function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch { return dateString; }
}

function formatDateShort(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  } catch { return dateString; }
}

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();

  const {
    data: event,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventService.getById(id!),
    enabled: !!id,
  });

  const registerMutation = useMutation({
    mutationFn: () => eventService.register(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event', id] });
      queryClient.invalidateQueries({ queryKey: ['myEvents'] });
      Alert.alert('Success!', 'You have successfully registered for this event.');
    },
    onError: (err: any) => {
      Alert.alert('Failed', err.response?.data?.error || err.message || 'Registration failed');
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => eventService.cancelRegistration(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event', id] });
      queryClient.invalidateQueries({ queryKey: ['myEvents'] });
      Alert.alert('Cancelled', 'Your registration has been cancelled.');
    },
    onError: (err: any) => {
      Alert.alert('Failed', err.response?.data?.error || err.message || 'Cancellation failed');
    },
  });

  if (isLoading) return <Spinner label="Loading event details..." />;
  if (isError || !event) {
    return (
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <TouchableOpacity style={[styles.backButton, { marginTop: 12 }]} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.foreground} />
        </TouchableOpacity>
        <ErrorState title="Event not found" onRetry={refetch} />
      </View>
    );
  }

  const participants = (event.participants || []) as any[];
  const userId = user?.id;
  const organizerId = typeof event.organizer === 'object' ? (event.organizer as any)?._id : event.organizer;
  const isOrganizer = userId && organizerId && userId === organizerId;
  const isRegistered = participants.some((p: any) =>
    (typeof p === 'string' ? p : p?._id) === userId
  );
  const isFull = participants.length >= event.maxParticipants;
  const spotsLeft = event.maxParticipants - participants.length;
  const isUpcoming = new Date(event.date) >= new Date();

  const typeColors: Record<string, string[]> = {
    technical: [Colors.primary, Colors.primaryDark],
    cultural: ['#7C3AED', '#5B21B6'],
    sports: ['#15803D', '#166534'],
  };
  const gradColors = (typeColors[event.type] || typeColors.technical) as [string, string];

  const organizerObj = typeof event.organizer === 'object' ? event.organizer as any : null;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Gradient Hero */}
        <LinearGradient
          colors={gradColors}
          style={[styles.hero, { paddingTop: insets.top + 12 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={Colors.white} />
          </TouchableOpacity>

          <View style={styles.heroContent}>
            <Badge
              label={event.type ? event.type.charAt(0).toUpperCase() + event.type.slice(1) : 'Technical'}
              variant={(event.type as any) || 'technical'}
              style={styles.heroBadge}
            />
            <Text style={styles.heroTitle}>{event.title}</Text>
            {organizerObj?.name && (
              <Text style={styles.heroOrganizer}>by {organizerObj.name}</Text>
            )}
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Meta Cards */}
          <View style={styles.metaGrid}>
            <View style={styles.metaCard}>
              <Ionicons name="calendar-outline" size={18} color={Colors.primary} />
              <Text style={styles.metaLabel}>Date</Text>
              <Text style={styles.metaValue}>{formatDateShort(event.date)}</Text>
            </View>
            <View style={styles.metaCard}>
              <Ionicons name="time-outline" size={18} color={Colors.primary} />
              <Text style={styles.metaLabel}>Time</Text>
              <Text style={styles.metaValue}>{event.time || 'TBA'}</Text>
            </View>
            <View style={styles.metaCard}>
              <Ionicons name="location-outline" size={18} color={Colors.primary} />
              <Text style={styles.metaLabel}>Venue</Text>
              <Text style={styles.metaValue} numberOfLines={2}>{event.venue || 'TBA'}</Text>
            </View>
            <View style={styles.metaCard}>
              <Ionicons name="people-outline" size={18} color={Colors.primary} />
              <Text style={styles.metaLabel}>Participants</Text>
              <Text style={styles.metaValue}>
                {participants.length}/{event.maxParticipants}
              </Text>
            </View>
          </View>

          {/* Spots left indicator */}
          {isUpcoming && !isFull && (
            <View style={styles.spotsBar}>
              <View
                style={[
                  styles.spotsFill,
                  { width: `${(participants.length / event.maxParticipants) * 100}%` }
                ]}
              />
            </View>
          )}
          {isUpcoming && (
            <Text style={styles.spotsText}>
              {isFull ? '🔴 Event is full' : `🟢 ${spotsLeft} spots remaining`}
            </Text>
          )}

          {/* Description */}
          {event.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About This Event</Text>
              <Text style={styles.description}>{event.description}</Text>
            </View>
          )}

          {/* Department */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Department</Text>
            <View style={styles.chipRow}>
              <View style={styles.chip}>
                <Ionicons name="business-outline" size={14} color={Colors.primary} />
                <Text style={styles.chipText}>{event.department || 'General'}</Text>
              </View>
              {event.club && (
                <View style={styles.chip}>
                  <Ionicons name="people-outline" size={14} color={Colors.primary} />
                  <Text style={styles.chipText}>{event.club}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Action Button */}
          {user && isUpcoming && !isOrganizer && (
            <View style={styles.actionArea}>
              {isRegistered ? (
                <>
                  <View style={styles.registeredBadge}>
                    <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
                    <Text style={styles.registeredText}>You're registered!</Text>
                  </View>
                  <Button
                    title={cancelMutation.isPending ? 'Cancelling...' : 'Cancel Registration'}
                    variant="outline"
                    onPress={() =>
                      Alert.alert(
                        'Cancel Registration',
                        'Are you sure you want to cancel your registration?',
                        [
                          { text: 'Keep Registration', style: 'cancel' },
                          { text: 'Cancel Registration', style: 'destructive', onPress: () => cancelMutation.mutate() },
                        ]
                      )
                    }
                    loading={cancelMutation.isPending}
                    fullWidth
                    style={styles.actionButton}
                  />
                </>
              ) : (
                <Button
                  title={
                    isFull
                      ? 'Event Full'
                      : registerMutation.isPending
                      ? 'Registering...'
                      : 'Register for Event'
                  }
                  onPress={() => registerMutation.mutate()}
                  loading={registerMutation.isPending}
                  disabled={isFull}
                  fullWidth
                  size="lg"
                  style={styles.actionButton}
                  leftIcon={!registerMutation.isPending && !isFull ? <Ionicons name="checkmark-circle-outline" size={18} color={Colors.white} /> : undefined}
                />
              )}
            </View>
          )}

          {!isUpcoming && (
            <View style={styles.pastEventBanner}>
              <Ionicons name="time-outline" size={16} color={Colors.mutedForeground} />
              <Text style={styles.pastEventText}>This event has already passed.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  heroContent: {
    gap: 8,
  },
  heroBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'rgba(255,255,255,0.4)',
  },
  heroTitle: {
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
    color: Colors.white,
    lineHeight: 30,
  },
  heroOrganizer: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: 'rgba(255,255,255,0.80)',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metaCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    gap: 4,
    shadowColor: '#802020',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  metaLabel: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: Colors.mutedForeground,
    marginTop: 2,
  },
  metaValue: {
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.foreground,
  },
  spotsBar: {
    height: 6,
    backgroundColor: Colors.muted,
    borderRadius: 3,
    overflow: 'hidden',
  },
  spotsFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  spotsText: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: Colors.mutedForeground,
    marginTop: -8,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.foreground,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: Colors.mutedForeground,
    lineHeight: 22,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: `${Colors.primary}10`,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: `${Colors.primary}20`,
  },
  chipText: {
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
    color: Colors.primary,
  },
  actionArea: {
    gap: 10,
    marginTop: 8,
  },
  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    backgroundColor: `${Colors.success}10`,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: `${Colors.success}30`,
  },
  registeredText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.success,
  },
  actionButton: {},
  pastEventBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: Colors.muted,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pastEventText: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: Colors.mutedForeground,
  },
});
