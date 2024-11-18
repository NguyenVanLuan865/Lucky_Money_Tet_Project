import { Observable, from } from 'rxjs';
import { AuthenticationRepository } from '../../repository/AuthenticationRepository';
import { SignInResult, Credential } from '../../entity/authentication';

export class RegisterUseCase {
  constructor(private repository: AuthenticationRepository) {}

  execute(credential: Credential): Observable<SignInResult> {
    return this.repository.register(credential);
  }
}
