import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeytamColors, BottomTabInset, MaxContentWidth } from '@/constants/theme';
import { HeytamHeader } from '@/components/heytam-header';
import { MockClients, MockReviews, Client, PatientReview } from '@/data/mock-data';
import { ClientDetailModal } from '@/components/client-detail-modal';

export default function ClientsScreen() {
  const insets = useSafeAreaInsets();
  const [subTab, setSubTab] = useState<'Directory' | 'Reviews'>('Directory');
  const [clients] = useState<Client[]>(MockClients);
  const [reviews] = useState<PatientReview[]>(MockReviews);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const filterOptions = [
    { label: 'All', count: clients.length },
    { label: 'VIP Members', count: clients.filter((c) => c.membershipTier.includes('Club') || c.membershipTier.includes('Platinum')).length },
    { label: 'Has Balance', count: clients.filter((c) => c.businessCredit > 0).length },
    { label: 'Reactivation', count: clients.filter((c) => c.tags.includes('Reactivation Candidate')).length },
  ];

  const filteredClients = clients.filter((client) => {
    const isVip = client.membershipTier.includes('Club') || client.membershipTier.includes('Platinum');
    const hasBalance = client.businessCredit > 0;
    const isReactivation = client.tags.includes('Reactivation Candidate');

    let matchesFilter = true;
    if (activeFilter === 'VIP Members') matchesFilter = isVip;
    if (activeFilter === 'Has Balance') matchesFilter = hasBalance;
    if (activeFilter === 'Reactivation') matchesFilter = isReactivation;

    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.remainingPackages.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleOpenClient = (client: Client) => {
    setSelectedClient(client);
    setModalVisible(true);
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
            <Text style={styles.pageTitle}>Clients & Accounts</Text>
            <Text style={styles.pageSubtitle}>
              Canonical client directory, SLA lineage, contract value & verified partner reviews
            </Text>
          </View>

          {/* Sub Tabs: Directory vs Reviews */}
          <View style={styles.subTabRow}>
            <TouchableOpacity
              style={[
                styles.subTabBtn,
                subTab === 'Directory' && styles.subTabBtnActive,
              ]}
              onPress={() => setSubTab('Directory')}
              activeOpacity={0.8}>
              <Ionicons
                name="people-outline"
                size={16}
                color={subTab === 'Directory' ? '#FFFFFF' : '#64748B'}
              />
              <Text
                style={[
                  styles.subTabText,
                  subTab === 'Directory' && styles.subTabTextActive,
                ]}>
                Client Directory (342)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.subTabBtn,
                subTab === 'Reviews' && styles.subTabBtnActive,
              ]}
              onPress={() => setSubTab('Reviews')}
              activeOpacity={0.8}>
              <Ionicons
                name="star"
                size={16}
                color={subTab === 'Reviews' ? '#F59E0B' : '#64748B'}
              />
              <Text
                style={[
                  styles.subTabText,
                  subTab === 'Reviews' && styles.subTabTextActive,
                ]}>
                Client Reviews (4.9★)
              </Text>
            </TouchableOpacity>
          </View>

          {subTab === 'Directory' ? (
            <>
              {/* Directory Summary Bar */}
              <View style={styles.summaryRow}>
                <View style={styles.summaryBox}>
                  <Text style={styles.summaryLabel}>Total Clients</Text>
                  <Text style={styles.summaryVal}>342</Text>
                </View>
                <View style={styles.summaryBox}>
                  <Text style={styles.summaryLabel}>VIP Ratio</Text>
                  <Text style={[styles.summaryVal, { color: HeytamColors.blue }]}>38%</Text>
                </View>
                <View style={styles.summaryBox}>
                  <Text style={styles.summaryLabel}>Avg Lifetime Value</Text>
                  <Text style={[styles.summaryVal, { color: HeytamColors.mint }]}>$4,250</Text>
                </View>
                <View style={styles.summaryBox}>
                  <Text style={styles.summaryLabel}>Client Credits</Text>
                  <Text style={styles.summaryVal}>$725</Text>
                </View>
              </View>

              {/* Search bar */}
              <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={18} color="#64748B" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by name, phone or treatment history..."
                  placeholderTextColor="#94A3B8"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Ionicons name="close-circle" size={16} color="#94A3B8" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Filter Chips */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filtersScroll}
                contentContainerStyle={styles.filtersContent}>
                {filterOptions.map((f) => {
                  const isSelected = activeFilter === f.label;
                  return (
                    <TouchableOpacity
                      key={f.label}
                      style={[
                        styles.filterChip,
                        isSelected && styles.filterChipActive,
                      ]}
                      onPress={() => setActiveFilter(f.label)}>
                      <Text
                        style={[
                          styles.filterChipText,
                          isSelected && styles.filterChipTextActive,
                        ]}>
                        {f.label}
                      </Text>
                      <View
                        style={[
                          styles.chipBadge,
                          isSelected && styles.chipBadgeActive,
                        ]}>
                        <Text
                          style={[
                            styles.chipBadgeText,
                            isSelected && styles.chipBadgeTextActive,
                          ]}>
                          {f.count}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Clients List */}
              <View style={styles.clientsList}>
                {filteredClients.map((client) => {
                  const isDiamond = client.membershipTier.includes('Diamond');

                  return (
                    <TouchableOpacity
                      key={client.id}
                      style={styles.clientCard}
                      onPress={() => handleOpenClient(client)}
                      activeOpacity={0.85}>
                      <View style={styles.cardHeader}>
                        <View style={styles.avatar}>
                          <Text style={styles.avatarText}>{client.initials}</Text>
                        </View>

                        <View style={styles.headerTextCol}>
                          <View style={styles.nameRow}>
                            <Text style={styles.clientName}>{client.name}</Text>
                            <View
                              style={[
                                styles.tierBadge,
                                isDiamond && styles.tierBadgeDiamond,
                              ]}>
                              <Text
                                style={[
                                  styles.tierBadgeText,
                                  isDiamond && styles.tierBadgeDiamondText,
                                ]}>
                                {client.membershipTier}
                              </Text>
                            </View>
                          </View>
                          <Text style={styles.clientContact}>
                            {client.phone} • {client.email}
                          </Text>
                        </View>

                        <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                      </View>

                      {/* Stats Grid inside Card */}
                      <View style={styles.cardStatsRow}>
                        <View style={styles.cardStatItem}>
                          <Text style={styles.cardStatLabel}>Lifetime Spend</Text>
                          <Text style={styles.cardStatValue}>
                            ${client.ltv.toLocaleString()}
                          </Text>
                        </View>

                        <View style={styles.cardStatItem}>
                          <Text style={styles.cardStatLabel}>Total Visits</Text>
                          <Text style={styles.cardStatValue}>{client.visitCount}</Text>
                        </View>

                        <View style={styles.cardStatItem}>
                          <Text style={styles.cardStatLabel}>Credit Balance</Text>
                          <Text
                            style={[
                              styles.cardStatValue,
                              { color: client.businessCredit > 0 ? HeytamColors.mint : '#64748B' },
                            ]}>
                            ${client.businessCredit}
                          </Text>
                        </View>
                      </View>

                      {/* Entitlements / Packages */}
                      {client.remainingPackages ? (
                        <View style={styles.packagePill}>
                          <Ionicons name="gift-outline" size={13} color={HeytamColors.blue} />
                          <Text style={styles.packageText}>{client.remainingPackages}</Text>
                        </View>
                      ) : null}

                      {/* AI Next Best Action recommendation */}
                      <View style={styles.nbaBox}>
                        <View style={styles.nbaHeader}>
                          <Ionicons name="sparkles" size={12} color={HeytamColors.blue} />
                          <Text style={styles.nbaLabel}>Next Best Action</Text>
                        </View>
                        <Text style={styles.nbaText} numberOfLines={2}>
                          {client.nextBestAction}
                        </Text>
                      </View>

                      {/* Compliance Flags */}
                      <View style={styles.cardFooter}>
                        <View style={styles.complianceChip}>
                          <Ionicons name="shield-checkmark" size={12} color="#16A34A" />
                          <Text style={styles.complianceChipText}>HIPAA Signed</Text>
                        </View>

                        <View style={styles.complianceChip}>
                          <Ionicons name="chatbox" size={12} color="#16A34A" />
                          <Text style={styles.complianceChipText}>SMS Consented</Text>
                        </View>

                        <Text style={styles.lastVisitText}>Last: {client.lastVisit}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          ) : (
            /* REVIEWS TAB VIEW */
            <View style={styles.reviewsContainer}>
              {/* Overall Rating Hero Card */}
              <View style={styles.ratingHeroCard}>
                <LinearGradient
                  colors={['#0D1B4B', '#162866']}
                  style={styles.ratingHeroGradient}>
                  <View style={styles.ratingHeroTop}>
                    <View>
                      <Text style={styles.ratingScoreText}>4.9</Text>
                      <View style={styles.starsRow}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Ionicons key={s} name="star" size={16} color="#FBBF24" />
                        ))}
                      </View>
                      <Text style={styles.ratingSubText}>128 Verified Reviews</Text>
                    </View>

                    <View style={styles.ratingStatsCol}>
                      <View style={styles.ratingStatPill}>
                        <Ionicons name="shield-checkmark" size={13} color="#4ADE80" />
                        <Text style={styles.ratingStatPillText}>100% Authentic</Text>
                      </View>
                      <View style={styles.ratingStatPill}>
                        <Ionicons name="time" size={13} color="#22D3EE" />
                        <Text style={styles.ratingStatPillText}>&lt;1h Response SLA</Text>
                      </View>
                    </View>
                  </View>

                  <Text style={styles.ratingHeroDesc}>
                    AI Receptionist automatically collects reviews after completed visits and triages sentiment per PRD Section 12.
                  </Text>
                </LinearGradient>
              </View>

              {/* Reviews Feed */}
              <View style={styles.reviewsList}>
                {reviews.map((rev) => (
                  <View key={rev.id} style={styles.reviewCard}>
                    <View style={styles.reviewCardTop}>
                      <View style={styles.reviewUserLeft}>
                        <View style={styles.reviewerAvatar}>
                          <Text style={styles.reviewerAvatarText}>
                            {rev.patientName.split(' ').map((n) => n[0]).join('')}
                          </Text>
                        </View>
                        <View>
                          <View style={styles.reviewerNameRow}>
                            <Text style={styles.reviewerName}>{rev.patientName}</Text>
                            <View style={styles.verifiedBadge}>
                              <Ionicons name="checkmark-circle" size={12} color="#16A34A" />
                              <Text style={styles.verifiedText}>Verified Patient</Text>
                            </View>
                          </View>
                          <Text style={styles.reviewDate}>
                            {rev.date} • {rev.platform}
                          </Text>
                        </View>
                      </View>

                      {/* Stars */}
                      <View style={styles.cardStarsRow}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Ionicons key={s} name="star" size={13} color="#F59E0B" />
                        ))}
                      </View>
                    </View>

                    <View style={styles.reviewTreatmentPill}>
                      <Text style={styles.reviewTreatmentText}>{rev.treatment}</Text>
                      <Text style={styles.reviewPractitionerText}>with {rev.practitioner}</Text>
                    </View>

                    <Text style={styles.reviewComment}>"{rev.comment}"</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Client Detail Modal */}
      <ClientDetailModal
        client={selectedClient}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
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
    marginBottom: 16,
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
  summaryRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  summaryVal: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0D1B4B',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0D1B4B',
    padding: 0,
  },
  filtersScroll: {
    marginBottom: 14,
  },
  filtersContent: {
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterChipActive: {
    backgroundColor: '#0D1B4B',
    borderColor: '#0D1B4B',
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  chipBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  chipBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  chipBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  chipBadgeTextActive: {
    color: '#FFFFFF',
  },
  clientsList: {
    gap: 12,
  },
  clientCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
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
    fontSize: 15,
    fontWeight: '800',
    color: HeytamColors.blue,
  },
  headerTextCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  clientName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0D1B4B',
  },
  tierBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tierBadgeDiamond: {
    backgroundColor: 'rgba(34, 211, 238, 0.15)',
  },
  tierBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: HeytamColors.blue,
  },
  tierBadgeDiamondText: {
    color: '#0284C7',
  },
  clientContact: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  cardStatsRow: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  cardStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  cardStatLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cardStatValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0D1B4B',
    marginTop: 2,
  },
  packagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  packageText: {
    fontSize: 12,
    fontWeight: '600',
    color: HeytamColors.blue,
  },
  nbaBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: HeytamColors.blue,
  },
  nbaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 3,
  },
  nbaLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: HeytamColors.blue,
  },
  nbaText: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 17,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  complianceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  complianceChipText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#15803D',
  },
  lastVisitText: {
    marginLeft: 'auto',
    fontSize: 11,
    color: '#94A3B8',
  },
  subTabRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  subTabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 10,
  },
  subTabBtnActive: {
    backgroundColor: '#0D1B4B',
  },
  subTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  subTabTextActive: {
    color: '#FFFFFF',
  },
  reviewsContainer: {
    gap: 14,
  },
  ratingHeroCard: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.25)',
  },
  ratingHeroGradient: {
    padding: 18,
  },
  ratingHeroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  ratingScoreText: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 3,
    marginVertical: 4,
  },
  ratingSubText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#93C5FD',
  },
  ratingStatsCol: {
    gap: 6,
  },
  ratingStatPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingStatPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  ratingHeroDesc: {
    fontSize: 12,
    color: '#E2E8F0',
    lineHeight: 17,
  },
  reviewsList: {
    gap: 12,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  reviewCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  reviewUserLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  reviewerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  reviewerAvatarText: {
    fontSize: 13,
    fontWeight: '800',
    color: HeytamColors.blue,
  },
  reviewerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1B4B',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 4,
  },
  verifiedText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#15803D',
  },
  reviewDate: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  cardStarsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewTreatmentPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  reviewTreatmentText: {
    fontSize: 11,
    fontWeight: '700',
    color: HeytamColors.blue,
  },
  reviewPractitionerText: {
    fontSize: 11,
    color: '#64748B',
  },
  reviewComment: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
    fontStyle: 'italic',
  },
});
