import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import { usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppTabs() {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      {!isLoginPage && (
        <TabList asChild>
          <CustomTabList>
            <TabTrigger name="index" href={"/" as any} asChild>
              <TabButton label="Home" icon="home">
                Home
              </TabButton>
            </TabTrigger>

            <TabTrigger name="leads" href={"/leads" as any} asChild>
              <TabButton label="My Leads" icon="chatbubbles">
                My Leads
              </TabButton>
            </TabTrigger>

            <TabTrigger name="conversation" href={"/conversation" as any} asChild>
              <TabButton label="Conversation" icon="call">
                Conversation
              </TabButton>
            </TabTrigger>

            <TabTrigger name="calendar" href={"/calendar" as any} asChild>
              <TabButton label="Appointments" icon="calendar">
                Appointments
              </TabButton>
            </TabTrigger>
          </CustomTabList>
        </TabList>
      )}
    </Tabs>
  );
}

interface TabButtonProps extends TabTriggerSlotProps {
  label?: string;
  icon: keyof typeof Ionicons.glyphMap;
  children?: React.ReactNode;
}

export function TabButton({
  label,
  children,
  isFocused,
  icon,
  ...props
}: TabButtonProps) {
  const displayLabel = label || (typeof children === 'string' ? children : '');
  const iconName = (isFocused ? icon : `${icon}-outline`) as keyof typeof Ionicons.glyphMap;
  const activeIconColor = '#0284C7';
  const inactiveIconColor = '#94A3B8';

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.tabBtnPressable,
        pressed && styles.pressed,
      ]}>
      <View style={styles.tabButtonView}>
        <View style={styles.iconWrapper}>
          <Ionicons
            name={iconName}
            size={24}
            color={isFocused ? activeIconColor : inactiveIconColor}
          />
        </View>

        <Text
          style={[
            styles.tabLabel,
            isFocused ? styles.tabLabelActive : styles.tabLabelInactive,
          ]}>
          {displayLabel}
        </Text>
      </View>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 14);

  return (
    <View
      {...props}
      style={[
        styles.tabListContainer,
        { paddingBottom: bottomPadding },
      ]}>
      <View style={styles.innerContainer}>
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'fixed' as any,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    pointerEvents: 'box-none',
  },
  innerContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 480,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: '#0D1B4B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  tabBtnPressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
  tabLabelActive: {
    color: '#0D1B4B',
    fontWeight: '700',
  },
  tabLabelInactive: {
    color: '#94A3B8',
    fontWeight: '500',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
});
