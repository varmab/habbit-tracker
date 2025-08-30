import type { Habit, HabitProgress } from '../types/habit.js';

const HABITS_KEY = 'habit-tracker-habits';
const PROGRESS_KEY = 'habit-tracker-progress';

export const saveHabits = (habits: Habit[]): void => {
  try {
    localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  } catch (error) {
    console.error('Error saving habits:', error);
  }
};

export const loadHabits = (): Habit[] => {
  try {
    const stored = localStorage.getItem(HABITS_KEY);
    if (stored) {
      const habits = JSON.parse(stored);
      // Convert createdAt back to Date objects
      return habits.map((habit: any) => ({
        ...habit,
        createdAt: new Date(habit.createdAt)
      }));
    }
  } catch (error) {
    console.error('Error loading habits:', error);
  }
  return [];
};

export const saveProgress = (progress: HabitProgress): void => {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const loadProgress = (): HabitProgress => {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }
  return {};
};
