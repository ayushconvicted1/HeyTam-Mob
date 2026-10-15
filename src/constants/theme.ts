/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const HeytamColors = {
  navy: '#0D1B4B',
  darkNavy: '#070D1E',
  blue: '#3B82F6',
  cyan: '#22D3EE',
  mint: '#4ADE80',
  teal: '#14B8A6',
  purple: '#8B5CF6',
  amber: '#F59E0B',
  rose: '#F43F5E',
  gradientPrimary: ['#3B82F6', '#22D3EE', '#4ADE80'] as const,
  gradientBlueCyan: ['#3B82F6', '#22D3EE'] as const,
  gradientNavy: ['#0D1B4B', '#1E293B'] as const,
  gradientMintTeal: ['#14B8A6', '#4ADE80'] as const,
};

export const Colors = {
  light: {
    text: '#0D1B4B',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    background: '#F8FAFC',
    backgroundElement: '#EDF2F7',
    backgroundSelected: '#DBEAFE',
    surface: '#FFFFFF',
    border: '#E2E8F0',
    primary: '#3B82F6',
    secondary: '#22D3EE',
    accent: '#4ADE80',
    cardBackground: '#FFFFFF',
    cardBorder: '#E2E8F0',
  },
  dark: {
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    background: '#070D1E',
    backgroundElement: '#0D1B4B',
    backgroundSelected: '#1E293B',
    surface: '#0F172A',
    border: '#1E293B',
    primary: '#3B82F6',
    secondary: '#22D3EE',
    accent: '#4ADE80',
    cardBackground: '#0D1B4B',
    cardBorder: 'rgba(59, 130, 246, 0.2)',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
