import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { HeytamColors } from '@/constants/theme';
import { Lead } from '@/data/mock-data';

interface LeadDetailModalProps {
  lead: Lead | null;
  visible: boolean;
  onClose: () => void;
  onUpdateLead?: (updated: Lead) => void;
}

export function LeadDetailModal({
  lead,
  visible,
  onClose,
  onUpdateLead,
}: LeadDetailModalProps) {
  if (!lead) return null;

  const [humanTakeover, setHumanTakeover] = useState(lead.hasHumanTakeover);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleTakeover = (value: boolean) => {
    setHumanTakeover(value);
    const updated = { ...lead, hasHumanTakeover: value };
    onUpdateLead?.(updated);
    if (value) {
      showToast('AI Agent paused. Human takeover enabled.');
    } else {
      showToast('AI Agent resumed autonomous engagement.');
    }
  };

  const handleCall = () => {
    if (Platform.OS === 'web') {
      showToast(`Initiating outbound call to ${lead.name} (${lead.phone})...`);
    } else {
      Alert.alert('Call Prospect', `Dialing ${lead.name} at ${lead.phone}`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call Now', onPress: () => showToast(`Dialed ${lead.phone}`) },
      ]);
    }
  };

  const handleMessage = () => {
    showToast(`SMS thread opened with ${lead.name}`);
  };

  const handleBook = () => {
    showToast(`Consultation booking link sent to ${lead.name}`);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {lead.name.split(' ').map((n) => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.headerInfo}>
                <Text style={styles.leadName}>{lead.name}</Text>
                <Text style={styles.leadContact}>{lead.phone} • {lead.email}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {toastMessage && (
            <View style={styles.toastBanner}>
              <Ionicons name="information-circle" size={16} color="#0284C7" />
              <Text style={styles.toastText}>{toastMessage}</Text>
            </View>
          )}

          <ScrollView
            style={styles.scrollList}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {/* Quick Metrics Grid */}
            <View style={styles.metricsGrid}>
              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>Intent Score</Text>
                <View style={styles.scoreRow}>
                  <Text style={styles.metricScore}>{lead.intentScore}%</Text>
                  <View style={styles.highBadge}>
                    <Text style={styles.highBadgeText}>High Fit</Text>
                  </View>
                </View>
              </View>

              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>Est. Value</Text>
                <Text style={styles.metricValue}>${lead.estimatedValue}</Text>
              </View>

              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>Lead Source</Text>
                <Text style={styles.metricSource}>{lead.source}</Text>
              </View>
            </View>

            {/* Human Takeover Switch (PRD 28C.3) */}
            <View style={styles.takeoverCard}>
              <View style={styles.takeoverTextGroup}>
                <View style={styles.takeoverTitleRow}>
                  <Ionicons
                    name={humanTakeover ? 'person' : 'hardware-chip'}
                    size={16}
                    color={humanTakeover ? '#E11D48' : HeytamColors.blue}
                  />
                  <Text style={styles.takeoverTitle}>
                    {humanTakeover ? 'Human Takeover Active' : 'AI Autonomous Mode'}
                  </Text>
                </View>
                <Text style={styles.takeoverSubtitle}>
                  {humanTakeover
                    ? 'AI messaging is paused. You have exclusive control.'
                    : `${lead.assignedAgent} is actively managing this lead.`}
                </Text>
              </View>
              <Switch
                value={humanTakeover}
                onValueChange={handleToggleTakeover}
                trackColor={{ false: '#CBD5E1', true: '#FDA4AF' }}
                thumbColor={humanTakeover ? '#E11D48' : '#3B82F6'}
              />
            </View>

            {/* AI Summary */}
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Ionicons name="sparkles" size={16} color={HeytamColors.blue} />
                <Text style={styles.sectionTitle}>AI Summary & Context</Text>
              </View>
              <Text style={styles.summaryText}>{lead.aiSummary}</Text>
              <View style={styles.agentTag}>
                <Text style={styles.agentTagText}>Handled by: {lead.assignedAgent}</Text>
              </View>
            </View>

            {/* In-Call / Conversation Transcript */}
            {lead.transcript && (
              <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <Ionicons name="chatbubbles" size={16} color={HeytamColors.teal} />
                  <Text style={styles.sectionTitle}>Live Conversation Transcript</Text>
                </View>
                <View style={styles.transcriptContainer}>
                  {lead.transcript.map((msg, idx) => (
                    <View
                      key={idx}
                      style={[
                        styles.bubbleRow,
                        msg.sender === 'Lead' ? styles.bubbleLeadRow : styles.bubbleAiRow,
                      ]}>
                      <View
                        style={[
                          styles.chatBubble,
                          msg.sender === 'Lead' ? styles.chatBubbleLead : styles.chatBubbleAi,
                        ]}>
                        <View style={styles.bubbleHeader}>
                          <Text style={styles.senderName}>
                            {msg.sender === 'AI' ? 'Heytam AI' : lead.name}
                          </Text>
                          <Text style={styles.msgTime}>{msg.time}</Text>
                        </View>
                        <Text style={styles.bubbleText}>{msg.text}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>

          {/* Quick Actions Footer */}
          <View style={styles.footerActions}>
            <TouchableOpacity style={styles.actionBtn} onPress={handleCall}>
              <LinearGradient
                colors={HeytamColors.gradientBlueCyan}
                style={styles.actionBtnGradient}>
                <Ionicons name="call" size={16} color="#FFFFFF" />
                <Text style={styles.actionBtnText}>Call Now</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtnSecondary} onPress={handleMessage}>
              <Ionicons name="chatbubble-ellipses" size={16} color="#0D1B4B" />
              <Text style={styles.actionBtnSecondaryText}>SMS / WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtnOutline} onPress={handleBook}>
              <Ionicons name="calendar-outline" size={16} color={HeytamColors.blue} />
              <Text style={styles.actionBtnOutlineText}>Book</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(13, 27, 75, 0.65)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    ...Platform.select({
      web: {
        maxWidth: 600,
        alignSelf: 'center',
        width: '100%',
        borderRadius: 24,
        marginBottom: 20,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: HeytamColors.blue,
  },
  headerInfo: {
    flex: 1,
  },
  leadName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0D1B4B',
  },
  leadContact: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  closeButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  toastBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  toastText: {
    fontSize: 13,
    color: '#0369A1',
    fontWeight: '600',
  },
  scrollList: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  metricBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metricLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 4,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricScore: {
    fontSize: 16,
    fontWeight: '800',
    color: HeytamColors.blue,
  },
  highBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  highBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#16A34A',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0D1B4B',
  },
  metricSource: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  takeoverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  takeoverTextGroup: {
    flex: 1,
    paddingRight: 10,
  },
  takeoverTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  takeoverTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1B4B',
  },
  takeoverSubtitle: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  sectionCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1B4B',
  },
  summaryText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 19,
    marginBottom: 8,
  },
  agentTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  agentTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: HeytamColors.blue,
  },
  transcriptContainer: {
    gap: 10,
    marginTop: 4,
  },
  bubbleRow: {
    flexDirection: 'row',
  },
  bubbleAiRow: {
    justifyContent: 'flex-start',
  },
  bubbleLeadRow: {
    justifyContent: 'flex-end',
  },
  chatBubble: {
    maxWidth: '85%',
    borderRadius: 14,
    padding: 10,
  },
  chatBubbleAi: {
    backgroundColor: '#EFF6FF',
    borderTopLeftRadius: 2,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  chatBubbleLead: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bubbleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    gap: 12,
  },
  senderName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0D1B4B',
  },
  msgTime: {
    fontSize: 10,
    color: '#94A3B8',
  },
  bubbleText: {
    fontSize: 13,
    color: '#1E293B',
    lineHeight: 18,
  },
  footerActions: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  actionBtn: {
    flex: 1.2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  actionBtnSecondary: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 12,
  },
  actionBtnSecondaryText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0D1B4B',
  },
  actionBtnOutline: {
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
  },
  actionBtnOutlineText: {
    fontSize: 12,
    fontWeight: '700',
    color: HeytamColors.blue,
  },
});
