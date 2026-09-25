import { Stack, Redirect } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function OrganizerLayout() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Redirect href="/(auth)/login" />;
  if (user?.role !== 'organizer') return <Redirect href="/(tabs)/events" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="create-event" />
      <Stack.Screen name="edit-event/[id]" />
    </Stack>
  );
}
