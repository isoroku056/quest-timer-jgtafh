
import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { colors } from '@/styles/commonStyles';
import { useQuests } from '@/hooks/useQuests';
import { useTimer } from '@/hooks/useTimer';
import { TimerDisplay } from '@/components/TimerDisplay';
import { TimerControls } from '@/components/TimerControls';
import { QuestItem } from '@/components/QuestItem';
import { CharacterStatus } from '@/components/CharacterStatus';
import { AddQuestModal } from '@/components/AddQuestModal';
import { IconSymbol } from '@/components/IconSymbol';
import { Quest } from '@/types/quest';

export default function HomeScreen() {
  const { quests, stats, loading, addQuest, updateQuest, deleteQuest, completeQuest } = useQuests();
  const { time, isRunning, start, pause, stop } = useTimer();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);
  const [activeQuestId, setActiveQuestId] = useState<string | null>(null);

  const totalTimeToday = quests.reduce((sum, quest) => sum + quest.timeSpent, 0) + time;

  const handleToggleTimer = (questId: string) => {
    const quest = quests.find((q) => q.id === questId);
    if (!quest) return;

    if (quest.isRunning) {
      pause();
      const timeSpent = quest.timeSpent + time;
      updateQuest(questId, { isRunning: false, timeSpent });
      stop();
      setActiveQuestId(null);
    } else {
      if (activeQuestId) {
        const activeQuest = quests.find((q) => q.id === activeQuestId);
        if (activeQuest) {
          const timeSpent = activeQuest.timeSpent + time;
          updateQuest(activeQuestId, { isRunning: false, timeSpent });
        }
        stop();
      }
      updateQuest(questId, { isRunning: true });
      setActiveQuestId(questId);
      start();
    }
  };

  const handleStopTimer = () => {
    if (activeQuestId) {
      const quest = quests.find((q) => q.id === activeQuestId);
      if (quest) {
        const timeSpent = quest.timeSpent + time;
        updateQuest(activeQuestId, { isRunning: false, timeSpent });
      }
    }
    stop();
    setActiveQuestId(null);
  };

  const handleCompleteQuest = (questId: string) => {
    if (activeQuestId === questId) {
      handleStopTimer();
    }
    completeQuest(questId);
    Alert.alert('🎉 クエスト完了！', '経験値を獲得しました！');
  };

  const handleAddQuest = (quest: Omit<Quest, 'id' | 'completed' | 'timeSpent' | 'isRunning'>) => {
    if (editingQuest) {
      updateQuest(editingQuest.id, quest);
      setEditingQuest(null);
    } else {
      addQuest(quest);
    }
  };

  const handleEditQuest = (quest: Quest) => {
    setEditingQuest(quest);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingQuest(null);
  };

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={styles.headerButton}
    >
      <IconSymbol name="plus.circle.fill" color={colors.primary} size={28} />
    </TouchableOpacity>
  );

  const activeQuests = quests.filter((q) => !q.completed);
  const completedQuests = quests.filter((q) => q.completed);

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: '🧭 クエストタイマー',
            headerRight: renderHeaderRight,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
          }}
        />
      )}
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.timerSection}>
            <TimerDisplay time={totalTimeToday} label="⏱ 合計作業時間" />
            <TimerControls
              isRunning={isRunning}
              onStart={() => {
                if (activeQuestId) {
                  start();
                } else {
                  Alert.alert('クエストを選択', 'タイマーを開始するクエストを選択してください');
                }
              }}
              onPause={pause}
              onStop={handleStopTimer}
            />
          </View>

          <CharacterStatus stats={stats} />

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>今日のクエスト</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{activeQuests.length}</Text>
              </View>
            </View>

            {activeQuests.length === 0 ? (
              <View style={styles.emptyState}>
                <IconSymbol name="tray" size={48} color={colors.textSecondary} />
                <Text style={styles.emptyText}>クエストがありません</Text>
                <Text style={styles.emptySubtext}>
                  右上の + ボタンから新しいクエストを追加しましょう
                </Text>
              </View>
            ) : (
              activeQuests.map((quest) => (
                <QuestItem
                  key={quest.id}
                  quest={quest}
                  onToggleTimer={handleToggleTimer}
                  onComplete={handleCompleteQuest}
                  onDelete={deleteQuest}
                  onEdit={handleEditQuest}
                />
              ))
            )}
          </View>

          {completedQuests.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>完了したクエスト</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{completedQuests.length}</Text>
                </View>
              </View>

              {completedQuests.map((quest) => (
                <QuestItem
                  key={quest.id}
                  quest={quest}
                  onToggleTimer={handleToggleTimer}
                  onComplete={handleCompleteQuest}
                  onDelete={deleteQuest}
                  onEdit={handleEditQuest}
                />
              ))}
            </View>
          )}

          <View style={styles.aiAssistantPreview}>
            <IconSymbol name="message.fill" size={24} color={colors.primary} />
            <Text style={styles.aiAssistantText}>
              💬 AIアシスタント：「次はどのクエストに挑戦しますか？」
            </Text>
          </View>
        </ScrollView>

        <AddQuestModal
          visible={modalVisible}
          onClose={handleCloseModal}
          onSave={handleAddQuest}
          editQuest={editingQuest}
        />
      </View>
    </>
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
    paddingBottom: Platform.OS === 'ios' ? 20 : 100,
  },
  timerSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)',
    elevation: 6,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  aiAssistantPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  aiAssistantText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontStyle: 'italic',
  },
  headerButton: {
    padding: 4,
    marginRight: 8,
  },
});
