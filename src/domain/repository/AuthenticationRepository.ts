// src/domain/repository/AuthenticationRepository.ts
import { Observable } from 'rxjs';
import { SignInResult, Credential } from '../entity/authentication';

export interface AuthenticationRepository {
  signIn(credential: Credential): Observable<SignInResult>;
  register(credential: Credential): Observable<SignInResult>;
  saveToken(key: string, token: string): Observable<boolean>;
  getToken(key: string): Observable<string>;
}
