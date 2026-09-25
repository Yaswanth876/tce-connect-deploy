import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../context/AuthContext';
import { eventService } from '../../services/eventService';
import StatCard from '../../components/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import { Colors } from '../../theme/colors';
import type { Event } from '../../types';

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return d; }
}

export default function OrganizerDashboardScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const { data: allEvents = [], isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['allEvents'],
    queryFn: eventService.getAll,
  });

  // Filter to only show organizer's own events
  const myEvents = allEvents.filter((e) => {
    const orgId = typeof e.organizer === 'object' ? (e.organizer as any)?._id : e.organizer;
    return orgId === user?.id;
  });

  const upcomingCount = myEvents.filter((e) => new Date(e.date) >= new Date()).length;
  const totalParticipants = myEvents.reduce((sum, e) => sum + (e.participants?.length || 0), 0);

  const deleteMutation = useMutation({
    mutationFn: eventService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allEvents'] });
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.error || 'Failed to delete event');
    },
  });

  const handleDelete = (event: Event) => {
    Alert.alert(
      'Delete Event',
      `Are you sure you want to delete "${event.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteMutation.mutate(event._id),
        },
      ]
    );
  };

  if (isLoading) return <Spinner label="Loading your events..." />;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Organizer Dashboard</Text>
            <Text style={styles.headerSub}>{user?.email}</Text>
          </View>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => router.push('/settings')}
            activeOpacity={0.8}
          >
            <Ionicons name="settings-outline" size={20} color={Colors.foreground} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={myEvents}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} colors={[Colors.primary]} tintColor={Colors.primary} />
        }
        ListHeaderComponent={
          <View style={styles.listHeader}>
            {/* Stats */}
            <View style={styles.statsRow}>
              <StatCard icon="calendar-outline" value={myEvents.length} label="Total Events" style={styles.stat} />
              <StatCard icon="trending-up-outline" value={upcomingCount} label="Upcoming" style={styles.stat} />
              <StatCard icon="people-outline" value={totalParticipants} label="Participants" style={styles.stat} />
            </View>

            {/* Create Button */}
            <Button
              title="Create New Event"
              onPress={() => router.push('/(organizer)/create-event')}
              fullWidth
              leftIcon={<Ionicons name="add-circle-outline" size={18} color={Colors.white} />}
              style={styles.createBtn}
            />

            <Text style={styles.sectionTitle}>My Events ({myEvents.length})</Text>
          </View>
        }
        renderItem={({ item }) => (
          <OrganizerEventCard
            event={item}
            onEdit={() => router.push(`/(organizer)/edit-event/${item._id}` as any)}
            onDelete={() => handleDelete(item)}
            onViewParticipants={() =>
              Alert.alert(
                `${item.title} — Participants`,
                `${item.participants?.length || 0} / ${item.maxParticipants} registered`
              )
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="calendar-outline"
            title="No events yet"
            description="Create your first event to get started!"
            actionLabel="Create Event"
            onAction={() => router.push('/(organizer)/create-event')}
          />
        }
      />
    </View>
  );
}

function OrganizerEventCard({
  event,
  onEdit,
  onDelete,
  onViewParticipants,
}: {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
  onViewParticipants: () => void;
}) {
  const isUpcoming = new Date(event.date) >= new Date();

  return (
    <Card style={styles.eventCard} noPadding>
      <View style={[styles.eventCardTop, { backgroundColor: isUpcoming ? Colors.primary : Colors.mutedForeground }]}>
        <Badge
          label={event.type ? event.type.charAt(0).toUpperCase() + event.type.slice(1) : 'Technical'}
          variant={(event.type as any) || 'technical'}
          style={{ backgroundColor: 'rgba(255,255,255,0.20)', borderColor: 'rgba(255,255,255,0.40)' }}
        />
        {!isUpcoming && (
          <Text style={styles.pastBadge}>Past</Text>
        )}
      </View>

      <View style={styles.eventCardBody}>
        <Text style={styles.eventCardTitle}>{event.title}</Text>
        <View style={styles.eventCardMeta}>
          <Ionicons name="calendar-outline" size={13} color={Colors.mutedForeground} />
          <Text style={styles.eventCardMetaText}>{formatDate(event.date)} · {event.time || 'TBA'}</Text>
        </View>
        <View style={styles.eventCardMeta}>
          <Ionicons name="location-outline" size={13} color={Colors.mutedForeground} />
          <Text style={styles.eventCardMetaText} numberOfLines={1}>{event.venue || 'TBA'}</Text>
        </View>
        <TouchableOpacity onPress={onViewParticipants} activeOpacity={0.8}>
          <View style={styles.participantsBar}>
            <View style={styles.participantsInfo}>
              <Ionicons name="people-outline" size={13} color={Colors.primary} />
              <Text style={styles.participantsText}>
                {event.participants?.length || 0} / {event.maxParticipants} participants
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={14} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.editBtn} onPress={onEdit} activeOpacity={0.8}>
            <Ionicons name="pencil-outline" size={15} color={Colors.primary} />
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={onDelete} activeOpacity={0.8}>
            <Ionicons name="trash-outline" size={15} color={Colors.destructive} />
            <Text style={styles.deleteBtnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    shadowColor: '#802020',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: Colors.foreground,
  },
  headerSub: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: Colors.mutedForeground,
    marginTop: 2,
  },
  settingsBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: { padding: 16, paddingBottom: 24 },
  listHeader: { gap: 14, marginBottom: 14 },
  statsRow: { flexDirection: 'row', gap: 10 },
  stat: { flex: 1, minWidth: 0, padding: 10 },
  createBtn: { marginTop: 4 },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.foreground,
  },
  eventCard: { borderRadius: 12, overflow: 'hidden' },
  eventCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pastBadge: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: 'rgba(255,255,255,0.90)',
  },
  eventCardBody: {
    padding: 14,
    gap: 6,
  },
  eventCardTitle: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.foreground,
  },
  eventCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  eventCardMetaText: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: Colors.mutedForeground,
    flex: 1,
  },
  participantsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: `${Colors.primary}08`,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: `${Colors.primary}20`,
    marginTop: 4,
  },
  participantsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  participantsText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: Colors.primary,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}08`,
  },
  editBtnText: {
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
    color: Colors.primary,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: `${Colors.destructive}50`,
    backgroundColor: `${Colors.destructive}08`,
  },
  deleteBtnText: {
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
    color: Colors.destructive,
  },
});
