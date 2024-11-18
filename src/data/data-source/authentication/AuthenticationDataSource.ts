import { Observable, from } from 'rxjs';
import auth from '@react-native-firebase/auth';

export class AuthenticationDataSource {
  signIn(email: string, password: string): Observable<string> {
    return from(
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => userCredential.user.uid) // Trả về UID của user
    );
  }

  register(email: string, password: string): Observable<string> {
    return from(
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => userCredential.user.uid)
    );
  }
}
