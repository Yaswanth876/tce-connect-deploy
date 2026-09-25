import { Redirect } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../../components/ui/Spinner';
import { View } from 'react-native';

// This tab acts as a role-aware router
// Students -> student dashboard, Organizers -> organizer dashboard
export default function DashboardTab() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <Spinner />
      </View>
    );
  }

  if (user?.role === 'organizer') {
    return <Redirect href="/(organizer)/dashboard" />;
  }

  return <Redirect href="/(student)/dashboard" />;
}
