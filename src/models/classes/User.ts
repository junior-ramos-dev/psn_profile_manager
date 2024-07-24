import IUser from "../interfaces/IUser";

export default class User implements IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  isActive: boolean;
  isAdmin: boolean;
  isVerified: boolean;

  /**
   * Creates an instance of User.
   * @memberof User
   */
  constructor(
    id: string,
    name: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    isActive: boolean,
    isAdmin: boolean,
    isVerified: boolean,
    password?: string,
    deletedAt?: Date
  ) {
    (this.id = id),
      (this.name = name),
      (this.email = email),
      (this.password = password),
      (this.createdAt = createdAt),
      (this.updatedAt = updatedAt),
      (this.deletedAt = deletedAt),
      (this.isActive = isActive),
      (this.isAdmin = isAdmin),
      (this.isVerified = isVerified);
  }
}
