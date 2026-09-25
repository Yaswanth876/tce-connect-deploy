import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { eventService } from '../../services/eventService';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { Colors } from '../../theme/colors';
import type { CreateEventPayload } from '../../types';

type EventType = 'technical' | 'cultural' | 'sports';

export default function CreateEventScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [department, setDepartment] = useState('');
  const [type, setType] = useState<EventType>('technical');
  const [club, setClub] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('100');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createMutation = useMutation({
    mutationFn: eventService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allEvents'] });
      Alert.alert('Success!', 'Event created successfully!', [
        { text: 'View Dashboard', onPress: () => router.replace('/(organizer)/dashboard') },
      ]);
    },
    onError: (err: any) => {
      Alert.alert('Failed', err.response?.data?.error || err.message || 'Failed to create event');
    },
  });

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    let valid = true;
    if (!title.trim()) { e.title = 'Event title is required'; valid = false; }
    if (!date) { e.date = 'Date is required'; valid = false; }
    else {
      const d = new Date(date);
      if (isNaN(d.getTime())) { e.date = 'Please enter a valid date (YYYY-MM-DD)'; valid = false; }
    }
    setErrors(e);
    return valid;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const payload: CreateEventPayload = {
      title: title.trim(),
      description: description.trim() || undefined,
      date,
      time: time.trim() || undefined,
      venue: venue.trim() || undefined,
      department: department.trim() || undefined,
      type,
      club: club.trim() || undefined,
      maxParticipants: parseInt(maxParticipants) || 100,
    };
    createMutation.mutate(payload);
  };

  const clearError = (field: string) => setErrors(e => ({ ...e, [field]: '' }));

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={Colors.foreground} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Event</Text>
          <View style={{ width: 38 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Card style={styles.card}>
            <Text style={styles.sectionLabel}>Event Details</Text>

            <Input
              label="Event Title *"
              placeholder="e.g. AI Sprint Workshop"
              value={title}
              onChangeText={(v) => { setTitle(v); clearError('title'); }}
              error={errors.title}
              containerStyle={styles.input}
            />

            <Input
              label="Description"
              placeholder="Describe the event..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              style={{ height: 90, textAlignVertical: 'top', paddingTop: 8 }}
              containerStyle={styles.input}
            />

            <Input
              label="Date * (YYYY-MM-DD)"
              placeholder="e.g. 2025-12-25"
              value={date}
              onChangeText={(v) => { setDate(v); clearError('date'); }}
              keyboardType="numbers-and-punctuation"
              error={errors.date}
              leftIcon={<Ionicons name="calendar-outline" size={18} color={Colors.mutedForeground} />}
              containerStyle={styles.input}
            />

            <Input
              label="Time"
              placeholder="e.g. 9:00 AM - 5:00 PM"
              value={time}
              onChangeText={setTime}
              leftIcon={<Ionicons name="time-outline" size={18} color={Colors.mutedForeground} />}
              containerStyle={styles.input}
            />

            <Input
              label="Venue"
              placeholder="e.g. CSE Department, Block A"
              value={venue}
              onChangeText={setVenue}
              leftIcon={<Ionicons name="location-outline" size={18} color={Colors.mutedForeground} />}
              containerStyle={styles.input}
            />

            <Input
              label="Department"
              placeholder="e.g. Computer Science"
              value={department}
              onChangeText={setDepartment}
              leftIcon={<Ionicons name="business-outline" size={18} color={Colors.mutedForeground} />}
              containerStyle={styles.input}
            />

            {/* Event Type */}
            <View style={styles.input}>
              <Text style={styles.label}>Event Type</Text>
              <View style={styles.typeRow}>
                {(['technical', 'cultural', 'sports'] as EventType[]).map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[styles.typeChip, type === t && styles.typeChipSelected]}
                    onPress={() => setType(t)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.typeText, type === t && styles.typeTextSelected]}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Input
              label="Club / Organization"
              placeholder="e.g. AI Consortium"
              value={club}
              onChangeText={setClub}
              leftIcon={<Ionicons name="people-outline" size={18} color={Colors.mutedForeground} />}
              containerStyle={styles.input}
            />

            <Input
              label="Max Participants"
              placeholder="100"
              value={maxParticipants}
              onChangeText={setMaxParticipants}
              keyboardType="numeric"
              leftIcon={<Ionicons name="person-add-outline" size={18} color={Colors.mutedForeground} />}
              containerStyle={styles.input}
            />
          </Card>

          <Button
            title={createMutation.isPending ? 'Creating...' : 'Create Event'}
            onPress={handleSubmit}
            loading={createMutation.isPending}
            fullWidth
            size="lg"
            leftIcon={!createMutation.isPending ? <Ionicons name="checkmark-circle-outline" size={18} color={Colors.white} /> : undefined}
          />

          <View style={{ height: insets.bottom + 24 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: Colors.foreground,
  },
  content: {
    padding: 16,
    gap: 14,
  },
  card: {
    padding: 16,
    gap: 0,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.foreground,
    marginBottom: 16,
  },
  input: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: Colors.foreground,
    marginBottom: 6,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  typeChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  typeChipSelected: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}10`,
  },
  typeText: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: Colors.foreground,
  },
  typeTextSelected: {
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.primary,
  },
});
