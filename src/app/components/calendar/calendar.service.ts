import { Injectable } from '@angular/core';
import { DayType, CalendarType } from './calendar.model';

@Injectable({
  providedIn: 'root'
})

export class CalendarService {
  MONTHS: Array<string> = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  date: Date = new Date();
  selectedMonth: string = '';
  selectedYear: number = 0;
  currentMonthDays: Array<DayType> = [];
  prevMonthDays: Array<DayType> = [];
  nextMonthDays: Array<DayType> = [];

  constructor() {
    this.initCalendar(this.date);
  }

  initCalendar(date: Date): void {
    const firstDay: Date = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const currentMonthDays: Array<DayType> = Array.from({ length: lastDay.getDate() }, (_, i) => {
      return {
        date: new Date(date.getFullYear(), date.getMonth(), i + 1),
        day: i + 1,
        isToday: i + 1 === new Date().getDate() && date.getMonth() === new Date().getMonth(),
        isCurrentMonth: true,
      }
    });
  
    const prevMonthDays: Array<DayType> = Array.from({ length: firstDay.getDay() !== 0 ? firstDay.getDay() - 1 : 6 }, (_, i) => {
      return {
        day: new Date(date.getFullYear(), date.getMonth(), 0).getDate() - i,
        isToday: false,
        isCurrentMonth: false,
      }
    })
  
    const nextMonthDays: Array<DayType> = Array.from({ length: lastDay.getDay() !== 0 ? 7 - lastDay.getDay() : 0 }, (_, i) => {
      return {
        day: i + 1,
        isToday: false,
        isCurrentMonth: false,
      }
    })

    this.currentMonthDays = currentMonthDays;
    this.prevMonthDays = prevMonthDays.reverse();
    this.nextMonthDays = nextMonthDays;
    this.selectedMonth = this.MONTHS[date.getMonth()];
    this.selectedYear = date.getFullYear();
  }

  getCalendar(): CalendarType {
    return {
      days: [  
        ...this.prevMonthDays,
        ...this.currentMonthDays,
        ...this.nextMonthDays,
      ],
      month: this.selectedMonth,
      year: this.selectedYear,
    }
  }

  setPrevMonth(): CalendarType {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
    this.initCalendar(this.date);
    return this.getCalendar();
  }

  setNextMonth(): CalendarType {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
    this.initCalendar(this.date);
    return this.getCalendar();
  }
}
