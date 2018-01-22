import { HttpHeaders } from '@angular/common/http';
import * as jwt from 'jwt-decode';

export const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

// tslint:disable-next-line:no-inferrable-types
export const TOKEN_NAME: string = 'jwt_token';

export function getToken(): string {
  return localStorage.getItem(TOKEN_NAME);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_NAME, token);
}

export function getTokenExpirationDate(token: string): Date {
  const decoded = jwt.jwt_decode(token);

  // tslint:disable-next-line:curly
  if (decoded.exp === undefined) return null;

  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
}

export function getDecodedToken(token: string) {
  return jwt.jwt_decode(token);
}

export function isTokenExpired(token?: string): boolean {
  // tslint:disable-next-line:curly
  if (!token) token = this.getToken();
  // tslint:disable-next-line:curly
  if (!token) return true;

  const date = this.getTokenExpirationDate(token);
  // tslint:disable-next-line:curly
  if (date === undefined) return false;
  return !(date.valueOf() > new Date().valueOf());
}
