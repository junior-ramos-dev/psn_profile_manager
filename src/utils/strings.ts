export class StringUtils {
  //Compare two strings case insensitive
  public static compareStringIgnoreCase(str1: string, str2: string) {
    return str1.toUpperCase() === str2.toUpperCase();
  }

  //Format string to capitalize the first letter for each word
  public static formatStringToTitleCase(str: string) {
    const toLowerCase = str.toLowerCase();

    const toTitleCase = toLowerCase.replace(
      /(^\w|\s\w)(\S*)/g,
      (_: any, m1: string, m2: string) => m1.toUpperCase() + m2.toLowerCase()
    );

    return toTitleCase;
  }
}
