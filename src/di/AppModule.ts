import { container } from 'tsyringe';
import {FirebaseAuthenticationRepository } from '../data';
import { AuthenticationRepository } from '../domain/repository/AuthenticationRepository';
import { SignInUseCase } from '../domain/use-case/authentication/SignIn.use-case';

container.register<AuthenticationRepository>('AuthenticationRepository', {
  useClass: FirebaseAuthenticationRepository,
});

container.register(SignInUseCase, {
  useClass: SignInUseCase,
});
