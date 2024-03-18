export type DayType = {
  date?: Date,
  day: number,
  isToday: boolean,
  isCurrentMonth: boolean,
}

export type CalendarType = {
  days: DayType[],
  month: string,
  year: number,
}