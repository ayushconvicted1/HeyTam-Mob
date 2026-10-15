import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeytamHeader } from '@/components/heytam-header';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [promptText, setPromptText] = useState('');
  const [selectedModel, setSelectedModel] = useState('GPT-4.1 Mini');

  const quickActions = [
    'Call new inquiries',
    'Book consultations',
    'Treatment plans',
    'Send reminders',
    'Compliance check',
    'Payment & billing',
    'Revenue report',
    'Patient reviews',
    'Patient triage',
    'Follow-up messages',
  ];

  const handleActionClick = (action: string) => {
    setPromptText(`Please ${action.toLowerCase()} for today`);
  };

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
          {/* Greeting Title */}
          <View style={styles.greetingRow}>
            <Text style={styles.greetingTitle}>Welcome back, Dr. Sarah</Text>
          </View>

          {/* AI Assistant Card */}
          <View style={styles.assistantCard}>
            <View style={styles.assistantHeaderRow}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={styles.assistantTitle}>How can I help you today?</Text>
                <Text style={styles.assistantSubtitle}>
                  Book consults, send reminders, or ask heytam to handle practice work.
                </Text>
              </View>
              <TouchableOpacity
                style={styles.newChatBtn}
                activeOpacity={0.7}
                onPress={() => setPromptText('')}>
                <Ionicons name="chatbox-outline" size={13} color="#64748B" />
                <Text style={styles.newChatText}>New Chat</Text>
              </TouchableOpacity>
            </View>

            {/* Glowing Gradient Border AI Input Box */}
            <View style={styles.inputBorderWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="Type Here |"
                placeholderTextColor="#94A3B8"
                value={promptText}
                onChangeText={setPromptText}
                multiline
              />

              {/* Input Toolbar */}
              <View style={styles.inputToolbar}>
                <View style={styles.toolbarLeft}>
                  <TouchableOpacity style={styles.plusBtn} activeOpacity={0.7}>
                    <Ionicons name="add" size={14} color="#64748B" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.modelPill} activeOpacity={0.7}>
                    <Text style={styles.modelPillText}>{selectedModel}</Text>
                    <Ionicons name="chevron-down" size={11} color="#64748B" />
                  </TouchableOpacity>
                </View>

                <View style={styles.toolbarRight}>
                  <TouchableOpacity style={styles.toolIconBtn} activeOpacity={0.7}>
                    <Ionicons name="mic-outline" size={18} color="#94A3B8" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.sendBtn,
                      promptText.trim().length > 0 && styles.sendBtnActive,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => {
                      if (promptText.trim()) {
                        router.push('/conversation' as any);
                      }
                    }}>
                    <Ionicons name="arrow-up" size={15} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Quick Action Chips (2 Columns) */}
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.actionChip}
                  activeOpacity={0.7}
                  onPress={() => handleActionClick(action)}>
                  <Ionicons name="call" size={12} color="#0D1B4B" style={{ marginRight: 6 }} />
                  <Text style={styles.actionChipText}>{action}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* KPI Metrics Row */}
          <View style={styles.metricsRow}>
            {/* New Leads */}
            <View style={styles.metricCard}>
              <View style={styles.metricCardHeader}>
                <Text style={styles.metricLabel}>New{"\n"}leads</Text>
                <View style={styles.metricIconWrap}>
                  <Ionicons name="person" size={12} color="#059669" />
                </View>
              </View>
              <Text style={styles.metricValue}>12</Text>
              <Text style={styles.metricTrend}>↑ 12%</Text>
            </View>

            {/* Booked Consults */}
            <View style={styles.metricCard}>
              <View style={styles.metricCardHeader}>
                <Text style={styles.metricLabel}>Booked{"\n"}consults</Text>
                <View style={styles.metricIconWrap}>
                  <Ionicons name="calendar" size={12} color="#059669" />
                </View>
              </View>
              <Text style={styles.metricValue}>16</Text>
              <Text style={styles.metricTrend}>↑ 8%</Text>
            </View>

            {/* Avg Response */}
            <View style={styles.metricCard}>
              <View style={styles.metricCardHeader}>
                <Text style={styles.metricLabel}>Avg{"\n"}Response</Text>
              </View>
              <Text style={styles.metricValue}>38s</Text>
              <Text style={styles.metricSubtext}>Lightning...</Text>
            </View>
          </View>

          {/* Today's Schedule */}
          <View style={styles.scheduleSection}>
            <View style={styles.scheduleHeaderRow}>
              <View style={styles.scheduleTitleGroup}>
                <Text style={styles.scheduleTitle}>Today's Schedule</Text>
                <View style={styles.totalBadge}>
                  <Text style={styles.totalBadgeText}>8 Total</Text>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push('/calendar')}>
                <Text style={styles.viewAllLink}>View All</Text>
              </TouchableOpacity>
            </View>

            {/* Schedule Item Card */}
            <TouchableOpacity
              style={styles.scheduleCard}
              activeOpacity={0.8}
              onPress={() => router.push('/calendar')}>
              <View style={styles.cardAccentBar} />

              <View style={styles.scheduleCardInner}>
                <View style={styles.scheduleTimeRow}>
                  <Text style={styles.scheduleTime}>10:30AM</Text>
                  <View style={styles.inMinsBadge}>
                    <Text style={styles.inMinsBadgeText}>• In 25 Mins</Text>
                  </View>
                </View>

                <View style={styles.schedulePersonRow}>
                  <Image
                    source={require('@/assets/images/emily-carter.jpg')}
                    style={styles.personAvatar}
                    resizeMode="cover"
                  />
                  <View style={styles.personInfo}>
                    <View style={styles.personNameRow}>
                      <Text style={styles.personName}>Emily Carter</Text>
                      <Text style={styles.personService}>• Botox Consultation</Text>
                    </View>
                    <Text style={styles.personMeta}>Deposit paid: $50 • Room 2</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* Additional Schedule Card for completeness */}
            <TouchableOpacity
              style={styles.scheduleCard}
              activeOpacity={0.8}
              onPress={() => router.push('/calendar')}>
              <View style={[styles.cardAccentBar, { backgroundColor: '#38BDF8' }]} />

              <View style={styles.scheduleCardInner}>
                <View style={styles.scheduleTimeRow}>
                  <Text style={styles.scheduleTime}>11:45AM</Text>
                  <View style={[styles.inMinsBadge, { backgroundColor: '#EFF6FF' }]}>
                    <Text style={[styles.inMinsBadgeText, { color: '#0284C7' }]}>• Confirmed</Text>
                  </View>
                </View>

                <View style={styles.schedulePersonRow}>
                  <Image
                    source={require('@/assets/images/emily-carter.jpg')}
                    style={styles.personAvatar}
                    resizeMode="cover"
                  />
                  <View style={styles.personInfo}>
                    <View style={styles.personNameRow}>
                      <Text style={styles.personName}>Sarah Mitchell</Text>
                      <Text style={styles.personService}>• Skin Rejuvenation</Text>
                    </View>
                    <Text style={styles.personMeta}>Deposit paid: $100 • Dr. Sophia Bennett</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
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
  greetingRow: {
    marginTop: 8,
    marginBottom: 16,
  },
  greetingTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0D1B4B',
    letterSpacing: -0.6,
  },
  assistantCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0D1B4B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 16,
  },
  assistantHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  assistantTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0D1B4B',
    letterSpacing: -0.3,
  },
  assistantSubtitle: {
    fontSize: 12.5,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 18,
  },
  newChatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  newChatText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#64748B',
  },
  inputBorderWrapper: {
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#818CF8',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 8,
    marginBottom: 14,
    shadowColor: '#818CF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  textInput: {
    fontSize: 15,
    color: '#0D1B4B',
    minHeight: 38,
    paddingVertical: 4,
  },
  inputToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 6,
  },
  toolbarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  plusBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
  },
  modelPillText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#475569',
  },
  toolbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toolIconBtn: {
    padding: 4,
  },
  sendBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnActive: {
    backgroundColor: '#2563EB',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 18,
    paddingVertical: 7,
    paddingHorizontal: 12,
    flexGrow: 1,
  },
  actionChipText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#1E293B',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0D1B4B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  metricCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 28,
  },
  metricLabel: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#475569',
    lineHeight: 14,
  },
  metricIconWrap: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0D1B4B',
    letterSpacing: -0.5,
    marginTop: 4,
  },
  metricTrend: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#10B981',
    marginTop: 2,
  },
  metricSubtext: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#059669',
    marginTop: 3,
  },
  scheduleSection: {
    marginBottom: 20,
  },
  scheduleHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  scheduleTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0D1B4B',
    letterSpacing: -0.3,
  },
  totalBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 12,
  },
  totalBadgeText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#0284C7',
  },
  viewAllLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },
  scheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
    overflow: 'hidden',
    padding: 14,
    marginBottom: 10,
    shadowColor: '#0D1B4B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  cardAccentBar: {
    position: 'absolute',
    left: 0,
    top: 12,
    bottom: 12,
    width: 3.5,
    borderRadius: 2,
    backgroundColor: '#2563EB',
  },
  scheduleCardInner: {
    paddingLeft: 6,
  },
  scheduleTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  scheduleTime: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#0D1B4B',
  },
  inMinsBadge: {
    backgroundColor: '#E6FBF5',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 10,
  },
  inMinsBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0D9488',
  },
  schedulePersonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  personAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
  },
  personInfo: {
    flex: 1,
  },
  personNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  personName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1B4B',
  },
  personService: {
    fontSize: 12.5,
    color: '#64748B',
  },
  personMeta: {
    fontSize: 11.5,
    color: '#94A3B8',
    marginTop: 2,
  },
});
