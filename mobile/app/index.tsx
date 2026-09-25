import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/ui/Spinner';
import { View } from 'react-native';
import { Colors } from '../theme/colors';

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <Spinner label="Loading TCE Connect..." />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/events" />;
  }

  return <Redirect href="/(auth)/login" />;
}
