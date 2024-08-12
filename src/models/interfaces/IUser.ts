import { IAuthUser } from "./auth/IAuthUser";

/**
 * Represents a user.
 */
interface IUser extends IAuthUser {
  /**
   * The user's status
   * @type {boolean}
   * @memberof User
   * @property status
   * @required
   * @example
   * true
   * @default
   * true
   */
  isActive: boolean;

  /**
   * The user's role
   * @type {boolean}
   * @memberof User
   * @property isAdmin
   * @required
   * @example
   * true
   * @default
   * false
   */
  isAdmin: boolean;

  /**
   * The user's verification status
   * @type {boolean}
   * @memberof User
   * @property isVerified
   * @required
   * @example
   * true
   * @default
   * false
   */
  isVerified: boolean;

  /**
   * The user's created date
   * @type {Date}
   * @memberof User
   * @property createdAt
   * @required
   * @example
   * "2020-01-01T00:00:00.000Z"
   */
  createdAt: Date;

  /**
   * The user's updated date
   * @type {Date}
   * @memberof User
   * @property updatedAt
   * @required
   * @example
   * "2020-01-01T00:00:00.000Z"
   */
  updatedAt: Date;

  /**
   * The user's deleted date
   * @type {Date}
   * @memberof User
   * @property deletedAt
   * @optional
   * @example
   * "2020-01-01T00:00:00.000Z"
   */
  deletedAt?: Date;
}

export default IUser;
