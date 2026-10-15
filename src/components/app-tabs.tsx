import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function AppTabs() {
  return (
    <NativeTabs
      labelVisibilityMode="labeled"
      backgroundColor="#FFFFFF"
      indicatorColor="#E0F2FE"
      tintColor="#0284C7"
      iconColor={{
        default: '#94A3B8',
        selected: '#0284C7',
      }}
      labelStyle={{
        selected: { color: '#0D1B4B', fontWeight: '700', fontSize: 11 },
        default: { color: '#94A3B8', fontWeight: '600', fontSize: 11 },
      }}>
      <NativeTabs.Trigger name="index" labelVisibilityMode="labeled">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="leads" labelVisibilityMode="labeled">
        <NativeTabs.Trigger.Label>My Leads</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/leads.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="conversation" labelVisibilityMode="labeled">
        <NativeTabs.Trigger.Label>Conversation</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="calendar" labelVisibilityMode="labeled">
        <NativeTabs.Trigger.Label>Appointments</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/calendar.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
