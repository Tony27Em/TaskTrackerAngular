import { Component } from '@angular/core';
import { CalendarService } from './calendar.service';
import { DayType } from './calendar.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent {
  days: DayType[] = [];
  month: string = '';
  year: number = 0;
  WEEKDAYS: Array<string> = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    const calendar = this.calendarService.getCalendar();    
    this.days = calendar.days;
    this.month = calendar.month;
    this.year = calendar.year;
  }

  handlePrev(): void {
    const prev = this.calendarService.setPrevMonth();
    this.days = prev.days;
    this.month = prev.month;
    this.year = prev.year;
  }
  
  handleNext(): void {
    const next = this.calendarService.setNextMonth();
    this.days = next.days;
    this.month = next.month;
    this.year = next.year;
  }
}
