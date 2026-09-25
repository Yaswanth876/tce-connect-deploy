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
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { Colors } from '../../theme/colors';
import { authService } from '../../services/authService';
import { DEPARTMENTS, YEARS } from '../../constants/clubs';

type Role = 'student' | 'organizer';

interface FormErrors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  department: string;
  year: string;
  registerNumber: string;
}

export default function RegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [role, setRole] = useState<Role>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    name: '', email: '', password: '', confirmPassword: '', department: '', year: '', registerNumber: '',
  });

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const validate = (): boolean => {
    const e: FormErrors = { name: '', email: '', password: '', confirmPassword: '', department: '', year: '', registerNumber: '' };
    let valid = true;

    if (!name || name.trim().length < 2) { e.name = 'Name must be at least 2 characters'; valid = false; }
    if (!email) { e.email = 'Email is required'; valid = false; }
    else if (!validateEmail(email)) { e.email = 'Please enter a valid email address'; valid = false; }
    if (!password) { e.password = 'Password is required'; valid = false; }
    else if (password.length < 6) { e.password = 'Password must be at least 6 characters'; valid = false; }
    if (!confirmPassword) { e.confirmPassword = 'Please confirm your password'; valid = false; }
    else if (password !== confirmPassword) { e.confirmPassword = 'Passwords do not match'; valid = false; }

    if (role === 'student') {
      if (!department || department.trim().length < 2) { e.department = 'Department is required'; valid = false; }
      if (!year) { e.year = 'Year of study is required'; valid = false; }
      if (!registerNumber || registerNumber.trim().length < 2) { e.registerNumber = 'Register number is required'; valid = false; }
    }

    setErrors(e);
    return valid;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      await authService.register({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        role,
        department: role === 'student' ? department : undefined,
        year: role === 'student' ? year : undefined,
        registerNumber: role === 'student' ? registerNumber : undefined,
      });
      Alert.alert(
        'Registration Successful!',
        'Your account has been created. Please sign in.',
        [{ text: 'Sign In', onPress: () => router.replace('/(auth)/login') }]
      );
    } catch (err: any) {
      const message = err.response?.data?.error || err.response?.data?.message || err.message || 'Registration failed';
      Alert.alert('Registration Failed', message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = (field: keyof FormErrors) => setErrors(e => ({ ...e, [field]: '' }));

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[styles.container, { paddingTop: insets.top + 16 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={22} color={Colors.foreground} />
            </TouchableOpacity>
            <View style={styles.titleBlock}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join TCE Connect today</Text>
            </View>
          </View>

          {/* Card */}
          <Card style={styles.card} elevated>
            {/* Role Selection */}
            <View style={styles.section}>
              <Text style={styles.label}>I am a</Text>
              <View style={styles.roleRow}>
                {(['student', 'organizer'] as Role[]).map((r) => (
                  <TouchableOpacity
                    key={r}
                    style={[styles.roleChip, role === r && styles.roleChipSelected]}
                    onPress={() => setRole(r)}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={r === 'student' ? 'school-outline' : 'people-outline'}
                      size={16}
                      color={role === r ? Colors.white : Colors.primary}
                    />
                    <Text style={[styles.roleText, role === r && styles.roleTextSelected]}>
                      {r === 'student' ? 'Student' : 'Event Organizer'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Name */}
            <Input
              label="Full Name"
              placeholder="Your full name"
              value={name}
              onChangeText={(v) => { setName(v); clearError('name'); }}
              leftIcon={<Ionicons name="person-outline" size={18} color={Colors.mutedForeground} />}
              error={errors.name}
              containerStyle={styles.inputGroup}
              autoCapitalize="words"
            />

            {/* Email */}
            <Input
              label="Email Address"
              placeholder="your@student.tce.edu"
              value={email}
              onChangeText={(v) => { setEmail(v); clearError('email'); }}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Ionicons name="mail-outline" size={18} color={Colors.mutedForeground} />}
              error={errors.email}
              containerStyle={styles.inputGroup}
            />

            {/* Password */}
            <Input
              label="Password"
              placeholder="At least 6 characters"
              value={password}
              onChangeText={(v) => { setPassword(v); clearError('password'); }}
              secureTextEntry={!showPassword}
              leftIcon={<Ionicons name="lock-closed-outline" size={18} color={Colors.mutedForeground} />}
              rightIcon={<Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color={Colors.mutedForeground} />}
              onRightIconPress={() => setShowPassword(!showPassword)}
              error={errors.password}
              containerStyle={styles.inputGroup}
            />

            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChangeText={(v) => { setConfirmPassword(v); clearError('confirmPassword'); }}
              secureTextEntry={!showConfirmPassword}
              leftIcon={<Ionicons name="lock-closed-outline" size={18} color={Colors.mutedForeground} />}
              rightIcon={<Ionicons name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color={Colors.mutedForeground} />}
              onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
              error={errors.confirmPassword}
              containerStyle={styles.inputGroup}
            />

            {/* Student-only fields */}
            {role === 'student' && (
              <>
                <Input
                  label="Department"
                  placeholder="e.g. Computer Science Engineering"
                  value={department}
                  onChangeText={(v) => { setDepartment(v); clearError('department'); }}
                  leftIcon={<Ionicons name="business-outline" size={18} color={Colors.mutedForeground} />}
                  error={errors.department}
                  containerStyle={styles.inputGroup}
                />

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Year of Study</Text>
                  <View style={styles.yearRow}>
                    {YEARS.map((y) => (
                      <TouchableOpacity
                        key={y}
                        style={[styles.yearChip, year === y && styles.yearChipSelected]}
                        onPress={() => { setYear(y); clearError('year'); }}
                        activeOpacity={0.8}
                      >
                        <Text style={[styles.yearText, year === y && styles.yearTextSelected]}>{y}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {errors.year ? <Text style={styles.errorText}>⚠ {errors.year}</Text> : null}
                </View>

                <Input
                  label="Register Number"
                  placeholder="e.g. 21CSE123"
                  value={registerNumber}
                  onChangeText={(v) => { setRegisterNumber(v); clearError('registerNumber'); }}
                  leftIcon={<Ionicons name="card-outline" size={18} color={Colors.mutedForeground} />}
                  error={errors.registerNumber}
                  containerStyle={styles.inputGroup}
                  autoCapitalize="characters"
                />
              </>
            )}

            {/* Submit */}
            <Button
              title={isLoading ? 'Creating Account...' : 'Create Account'}
              onPress={handleRegister}
              loading={isLoading}
              fullWidth
              size="lg"
              style={styles.submitButton}
              leftIcon={!isLoading ? <Ionicons name="person-add-outline" size={18} color={Colors.white} /> : undefined}
            />

            {/* Login Link */}
            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.replace('/(auth)/login')} activeOpacity={0.8}>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </Card>

          <View style={{ height: insets.bottom + 24 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
    color: Colors.foreground,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: Colors.mutedForeground,
  },
  card: {
    padding: 20,
    gap: 0,
  },
  section: {
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: Colors.foreground,
    marginBottom: 6,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  roleChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  roleChipSelected: { backgroundColor: Colors.primary },
  roleText: { fontSize: 12, fontFamily: 'Poppins_500Medium', color: Colors.primary },
  roleTextSelected: { color: Colors.white },
  yearRow: {
    flexDirection: 'row',
    gap: 8,
  },
  yearChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  yearChipSelected: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}10`,
  },
  yearText: { fontSize: 13, fontFamily: 'Poppins_400Regular', color: Colors.foreground },
  yearTextSelected: { fontFamily: 'Poppins_600SemiBold', color: Colors.primary },
  errorText: { fontSize: 12, fontFamily: 'Poppins_400Regular', color: Colors.destructive, marginTop: 4 },
  submitButton: { marginTop: 8, marginBottom: 16 },
  loginRow: { flexDirection: 'row', justifyContent: 'center' },
  loginText: { fontSize: 13, fontFamily: 'Poppins_400Regular', color: Colors.mutedForeground },
  loginLink: { fontSize: 13, fontFamily: 'Poppins_600SemiBold', color: Colors.primary },
});
