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
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { Colors, Gradients } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';

type Role = 'student' | 'organizer';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const validate = (): boolean => {
    const newErrors = { email: '', password: '' };
    let valid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      const data = await authService.login({ email, password });
      await login(data.token, data.user);
      // Navigate based on role
      const userRole = data.user.role;
      if (userRole === 'organizer') {
        router.replace('/(organizer)/dashboard');
      } else {
        router.replace('/(tabs)/events');
      }
    } catch (err: any) {
      const message = err.response?.data?.error || err.response?.data?.message || err.message || 'Login failed';
      Alert.alert('Login Failed', message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[styles.container, { paddingTop: insets.top + 24 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <View style={styles.logoCircle}>
              <LinearGradient
                colors={['rgba(128,32,32,0.15)', 'rgba(255,192,0,0.10)']}
                style={styles.logoGradient}
              >
                <View style={styles.logoInner}>
                  <Ionicons name="school-outline" size={40} color={Colors.primary} />
                </View>
              </LinearGradient>
            </View>
            <Text style={styles.headline}>
              Welcome to <Text style={{ color: Colors.primary }}>TCE</Text> Connect
            </Text>
            <Text style={styles.subheadline}>Sign in to explore campus events and clubs</Text>
          </View>

          {/* Login Card */}
          <Card style={styles.card} elevated>
            <View style={styles.cardHeader}>
              <Ionicons name="log-in-outline" size={22} color={Colors.primary} />
              <Text style={styles.cardTitle}>Sign In</Text>
            </View>
            <Text style={styles.cardSubtitle}>Enter your credentials to continue</Text>

            {/* Email */}
            <Input
              label="Email Address"
              placeholder="your@student.tce.edu"
              value={email}
              onChangeText={(v) => { setEmail(v); setErrors(e => ({ ...e, email: '' })); }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon={<Ionicons name="mail-outline" size={18} color={Colors.mutedForeground} />}
              error={errors.email}
              containerStyle={styles.inputGroup}
            />

            {/* Password */}
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={(v) => { setPassword(v); setErrors(e => ({ ...e, password: '' })); }}
              secureTextEntry={!showPassword}
              leftIcon={<Ionicons name="lock-closed-outline" size={18} color={Colors.mutedForeground} />}
              rightIcon={
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color={Colors.mutedForeground}
                />
              }
              onRightIconPress={() => setShowPassword(!showPassword)}
              error={errors.password}
              containerStyle={styles.inputGroup}
            />

            {/* Role Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Select Role</Text>
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

            {/* Submit */}
            <Button
              title={isLoading ? 'Signing in...' : 'Sign In'}
              onPress={handleLogin}
              loading={isLoading}
              fullWidth
              size="lg"
              style={styles.submitButton}
              leftIcon={!isLoading ? <Ionicons name="log-in-outline" size={18} color={Colors.white} /> : undefined}
            />

            {/* Register Link */}
            <View style={styles.registerRow}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register')} activeOpacity={0.8}>
                <Text style={styles.registerLink}>Create one</Text>
              </TouchableOpacity>
            </View>
          </Card>

          {/* Bottom padding */}
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
    alignItems: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 28,
    gap: 8,
  },
  logoCircle: {
    marginBottom: 8,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: Colors.foreground,
    textAlign: 'center',
  },
  subheadline: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: Colors.mutedForeground,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    padding: 24,
    gap: 0,
    borderRadius: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: Colors.foreground,
  },
  cardSubtitle: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: Colors.mutedForeground,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
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
  roleChipSelected: {
    backgroundColor: Colors.primary,
  },
  roleText: {
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
    color: Colors.primary,
  },
  roleTextSelected: {
    color: Colors.white,
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: Colors.mutedForeground,
  },
  registerLink: {
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.primary,
  },
});
