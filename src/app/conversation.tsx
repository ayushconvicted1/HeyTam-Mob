import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeytamHeader } from '@/components/heytam-header';

export default function ConversationScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isTakenOver, setIsTakenOver] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const tabs = ['Overview', 'AI Receptionist', 'Auto-call leads', 'Calls'];

  // Audio wave heights pattern mimicking live voice wave
  const waveHeights = [
    12, 22, 14, 28, 16, 32, 18, 24, 30, 20,
    34, 16, 26, 32, 14, 28, 36, 22, 18, 30,
    16, 26, 12, 20, 28, 14, 22, 16,
  ];

  return (
    <View style={styles.screenContainer}>
      <HeytamHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 16) + 95 },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.centerConstraint}>
          {/* Screen Title */}
          <Text style={styles.pageTitle}>AI Calling</Text>

          {/* Status Badges Row */}
          <View style={styles.statusBadgesRow}>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusBadgeText}>Live Call- 16:04</Text>
            </View>

            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusBadgeText}>HD Audio</Text>
            </View>
          </View>

          {/* Active Call Profile Card */}
          <View style={styles.callCard}>
            <View style={styles.callerProfile}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={require('@/assets/images/emily-carter.jpg')}
                  style={styles.callerAvatar}
                  resizeMode="cover"
                />
                <View style={styles.phoneBadgeOverlay}>
                  <Ionicons name="call" size={10} color="#FFFFFF" />
                </View>
              </View>

              <View style={styles.callerInfo}>
                <Text style={styles.callerName}>Sarah Mitchell</Text>
                <Text style={styles.callerPhone}>(212) 555-0329</Text>
                <Text style={styles.callerTag}>Heytam Voice AI</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.takeOverBtn,
                isTakenOver && styles.takeOverBtnActive,
              ]}
              activeOpacity={0.8}
              onPress={() => setIsTakenOver(!isTakenOver)}>
              <Text
                style={[
                  styles.takeOverText,
                  isTakenOver && styles.takeOverTextActive,
                ]}>
                {isTakenOver ? 'Resume AI' : 'Take Over'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Vibrant Cyan-Blue Gradient Waveform Card */}
          <LinearGradient
            colors={['#2563EB', '#06B6D4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.waveformCard}>
            {/* Top Indicator Row */}
            <View style={styles.waveformTopRow}>
              <View style={styles.waveformIndicators}>
                <View style={styles.radioDotOuter}>
                  <View style={styles.radioDotInner} />
                </View>
                <Text style={styles.waveformLabel}>Patient</Text>
                <View style={styles.smallDot} />
                <Text style={styles.waveformLabelMuted}>Heytam</Text>
              </View>

              <TouchableOpacity
                style={styles.speakerBtn}
                activeOpacity={0.7}
                onPress={() => setIsMuted(!isMuted)}>
                <Ionicons
                  name={isMuted ? 'volume-mute' : 'volume-high'}
                  size={16}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            {/* Audio Waveform Bars */}
            <View style={styles.waveformBarsRow}>
              {waveHeights.map((height, i) => (
                <View
                  key={i}
                  style={[
                    styles.waveformBar,
                    { height },
                  ]}
                />
              ))}
            </View>
          </LinearGradient>

          {/* Live Transcription Header */}
          <View style={styles.transcriptionHeaderRow}>
            <Ionicons name="chatbox-ellipses" size={19} color="#2563EB" />
            <Text style={styles.transcriptionTitle}>Live Transcription</Text>
          </View>

          {/* Transcription Container Box */}
          <View style={styles.transcriptionContainer}>
            {/* AI HeyTam Message */}
            <View style={styles.aiMessageBubble}>
              <Text style={styles.messageText}>
                We're delighted to welcome you to Aura MedSpa, Sarah. For your skin
                rejuvenation consultation, Dr. Sophia Bennett has an opening this
                Thursday at 2:30 PM. Does that work for you?
              </Text>
            </View>

            {/* Patient Sarah Message */}
            <View style={styles.patientMessageBubble}>
              <Text style={styles.messageText}>
                Thursday at 2:30 PM is perfect! Will there be any downtime after the
                initial skin consultation?
              </Text>
            </View>

            {/* Right Scroll Indicator Track */}
            <View style={styles.scrollTrack}>
              <View style={styles.scrollThumb} />
            </View>
          </View>

          {/* Category Tabs Strip */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryStrip}>
            {tabs.map((tab) => {
              const isSelected = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.categoryChip,
                    isSelected && styles.categoryChipActive,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setActiveTab(tab)}>
                  <Text
                    style={[
                      styles.categoryChipText,
                      isSelected && styles.categoryChipTextActive,
                    ]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Calling Status Rows */}
          <View style={styles.statusSection}>
            {/* Calling Line Row */}
            <View style={styles.statusItemRow}>
              <View style={styles.statusItemLeft}>
                <View style={styles.phoneIconCircle}>
                  <Ionicons name="call" size={14} color="#FFFFFF" />
                </View>
                <Text style={styles.statusItemTitle}>Calling line</Text>
              </View>
              <Text style={styles.statusActiveValue}>Active</Text>
            </View>

            <View style={styles.statusDivider} />

            {/* Auto-call Row */}
            <View style={styles.statusItemRow}>
              <View style={styles.statusItemLeft}>
                <View style={styles.sparkleIconCircle}>
                  <Ionicons name="sparkles" size={14} color="#FFFFFF" />
                </View>
                <Text style={styles.statusItemTitle}>Auto-call</Text>
              </View>
              <Text style={styles.statusActiveValue}>On</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  centerConstraint: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0D1B4B',
    letterSpacing: -0.6,
    marginTop: 8,
    marginBottom: 8,
  },
  statusBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderRadius: 14,
    backgroundColor: '#CCFBF1',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0D9488',
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F766E',
  },
  callCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#0D1B4B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 14,
  },
  callerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarWrapper: {
    position: 'relative',
  },
  callerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
  },
  phoneBadgeOverlay: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  callerInfo: {
    marginLeft: 12,
  },
  callerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0D1B4B',
  },
  callerPhone: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 1,
  },
  callerTag: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#2563EB',
    marginTop: 2,
  },
  takeOverBtn: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  takeOverBtnActive: {
    backgroundColor: '#EF4444',
  },
  takeOverText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  takeOverTextActive: {
    color: '#FFFFFF',
  },
  waveformCard: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  waveformTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  waveformIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  radioDotOuter: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDotInner: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#FFFFFF',
  },
  waveformLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  smallDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 4,
  },
  waveformLabelMuted: {
    fontSize: 12.5,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  speakerBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveformBarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 38,
    paddingHorizontal: 4,
  },
  waveformBar: {
    width: 3.5,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  transcriptionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  transcriptionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0D1B4B',
    letterSpacing: -0.3,
  },
  transcriptionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    marginBottom: 16,
    position: 'relative',
    shadowColor: '#0D1B4B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  aiMessageBubble: {
    backgroundColor: '#E0F2FE',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    maxWidth: '92%',
  },
  patientMessageBubble: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 14,
    padding: 12,
    alignSelf: 'flex-end',
    maxWidth: '88%',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 13,
    color: '#0D1B4B',
    lineHeight: 19,
  },
  scrollTrack: {
    position: 'absolute',
    right: 6,
    top: 14,
    bottom: 14,
    width: 3,
    borderRadius: 1.5,
    backgroundColor: '#F1F5F9',
    justifyContent: 'flex-end',
  },
  scrollThumb: {
    width: 3,
    height: 32,
    borderRadius: 1.5,
    backgroundColor: '#2563EB',
  },
  categoryStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  categoryChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  categoryChipText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#2563EB',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  statusSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 6,
    shadowColor: '#0D1B4B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  statusItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  statusItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  phoneIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkleIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#93C5FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1B4B',
  },
  statusActiveValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },
  statusDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
});
