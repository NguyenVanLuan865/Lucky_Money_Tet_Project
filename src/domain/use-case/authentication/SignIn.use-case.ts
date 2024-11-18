// src/domain/use-case/authentication/SignInUseCase.ts
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthenticationRepository } from '../../repository/AuthenticationRepository';
import { SignInResult, Credential } from '../../entity/authentication';

export class SignInUseCase {
  private authenticationRepository: AuthenticationRepository;

  constructor(authenticationRepository: AuthenticationRepository) {
    this.authenticationRepository = authenticationRepository;
  }

  execute(param?: Credential): Observable<SignInResult> {
    if (!param) {
      return this.localSignIn();
    }
    return this.remoteSignIn(param);
  }

  private localSignIn(): Observable<SignInResult> {
    const tokenKey = 'authToken'; // Key lưu trữ token
    return this.authenticationRepository.getToken(tokenKey).pipe(
      map(
        (token): SignInResult => {
          return { fromLocal: true, token };
        }
      )
    );
  }

  private remoteSignIn(param: Credential): Observable<SignInResult> {
    return this.authenticationRepository.signIn(param).pipe(
      mergeMap((result: SignInResult) => {
        console.log('Remote Sign-In Token:', result.token);
        return this.onRemoteSignInSuccess(result);
      })
    );
  }

  private onRemoteSignInSuccess(result: SignInResult): Observable<SignInResult> {
    const tokenKey = 'authToken'; 
    console.log('Saving Token to Local:', result.token); 
    return this.authenticationRepository
      .saveToken(tokenKey, result.token)
      .pipe(map(() => result));
  }
}
