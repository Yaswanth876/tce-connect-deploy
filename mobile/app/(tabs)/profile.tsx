import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import { eventService } from '../../services/eventService';
import StatCard from '../../components/StatCard';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { Colors, Gradients } from '../../theme/colors';

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch { return d; }
}

export default function ProfileScreen() {
  const { user: authUser, logout } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['me'],
    queryFn: userService.getMe,
  });

  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ['myEvents'],
    queryFn: eventService.getMyEvents,
  });

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  if (profileLoading) return <Spinner label="Loading profile..." />;

  const displayUser = profile || authUser;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={Gradients.profileHeader}
          style={[styles.headerGrad, { paddingTop: insets.top + 20 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={36} color={Colors.accent} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{(displayUser as any)?.name || authUser?.email}</Text>
            {(displayUser as any)?.department && (
              <Text style={styles.headerDept}>{(displayUser as any)?.department}</Text>
            )}
            {(displayUser as any)?.year && (displayUser as any)?.registerNumber && (
              <Text style={styles.headerMeta}>
                {(displayUser as any)?.year} Year · {(displayUser as any)?.registerNumber} · TCE Madurai
              </Text>
            )}
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Profile Info Card */}
          <Card style={styles.infoCard} elevated>
            <Text style={styles.sectionTitle}>Profile Information</Text>
            <InfoRow label="Name" value={(displayUser as any)?.name || '—'} />
            <InfoRow label="Email" value={authUser?.email || '—'} />
            <InfoRow label="Role" value={authUser?.role ? authUser.role.charAt(0).toUpperCase() + authUser.role.slice(1) : '—'} />
            {(displayUser as any)?.department && <InfoRow label="Department" value={(displayUser as any).department} />}
            {(displayUser as any)?.year && <InfoRow label="Year" value={`${(displayUser as any).year} Year`} />}
            {(displayUser as any)?.registerNumber && <InfoRow label="Register No." value={(displayUser as any).registerNumber} />}
          </Card>

          {/* Actions */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push('/settings')}
              activeOpacity={0.8}
            >
              <Ionicons name="settings-outline" size={22} color={Colors.primary} />
              <Text style={styles.actionText}>Settings</Text>
            </TouchableOpacity>
            {authUser?.role === 'student' && (
              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => router.push('/(student)/dashboard')}
                activeOpacity={0.8}
              >
                <Ionicons name="grid-outline" size={22} color={Colors.primary} />
                <Text style={styles.actionText}>Dashboard</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Registered Events */}
          {authUser?.role === 'student' && (
            <Card style={styles.eventsCard}>
              <View style={styles.eventsHeader}>
                <Ionicons name="calendar-outline" size={18} color={Colors.foreground} />
                <Text style={styles.sectionTitle}>My Registered Events</Text>
              </View>
              {eventsLoading ? (
                <Spinner size="small" />
              ) : events.length === 0 ? (
                <Text style={styles.noEvents}>You haven't registered for any events yet.</Text>
              ) : (
                events.map((event) => (
                  <TouchableOpacity
                    key={event._id}
                    style={styles.eventItem}
                    onPress={() => router.push(`/(tabs)/events/${event._id}` as any)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.eventItemLeft}>
                      <Text style={styles.eventItemTitle} numberOfLines={1}>{event.title}</Text>
                      <Text style={styles.eventItemDate}>{formatDate(event.date)}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={Colors.mutedForeground} />
                  </TouchableOpacity>
                ))
              )}
            </Card>
          )}

          {/* Logout */}
          <Button
            title="Logout"
            variant="destructive"
            fullWidth
            onPress={handleLogout}
            leftIcon={<Ionicons name="log-out-outline" size={18} color={Colors.white} />}
            style={{ marginTop: 8 }}
          />
        </View>

        <View style={{ height: insets.bottom + 16 }} />
      </ScrollView>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerGrad: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: `${Colors.accent}60`,
  },
  headerInfo: {
    alignItems: 'center',
    gap: 4,
  },
  headerName: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: Colors.white,
  },
  headerDept: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: 'rgba(255,255,255,0.85)',
  },
  headerMeta: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: 'rgba(255,255,255,0.70)',
  },
  content: {
    padding: 16,
    gap: 14,
  },
  infoCard: {
    gap: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.foreground,
    marginBottom: 4,
  },
  infoRow: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: Colors.mutedForeground,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: Colors.foreground,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    alignItems: 'center',
    gap: 6,
    shadowColor: '#802020',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
    color: Colors.foreground,
  },
  eventsCard: {
    padding: 16,
    gap: 8,
  },
  eventsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  noEvents: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: Colors.mutedForeground,
    textAlign: 'center',
    paddingVertical: 12,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  eventItemLeft: {
    flex: 1,
  },
  eventItemTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: Colors.foreground,
  },
  eventItemDate: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: Colors.mutedForeground,
  },
});
