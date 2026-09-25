import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  RefreshControl,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { eventService } from '../../../services/eventService';
import EventCard from '../../../components/EventCard';
import FilterChips from '../../../components/FilterChips';
import Spinner from '../../../components/ui/Spinner';
import ErrorState from '../../../components/ui/ErrorState';
import EmptyState from '../../../components/ui/EmptyState';
import { Colors } from '../../../theme/colors';
import { EVENT_FILTERS } from '../../../constants/clubs';
import type { EventFilterType } from '../../../types';

export default function EventsScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const {
    data: events = [],
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['events'],
    queryFn: eventService.getAll,
  });

  const filteredEvents = events.filter((event) => {
    const matchesFilter =
      selectedFilter === 'All' ||
      event.type?.toLowerCase() === selectedFilter.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      event.title?.toLowerCase().includes(q) ||
      event.department?.toLowerCase().includes(q) ||
      event.venue?.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  if (isLoading) return <Spinner label="Loading events..." />;

  if (isError) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ErrorState
          title="Failed to load events"
          message="Please check if the backend is running and try again."
          onRetry={refetch}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      {/* Sticky Header */}
      <View style={styles.header}>
        {/* Title */}
        <View style={styles.titleRow}>
          <Ionicons name="calendar-outline" size={22} color={Colors.primary} />
          <Text style={styles.title}>
            <Text style={{ color: Colors.primary }}>TCE</Text> Events
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={16} color={Colors.mutedForeground} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events or clubs"
            placeholderTextColor={Colors.mutedForeground}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Ionicons
              name="close-circle"
              size={16}
              color={Colors.mutedForeground}
              onPress={() => setSearchQuery('')}
            />
          )}
        </View>

        {/* Filter Chips */}
        <FilterChips
          filters={EVENT_FILTERS}
          selected={selectedFilter}
          onSelect={setSelectedFilter}
        />
      </View>

      {/* Events List */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item._id || item.id || Math.random().toString()}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={[
          styles.list,
          filteredEvents.length === 0 && styles.listEmpty,
        ]}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
        ListEmptyComponent={
          <EmptyState
            icon="search-outline"
            title="No events found"
            description={
              searchQuery
                ? 'Try adjusting your search or filters'
                : 'No events are available right now.'
            }
          />
        }
      />
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
    gap: 10,
    // Shadow
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 42,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: Colors.foreground,
    height: '100%',
  },
  list: {
    padding: 16,
  },
  listEmpty: {
    flexGrow: 1,
  },
});
