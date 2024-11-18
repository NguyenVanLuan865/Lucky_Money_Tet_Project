import { Observable, from } from 'rxjs';
import { map,mergeMap  } from 'rxjs/operators';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AuthenticationRepository } from '../../domain/repository/AuthenticationRepository';
import { SignInResult, Credential } from '../../domain/entity/authentication';

export class FirebaseAuthenticationRepository implements AuthenticationRepository {

  signIn(credential: Credential): Observable<SignInResult> {
    return from(
      auth().signInWithEmailAndPassword(credential.email, credential.password)
    ).pipe(
      map((userCredential) => ({
        token: userCredential.user.uid, 
        fromLocal: false, 
      }))
    );
  }
  register(credential: Credential): Observable<SignInResult> {
    return from(
      auth().createUserWithEmailAndPassword(credential.email, credential.password)
    ).pipe(
      mergeMap((userCredential) => {

        const uid = userCredential.user.uid;

        const userDoc = firestore().collection('users').doc(uid);
        return from(
          userDoc.set({
            email: credential.email,
            createdAt: firestore.FieldValue.serverTimestamp(),
          })
        ).pipe(
          
          map(() => ({
            token: uid,
            fromLocal: false,
          }))
        );
      })
    );
  }

  // Giả lập lưu token (có thể thay thế bằng AsyncStorage hoặc SecureStore)
  saveToken(key: string, token: string): Observable<boolean> {
    return from(Promise.resolve(true)); // Giả sử lưu thành công
  }

  // Lấy token (giả lập, trong thực tế có thể từ AsyncStorage)
  getToken(): Observable<string> {
    return from(Promise.resolve('ExampleToken'));
  }
}
