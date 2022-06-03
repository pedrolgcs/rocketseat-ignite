import dayJs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// interface
import { IDateProvider } from '../models/IDateProvider';

// apply plugin
dayJs.extend(utc);

class DayJsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayJs().utc().local().toDate();
  }

  convertToUTC(date: Date): string {
    return dayJs(date).utc().local().format();
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);

    return dayJs(end_date_utc).diff(start_date_utc, 'days');
  }

  public compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);

    return dayJs(end_date_utc).diff(start_date_utc, 'hours');
  }

  public compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayJs(start_date).isBefore(end_date);
  }

  public addDays(days: number): Date {
    return dayJs().add(days, 'days').toDate();
  }

  public addHours(hours: number): Date {
    return dayJs().add(hours, 'hour').toDate();
  }
}

export { DayJsDateProvider };
