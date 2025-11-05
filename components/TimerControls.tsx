
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from './IconSymbol';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onStop,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.startButton, isRunning && styles.disabledButton]}
        onPress={onStart}
        disabled={isRunning}
      >
        <IconSymbol name="play.fill" size={24} color={colors.background} />
        <Text style={styles.buttonText}>スタート</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.pauseButton, !isRunning && styles.disabledButton]}
        onPress={onPause}
        disabled={!isRunning}
      >
        <IconSymbol name="pause.fill" size={24} color={colors.background} />
        <Text style={styles.buttonText}>一時停止</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.stopButton]}
        onPress={onStop}
      >
        <IconSymbol name="stop.fill" size={24} color={colors.background} />
        <Text style={styles.buttonText}>停止</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    elevation: 4,
  },
  startButton: {
    backgroundColor: colors.secondary,
  },
  pauseButton: {
    backgroundColor: colors.primary,
  },
  stopButton: {
    backgroundColor: colors.accent,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
