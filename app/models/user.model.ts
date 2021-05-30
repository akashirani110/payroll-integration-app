/*
* Author: Maed
* Last Modified By: Akash Hirani
* Last Modified At: 12/10/2020
*/

import { TokenSet } from 'openid-client';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export interface IUser {
  employer_user_id?: string;
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  password: string;
  tokenSet?: TokenSet;
  createdAt?: Date;
  updatedAt?: Date;
  salt?: string;
  hashedPassword?: string;
  
}

export class EmployerUser implements IUser {
  employer_user_id?: string;
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  password: string;
  tokenSet?: TokenSet;
  createdAt?: Date;
  updatedAt?: Date;
  salt?: string;
  hashedPassword?: string;
  constructor(_fields: IUser) {
    if (_fields) Object.assign(this, _fields);
  }

  /**
   *  Generate hashed password token.
   *  Not used in the current built
   * */
  setPassword(_password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hashedPassword = crypto.pbkdf2Sync(_password, this.salt, 10000, 512, 'sha512').toString('hex');
  };

  /**
   *  Validate hashed password token
   *  Not used in the current built
   * */
  validatePassword(_password) {
    const hash = crypto.pbkdf2Sync(_password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hashedPassword === hash;
  }

  validateRawPassword(_password) {
    return this.password === _password;
  }

  generateJWT() {
    if (!this.employer_user_id) {
      throw "User ID is required to generate JWT"
    }
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
      id: this.employer_user_id,
      email: this.email,
    }, 'secret');
  }
}