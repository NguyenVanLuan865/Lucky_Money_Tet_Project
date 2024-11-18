import { container } from 'tsyringe';
import {FirebaseAuthenticationRepository } from '../data';
import { AuthenticationRepository } from '../domain/repository/AuthenticationRepository';
import { SignInUseCase } from '../domain/use-case/authentication/SignIn.use-case';

// Đăng ký FirebaseAuthenticationRepository là implementation của AuthenticationRepository
container.register<AuthenticationRepository>('AuthenticationRepository', {
  useClass: FirebaseAuthenticationRepository,
});

// Đăng ký SignInUseCase
container.register(SignInUseCase, {
  useClass: SignInUseCase,
});
