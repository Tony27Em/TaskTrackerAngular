import { Component } from '@angular/core';
import { CalendarService } from './calendar.service';
import { CalendarType, DayType } from './calendar.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent {
  WEEKDAYS: Array<string> = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  days: DayType[] = [];
  month: string = '';
  year: number = 0;

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    const calendar = this.calendarService.getCalendar();    
    this.setCalendar(calendar);
  }

  handlePrev(): void {
    const prev = this.calendarService.setPrevMonth();
    this.setCalendar(prev);
  }
  
  handleNext(): void {
    const next = this.calendarService.setNextMonth();
    this.setCalendar(next);
  }

  setCalendar(calendar: CalendarType): void {
    this.days = calendar.days;
    this.month = calendar.month;
    this.year = calendar.year;
  }
}
