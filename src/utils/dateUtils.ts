export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const parseDate = (dateString: string): Date => {
  return new Date(dateString + 'T00:00:00');
};

export const getMonthDays = (year: number, month: number): Date[] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  
  const days: Date[] = [];
  
  // Add days from previous month to fill the week
  const firstDayOfWeek = firstDay.getDay();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(year, month, -i);
    days.push(prevDate);
  }
  
  // Add all days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }
  
  // Add days from next month to fill the week
  const lastDayOfWeek = lastDay.getDay();
  const remainingDays = 6 - lastDayOfWeek;
  for (let i = 1; i <= remainingDays; i++) {
    const nextDate = new Date(year, month + 1, i);
    days.push(nextDate);
  }
  
  return days;
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isSameMonth = (date: Date, month: number, year: number): boolean => {
  return date.getMonth() === month && date.getFullYear() === year;
};
