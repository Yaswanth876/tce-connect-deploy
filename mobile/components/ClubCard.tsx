import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Club } from '../types';
import { Colors, Shadows } from '../theme/colors';

interface ClubCardProps {
  club: Club;
}

const ClubCard = ({ club }: ClubCardProps) => {
  const handleVisitPortal = () => {
    if (club.portalUrl) {
      Linking.openURL(club.portalUrl);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {/* Icon Container */}
        <View style={styles.iconContainer}>
          <Ionicons
            name={(club.icon as any) || 'people-outline'}
            size={24}
            color={Colors.primary}
          />
        </View>

        {/* Club Info */}
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {club.name}
          </Text>
          <View style={styles.membersRow}>
            <Ionicons name="people-outline" size={12} color={Colors.mutedForeground} />
            <Text style={styles.members}>{club.members} members</Text>
          </View>
        </View>
      </View>

      {club.description && (
        <Text style={styles.description} numberOfLines={2}>
          {club.description}
        </Text>
      )}

      {club.portalUrl && (
        <TouchableOpacity
          style={styles.portalButton}
          onPress={handleVisitPortal}
          activeOpacity={0.8}
        >
          <Ionicons name="open-outline" size={14} color={Colors.primary} />
          <Text style={styles.portalText}>Visit Club Portal</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default React.memo(ClubCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    gap: 10,
    ...Shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${Colors.primary}12`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.foreground,
  },
  membersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  members: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: Colors.mutedForeground,
  },
  description: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: Colors.mutedForeground,
    lineHeight: 18,
  },
  portalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: `${Colors.primary}30`,
    backgroundColor: `${Colors.primary}08`,
    alignSelf: 'flex-start',
  },
  portalText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: Colors.primary,
  },
});
