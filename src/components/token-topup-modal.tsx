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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { HeytamColors } from '@/constants/theme';
import { TokenWalletData } from '@/data/mock-data';

interface TokenTopupModalProps {
  visible: boolean;
  onClose: () => void;
  onTopupSuccess?: (addedTokens: number) => void;
}

export function TokenTopupModal({
  visible,
  onClose,
  onTopupSuccess,
}: TokenTopupModalProps) {
  const [selectedTier, setSelectedTier] = useState<number>(25000);
  const [autoTopup, setAutoTopup] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const packages = [
    { tokens: 10000, price: 200, popular: false, bonus: '+0 HT' },
    { tokens: 25000, price: 450, popular: true, bonus: '+2,500 HT Free' },
    { tokens: 50000, price: 800, popular: false, bonus: '+7,500 HT Free' },
  ];

  const handleConfirmTopup = () => {
    setToastMessage(`Success! ${selectedTier.toLocaleString()} HT added to your wallet.`);
    setTimeout(() => {
      setToastMessage(null);
      onTopupSuccess?.(selectedTier);
      onClose();
    }, 1600);
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
                <Ionicons name="wallet" size={18} color="#FFFFFF" />
              </LinearGradient>
              <View>
                <Text style={styles.headerTitle}>Top Up Heytam Tokens (HT)</Text>
                <Text style={styles.headerSubtitle}>
                  Current Balance: {TokenWalletData.availableTokens.toLocaleString()} HT
                </Text>
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
            <Text style={styles.sectionLabel}>Select Token Package</Text>

            <View style={styles.packagesList}>
              {packages.map((pkg) => {
                const isSelected = selectedTier === pkg.tokens;
                return (
                  <TouchableOpacity
                    key={pkg.tokens}
                    style={[
                      styles.packageCard,
                      isSelected && styles.packageCardSelected,
                    ]}
                    onPress={() => setSelectedTier(pkg.tokens)}
                    activeOpacity={0.8}>
                    {pkg.popular && (
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularBadgeText}>BEST VALUE</Text>
                      </View>
                    )}

                    <View style={styles.pkgLeft}>
                      <View style={styles.radioOuter}>
                        {isSelected && <View style={styles.radioInner} />}
                      </View>
                      <View>
                        <Text style={styles.pkgTokens}>
                          {pkg.tokens.toLocaleString()} HT
                        </Text>
                        <Text style={styles.pkgBonus}>{pkg.bonus}</Text>
                      </View>
                    </View>

                    <Text style={styles.pkgPrice}>${pkg.price}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Auto Top-up Option */}
            <View style={styles.autoTopupCard}>
              <View style={styles.autoTopupText}>
                <Text style={styles.autoTopupTitle}>Auto-Reload Protection</Text>
                <Text style={styles.autoTopupSubtitle}>
                  Automatically reload 25,000 HT if balance drops below 5,000 HT so
                  AI phone calling is never interrupted.
                </Text>
              </View>
              <Switch
                value={autoTopup}
                onValueChange={setAutoTopup}
                trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
                thumbColor={autoTopup ? HeytamColors.blue : '#F1F5F9'}
              />
            </View>

            {/* Rate transparency note per PRD 11.1 */}
            <View style={styles.infoNote}>
              <Ionicons name="information-circle-outline" size={15} color="#64748B" />
              <Text style={styles.infoNoteText}>
                HT shields your business from volatile raw LLM and telephony per-second costs.
                1 HT = 1 guaranteed unit of orchestrated execution.
              </Text>
            </View>
          </ScrollView>

          {/* Confirm Button */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmTopup}>
              <LinearGradient
                colors={HeytamColors.gradientBlueCyan}
                style={styles.confirmGradient}>
                <Ionicons name="card-outline" size={16} color="#FFFFFF" />
                <Text style={styles.confirmText}>
                  Confirm Purchase • ${packages.find((p) => p.tokens === selectedTier)?.price}
                </Text>
              </LinearGradient>
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
    paddingTop: 14,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1B4B',
    marginBottom: 10,
  },
  packagesList: {
    gap: 10,
    marginBottom: 16,
  },
  packageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  packageCardSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: HeytamColors.blue,
  },
  popularBadge: {
    position: 'absolute',
    top: -9,
    right: 14,
    backgroundColor: HeytamColors.mint,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  popularBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#065F46',
  },
  pkgLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: HeytamColors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: HeytamColors.blue,
  },
  pkgTokens: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0D1B4B',
  },
  pkgBonus: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
    marginTop: 2,
  },
  pkgPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0D1B4B',
  },
  autoTopupCard: {
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
  autoTopupText: {
    flex: 1,
    paddingRight: 12,
  },
  autoTopupTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1B4B',
    marginBottom: 2,
  },
  autoTopupSubtitle: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  infoNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 4,
  },
  infoNoteText: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
    flex: 1,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  confirmBtn: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  confirmGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  confirmText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
