import { Stack, Redirect } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function StudentLayout() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Redirect href="/(auth)/login" />;
  if (user?.role !== 'student') return <Redirect href="/(tabs)/events" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" />
    </Stack>
  );
}
