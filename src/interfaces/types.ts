export interface Schedule {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
}

export type Days = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type Meridiem = 'AM' | 'PM';
