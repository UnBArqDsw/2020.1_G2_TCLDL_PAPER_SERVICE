import { DateGenerator } from '@data/protocols/DateGenerator';
import { format, utcToZonedTime } from 'date-fns-tz';

export class DateGeneratorAdapter implements DateGenerator {
  private readonly TIME_ZONE: string

  private readonly DATE_FORMAT: string

  constructor() {
    this.TIME_ZONE = process.env.TZ || 'America/New_York';
    this.DATE_FORMAT = 'yyyy-M-dd HH:mm:ss z';
  }

  generate() {
    const zonedDate = utcToZonedTime(new Date(), this.TIME_ZONE);

    return format(zonedDate, this.DATE_FORMAT, { timeZone: this.TIME_ZONE });
  }
}
