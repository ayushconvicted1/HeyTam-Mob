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
import { MockApprovals, ApprovalTask } from '@/data/mock-data';

interface ApprovalsModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ApprovalsModal({ visible, onClose }: ApprovalsModalProps) {
  const [tasks, setTasks] = useState<ApprovalTask[]>(MockApprovals);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAction = (taskId: string, action: 'Approved' | 'Declined') => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: action } : t))
    );
    const task = tasks.find((t) => t.id === taskId);
    setFeedback(`${task?.title || 'Task'} ${action.toLowerCase()} successfully!`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const pendingCount = tasks.filter((t) => t.status === 'Pending').length;

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
                <Ionicons name="shield-checkmark" size={18} color="#FFFFFF" />
              </LinearGradient>
              <View>
                <Text style={styles.headerTitle}>Human Approvals Queue</Text>
                <Text style={styles.headerSubtitle}>
                  {pendingCount} item{pendingCount === 1 ? '' : 's'} requiring decision
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {feedback && (
            <View style={styles.feedbackBanner}>
              <Ionicons name="checkmark-circle" size={16} color="#4ADE80" />
              <Text style={styles.feedbackText}>{feedback}</Text>
            </View>
          )}

          <ScrollView
            style={styles.scrollList}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {tasks.map((task) => {
              const isPending = task.status === 'Pending';
              return (
                <View
                  key={task.id}
                  style={[
                    styles.taskCard,
                    !isPending && styles.taskCardCompleted,
                  ]}>
                  <View style={styles.taskCardHeader}>
                    <View style={styles.riskBadge}>
                      <Text style={styles.riskBadgeText}>{task.riskTier}</Text>
                    </View>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        task.status === 'Approved' && styles.approvedBadge,
                        task.status === 'Declined' && styles.declinedBadge,
                      ]}>
                      <Text
                        style={[
                          styles.statusBadgeText,
                          task.status === 'Approved' && styles.approvedText,
                          task.status === 'Declined' && styles.declinedText,
                        ]}>
                        {task.status}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.clientLabel}>
                    Patient: <Text style={styles.clientBold}>{task.clientName}</Text>
                  </Text>
                  <Text style={styles.taskDesc}>{task.description}</Text>

                  <View style={styles.taskMetaRow}>
                    <Text style={styles.taskMetaText}>
                      Requested by {task.requestedBy} • {task.createdAt}
                    </Text>
                    {task.amount ? (
                      <Text style={styles.taskAmount}>${task.amount}</Text>
                    ) : null}
                  </View>

                  {isPending && (
                    <View style={styles.actionRow}>
                      <TouchableOpacity
                        style={styles.declineButton}
                        onPress={() => handleAction(task.id, 'Declined')}>
                        <Ionicons name="close-circle-outline" size={16} color="#EF4444" />
                        <Text style={styles.declineButtonText}>Decline</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.approveButton}
                        onPress={() => handleAction(task.id, 'Approved')}>
                        <LinearGradient
                          colors={HeytamColors.gradientBlueCyan}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={styles.approveGradient}>
                          <Ionicons name="checkmark-circle-outline" size={16} color="#FFFFFF" />
                          <Text style={styles.approveButtonText}>Approve</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>

          {/* Footer note */}
          <View style={styles.footer}>
            <Ionicons name="lock-closed-outline" size={14} color="#64748B" />
            <Text style={styles.footerText}>
              Per PRD Section 10: R3 & R4 decisions require explicit human authority.
            </Text>
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
    maxHeight: '85%',
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
  feedbackBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  feedbackText: {
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
  taskCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  taskCardCompleted: {
    opacity: 0.6,
  },
  taskCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  riskBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  riskBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0D1B4B',
    flex: 1,
  },
  statusBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#D97706',
  },
  approvedBadge: {
    backgroundColor: '#DCFCE7',
  },
  approvedText: {
    color: '#16A34A',
  },
  declinedBadge: {
    backgroundColor: '#FEE2E2',
  },
  declinedText: {
    color: '#DC2626',
  },
  clientLabel: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 4,
  },
  clientBold: {
    fontWeight: '700',
    color: '#0D1B4B',
  },
  taskDesc: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
    marginBottom: 10,
  },
  taskMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginBottom: 12,
  },
  taskMetaText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  taskAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1B4B',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  declineButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFF1F2',
    borderWidth: 1,
    borderColor: '#FECDD3',
  },
  declineButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E11D48',
  },
  approveButton: {
    flex: 1.5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  approveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  approveButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  footerText: {
    fontSize: 11,
    color: '#64748B',
    flex: 1,
  },
});
