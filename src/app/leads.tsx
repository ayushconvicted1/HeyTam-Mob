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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeytamHeader } from '@/components/heytam-header';
import { LeadDetailModal } from '@/components/lead-detail-modal';
import { MockLeads, Lead } from '@/data/mock-data';

export default function LeadsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filterTabs = [
    { id: 'All', label: 'All' },
    { id: 'Unread', label: 'Unread' },
    { id: 'AI handled', label: 'AI handled' },
    { id: 'Needs reply', label: 'Needs reply', badge: '2' },
    { id: 'AI Chat', label: 'AI Chat' },
  ];

  const leadsList = [
    {
      id: 'lead-1',
      name: 'Emily Carter',
      service: 'Botox Consultation',
      timeAgo: '10 min ago',
      lastMessage: 'Hi Samantha, just a quick reminder that...',
      channel: 'WhatsApp',
      status: 'Needs reply',
    },
    {
      id: 'lead-2',
      name: 'Emily Carter',
      service: 'Botox Consultation',
      timeAgo: '10 min ago',
      lastMessage: 'Hi Samantha, just a quick reminder that...',
      channel: 'WhatsApp',
      status: 'Needs reply',
    },
    {
      id: 'lead-3',
      name: 'Emily Carter',
      service: 'Botox Consultation',
      timeAgo: '10 min ago',
      lastMessage: 'Hi Samantha, just a quick reminder that...',
      channel: 'WhatsApp',
      status: 'AI handled',
    },
    {
      id: 'lead-4',
      name: 'Sarah Mitchell',
      service: 'Skin Rejuvenation',
      timeAgo: '24 min ago',
      lastMessage: 'Thursday at 2:30 PM is perfect! Will there be...',
      channel: 'WhatsApp',
      status: 'AI handled',
    },
    {
      id: 'lead-5',
      name: 'Jessica Patel',
      service: 'Morpheus8 Consult',
      timeAgo: '1h ago',
      lastMessage: 'Deposit link received, payment confirmed via Stripe.',
      channel: 'WhatsApp',
      status: 'Unread',
    },
  ];

  const filteredLeads = leadsList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeTab === 'All') return true;
    if (activeTab === 'Needs reply') return item.status === 'Needs reply';
    if (activeTab === 'AI handled') return item.status === 'AI handled';
    if (activeTab === 'Unread') return item.status === 'Unread';
    return true;
  });

  const handleOpenLead = (item: any) => {
    const found = MockLeads[0];
    setSelectedLead({
      ...found,
      name: item.name,
      service: item.service,
    });
    setModalVisible(true);
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
          {/* Header Title Row */}
          <View style={styles.titleRow}>
            <Text style={styles.pageTitle}>My Leads</Text>
            <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
              <Ionicons name="options-outline" size={18} color="#2563EB" />
            </TouchableOpacity>
          </View>

          {/* Search Input Bar */}
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={16} color="#94A3B8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search messages"
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity activeOpacity={0.7} style={{ padding: 4 }}>
              <Ionicons name="mic-outline" size={18} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* Filter Chips Row */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterStrip}>
            {filterTabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              const isNeedsReply = tab.id === 'Needs reply';

              return (
                <View key={tab.id} style={styles.chipWrapper}>
                  <TouchableOpacity
                    style={[
                      styles.filterChip,
                      isSelected && styles.filterChipActive,
                      isNeedsReply && !isSelected && styles.filterChipNeedsReply,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setActiveTab(tab.id)}>
                    <Text
                      style={[
                        styles.filterChipText,
                        isSelected && styles.filterChipTextActive,
                        isNeedsReply && !isSelected && styles.filterChipTextNeedsReply,
                      ]}>
                      {tab.label}
                    </Text>
                  </TouchableOpacity>

                  {tab.badge && (
                    <View style={styles.badgePill}>
                      <Text style={styles.badgePillText}>{tab.badge}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>

          {/* Leads List Container */}
          <View style={styles.leadsContainer}>
            {filteredLeads.map((item, index) => (
              <TouchableOpacity
                key={`${item.id}-${index}`}
                style={[
                  styles.leadRow,
                  index < filteredLeads.length - 1 && styles.leadRowBorder,
                ]}
                activeOpacity={0.7}
                onPress={() => handleOpenLead(item)}>
                {/* Lead Avatar */}
                <Image
                  source={require('@/assets/images/emily-carter.jpg')}
                  style={styles.leadAvatar}
                  resizeMode="cover"
                />

                {/* Lead Details */}
                <View style={styles.leadContent}>
                  {/* Row 1: Name, Service & Timestamp */}
                  <View style={styles.leadTopRow}>
                    <View style={styles.nameServiceRow}>
                      <Text style={styles.leadName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <View style={styles.serviceDot} />
                      <Text style={styles.leadService} numberOfLines={1}>
                        {item.service}
                      </Text>
                    </View>
                    <Text style={styles.leadTime}>{item.timeAgo}</Text>
                  </View>

                  {/* Row 2: Double checkmark & Message Preview */}
                  <View style={styles.messageRow}>
                    <Ionicons
                      name="checkmark-done"
                      size={15}
                      color="#2563EB"
                      style={{ marginRight: 4 }}
                    />
                    <Text style={styles.messageText} numberOfLines={1}>
                      {item.lastMessage}
                    </Text>
                  </View>

                  {/* Row 3: WhatsApp Channel Tag */}
                  <View style={styles.channelTagRow}>
                    <Ionicons
                      name="logo-whatsapp"
                      size={13}
                      color="#0D9488"
                      style={{ marginRight: 4 }}
                    />
                    <Text style={styles.channelTagText}>{item.channel}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {selectedLead && (
        <LeadDetailModal
          visible={modalVisible}
          lead={selectedLead}
          onClose={() => setModalVisible(false)}
          onUpdateLead={(updated) => setSelectedLead(updated)}
        />
      )}
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 14,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0D1B4B',
    letterSpacing: -0.6,
  },
  filterBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#0D1B4B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0D1B4B',
    marginLeft: 8,
    paddingVertical: 2,
  },
  filterStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 14,
  },
  chipWrapper: {
    position: 'relative',
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  filterChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterChipNeedsReply: {
    backgroundColor: '#DCFCE7',
    borderColor: '#86EFAC',
  },
  filterChipText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#2563EB',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  filterChipTextNeedsReply: {
    color: '#059669',
    fontWeight: '700',
  },
  badgePill: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#EF4444',
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgePillText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  leadsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#0D1B4B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  leadRow: {
    flexDirection: 'row',
    padding: 14,
    alignItems: 'center',
    gap: 12,
  },
  leadRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  leadAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F5F9',
  },
  leadContent: {
    flex: 1,
  },
  leadTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  nameServiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  leadName: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#0D1B4B',
  },
  serviceDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0D9488',
    marginHorizontal: 6,
  },
  leadService: {
    fontSize: 12.5,
    color: '#64748B',
    flexShrink: 1,
  },
  leadTime: {
    fontSize: 11.5,
    color: '#94A3B8',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 13,
    color: '#475569',
    flex: 1,
  },
  channelTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelTagText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#0D9488',
  },
});
