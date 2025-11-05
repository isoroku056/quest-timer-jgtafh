
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { Quest } from '@/types/quest';
import { IconSymbol } from './IconSymbol';
import { formatTime } from '@/hooks/useTimer';

interface QuestItemProps {
  quest: Quest;
  onToggleTimer: (id: string) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (quest: Quest) => void;
}

export const QuestItem: React.FC<QuestItemProps> = ({
  quest,
  onToggleTimer,
  onComplete,
  onDelete,
  onEdit,
}) => {
  const getCategoryIcon = (category: Quest['category']) => {
    switch (category) {
      case 'クエスト':
        return 'flag.fill';
      case '日常':
        return 'house.fill';
      case '目標':
        return 'star.fill';
      default:
        return 'circle.fill';
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'クエストを削除',
      'このクエストを削除してもよろしいですか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        { text: '削除', style: 'destructive', onPress: () => onDelete(quest.id) },
      ]
    );
  };

  return (
    <View style={[styles.container, quest.completed && styles.completedContainer]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <IconSymbol
            name={getCategoryIcon(quest.category)}
            size={20}
            color={quest.completed ? colors.textSecondary : colors.primary}
          />
          <Text style={[styles.title, quest.completed && styles.completedText]}>
            {quest.title}
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit(quest)} style={styles.actionButton}>
            <IconSymbol name="pencil" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
            <IconSymbol name="trash" size={18} color={colors.accent} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{quest.category}</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${quest.progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{quest.progress}%</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <IconSymbol name="bolt.fill" size={16} color={colors.secondary} />
          <Text style={styles.statText}>EXP: {quest.experience}</Text>
        </View>
        <View style={styles.stat}>
          <IconSymbol name="clock.fill" size={16} color={colors.primary} />
          <Text style={styles.statText}>{formatTime(quest.timeSpent)}</Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        {!quest.completed && (
          <>
            <TouchableOpacity
              style={[styles.timerButton, quest.isRunning && styles.timerButtonActive]}
              onPress={() => onToggleTimer(quest.id)}
            >
              <IconSymbol
                name={quest.isRunning ? 'pause.fill' : 'play.fill'}
                size={18}
                color={colors.background}
              />
              <Text style={styles.timerButtonText}>
                {quest.isRunning ? '一時停止' : 'タイマー開始'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => onComplete(quest.id)}
            >
              <IconSymbol name="checkmark.circle.fill" size={18} color={colors.background} />
              <Text style={styles.completeButtonText}>完了</Text>
            </TouchableOpacity>
          </>
        )}
        {quest.completed && (
          <View style={styles.completedBadge}>
            <IconSymbol name="checkmark.seal.fill" size={20} color={colors.secondary} />
            <Text style={styles.completedBadgeText}>完了済み</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    elevation: 4,
  },
  completedContainer: {
    opacity: 0.7,
    backgroundColor: colors.highlight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.highlight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.highlight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.secondary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    minWidth: 40,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  timerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  timerButtonActive: {
    backgroundColor: colors.accent,
  },
  timerButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
  completeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  completeButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
  completedBadge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
  },
  completedBadgeText: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
