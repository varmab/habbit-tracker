import { useState, useEffect } from 'react';
import type { Habit, HabitProgress } from './types/habit.js';
import { HabitManager } from './components/HabitManager';
import { Calendar } from './components/Calendar';
import { saveHabits, loadHabits, saveProgress, loadProgress } from './utils/storage';
import './App.css';

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [progress, setProgress] = useState<HabitProgress>({});
  const [currentDate, setCurrentDate] = useState(new Date());

  // Load data from localStorage on app start
  useEffect(() => {
    const loadedHabits = loadHabits();
    const loadedProgress = loadProgress();
    setHabits(loadedHabits);
    setProgress(loadedProgress);
  }, []);

  // Save habits to localStorage whenever habits change
  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  // Save progress to localStorage whenever progress changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const addHabit = (habitData: Omit<Habit, 'id' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const deleteHabit = (habitId: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
    // Also remove progress data for this habit
    setProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[habitId];
      return newProgress;
    });
  };

  const toggleHabit = (habitId: string, date: string) => {
    setProgress(prev => ({
      ...prev,
      [habitId]: {
        ...prev[habitId],
        [date]: !prev[habitId]?.[date]
      }
    }));
  };

  const goToPrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1>Habit Tracker</h1>
        <p>Track your daily habits and build lasting routines</p>
      </header>

      <main className="app__main">
        <div className="app__section">
          <HabitManager
            habits={habits}
            onAddHabit={addHabit}
            onDeleteHabit={deleteHabit}
          />
        </div>

        <div className="app__section">
          <Calendar
            habits={habits}
            progress={progress}
            currentDate={currentDate}
            onToggleHabit={toggleHabit}
            onPrevMonth={goToPrevMonth}
            onNextMonth={goToNextMonth}
          />
        </div>
      </main>
    </div>
  );
}

export default App;