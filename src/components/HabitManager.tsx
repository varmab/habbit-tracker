import React, { useState } from 'react';
import type { Habit } from '../types/habit.js';

interface HabitManagerProps {
  habits: Habit[];
  onAddHabit: (habit: Omit<Habit, 'id' | 'createdAt'>) => void;
  onDeleteHabit: (habitId: string) => void;
}

const HABIT_COLORS = [
  '#3B82F6', // Blue
  '#EF4444', // Red
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#F97316', // Orange
  '#06B6D4', // Cyan
];

export const HabitManager: React.FC<HabitManagerProps> = ({
  habits,
  onAddHabit,
  onDeleteHabit,
}) => {
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [selectedColor, setSelectedColor] = useState(HABIT_COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabitName.trim()) {
      onAddHabit({
        name: newHabitName.trim(),
        color: selectedColor,
      });
      setNewHabitName('');
      setSelectedColor(HABIT_COLORS[0]);
      setIsAddingHabit(false);
    }
  };

  const handleCancel = () => {
    setNewHabitName('');
    setSelectedColor(HABIT_COLORS[0]);
    setIsAddingHabit(false);
  };

  return (
    <div className="habit-manager">
      <div className="habit-manager__header">
        <h2>My Habits</h2>
        {!isAddingHabit && (
          <button
            className="btn btn--primary"
            onClick={() => setIsAddingHabit(true)}
          >
            Add New Habit
          </button>
        )}
      </div>

      {isAddingHabit && (
        <form className="habit-form" onSubmit={handleSubmit}>
          <div className="habit-form__field">
            <label htmlFor="habit-name">Habit Name *</label>
            <input
              id="habit-name"
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              placeholder="e.g., Drink 8 glasses of water"
              required
              autoFocus
            />
          </div>

          <div className="habit-form__field">
            <label>Color</label>
            <div className="color-picker">
              {HABIT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`color-option ${
                    selectedColor === color ? 'color-option--selected' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="habit-form__actions">
            <button type="button" className="btn btn--secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Add Habit
            </button>
          </div>
        </form>
      )}

      <div className="habits-list">
        {habits.length === 0 ? (
          <p className="habits-list__empty">
            No habits yet. Add your first habit to get started!
          </p>
        ) : (
          habits.map((habit) => (
            <div key={habit.id} className="habit-item">
              <div className="habit-item__content">
                <div
                  className="habit-item__color"
                  style={{ backgroundColor: habit.color }}
                />
                <div className="habit-item__details">
                  <h3 className="habit-item__name">{habit.name}</h3>
                </div>
              </div>
              <button
                className="btn btn--danger btn--small"
                onClick={() => onDeleteHabit(habit.id)}
                aria-label={`Delete habit: ${habit.name}`}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
