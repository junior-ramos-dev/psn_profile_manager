export class DateUtils {
  public static parseDateToTimestamp(date: Date): number {
    return Date.parse(date.toString());
  }

  public static parseTimestampToDateISOString(timestamp: number): string {
    return new Date(timestamp).toISOString();
  }
}
