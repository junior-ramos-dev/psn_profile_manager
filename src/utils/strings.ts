import _ from "lodash";

export class StringUtils {
  /**
   * Compare two strings case insensitive
   *
   * @static
   * @param {string} str1
   * @param {string} str2
   * @return {boolean}
   * @memberof StringUtils
   */
  public static compareStringIgnoreCase(str1: string, str2: string): boolean {
    return _.toLower(str1) === _.toLower(str2);
  }

  /**
   * Format string to capitalize the first letter for each word
   *
   * @static
   * @param {string} str
   * @return {string}
   * @memberof StringUtils
   */
  public static formatStringToTitleCase(str: string): string {
    const toLowerCase = _.toLower(str);
    const toTitleCase = _.startCase(toLowerCase);

    return toTitleCase;
  }

  /**
   * Replace "subStr" for "strRepl" if "str" contains "subStr"
   *
   * @static
   * @param {string} str
   * @param {string} subStr
   * @param {string} strRepl
   * @return {string}
   * @memberof StringUtils
   */
  public static replaceSubstring(
    str: string,
    subStr: string,
    strRepl: string
  ): string {
    // const regex = /:userId/i;
    // console.log(url.replace(regex, "ferret"));

    return str.includes(subStr) ? str.replace(subStr, strRepl) : str;
  }
}

// Helper to extract URL from string
export const extractUrlFromString = (str: string) => {
  const url = str.match(/https?:\/\/[^\s]+/);

  let clearedUrl;

  if (url) {
    const urlMatch = url[0];
    clearedUrl = clearLeadingAndTrailingDots(urlMatch);
    return clearedUrl;
  }

  return clearedUrl;
};

// Helper function to remove leading and trailing dots from string;
export const clearLeadingAndTrailingDots = (str: string) => {
  const regex = /^\.*|\.*$/gm;
  const subst = ``;
  // The substituted value will be contained in the result variable
  const result = str.replace(regex, subst);

  return result;
};
