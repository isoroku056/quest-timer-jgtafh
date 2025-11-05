
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Quest, CharacterStats } from '@/types/quest';

const QUESTS_STORAGE_KEY = '@quests';
const STATS_STORAGE_KEY = '@character_stats';
const LIFETIME_STORAGE_KEY = '@lifetime_seconds';

const initialStats: CharacterStats = {
  level: 1,
  experience: 0,
  experienceToNextLevel: 100,
  focus: 4,
  stamina: 5,
  motivation: 3,
};

export const useQuests = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [stats, setStats] = useState<CharacterStats>(initialStats);
  const [totalLifetimeSeconds, setTotalLifetimeSeconds] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const questsData = await AsyncStorage.getItem(QUESTS_STORAGE_KEY);
      const statsData = await AsyncStorage.getItem(STATS_STORAGE_KEY);
      const lifetimeData = await AsyncStorage.getItem(LIFETIME_STORAGE_KEY);

      if (questsData) {
        setQuests(JSON.parse(questsData));
      }
      if (statsData) {
        setStats(JSON.parse(statsData));
      }
      if (lifetimeData) {
        setTotalLifetimeSeconds(JSON.parse(lifetimeData));
      }
    } catch (error) {
      console.log('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveQuests = async (newQuests: Quest[]) => {
    try {
      await AsyncStorage.setItem(QUESTS_STORAGE_KEY, JSON.stringify(newQuests));
      setQuests(newQuests);
      
      // Update lifetime total
      const totalSeconds = newQuests.reduce((sum, quest) => sum + quest.timeSpent, 0);
      await AsyncStorage.setItem(LIFETIME_STORAGE_KEY, JSON.stringify(totalSeconds));
      setTotalLifetimeSeconds(totalSeconds);
    } catch (error) {
      console.log('Error saving quests:', error);
    }
  };

  const saveStats = async (newStats: CharacterStats) => {
    try {
      await AsyncStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(newStats));
      setStats(newStats);
    } catch (error) {
      console.log('Error saving stats:', error);
    }
  };

  const addQuest = (quest: Omit<Quest, 'id' | 'completed' | 'timeSpent' | 'isRunning'>) => {
    const newQuest: Quest = {
      ...quest,
      id: Date.now().toString(),
      completed: false,
      timeSpent: 0,
      isRunning: false,
    };
    saveQuests([...quests, newQuest]);
  };

  const updateQuest = (id: string, updates: Partial<Quest>) => {
    const updatedQuests = quests.map((quest) =>
      quest.id === id ? { ...quest, ...updates } : quest
    );
    saveQuests(updatedQuests);
  };

  const deleteQuest = (id: string) => {
    saveQuests(quests.filter((quest) => quest.id !== id));
  };

  const completeQuest = (id: string) => {
    const quest = quests.find((q) => q.id === id);
    if (!quest) return;

    const newExperience = stats.experience + quest.experience;
    let newLevel = stats.level;
    let newExpToNext = stats.experienceToNextLevel;
    let remainingExp = newExperience;

    while (remainingExp >= newExpToNext) {
      remainingExp -= newExpToNext;
      newLevel += 1;
      newExpToNext = Math.floor(newExpToNext * 1.5);
    }

    const newStats: CharacterStats = {
      ...stats,
      level: newLevel,
      experience: remainingExp,
      experienceToNextLevel: newExpToNext,
      focus: Math.min(5, stats.focus + (newLevel > stats.level ? 1 : 0)),
      stamina: Math.min(5, stats.stamina + (newLevel > stats.level ? 1 : 0)),
      motivation: Math.min(5, stats.motivation + (newLevel > stats.level ? 1 : 0)),
    };

    updateQuest(id, { completed: true, progress: 100 });
    saveStats(newStats);
  };

  return {
    quests,
    stats,
    loading,
    totalLifetimeSeconds,
    addQuest,
    updateQuest,
    deleteQuest,
    completeQuest,
  };
};
