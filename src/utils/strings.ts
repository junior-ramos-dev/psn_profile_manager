import _ from "lodash";

export class StringUtils {
  //Compare two strings case insensitive
  public static compareStringIgnoreCase(str1: string, str2: string) {
    return _.toLower(str1) === _.toLower(str2);
  }

  //Format string to capitalize the first letter for each word
  public static formatStringToTitleCase(str: string) {
    const toLowerCase = _.toLower(str);
    const toTitleCase = _.startCase(toLowerCase);

    return toTitleCase;
  }
}
