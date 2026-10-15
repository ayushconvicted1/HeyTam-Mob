import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeytamColors, MaxContentWidth } from '@/constants/theme';
import { ClinicInfo, MockApprovals } from '@/data/mock-data';
import { useAuth } from '@/context/auth-context';
import { ApprovalsModal } from './approvals-modal';

interface HeytamHeaderProps {
  title?: string;
  subtitle?: string;
  showClinicSelector?: boolean;
}

export function HeytamHeader({
  title,
  subtitle,
  showClinicSelector = true,
}: HeytamHeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [approvalsVisible, setApprovalsVisible] = useState(false);
  const pendingApprovalsCount = MockApprovals.filter(
    (t) => t.status === 'Pending'
  ).length;

  const handleWorkspacePress = () => {
    if (Platform.OS === 'web') {
      alert(`Workspace: ${ClinicInfo.name}\nLocation: ${ClinicInfo.location}\nOrchestration: ${ClinicInfo.orchestrationFrequency}\nConnectors: ${ClinicInfo.activeConnectors.join(', ')}`);
    } else {
      Alert.alert(
        ClinicInfo.name,
        `📍 ${ClinicInfo.location}\n⚡ Frequency: ${ClinicInfo.orchestrationFrequency}\n🔗 Connectors: ${ClinicInfo.activeConnectors.join(', ')}`,
        [{ text: 'Close', style: 'cancel' }]
      );
    }
  };

  const handleUserPress = () => {
    const userName = user?.name || 'John Doe';
    const userEmail = user?.email || 'john.doe@company.com';
    if (Platform.OS === 'web') {
      const confirmLogout = confirm(`Signed in as ${userName} (${userEmail})\n\nDo you want to sign out and return to Login screen?`);
      if (confirmLogout) {
        logout();
        router.replace('/login');
      }
    } else {
      Alert.alert(
        userName,
        `Organization: ${user?.clinic || ClinicInfo.name}\n${userEmail}`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Sign Out',
            style: 'destructive',
            onPress: () => {
              logout();
              router.replace('/login');
            },
          },
        ]
      );
    }
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top > 0 ? insets.top + 6 : (Platform.OS === 'ios' ? 14 : 12),
          },
        ]}>
        {/* Centered Inner Container to align with Page Content (MaxContentWidth) */}
        <View style={styles.headerInner}>
          {/* Top bar: Brand Logo on Left, Bell & Dr. Sarah Profile Avatar on Right */}
          <View style={styles.topRow}>
            {/* Left: Brand Logo */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/')}
              style={styles.brandContainer}>
              <Image
                source={require('@/assets/images/heytam-logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Right: Notifications Bell & Dr. Sarah Avatar */}
            <View style={styles.rightActions}>
              {/* Notifications Bell */}
              <TouchableOpacity
                style={styles.bellButton}
                onPress={() => setApprovalsVisible(true)}
                activeOpacity={0.7}
                accessibilityLabel="Notifications">
                <Ionicons name="notifications" size={22} color="#0D1B4B" />
                {pendingApprovalsCount > 0 && (
                  <View style={styles.badge} />
                )}
              </TouchableOpacity>

              {/* User Avatar: Dr. Sarah */}
              <TouchableOpacity
                style={styles.userAvatarBtn}
                onPress={handleUserPress}
                activeOpacity={0.8}
                accessibilityLabel="Profile menu">
                <Image
                  source={require('@/assets/images/dr-sarah.jpg')}
                  style={styles.userAvatarImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Optional Page Title Row */}
          {title && (
            <View style={styles.titleRow}>
              <Text style={styles.pageTitle}>{title}</Text>
              {subtitle && <Text style={styles.pageSubtitle}>{subtitle}</Text>}
            </View>
          )}
        </View>
      </View>

      <ApprovalsModal
        visible={approvalsVisible}
        onClose={() => setApprovalsVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingBottom: 8,
    width: '100%',
  },
  headerInner: {
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    height: 30,
    width: 120,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bellButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#EF4444',
  },
  userAvatarBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  userAvatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  titleRow: {
    marginTop: 10,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0D1B4B',
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
});
