import React from 'react';
import type { Habit, HabitProgress } from '../types/habit.js';
import { getMonthDays, formatDate, isToday, isSameMonth } from '../utils/dateUtils';

interface CalendarProps {
  habits: Habit[];
  progress: HabitProgress;
  currentDate: Date;
  onToggleHabit: (habitId: string, date: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const Calendar: React.FC<CalendarProps> = ({
  habits,
  progress,
  currentDate,
  onToggleHabit,
  onPrevMonth,
  onNextMonth,
}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthDays = getMonthDays(year, month);

  const getHabitStatus = (habitId: string, date: Date): boolean => {
    const dateStr = formatDate(date);
    return progress[habitId]?.[dateStr] || false;
  };

  const getCompletedHabitsCount = (date: Date): number => {
    return habits.reduce((count, habit) => {
      return count + (getHabitStatus(habit.id, date) ? 1 : 0);
    }, 0);
  };

  const handleHabitToggle = (habitId: string, date: Date) => {
    const dateStr = formatDate(date);
    onToggleHabit(habitId, dateStr);
  };

  return (
    <div className="calendar">
      <div className="calendar__header">
        <button 
          className="btn btn--secondary calendar__nav-btn" 
          onClick={onPrevMonth}
          aria-label="Previous month"
        >
          ←
        </button>
        <h2 className="calendar__title">
          {MONTHS[month]} {year}
        </h2>
        <button 
          className="btn btn--secondary calendar__nav-btn" 
          onClick={onNextMonth}
          aria-label="Next month"
        >
          →
        </button>
      </div>

      <div className="calendar__weekdays">
        {WEEKDAYS.map((day) => (
          <div key={day} className="calendar__weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar__grid">
        {monthDays.map((date, index) => {
          const dateStr = formatDate(date);
          const isCurrentMonthDay = isSameMonth(date, month, year);
          const isTodayDate = isToday(date);
          const completedCount = getCompletedHabitsCount(date);
          const totalHabits = habits.length;

          return (
            <div
              key={index}
              className={`calendar__day ${
                !isCurrentMonthDay ? 'calendar__day--other-month' : ''
              } ${isTodayDate ? 'calendar__day--today' : ''}`}
            >
              <div className="calendar__day-number">{date.getDate()}</div>
              
              {isCurrentMonthDay && totalHabits > 0 && (
                <div className="calendar__day-habits">
                  {habits.map((habit) => {
                    const isCompleted = getHabitStatus(habit.id, date);
                    return (
                      <button
                        key={habit.id}
                        className={`habit-checkbox ${
                          isCompleted ? 'habit-checkbox--completed' : ''
                        }`}
                        style={{
                          backgroundColor: isCompleted ? habit.color : 'transparent',
                          borderColor: habit.color,
                        }}
                        onClick={() => handleHabitToggle(habit.id, date)}
                        title={`${habit.name} - ${isCompleted ? 'Completed' : 'Not completed'}`}
                        aria-label={`Toggle ${habit.name} for ${dateStr}`}
                      >
                        {isCompleted && <span className="habit-checkbox__check">✓</span>}
                      </button>
                    );
                  })}
                  
                  {totalHabits > 0 && (
                    <div className="calendar__day-progress">
                      {completedCount}/{totalHabits}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {habits.length === 0 && (
        <div className="calendar__empty-state">
          <p>Add some habits to start tracking your progress!</p>
        </div>
      )}
    </div>
  );
};
