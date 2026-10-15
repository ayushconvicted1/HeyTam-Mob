import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { HeytamColors } from '@/constants/theme';
import { Client } from '@/data/mock-data';

interface ClientDetailModalProps {
  client: Client | null;
  visible: boolean;
  onClose: () => void;
}

export function ClientDetailModal({
  client,
  visible,
  onClose,
}: ClientDetailModalProps) {
  if (!client) return null;

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExecuteNextAction = () => {
    showToast(`AI Dispatch: "${client.nextBestAction.slice(0, 35)}..." sent!`);
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
                <Text style={styles.avatarText}>{client.initials}</Text>
              </View>
              <View style={styles.headerInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.clientName}>{client.name}</Text>
                  <View style={styles.vipBadge}>
                    <Text style={styles.vipBadgeText}>{client.membershipTier}</Text>
                  </View>
                </View>
                <Text style={styles.clientContact}>
                  {client.phone} • {client.email}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {toastMessage && (
            <View style={styles.toastBanner}>
              <Ionicons name="sparkles" size={16} color="#0284C7" />
              <Text style={styles.toastText}>{toastMessage}</Text>
            </View>
          )}

          <ScrollView
            style={styles.scrollList}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {/* LTV & Visit Statistics */}
            <View style={styles.metricsGrid}>
              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>Lifetime Value (LTV)</Text>
                <Text style={styles.metricValue}>${client.ltv.toLocaleString()}</Text>
                <Text style={styles.metricSub}>{client.visitCount} visits total</Text>
              </View>

              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>Business Credit</Text>
                <Text style={styles.metricCredit}>${client.businessCredit}</Text>
                <Text style={styles.metricSub}>Available balance</Text>
              </View>
            </View>

            {/* Next Best Action (PRD Section 8.1) */}
            <View style={styles.actionCard}>
              <LinearGradient
                colors={['rgba(59, 130, 246, 0.08)', 'rgba(34, 211, 238, 0.08)']}
                style={styles.actionGradient}>
                <View style={styles.actionHeader}>
                  <View style={styles.actionIconPill}>
                    <Ionicons name="sparkles" size={14} color={HeytamColors.blue} />
                    <Text style={styles.actionPillText}>AI Next Best Action</Text>
                  </View>
                  <Text style={styles.actionConfidence}>96% Confidence</Text>
                </View>
                <Text style={styles.actionText}>{client.nextBestAction}</Text>
                <TouchableOpacity
                  style={styles.executeButton}
                  onPress={handleExecuteNextAction}>
                  <LinearGradient
                    colors={HeytamColors.gradientBlueCyan}
                    style={styles.executeGradient}>
                    <Ionicons name="paper-plane" size={14} color="#FFFFFF" />
                    <Text style={styles.executeText}>Dispatch Recommendation</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            {/* Package & Balance */}
            <View style={styles.infoCard}>
              <View style={styles.infoHeader}>
                <Ionicons name="cube-outline" size={16} color={HeytamColors.navy} />
                <Text style={styles.infoTitle}>Package Entitlements</Text>
              </View>
              <Text style={styles.infoDesc}>{client.remainingPackages || 'No active packages'}</Text>
              <Text style={styles.infoMeta}>First visit: {client.firstVisit} • Last visit: {client.lastVisit}</Text>
            </View>

            {/* Clinical & Injector Notes */}
            <View style={styles.infoCard}>
              <View style={styles.infoHeader}>
                <Ionicons name="medical-outline" size={16} color={HeytamColors.navy} />
                <Text style={styles.infoTitle}>Practitioner Notes</Text>
              </View>
              <Text style={styles.notesText}>{client.clinicalNotes}</Text>
            </View>

            {/* HIPAA & Consent Compliance (Section 18.A) */}
            <View style={styles.complianceCard}>
              <View style={styles.infoHeader}>
                <Ionicons name="shield-checkmark-outline" size={16} color="#16A34A" />
                <Text style={styles.complianceTitle}>HIPAA & Consent Status</Text>
              </View>

              <View style={styles.complianceRow}>
                <View style={styles.checkItem}>
                  <Ionicons
                    name={client.hipaaSigned ? 'checkmark-circle' : 'alert-circle'}
                    size={16}
                    color={client.hipaaSigned ? '#16A34A' : '#EF4444'}
                  />
                  <Text style={styles.checkText}>HIPAA Agreement Signed</Text>
                </View>

                <View style={styles.checkItem}>
                  <Ionicons
                    name={client.smsOptIn ? 'checkmark-circle' : 'alert-circle'}
                    size={16}
                    color={client.smsOptIn ? '#16A34A' : '#EF4444'}
                  />
                  <Text style={styles.checkText}>SMS / Voice Opt-in Active</Text>
                </View>

                <View style={styles.checkItem}>
                  <Ionicons
                    name={!client.dndStatus ? 'checkmark-circle' : 'close-circle'}
                    size={16}
                    color={!client.dndStatus ? '#16A34A' : '#EF4444'}
                  />
                  <Text style={styles.checkText}>DND (Do Not Disturb): Off</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Footer close button */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.closeFullButton} onPress={onClose}>
              <Text style={styles.closeFullText}>Done</Text>
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
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: HeytamColors.blue,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: HeytamColors.blue,
  },
  headerInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  clientName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0D1B4B',
  },
  vipBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  vipBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: HeytamColors.blue,
  },
  clientContact: {
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
  metricValue: {
    fontSize: 20,
    fontWeight: '800',
    color: HeytamColors.blue,
  },
  metricCredit: {
    fontSize: 20,
    fontWeight: '800',
    color: HeytamColors.mint,
  },
  metricSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  actionCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.25)',
  },
  actionGradient: {
    padding: 14,
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionIconPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  actionPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: HeytamColors.blue,
  },
  actionConfidence: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  actionText: {
    fontSize: 13,
    color: '#1E293B',
    lineHeight: 18,
    marginBottom: 12,
    fontWeight: '500',
  },
  executeButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  executeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  executeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  infoCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1B4B',
  },
  infoDesc: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  infoMeta: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },
  notesText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
  },
  complianceCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  complianceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#166534',
  },
  complianceRow: {
    marginTop: 8,
    gap: 6,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkText: {
    fontSize: 12,
    color: '#1E293B',
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  closeFullButton: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeFullText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1B4B',
  },
});
