export interface Habit {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
}

export interface HabitEntry {
  habitId: string;
  date: string; // YYYY-MM-DD format
  completed: boolean;
}

export interface HabitProgress {
  [habitId: string]: {
    [date: string]: boolean;
  };
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  habits: {
    habitId: string;
    completed: boolean;
  }[];
}
