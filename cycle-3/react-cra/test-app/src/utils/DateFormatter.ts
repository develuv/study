const replaceHyphen = (date: string | Date): string | Date => {
  if (typeof date === 'string') {
    return date.replace(/-/g, '/');
  }

  return date;
};

export enum TimeField {
  year = 'year',
  month = 'month',
  date = 'date',
  hours = 'hours',
  minutes = 'minutes',
  seconds = 'seconds',
}

const WEEK_NAMES: Array<string> = ['일', '월', '화', '수', '목', '금', '토'];
const AM_TEXT = '오전';
const PM_TEXT = '오후';

class DateFormatter {
  private readonly privateDate: Date;

  constructor(date?: string | Date) {
    if (date) {
      this.privateDate = new Date(replaceHyphen(date));
    } else {
      this.privateDate = new Date();
    }
  }

  public get value(): Date {
    return this.privateDate;
  }

  public get fullYear(): number {
    return this.privateDate.getFullYear();
  }

  public set fullYear(value: number) {
    this.privateDate.setFullYear(value);
  }

  public get month(): number {
    return this.privateDate.getMonth();
  }

  public set month(value: number) {
    this.privateDate.setMonth(value);
  }

  public get date(): number {
    return this.privateDate.getDate();
  }

  public set date(value: number) {
    this.privateDate.setDate(value);
  }

  public get day(): number {
    return this.privateDate.getDay();
  }

  public get hours(): number {
    return this.privateDate.getHours();
  }

  public set hours(value: number) {
    this.privateDate.setHours(value);
  }

  public get minutes(): number {
    return this.privateDate.getMinutes();
  }

  public set minutes(value: number) {
    this.privateDate.setMinutes(value);
  }

  public get seconds(): number {
    return this.privateDate.getSeconds();
  }

  public set seconds(value: number) {
    this.privateDate.setSeconds(value);
  }

  public get time(): number {
    return this.privateDate.getTime();
  }

  public set time(value: number) {
    this.privateDate.setTime(value);
  }

  public format(format: string): string {
    return format.replace(/(yyyy|yy|y|MM|M|dd|d|E|hh|h|mm|m|ss|s|a\/p)/gi, this.dateFormatReplacer.bind(this));
  }

  public add(amount: number, timeField: TimeField): DateFormatter {
    const newOrderDate = new DateFormatter(this.privateDate);

    switch (timeField) {
      case TimeField.year:
        newOrderDate.fullYear += amount;
        break;
      case TimeField.month:
        newOrderDate.month += amount;
        break;
      case TimeField.date:
        newOrderDate.date += amount;
        break;
      case TimeField.hours:
        newOrderDate.hours += amount;
        break;
      case TimeField.minutes:
        newOrderDate.minutes += amount;
        break;
      case TimeField.seconds:
        newOrderDate.seconds += amount;
        break;
      default:
        throw new Error('no times field');
    }

    return newOrderDate;
  }

  public subtract(amount: number, timeField: TimeField): DateFormatter {
    return this.add(-amount, timeField);
  }

  public diff(compareMoment: Date | string, timeField: TimeField, exactCompare = false): number {
    const compareDate = new DateFormatter(compareMoment);
    const timestampDiff = this.privateDate.getTime() - compareDate.time;

    let value = 0;

    switch (timeField) {
      case TimeField.year:
        value = this.diffYear(timestampDiff, compareDate, exactCompare);
        break;
      case TimeField.month:
        value = this.diffMonth(timestampDiff, compareDate, exactCompare);
        break;
      case TimeField.date:
        value = this.diffDate(timestampDiff, compareDate, exactCompare);
        break;
      case TimeField.hours:
        value = this.diffHours(timestampDiff, compareDate, exactCompare);
        break;
      case TimeField.minutes:
        value = this.diffMinutes(timestampDiff, compareDate, exactCompare);
        break;
      case TimeField.seconds:
        value = this.diffSeconds(timestampDiff, compareDate, exactCompare);
        break;
      default:
        throw new Error('no times field');
    }

    return value;
  }

  private dateFormatReplacer(substring: string): string {
    const start = -2;

    switch (substring) {
      case 'yyyy':
        return this.privateDate.getFullYear().toString();
      case 'y':
        return `${this.privateDate.getFullYear() % 1000}`.slice(start);
      case 'yy':
        return `00${this.privateDate.getFullYear() % 1000}`.slice(start);
      case 'M':
        return `${this.privateDate.getMonth() + 1}`.slice(start);
      case 'MM':
        return `0${this.privateDate.getMonth() + 1}`.slice(start);
      case 'd':
        return `${this.privateDate.getDate()}`.slice(start);
      case 'dd':
        return `0${this.privateDate.getDate()}`.slice(start);
      case 'E':
        return WEEK_NAMES[this.privateDate.getDay()];
      case 'H':
        return `${this.privateDate.getHours()}`.slice(start);
      case 'HH':
        return `0${this.privateDate.getHours()}`.slice(start);
      case 'h':
        return `${this.privateDate.getHours() % 12 !== 0 ? this.privateDate.getHours() % 12 : 12}`.slice(start);
      case 'hh':
        return `0${this.privateDate.getHours() % 12 !== 0 ? this.privateDate.getHours() % 12 : 12}`.slice(start);
      case 'm':
        return `${this.privateDate.getMinutes()}`.slice(start);
      case 'mm':
        return `0${this.privateDate.getMinutes()}`.slice(start);
      case 's':
        return `${this.privateDate.getSeconds()}`.slice(start);
      case 'ss':
        return `0${this.privateDate.getSeconds()}`.slice(start);
      case 'a/p':
        return this.privateDate.getHours() < 12 ? AM_TEXT : PM_TEXT;
      case 'x':
        return `${this.privateDate.getTime()}`;
      default:
        return substring;
    }
  }

  private diffYear(timestampDiff: number, compareDate: DateFormatter, exactCompare = false) {
    if (exactCompare) {
      return timestampDiff / (1000 * 60 * 60 * 24 * 12 * 365);
    }

    return this.privateDate.getFullYear() - compareDate.fullYear;
  }

  private diffMonth(timestampDiff: number, compareDate: DateFormatter, exactCompare = false) {
    if (exactCompare) {
      return timestampDiff / (1000 * 60 * 60 * 24 * 12);
    }

    const yearDiff = (this.privateDate.getFullYear() - compareDate.fullYear) * 12;
    const monthDiff = this.privateDate.getMonth() - compareDate.month;

    return yearDiff + monthDiff;
  }

  private diffDate(timestampDiff: number, compareDate: DateFormatter, exactCompare = false) {
    if (exactCompare) {
      return timestampDiff / (1000 * 60 * 60 * 24);
    }

    const thisDateWithoutTime = this.privateDate.getTime() - (this.privateDate.getTime() % (1000 * 60 * 60 * 24));
    const compareDateWithoutTime = compareDate.time - (compareDate.time % (1000 * 60 * 60 * 24));
    const diffTime = thisDateWithoutTime - compareDateWithoutTime;

    return diffTime / (1000 * 60 * 60 * 24);
  }

  private diffHours(timestampDiff: number, compareDate: DateFormatter, exactCompare = false) {
    if (exactCompare) {
      return timestampDiff / (1000 * 60 * 60);
    }

    const thisDateWithoutMinuteAndSecond = this.privateDate.getTime() - (this.privateDate.getTime() % (1000 * 60 * 60));
    const compareDateWithoutMinuteAndSecond = compareDate.time - (compareDate.time % (1000 * 60 * 60));
    const diffTime = thisDateWithoutMinuteAndSecond - compareDateWithoutMinuteAndSecond;

    return diffTime / (1000 * 60 * 60);
  }

  private diffMinutes(timestampDiff: number, compareDate: DateFormatter, exactCompare = false) {
    if (exactCompare) {
      return timestampDiff / (1000 * 60);
    }

    const thisDateWithoutSecond = this.privateDate.getTime() - (this.privateDate.getTime() % (1000 * 60));
    const compareDateWithoutSecond = compareDate.time - (compareDate.time % (1000 * 60));
    const diffTime = thisDateWithoutSecond - compareDateWithoutSecond;

    return diffTime / (1000 * 60);
  }

  private diffSeconds(timestampDiff: number, compareDate: DateFormatter, exactCompare = false) {
    if (exactCompare) {
      return timestampDiff / 1000;
    }

    const thisDateWithoutMilliSecond = this.privateDate.getTime() - (this.privateDate.getTime() % 1000);
    const compareDateWithoutMilliSecond = compareDate.time - (compareDate.time % 1000);
    const diffTime = thisDateWithoutMilliSecond - compareDateWithoutMilliSecond;

    return diffTime / 1000;
  }
}

export default DateFormatter;
