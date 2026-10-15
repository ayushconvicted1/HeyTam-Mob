import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeytamColors, BottomTabInset, MaxContentWidth } from '@/constants/theme';
import { HeytamHeader } from '@/components/heytam-header';
import {
  MockTransactions,
  TokenWalletData,
  Transaction,
} from '@/data/mock-data';
import { TokenTopupModal } from '@/components/token-topup-modal';

export default function PaymentsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'Revenue' | 'Tokens'>('Revenue');
  const [transactions] = useState<Transaction[]>(MockTransactions);
  const [tokenBalance, setTokenBalance] = useState<number>(
    TokenWalletData.availableTokens
  );
  const [topupVisible, setTopupVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreatePaymentLink = () => {
    showToast('Payment link generated & copied to clipboard!');
  };

  return (
    <View style={styles.screenContainer}>
      <HeytamHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 16) + 85 },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.centerConstraint}>
          {/* Header Title */}
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>Payments & Money</Text>
            <Text style={styles.pageSubtitle}>
              Practice revenue, deposits & Heytam Token (HT) usage economics
            </Text>
          </View>

          {/* Segmented Control */}
          <View style={styles.segmentedContainer}>
            <TouchableOpacity
              style={[
                styles.segmentBtn,
                activeTab === 'Revenue' && styles.segmentBtnActive,
              ]}
              onPress={() => setActiveTab('Revenue')}
              activeOpacity={0.8}>
              <Ionicons
                name="cash-outline"
                size={16}
                color={activeTab === 'Revenue' ? '#FFFFFF' : '#64748B'}
              />
              <Text
                style={[
                  styles.segmentBtnText,
                  activeTab === 'Revenue' && styles.segmentBtnTextActive,
                ]}>
                Practice Revenue
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.segmentBtn,
                activeTab === 'Tokens' && styles.segmentBtnActive,
              ]}
              onPress={() => setActiveTab('Tokens')}
              activeOpacity={0.8}>
              <Ionicons
                name="wallet-outline"
                size={16}
                color={activeTab === 'Tokens' ? '#FFFFFF' : '#64748B'}
              />
              <Text
                style={[
                  styles.segmentBtnText,
                  activeTab === 'Tokens' && styles.segmentBtnTextActive,
                ]}>
                HT Token Economy
              </Text>
            </TouchableOpacity>
          </View>

          {toastMessage && (
            <View style={styles.toastBanner}>
              <Ionicons name="checkmark-circle" size={16} color="#059669" />
              <Text style={styles.toastText}>{toastMessage}</Text>
            </View>
          )}

          {activeTab === 'Revenue' ? (
            /* TAB 1: PRACTICE REVENUE & DEPOSITS */
            <View style={styles.tabContent}>
              {/* Revenue Hero Cards */}
              <View style={styles.revenueHero}>
                <LinearGradient
                  colors={['#0D1B4B', '#162866']}
                  style={styles.revenueGradient}>
                  <View style={styles.revTopRow}>
                    <Text style={styles.revHeroLabel}>Today's Collected Revenue</Text>
                    <View style={styles.growthBadge}>
                      <Ionicons name="arrow-up" size={11} color="#4ADE80" />
                      <Text style={styles.growthBadgeText}>+18.4%</Text>
                    </View>
                  </View>
                  <Text style={styles.revHeroAmount}>$4,250.00</Text>

                  <View style={styles.revSubRow}>
                    <View style={styles.revSubItem}>
                      <Text style={styles.revSubLabel}>Month-to-Date</Text>
                      <Text style={styles.revSubValue}>$78,900</Text>
                    </View>
                    <View style={styles.revSubDivider} />
                    <View style={styles.revSubItem}>
                      <Text style={styles.revSubLabel}>AI-Recovered Revenue</Text>
                      <Text style={[styles.revSubValue, { color: HeytamColors.mint }]}>
                        +$12,300
                      </Text>
                    </View>
                    <View style={styles.revSubDivider} />
                    <View style={styles.revSubItem}>
                      <Text style={styles.revSubLabel}>Held Deposits</Text>
                      <Text style={[styles.revSubValue, { color: HeytamColors.cyan }]}>
                        $2,100
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>

              {/* Quick Action: New Payment Link */}
              <TouchableOpacity
                style={styles.newLinkBtn}
                onPress={handleCreatePaymentLink}
                activeOpacity={0.85}>
                <LinearGradient
                  colors={HeytamColors.gradientBlueCyan}
                  style={styles.newLinkGradient}>
                  <Ionicons name="link-outline" size={18} color="#FFFFFF" />
                  <Text style={styles.newLinkText}>
                    Generate Instant Stripe Deposit / Payment Link
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Transactions Section */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Transactions & Deposits</Text>
                <Text style={styles.sectionCount}>{transactions.length} items</Text>
              </View>

              <View style={styles.transactionsList}>
                {transactions.map((tx) => {
                  const isSettled = tx.status === 'Settled';
                  const isDeposit = tx.type === 'Deposit';

                  return (
                    <View key={tx.id} style={styles.txCard}>
                      <View style={styles.txIconBox}>
                        <Ionicons
                          name={
                            isDeposit
                              ? 'shield-checkmark-outline'
                              : 'card-outline'
                          }
                          size={18}
                          color={isDeposit ? HeytamColors.blue : HeytamColors.navy}
                        />
                      </View>

                      <View style={styles.txInfo}>
                        <View style={styles.txClientRow}>
                          <Text style={styles.txClientName}>{tx.clientName}</Text>
                          <Text style={styles.txAmount}>${tx.amount.toFixed(2)}</Text>
                        </View>
                        <Text style={styles.txTreatment}>{tx.treatment}</Text>
                        <View style={styles.txMetaRow}>
                          <Text style={styles.txMetaText}>
                            {tx.method} • {tx.date}
                          </Text>
                          <View
                            style={[
                              styles.txStatusPill,
                              isSettled ? styles.txSettled : styles.txPending,
                            ]}>
                            <Text
                              style={[
                                styles.txStatusText,
                                isSettled ? styles.txSettledText : styles.txPendingText,
                              ]}>
                              {tx.status}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          ) : (
            /* TAB 2: HEYTAM TOKEN (HT) ECONOMY DASHBOARD */
            <View style={styles.tabContent}>
              {/* HT Wallet Balance Card */}
              <View style={styles.walletCard}>
                <LinearGradient
                  colors={['#0D1B4B', '#1E3A8A']}
                  style={styles.walletGradient}>
                  <View style={styles.walletTopRow}>
                    <View style={styles.walletBadge}>
                      <Ionicons name="sparkles" size={12} color="#22D3EE" />
                      <Text style={styles.walletBadgeText}>HEYTAM TOKEN WALLET</Text>
                    </View>
                    <Text style={styles.walletPlan}>{TokenWalletData.planTier}</Text>
                  </View>

                  <Text style={styles.walletTokenAmount}>
                    {tokenBalance.toLocaleString()}{' '}
                    <Text style={styles.tokenUnit}>HT Available</Text>
                  </Text>
                  <Text style={styles.walletReserved}>
                    +{TokenWalletData.reservedTokens.toLocaleString()} HT reserved for scheduled cycles
                  </Text>

                  {/* Runway Bar */}
                  <View style={styles.runwayContainer}>
                    <View style={styles.runwayHeader}>
                      <Text style={styles.runwayLabel}>
                        Runway: {TokenWalletData.runwayDays} Days Remaining
                      </Text>
                      <Text style={styles.runwayDate}>
                        Exhaustion: {TokenWalletData.projectedExhaustion}
                      </Text>
                    </View>
                    <View style={styles.runwayTrack}>
                      <View style={[styles.runwayFill, { width: '74%' }]} />
                    </View>
                  </View>

                  {/* Top-up Button */}
                  <TouchableOpacity
                    style={styles.topupBtn}
                    onPress={() => setTopupVisible(true)}
                    activeOpacity={0.85}>
                    <LinearGradient
                      colors={HeytamColors.gradientBlueCyan}
                      style={styles.topupGradient}>
                      <Ionicons name="add-circle-outline" size={16} color="#FFFFFF" />
                      <Text style={styles.topupBtnText}>Top Up Tokens</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              {/* Consumption by Specialized Agent (PRD Section 12.1 & 14.3) */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Agent Consumption Breakdown</Text>
                <Text style={styles.sectionCount}>Responsive (5m)</Text>
              </View>

              <View style={styles.agentBreakdownCard}>
                {TokenWalletData.agentBreakdown.map((agent) => (
                  <View key={agent.name} style={styles.agentRow}>
                    <View style={[styles.agentColorBar, { backgroundColor: agent.color }]} />
                    <View style={styles.agentInfoCol}>
                      <View style={styles.agentNameRow}>
                        <Text style={styles.agentNameText}>{agent.name}</Text>
                        <Text style={styles.agentTokensText}>
                          {agent.tokens.toLocaleString()} HT ({agent.percentage}%)
                        </Text>
                      </View>
                      <View style={styles.agentProgressTrack}>
                        <View
                          style={[
                            styles.agentProgressFill,
                            { width: `${agent.percentage}%`, backgroundColor: agent.color },
                          ]}
                        />
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Orchestration Control Status (PRD 14.1) */}
              <View style={styles.engineCard}>
                <View style={styles.engineHeader}>
                  <Ionicons name="hardware-chip-outline" size={18} color={HeytamColors.blue} />
                  <Text style={styles.engineTitle}>Orchestration Control Plane</Text>
                  <View style={styles.enginePill}>
                    <Text style={styles.enginePillText}>Healthy</Text>
                  </View>
                </View>

                <View style={styles.engineGrid}>
                  <View style={styles.engineItem}>
                    <Text style={styles.engineItemLabel}>Frequency</Text>
                    <Text style={styles.engineItemVal}>Every 5 min</Text>
                  </View>
                  <View style={styles.engineItem}>
                    <Text style={styles.engineItemLabel}>Latency (p95)</Text>
                    <Text style={styles.engineItemVal}>38 ms</Text>
                  </View>
                  <View style={styles.engineItem}>
                    <Text style={styles.engineItemLabel}>Next Cycle</Text>
                    <Text style={styles.engineItemVal}>2m 14s</Text>
                  </View>
                  <View style={styles.engineItem}>
                    <Text style={styles.engineItemLabel}>Connectors</Text>
                    <Text style={styles.engineItemVal}>4 Live</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Token Topup Modal */}
      <TokenTopupModal
        visible={topupVisible}
        onClose={() => setTopupVisible(false)}
        onTopupSuccess={(tokens) => setTokenBalance((prev) => prev + tokens)}
      />
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
    paddingTop: 16,
  },
  centerConstraint: {
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  pageHeader: {
    marginBottom: 14,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0D1B4B',
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 3,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  segmentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  segmentBtnActive: {
    backgroundColor: '#0D1B4B',
  },
  segmentBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  segmentBtnTextActive: {
    color: '#FFFFFF',
  },
  toastBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 12,
  },
  toastText: {
    fontSize: 13,
    color: '#065F46',
    fontWeight: '600',
  },
  tabContent: {
    gap: 14,
  },
  revenueHero: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#0D1B4B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  revenueGradient: {
    padding: 18,
  },
  revTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  revHeroLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#93C5FD',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.3)',
  },
  growthBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#4ADE80',
  },
  revHeroAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 6,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  revSubRow: {
    flexDirection: 'row',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.12)',
  },
  revSubItem: {
    flex: 1,
  },
  revSubLabel: {
    fontSize: 10,
    color: '#93C5FD',
    fontWeight: '600',
  },
  revSubValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 3,
  },
  revSubDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginHorizontal: 8,
  },
  newLinkBtn: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  newLinkGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  newLinkText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0D1B4B',
  },
  sectionCount: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  transactionsList: {
    gap: 10,
  },
  txCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  txIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txInfo: {
    flex: 1,
  },
  txClientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txClientName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0D1B4B',
  },
  txAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0D1B4B',
  },
  txTreatment: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
  txMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  txMetaText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  txStatusPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  txSettled: {
    backgroundColor: '#DCFCE7',
  },
  txSettledText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803D',
  },
  txPending: {
    backgroundColor: '#FEF3C7',
  },
  txPendingText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B45309',
  },
  txStatusText: {},
  walletCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#0D1B4B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  walletGradient: {
    padding: 18,
  },
  walletTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(34, 211, 238, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  walletBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#22D3EE',
    letterSpacing: 0.5,
  },
  walletPlan: {
    fontSize: 11,
    fontWeight: '600',
    color: '#93C5FD',
  },
  walletTokenAmount: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 10,
  },
  tokenUnit: {
    fontSize: 16,
    fontWeight: '600',
    color: '#93C5FD',
  },
  walletReserved: {
    fontSize: 12,
    color: '#93C5FD',
    marginTop: 2,
  },
  runwayContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 12,
    marginTop: 14,
    marginBottom: 14,
  },
  runwayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  runwayLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  runwayDate: {
    fontSize: 11,
    color: '#93C5FD',
  },
  runwayTrack: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  runwayFill: {
    height: '100%',
    backgroundColor: HeytamColors.cyan,
    borderRadius: 3,
  },
  topupBtn: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  topupGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  topupBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  agentBreakdownCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 14,
  },
  agentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  agentColorBar: {
    width: 4,
    height: 28,
    borderRadius: 2,
  },
  agentInfoCol: {
    flex: 1,
  },
  agentNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  agentNameText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0D1B4B',
  },
  agentTokensText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  agentProgressTrack: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  agentProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  engineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  engineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  engineTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1B4B',
    flex: 1,
  },
  enginePill: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  enginePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803D',
  },
  engineGrid: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
  },
  engineItem: {
    flex: 1,
    alignItems: 'center',
  },
  engineItemLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  engineItemVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0D1B4B',
    marginTop: 2,
  },
});
