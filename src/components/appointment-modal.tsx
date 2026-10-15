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
import { Appointment } from '@/data/mock-data';

interface AppointmentModalProps {
  appointment: Appointment | null;
  visible: boolean;
  onClose: () => void;
  onUpdateAppointment?: (updated: Appointment) => void;
}

export function AppointmentModal({
  appointment,
  visible,
  onClose,
  onUpdateAppointment,
}: AppointmentModalProps) {
  if (!appointment) return null;

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCheckIn = () => {
    const updated = { ...appointment, isCheckedIn: true };
    onUpdateAppointment?.(updated);
    showToast(`${appointment.clientName} checked in and seated!`);
  };

  const handleSendDepositLink = () => {
    showToast(`Stripe deposit payment link ($50) sent via SMS to ${appointment.clientPhone}`);
  };

  const handleConfirm = () => {
    const updated = {
      ...appointment,
      confirmationStatus: 'Confirmed (SMS)' as const,
    };
    onUpdateAppointment?.(updated);
    showToast('Appointment confirmed via SMS dispatch!');
  };

  const handleFillWaitlist = () => {
    if (appointment.waitlistMatchAvailable) {
      const candidate = appointment.waitlistMatchAvailable;
      const updated = {
        ...appointment,
        clientName: candidate.name,
        treatment: candidate.service,
        clientPhone: candidate.phone,
        depositStatus: 'Paid ($50)' as const,
        confirmationStatus: 'Confirmed (SMS)' as const,
        waitlistMatchAvailable: undefined,
      };
      onUpdateAppointment?.(updated);
      showToast(`Slot assigned to waitlist client ${candidate.name}!`);
    }
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
            <View style={styles.headerLeft}>
              <LinearGradient
                colors={HeytamColors.gradientBlueCyan}
                style={styles.headerIcon}>
                <Ionicons name="calendar" size={18} color="#FFFFFF" />
              </LinearGradient>
              <View>
                <Text style={styles.headerTitle}>Session Details</Text>
                <Text style={styles.headerSubtitle}>{appointment.timeSlot}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {toastMessage && (
            <View style={styles.toastBanner}>
              <Ionicons name="checkmark-circle" size={16} color="#059669" />
              <Text style={styles.toastText}>{toastMessage}</Text>
            </View>
          )}

          <ScrollView
            style={styles.scrollList}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {/* Treatment & Client Card */}
            <View style={styles.mainCard}>
              <Text style={styles.treatmentName}>{appointment.treatment}</Text>
              <Text style={styles.clientName}>{appointment.clientName}</Text>
              <Text style={styles.clientPhone}>{appointment.clientPhone}</Text>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons name="person-outline" size={14} color="#64748B" />
                  <Text style={styles.metaText}>{appointment.practitioner}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="location-outline" size={14} color="#64748B" />
                  <Text style={styles.metaText}>{appointment.room}</Text>
                </View>
              </View>
            </View>

            {/* Waitlist Match Alert Card (if slot is open/cancelled) */}
            {appointment.waitlistMatchAvailable && (
              <View style={styles.waitlistCard}>
                <View style={styles.waitlistHeader}>
                  <View style={styles.waitlistTag}>
                    <Ionicons name="flash" size={12} color="#D97706" />
                    <Text style={styles.waitlistTagText}>Waitlist Candidate Ready</Text>
                  </View>
                  <Text style={styles.matchScore}>98% Match</Text>
                </View>
                <Text style={styles.waitlistName}>
                  {appointment.waitlistMatchAvailable.name}
                </Text>
                <Text style={styles.waitlistService}>
                  Desired treatment: {appointment.waitlistMatchAvailable.service}
                </Text>
                <TouchableOpacity
                  style={styles.fillWaitlistBtn}
                  onPress={handleFillWaitlist}>
                  <LinearGradient
                    colors={['#F59E0B', '#F97316']}
                    style={styles.fillGradient}>
                    <Ionicons name="person-add" size={14} color="#FFFFFF" />
                    <Text style={styles.fillBtnText}>1-Tap Fill From Waitlist</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}

            {/* Status Breakdown */}
            <View style={styles.statusGrid}>
              <View style={styles.statusBox}>
                <Text style={styles.statusLabel}>Deposit Status</Text>
                <View
                  style={[
                    styles.statusPill,
                    appointment.depositStatus.includes('Paid')
                      ? styles.paidPill
                      : styles.pendingPill,
                  ]}>
                  <Text
                    style={[
                      styles.statusPillText,
                      appointment.depositStatus.includes('Paid')
                        ? styles.paidText
                        : styles.pendingText,
                    ]}>
                    {appointment.depositStatus}
                  </Text>
                </View>
              </View>

              <View style={styles.statusBox}>
                <Text style={styles.statusLabel}>Confirmation State</Text>
                <View
                  style={[
                    styles.statusPill,
                    appointment.confirmationStatus.includes('Confirmed')
                      ? styles.paidPill
                      : styles.pendingPill,
                  ]}>
                  <Text
                    style={[
                      styles.statusPillText,
                      appointment.confirmationStatus.includes('Confirmed')
                        ? styles.paidText
                        : styles.pendingText,
                    ]}>
                    {appointment.confirmationStatus}
                  </Text>
                </View>
              </View>
            </View>

            {/* AI No-Show Risk Metric (Section 28C.2) */}
            <View style={styles.riskCard}>
              <View style={styles.riskHeader}>
                <Ionicons name="analytics-outline" size={16} color={HeytamColors.blue} />
                <Text style={styles.riskTitle}>AI No-Show Risk Assessment</Text>
              </View>
              <View style={styles.riskBarContainer}>
                <View
                  style={[
                    styles.riskBarFill,
                    {
                      width: `${Math.max(appointment.noShowRisk.percentage, 5)}%`,
                      backgroundColor:
                        appointment.noShowRisk.percentage > 40
                          ? '#EF4444'
                          : appointment.noShowRisk.percentage > 15
                          ? '#F59E0B'
                          : '#10B981',
                    },
                  ]}
                />
              </View>
              <View style={styles.riskFooter}>
                <Text style={styles.riskLevelText}>
                  Risk: {appointment.noShowRisk.level} ({appointment.noShowRisk.percentage}%)
                </Text>
                <Text style={styles.riskExplanation}>
                  {appointment.noShowRisk.percentage > 40
                    ? 'Automated voice confirmation queued'
                    : 'SMS reminder verified'}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.footerActions}>
            {!appointment.isCheckedIn && (
              <TouchableOpacity style={styles.checkInBtn} onPress={handleCheckIn}>
                <LinearGradient
                  colors={HeytamColors.gradientBlueCyan}
                  style={styles.checkInGradient}>
                  <Ionicons name="checkmark-done" size={16} color="#FFFFFF" />
                  <Text style={styles.checkInText}>Patient Arrived / Check-in</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}

            {appointment.depositStatus.includes('Pending') && (
              <TouchableOpacity
                style={styles.depositBtn}
                onPress={handleSendDepositLink}>
                <Ionicons name="link-outline" size={16} color={HeytamColors.blue} />
                <Text style={styles.depositBtnText}>Resend Stripe Deposit Link</Text>
              </TouchableOpacity>
            )}

            {!appointment.confirmationStatus.includes('Confirmed') && (
              <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
                <Ionicons name="chatbubble-outline" size={16} color="#0D1B4B" />
                <Text style={styles.confirmBtnText}>Send Instant Confirmation SMS</Text>
              </TouchableOpacity>
            )}
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0D1B4B',
  },
  headerSubtitle: {
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
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  toastText: {
    fontSize: 13,
    color: '#065F46',
    fontWeight: '600',
  },
  scrollList: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  mainCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  treatmentName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0D1B4B',
    marginBottom: 4,
  },
  clientName: {
    fontSize: 15,
    fontWeight: '600',
    color: HeytamColors.blue,
  },
  clientPhone: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  waitlistCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  waitlistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  waitlistTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  waitlistTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  matchScore: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  waitlistName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#78350F',
  },
  waitlistService: {
    fontSize: 12,
    color: '#92400E',
    marginTop: 2,
    marginBottom: 10,
  },
  fillWaitlistBtn: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  fillGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  fillBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statusGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  statusBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statusLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 6,
  },
  statusPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  paidPill: {
    backgroundColor: '#DCFCE7',
  },
  paidText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },
  pendingPill: {
    backgroundColor: '#FEF3C7',
  },
  pendingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  statusPillText: {},
  riskCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  riskTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0D1B4B',
  },
  riskBarContainer: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  riskBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  riskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  riskLevelText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  riskExplanation: {
    fontSize: 11,
    color: '#64748B',
  },
  footerActions: {
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  checkInBtn: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  checkInGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  checkInText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  depositBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  depositBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: HeytamColors.blue,
  },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 12,
  },
  confirmBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0D1B4B',
  },
});
