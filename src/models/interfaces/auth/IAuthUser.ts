export interface IAuthUser {
  /**
   * The user's unique identifier
   * @type {string}
   * @memberof IAuthUser
   * @property id
   * @required
   * @example
   * "5e8d8hg8h8h8q8faf8g8f8f"
   */
  id: string;

  /**
   * The PSN usersname
   * @type {string}
   * @memberof IAuthUser
   * @property name
   * @required
   * @example
   * "JohnSmith"
   */
  psnUsername: string;

  /**
   * The user's email address
   * @type {string}
   * @memberof IAuthUser
   * @property email
   * @required
   * @example
   * "john.smith@welcomedeveloper.com"
   */
  email: string;

  /**
   * The user's password
   * @type {string}
   * @memberof IAuthUser
   * @property password
   * @optional
   * @example
   * "password"
   */
  password?: string;
}
