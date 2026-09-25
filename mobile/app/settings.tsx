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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import { Colors } from '../theme/colors';

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: userService.getMe,
  });

  // Profile edit state
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);

  // Pre-fill when profile loads
  React.useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setDepartment(profile.department || '');
      setYear(profile.year || '');
      setRegisterNumber(profile.registerNumber || '');
    }
  }, [profile]);

  const updateProfileMutation = useMutation({
    mutationFn: (updates: any) => userService.updateMe(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      Alert.alert('Success', 'Profile updated successfully!');
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.error || 'Failed to update profile');
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
      userService.changePassword(currentPassword, newPassword),
    onSuccess: () => {
      Alert.alert('Success', 'Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    },
    onError: (err: any) => {
      Alert.alert('Error', err.response?.data?.error || 'Failed to change password');
    },
  });

  const handleUpdateProfile = () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Name is required');
      return;
    }
    updateProfileMutation.mutate({ name: name.trim(), department, year, registerNumber });
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert('Validation', 'All password fields are required');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Validation', 'New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Validation', 'New passwords do not match');
      return;
    }
    changePasswordMutation.mutate({ currentPassword, newPassword });
  };

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

  if (isLoading) return <Spinner label="Loading settings..." />;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={Colors.foreground} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 38 }} />
        </View>

        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Account Info */}
          <View style={styles.accountCard}>
            <View style={styles.accountAvatar}>
              <Ionicons name="person" size={28} color={Colors.white} />
            </View>
            <View>
              <Text style={styles.accountEmail}>{user?.email}</Text>
              <Text style={styles.accountRole}>{user?.role?.charAt(0).toUpperCase()}{user?.role?.slice(1)}</Text>
            </View>
          </View>

          {/* Edit Profile */}
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Edit Profile</Text>
            <Input label="Full Name" placeholder="Your full name" value={name} onChangeText={setName} leftIcon={<Ionicons name="person-outline" size={18} color={Colors.mutedForeground} />} containerStyle={styles.input} autoCapitalize="words" />
            {user?.role === 'student' && (
              <>
                <Input label="Department" placeholder="e.g. Computer Science" value={department} onChangeText={setDepartment} leftIcon={<Ionicons name="business-outline" size={18} color={Colors.mutedForeground} />} containerStyle={styles.input} />
                <Input label="Year" placeholder="e.g. 3rd" value={year} onChangeText={setYear} leftIcon={<Ionicons name="school-outline" size={18} color={Colors.mutedForeground} />} containerStyle={styles.input} />
                <Input label="Register Number" placeholder="e.g. 21CSE123" value={registerNumber} onChangeText={setRegisterNumber} leftIcon={<Ionicons name="card-outline" size={18} color={Colors.mutedForeground} />} containerStyle={styles.input} autoCapitalize="characters" />
              </>
            )}
            <Button
              title={updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
              onPress={handleUpdateProfile}
              loading={updateProfileMutation.isPending}
              fullWidth
              leftIcon={<Ionicons name="save-outline" size={18} color={Colors.white} />}
            />
          </Card>

          {/* Change Password */}
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Change Password</Text>
            <Input
              label="Current Password"
              placeholder="Enter current password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrentPw}
              leftIcon={<Ionicons name="lock-closed-outline" size={18} color={Colors.mutedForeground} />}
              rightIcon={<Ionicons name={showCurrentPw ? 'eye-off-outline' : 'eye-outline'} size={18} color={Colors.mutedForeground} />}
              onRightIconPress={() => setShowCurrentPw(!showCurrentPw)}
              containerStyle={styles.input}
            />
            <Input
              label="New Password"
              placeholder="At least 6 characters"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPw}
              leftIcon={<Ionicons name="lock-open-outline" size={18} color={Colors.mutedForeground} />}
              rightIcon={<Ionicons name={showNewPw ? 'eye-off-outline' : 'eye-outline'} size={18} color={Colors.mutedForeground} />}
              onRightIconPress={() => setShowNewPw(!showNewPw)}
              containerStyle={styles.input}
            />
            <Input
              label="Confirm New Password"
              placeholder="Re-enter new password"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              secureTextEntry
              leftIcon={<Ionicons name="lock-open-outline" size={18} color={Colors.mutedForeground} />}
              containerStyle={styles.input}
            />
            <Button
              title={changePasswordMutation.isPending ? 'Changing...' : 'Change Password'}
              onPress={handleChangePassword}
              loading={changePasswordMutation.isPending}
              fullWidth
              variant="outline"
              leftIcon={<Ionicons name="key-outline" size={18} color={Colors.primary} />}
            />
          </Card>

          {/* App Info */}
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>App Info</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Version</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Platform</Text>
              <Text style={styles.infoValue}>{Platform.OS === 'ios' ? 'iOS' : 'Android'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>College</Text>
              <Text style={styles.infoValue}>Thiagarajar College of Engineering, Madurai</Text>
            </View>
          </Card>

          {/* Logout */}
          <Button
            title="Logout"
            variant="destructive"
            fullWidth
            onPress={handleLogout}
            leftIcon={<Ionicons name="log-out-outline" size={18} color={Colors.white} />}
          />
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
  content: {
    padding: 16,
    gap: 14,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
  },
  accountAvatar: {
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.20)',
    alignItems: 'center', justifyContent: 'center',
  },
  accountEmail: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.white,
  },
  accountRole: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: 'rgba(255,255,255,0.80)',
    marginTop: 2,
  },
  section: {
    padding: 16,
    gap: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.foreground,
    marginBottom: 14,
  },
  input: { marginBottom: 12 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoLabel: {
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
    color: Colors.mutedForeground,
  },
  infoValue: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: Colors.foreground,
    flex: 1,
    textAlign: 'right',
  },
});
