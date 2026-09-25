import React, { useState, useEffect } from 'react';
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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { eventService } from '../../../services/eventService';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Spinner from '../../../components/ui/Spinner';
import { Colors } from '../../../theme/colors';
import type { CreateEventPayload } from '../../../types';

type EventType = 'technical' | 'cultural' | 'sports';

export default function EditEventScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventService.getById(id!),
    enabled: !!id,
  });

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

  // Pre-fill form when event loads
  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setDescription(event.description || '');
      // Format date to YYYY-MM-DD
      try {
        const d = new Date(event.date);
        setDate(d.toISOString().split('T')[0]);
      } catch {
        setDate(event.date || '');
      }
      setTime(event.time || '');
      setVenue(event.venue || '');
      setDepartment(event.department || '');
      setType((event.type as EventType) || 'technical');
      setClub(event.club || '');
      setMaxParticipants(String(event.maxParticipants || 100));
    }
  }, [event]);

  const updateMutation = useMutation({
    mutationFn: (payload: CreateEventPayload) => eventService.update(id!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allEvents'] });
      queryClient.invalidateQueries({ queryKey: ['event', id] });
      Alert.alert('Success!', 'Event updated successfully!', [
        { text: 'Go Back', onPress: () => router.back() },
      ]);
    },
    onError: (err: any) => {
      Alert.alert('Failed', err.response?.data?.error || err.message || 'Failed to update event');
    },
  });

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    let valid = true;
    if (!title.trim()) { e.title = 'Event title is required'; valid = false; }
    if (!date) { e.date = 'Date is required'; valid = false; }
    setErrors(e);
    return valid;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    updateMutation.mutate({
      title: title.trim(),
      description: description.trim() || undefined,
      date,
      time: time.trim() || undefined,
      venue: venue.trim() || undefined,
      department: department.trim() || undefined,
      type,
      club: club.trim() || undefined,
      maxParticipants: parseInt(maxParticipants) || 100,
    });
  };

  if (isLoading) return <Spinner label="Loading event..." />;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={Colors.foreground} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Event</Text>
          <View style={{ width: 38 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <Card style={styles.card}>
            <Input label="Event Title *" placeholder="Event title" value={title} onChangeText={setTitle} error={errors.title} containerStyle={styles.input} />
            <Input label="Description" placeholder="Describe the event..." value={description} onChangeText={setDescription} multiline numberOfLines={4} style={{ height: 90, textAlignVertical: 'top', paddingTop: 8 }} containerStyle={styles.input} />
            <Input label="Date * (YYYY-MM-DD)" placeholder="2025-12-25" value={date} onChangeText={setDate} keyboardType="numbers-and-punctuation" error={errors.date} leftIcon={<Ionicons name="calendar-outline" size={18} color={Colors.mutedForeground} />} containerStyle={styles.input} />
            <Input label="Time" placeholder="9:00 AM - 5:00 PM" value={time} onChangeText={setTime} leftIcon={<Ionicons name="time-outline" size={18} color={Colors.mutedForeground} />} containerStyle={styles.input} />
            <Input label="Venue" placeholder="CSE Department, Block A" value={venue} onChangeText={setVenue} leftIcon={<Ionicons name="location-outline" size={18} color={Colors.mutedForeground} />} containerStyle={styles.input} />
            <Input label="Department" placeholder="Computer Science" value={department} onChangeText={setDepartment} leftIcon={<Ionicons name="business-outline" size={18} color={Colors.mutedForeground} />} containerStyle={styles.input} />

            <View style={styles.input}>
              <Text style={styles.label}>Event Type</Text>
              <View style={styles.typeRow}>
                {(['technical', 'cultural', 'sports'] as EventType[]).map((t) => (
                  <TouchableOpacity key={t} style={[styles.typeChip, type === t && styles.typeChipSelected]} onPress={() => setType(t)} activeOpacity={0.8}>
                    <Text style={[styles.typeText, type === t && styles.typeTextSelected]}>{t.charAt(0).toUpperCase() + t.slice(1)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Input label="Club / Organization" placeholder="AI Consortium" value={club} onChangeText={setClub} leftIcon={<Ionicons name="people-outline" size={18} color={Colors.mutedForeground} />} containerStyle={styles.input} />
            <Input label="Max Participants" placeholder="100" value={maxParticipants} onChangeText={setMaxParticipants} keyboardType="numeric" leftIcon={<Ionicons name="person-add-outline" size={18} color={Colors.mutedForeground} />} containerStyle={styles.input} />
          </Card>

          <Button
            title={updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            onPress={handleSubmit}
            loading={updateMutation.isPending}
            fullWidth
            size="lg"
            leftIcon={!updateMutation.isPending ? <Ionicons name="checkmark-circle-outline" size={18} color={Colors.white} /> : undefined}
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
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: Colors.muted,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: Colors.foreground,
  },
  content: { padding: 16, gap: 14 },
  card: { padding: 16, gap: 0 },
  input: { marginBottom: 14 },
  label: { fontSize: 14, fontFamily: 'Poppins_500Medium', color: Colors.foreground, marginBottom: 6 },
  typeRow: { flexDirection: 'row', gap: 8 },
  typeChip: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: Colors.border, backgroundColor: Colors.white },
  typeChipSelected: { borderColor: Colors.primary, backgroundColor: `${Colors.primary}10` },
  typeText: { fontSize: 12, fontFamily: 'Poppins_400Regular', color: Colors.foreground },
  typeTextSelected: { fontFamily: 'Poppins_600SemiBold', color: Colors.primary },
});
