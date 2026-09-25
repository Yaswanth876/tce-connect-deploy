import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../context/AuthContext';
import { eventService } from '../../services/eventService';
import StatCard from '../../components/StatCard';
import Card from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';
import EmptyState from '../../components/ui/EmptyState';
import { Colors } from '../../theme/colors';

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return d; }
}

export default function StudentDashboardScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { data: events = [], isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['myEvents'],
    queryFn: eventService.getMyEvents,
  });

  const upcomingEvents = events.filter((e) => new Date(e.date) >= new Date());
  const pastEvents = events.filter((e) => new Date(e.date) < new Date());

  if (isLoading) return <Spinner label="Loading your dashboard..." />;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>
              <Ionicons name="trophy-outline" size={20} color={Colors.primary} /> Student Dashboard
            </Text>
            <Text style={styles.headerSub}>Welcome back, {user?.email}</Text>
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} colors={[Colors.primary]} tintColor={Colors.primary} />
        }
      >
        {/* Stats */}
        <View style={styles.statsRow}>
          <StatCard
            icon="calendar-outline"
            value={events.length}
            label="Registered Events"
            style={styles.statCard}
          />
          <StatCard
            icon="trending-up-outline"
            value={upcomingEvents.length}
            label="Upcoming"
            style={styles.statCard}
          />
          <StatCard
            icon="checkmark-circle-outline"
            value={pastEvents.length}
            label="Attended"
            style={styles.statCard}
          />
        </View>

        {/* Upcoming Events */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {upcomingEvents.length === 0 ? (
            <EmptyState
              icon="calendar-outline"
              title="No upcoming events"
              description="Explore and register for events!"
              actionLabel="Browse Events"
              onAction={() => router.push('/(tabs)/events')}
            />
          ) : (
            upcomingEvents.map((event) => (
              <TouchableOpacity
                key={event._id}
                style={styles.eventItem}
                onPress={() => router.push(`/(tabs)/events/${event._id}` as any)}
                activeOpacity={0.8}
              >
                <View style={[styles.eventDot, { backgroundColor: Colors.primary }]} />
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle} numberOfLines={1}>{event.title}</Text>
                  <View style={styles.eventMeta}>
                    <Ionicons name="calendar-outline" size={12} color={Colors.mutedForeground} />
                    <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
                    {event.venue ? (
                      <>
                        <Ionicons name="location-outline" size={12} color={Colors.mutedForeground} />
                        <Text style={styles.eventDate} numberOfLines={1}>{event.venue}</Text>
                      </>
                    ) : null}
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.mutedForeground} />
              </TouchableOpacity>
            ))
          )}
        </Card>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Past Events ({pastEvents.length})</Text>
            {pastEvents.map((event) => (
              <TouchableOpacity
                key={event._id}
                style={[styles.eventItem, styles.pastEventItem]}
                onPress={() => router.push(`/(tabs)/events/${event._id}` as any)}
                activeOpacity={0.8}
              >
                <View style={[styles.eventDot, { backgroundColor: Colors.mutedForeground }]} />
                <View style={styles.eventInfo}>
                  <Text style={[styles.eventTitle, { color: Colors.mutedForeground }]} numberOfLines={1}>
                    {event.title}
                  </Text>
                  <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Card>
        )}

        {/* Quick Actions */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => router.push('/(tabs)/events')}
              activeOpacity={0.8}
            >
              <Ionicons name="search-outline" size={20} color={Colors.primary} />
              <Text style={styles.quickActionText}>Browse Events</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => router.push('/(tabs)/community')}
              activeOpacity={0.8}
            >
              <Ionicons name="people-outline" size={20} color={Colors.primary} />
              <Text style={styles.quickActionText}>Explore Clubs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => router.push('/(tabs)/profile')}
              activeOpacity={0.8}
            >
              <Ionicons name="person-outline" size={20} color={Colors.primary} />
              <Text style={styles.quickActionText}>My Profile</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
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
  content: {
    padding: 16,
    gap: 14,
    paddingBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    minWidth: 0,
    padding: 12,
  },
  section: {
    padding: 16,
    gap: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.foreground,
    marginBottom: 12,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  pastEventItem: {
    opacity: 0.7,
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  eventInfo: {
    flex: 1,
    gap: 3,
  },
  eventTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: Colors.foreground,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  eventDate: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: Colors.mutedForeground,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 10,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: `${Colors.primary}08`,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: `${Colors.primary}20`,
    gap: 6,
  },
  quickActionText: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: Colors.primary,
    textAlign: 'center',
  },
});
