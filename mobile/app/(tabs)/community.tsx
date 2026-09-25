import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { clubService } from '../../services/clubService';
import ClubCard from '../../components/ClubCard';
import Spinner from '../../components/ui/Spinner';
import { Colors } from '../../theme/colors';
import { STATIC_CLUBS } from '../../constants/clubs';

export default function CommunityScreen() {
  const insets = useSafeAreaInsets();

  // Try to load from API, fall back to static list
  const { data: apiClubs, isLoading } = useQuery({
    queryKey: ['clubs'],
    queryFn: clubService.getAll,
    retry: 1,
  });

  // Use API clubs if available and non-empty, else use static list
  const clubs = (apiClubs && apiClubs.length > 0) ? apiClubs : STATIC_CLUBS;

  if (isLoading) return <Spinner label="Loading clubs..." />;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      {/* Sticky Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="sparkles-outline" size={22} color={Colors.primary} />
          <Text style={styles.title}>
            <Text style={{ color: Colors.primary }}>TCE</Text> Clubs
          </Text>
        </View>
        <Text style={styles.subtitle}>A Vibrant Hub for Innovation, Culture, and Community</Text>

        {/* Info Banner */}
        <View style={styles.banner}>
          <BannerItem icon="code-slash-outline" title="Tech & Innovation" />
          <BannerItem icon="musical-notes-outline" title="Arts & Culture" />
          <BannerItem icon="handshake-outline" title="Community Impact" />
        </View>
      </View>

      <FlatList
        data={clubs}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <ClubCard club={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        numColumns={1}
      />
    </View>
  );
}

function BannerItem({ icon, title }: { icon: any; title: string }) {
  return (
    <View style={styles.bannerItem}>
      <Ionicons name={icon} size={20} color={Colors.primary} />
      <Text style={styles.bannerTitle}>{title}</Text>
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
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 6,
    shadowColor: '#802020',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: Colors.foreground,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: Colors.mutedForeground,
  },
  banner: {
    flexDirection: 'row',
    backgroundColor: `${Colors.primary}06`,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: `${Colors.primary}15`,
    padding: 10,
    gap: 0,
    marginTop: 6,
  },
  bannerItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  bannerTitle: {
    fontSize: 10,
    fontFamily: 'Poppins_500Medium',
    color: Colors.primary,
    textAlign: 'center',
  },
  list: {
    padding: 16,
    paddingBottom: 24,
  },
});
