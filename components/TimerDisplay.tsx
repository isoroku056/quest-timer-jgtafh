
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { formatTime } from '@/hooks/useTimer';

interface TimerDisplayProps {
  time: number;
  label?: string;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, label }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Text style={styles.time}>{formatTime(time)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    fontWeight: '600',
  },
  time: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: 'monospace',
    letterSpacing: 2,
  },
});
