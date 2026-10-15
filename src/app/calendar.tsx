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
import { AppointmentModal } from '@/components/appointment-modal';
import { MockAppointments, Appointment } from '@/data/mock-data';

export default function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const [viewMode, setViewMode] = useState<'Day' | 'Week' | 'Month'>('Day');
  const [selectedDay, setSelectedDay] = useState('Today 13');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const daysList = [
    { day: 'Mon', date: '12', dotColor: '#94A3B8' },
    { day: 'Today', date: '13', isToday: true, dotColor: '#FFFFFF' },
    { day: 'Wed', date: '14', dotColor: '#2563EB' },
    { day: 'Thu', date: '15', dotColor: '#F43F5E' },
    { day: 'Fri', date: '16', dotColor: '#2563EB' },
    { day: 'Sat', date: '17', dotColor: '#2563EB' },
  ];

  const filterChips = ['All', 'Confirmed', 'Pending', 'Cancelled'];

  const appointmentCards = [
    {
      id: 'apt-1',
      name: 'Emily Carter',
      service: 'Botox Consultation',
      bookingBadge: 'Booking In 25 Mins',
      amount: '$50',
      depositStatus: 'Deposited',
      filterCategory: 'Confirmed',
    },
    {
      id: 'apt-2',
      name: 'Emily Carter',
      service: 'Botox Consultation',
      bookingBadge: 'Booking In 25 Mins',
      amount: '$100',
      depositStatus: 'Deposited',
      filterCategory: 'Confirmed',
    },
    {
      id: 'apt-3',
      name: 'Emily Carter',
      service: 'Botox Consultation',
      bookingBadge: 'Booking In 25 Mins',
      amount: '$1000',
      depositStatus: 'Deposited',
      filterCategory: 'Confirmed',
    },
  ];

  const filteredCards = appointmentCards.filter((card) => {
    if (activeFilter === 'All') return true;
    return card.filterCategory === activeFilter;
  });

  const handleOpenDetails = (card: any) => {
    const baseApt = MockAppointments[0];
    setSelectedApt({
      ...baseApt,
      clientName: card.name,
      treatment: card.service,
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
          {/* Header Row: Title & Day/Week/Month Segmented Control */}
          <View style={styles.titleRow}>
            <Text style={styles.pageTitle}>Appointments</Text>

            {/* Segmented View Mode Toggle */}
            <View style={styles.segmentedToggle}>
              {(['Day', 'Week', 'Month'] as const).map((mode) => (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.segmentBtn,
                    viewMode === mode && styles.segmentBtnActive,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setViewMode(mode)}>
                  <Text
                    style={[
                      styles.segmentText,
                      viewMode === mode && styles.segmentTextActive,
                    ]}>
                    {mode}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Subtitle Month */}
          <Text style={styles.monthSubtitle}>September 2026</Text>

          {/* Horizontal Date Picker Strip */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateStrip}>
            {daysList.map((item, index) => {
              const isSelected = item.isToday || selectedDay === `${item.day} ${item.date}`;

              if (item.isToday) {
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={() => setSelectedDay(`${item.day} ${item.date}`)}>
                    <LinearGradient
                      colors={['#38BDF8', '#2563EB']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.todayCard}>
                      <Text style={styles.todayLabel}>Today</Text>
                      <Text style={styles.todayDate}>{item.date}</Text>
                      <View style={styles.todayWhiteDot} />
                    </LinearGradient>
                  </TouchableOpacity>
                );
              }

              return (
                <TouchableOpacity
                  key={index}
                  style={styles.dateCard}
                  activeOpacity={0.7}
                  onPress={() => setSelectedDay(`${item.day} ${item.date}`)}>
                  <Text style={styles.dayLabel}>{item.day}</Text>
                  <Text style={styles.dateNumber}>{item.date}</Text>
                  <View
                    style={[
                      styles.dateDot,
                      { backgroundColor: item.dotColor },
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Filter Chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterStrip}>
            {filterChips.map((chip) => {
              const isSelected = activeFilter === chip;
              return (
                <TouchableOpacity
                  key={chip}
                  style={[
                    styles.filterChip,
                    isSelected && styles.filterChipActive,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setActiveFilter(chip)}>
                  <Text
                    style={[
                      styles.filterChipText,
                      isSelected && styles.filterChipTextActive,
                    ]}>
                    {chip}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Timeline & Appointment Cards */}
          <View style={styles.timelineContainer}>
            {/* Continuous Vertical Timeline Line on Left */}
            <View style={styles.verticalTimelineTrack} />

            {/* Cards Stack */}
            <View style={styles.cardsStack}>
              {filteredCards.map((card, index) => (
                <View key={card.id} style={styles.timelineItemWrapper}>
                  {/* Blue Timeline Node Dot */}
                  <View style={styles.timelineNodeDot} />

                  {/* Appointment Card */}
                  <View style={styles.appointmentCard}>
                    {/* Top Row: Avatar, Info, Deposit Amount */}
                    <View style={styles.cardHeaderRow}>
                      <View style={styles.cardProfileGroup}>
                        <Image
                          source={require('@/assets/images/emily-carter.jpg')}
                          style={styles.clientAvatar}
                          resizeMode="cover"
                        />

                        <View style={styles.clientInfo}>
                          <Text style={styles.clientName}>{card.name}</Text>
                          <View style={styles.serviceRow}>
                            <View style={styles.tealDot} />
                            <Text style={styles.serviceText}>{card.service}</Text>
                          </View>
                          <View style={styles.bookingBadge}>
                            <Text style={styles.bookingBadgeText}>
                              • {card.bookingBadge}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* Deposited Amount */}
                      <View style={styles.depositColumn}>
                        <Text style={styles.depositAmount}>{card.amount}</Text>
                        <Text style={styles.depositLabel}>{card.depositStatus}</Text>
                      </View>
                    </View>

                    {/* Action Buttons Row */}
                    <View style={styles.actionButtonsRow}>
                      <TouchableOpacity
                        style={styles.cancelBtn}
                        activeOpacity={0.7}
                        onPress={() => alert('Appointment cancellation initiated')}>
                        <Text style={styles.cancelText}>cancel</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.rebookBtn}
                        activeOpacity={0.7}
                        onPress={() => handleOpenDetails(card)}>
                        <Text style={styles.rebookText}>Rebook</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.iconActionBtn}
                        activeOpacity={0.7}
                        onPress={() => alert(`Calling ${card.name}`)}>
                        <Ionicons name="call" size={14} color="#2563EB" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.iconActionBtn}
                        activeOpacity={0.7}
                        onPress={() => alert(`Opening chat with ${card.name}`)}>
                        <Ionicons name="chatbox" size={14} color="#2563EB" />
                      </TouchableOpacity>
                    </View>

                    {/* Centered View Details Link */}
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => handleOpenDetails(card)}
                      style={styles.viewDetailsBtn}>
                      <Text style={styles.viewDetailsText}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {selectedApt && (
        <AppointmentModal
          visible={modalVisible}
          appointment={selectedApt}
          onClose={() => setModalVisible(false)}
          onUpdateAppointment={(updated) => setSelectedApt(updated)}
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
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0D1B4B',
    letterSpacing: -0.6,
  },
  segmentedToggle: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 2,
  },
  segmentBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  segmentBtnActive: {
    backgroundColor: '#2563EB',
  },
  segmentText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  segmentTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  monthSubtitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 6,
    marginBottom: 12,
  },
  dateStrip: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 14,
  },
  todayCard: {
    width: 60,
    paddingVertical: 8,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  todayLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  todayDate: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
  },
  todayWhiteDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    marginTop: 4,
  },
  dateCard: {
    width: 54,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0D1B4B',
    marginTop: 2,
  },
  dateDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 4,
  },
  filterStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterChipText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#475569',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  timelineContainer: {
    position: 'relative',
    paddingLeft: 18,
  },
  verticalTimelineTrack: {
    position: 'absolute',
    left: 4,
    top: 24,
    bottom: 24,
    width: 1.5,
    backgroundColor: '#E2E8F0',
  },
  cardsStack: {
    gap: 16,
  },
  timelineItemWrapper: {
    position: 'relative',
  },
  timelineNodeDot: {
    position: 'absolute',
    left: -18,
    top: 26,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#2563EB',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    zIndex: 2,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    shadowColor: '#0D1B4B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardProfileGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  clientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
  },
  clientInfo: {
    marginLeft: 12,
    flex: 1,
  },
  clientName: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#0D1B4B',
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  tealDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0D9488',
    marginRight: 4,
  },
  serviceText: {
    fontSize: 12,
    color: '#64748B',
  },
  bookingBadge: {
    backgroundColor: '#E6FBF5',
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 4,
  },
  bookingBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#0D9488',
  },
  depositColumn: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  depositAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: -0.5,
  },
  depositLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 1,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
  },
  cancelBtn: {
    backgroundColor: '#FFE4E6',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },
  cancelText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#E11D48',
  },
  rebookBtn: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },
  rebookText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0D1B4B',
  },
  iconActionBtn: {
    width: 36,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDetailsBtn: {
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 2,
  },
  viewDetailsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
    textDecorationLine: 'underline',
  },
});
