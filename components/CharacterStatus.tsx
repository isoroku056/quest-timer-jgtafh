
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { CharacterStats } from '@/types/quest';
import { IconSymbol } from './IconSymbol';

interface CharacterStatusProps {
  stats: CharacterStats;
}

export const CharacterStatus: React.FC<CharacterStatusProps> = ({ stats }) => {
  const renderStars = (count: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <IconSymbol
        key={index}
        name={index < count ? 'star.fill' : 'star'}
        size={16}
        color={index < count ? colors.primary : colors.textSecondary}
      />
    ));
  };

  const expPercentage = (stats.experience / stats.experienceToNextLevel) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Lv.{stats.level}</Text>
        </View>
        <Text style={styles.title}>キャラクターステータス</Text>
      </View>

      <View style={styles.expContainer}>
        <View style={styles.expHeader}>
          <Text style={styles.expLabel}>経験値</Text>
          <Text style={styles.expText}>
            {stats.experience} / {stats.experienceToNextLevel}
          </Text>
        </View>
        <View style={styles.expBar}>
          <View style={[styles.expFill, { width: `${expPercentage}%` }]} />
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <View style={styles.statHeader}>
            <IconSymbol name="brain" size={20} color={colors.secondary} />
            <Text style={styles.statLabel}>集中力</Text>
          </View>
          <View style={styles.stars}>{renderStars(stats.focus)}</View>
        </View>

        <View style={styles.statItem}>
          <View style={styles.statHeader}>
            <IconSymbol name="heart.fill" size={20} color={colors.accent} />
            <Text style={styles.statLabel}>体力</Text>
          </View>
          <View style={styles.stars}>{renderStars(stats.stamina)}</View>
        </View>

        <View style={styles.statItem}>
          <View style={styles.statHeader}>
            <IconSymbol name="flame.fill" size={20} color={colors.primary} />
            <Text style={styles.statLabel}>モチベーション</Text>
          </View>
          <View style={styles.stars}>{renderStars(stats.motivation)}</View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  levelBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  levelText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  expContainer: {
    marginBottom: 16,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  expLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  expText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  expBar: {
    height: 12,
    backgroundColor: colors.highlight,
    borderRadius: 6,
    overflow: 'hidden',
  },
  expFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  statsGrid: {
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statLabel: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  stars: {
    flexDirection: 'row',
    gap: 4,
  },
});
