
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const [appMode, setAppMode] = useState<'自分専用' | '家族共有'>('自分専用');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleModeSwitch = () => {
    const newMode = appMode === '自分専用' ? '家族共有' : '自分専用';
    setAppMode(newMode);
    Alert.alert(
      'モード変更',
      `${newMode}モードに切り替えました`,
      [{ text: 'OK' }]
    );
  };

  const settingsItems = [
    {
      icon: 'bell.fill',
      title: '通知',
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled,
    },
    {
      icon: 'speaker.wave.2.fill',
      title: 'サウンド',
      value: soundEnabled,
      onToggle: setSoundEnabled,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <IconSymbol name="person.circle.fill" size={80} color={colors.primary} />
          </View>
          <Text style={styles.userName}>フリーランサー</Text>
          <Text style={styles.userSubtitle}>クエストマスター</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>利用モード</Text>
          <View style={styles.card}>
            <View style={styles.modeContainer}>
              <View style={styles.modeInfo}>
                <IconSymbol
                  name={appMode === '自分専用' ? 'person.fill' : 'person.3.fill'}
                  size={24}
                  color={colors.primary}
                />
                <View style={styles.modeText}>
                  <Text style={styles.modeTitle}>{appMode}</Text>
                  <Text style={styles.modeDescription}>
                    {appMode === '自分専用'
                      ? '個人でタスクを管理'
                      : '家族やチームでタスクを共有'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.switchButton} onPress={handleModeSwitch}>
                <Text style={styles.switchButtonText}>切り替え</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>設定</Text>
          <View style={styles.card}>
            {settingsItems.map((item, index) => (
              <View
                key={item.title}
                style={[
                  styles.settingItem,
                  index !== settingsItems.length - 1 && styles.settingItemBorder,
                ]}
              >
                <View style={styles.settingLeft}>
                  <IconSymbol name={item.icon} size={24} color={colors.secondary} />
                  <Text style={styles.settingTitle}>{item.title}</Text>
                </View>
                <Switch
                  value={item.value}
                  onValueChange={item.onToggle}
                  trackColor={{ false: colors.highlight, true: colors.secondary }}
                  thumbColor={colors.text}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>統計</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <IconSymbol name="checkmark.circle.fill" size={32} color={colors.secondary} />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>完了クエスト</Text>
            </View>
            <View style={styles.statCard}>
              <IconSymbol name="clock.fill" size={32} color={colors.primary} />
              <Text style={styles.statValue}>0h</Text>
              <Text style={styles.statLabel}>総作業時間</Text>
            </View>
            <View style={styles.statCard}>
              <IconSymbol name="flame.fill" size={32} color={colors.accent} />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>連続日数</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>その他</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <IconSymbol name="questionmark.circle.fill" size={24} color={colors.textSecondary} />
                <Text style={styles.menuTitle}>ヘルプ</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <IconSymbol name="info.circle.fill" size={24} color={colors.textSecondary} />
                <Text style={styles.menuTitle}>アプリについて</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <IconSymbol name="star.fill" size={24} color={colors.primary} />
                <Text style={styles.menuTitle}>アプリを評価</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>クエストタイマー v1.0.0</Text>
          <Text style={styles.footerSubtext}>
            フリーランス向けRPG風タスク管理アプリ
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  userSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    elevation: 4,
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  modeText: {
    flex: 1,
  },
  modeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  modeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  switchButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  switchButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    elevation: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuTitle: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.highlight,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
