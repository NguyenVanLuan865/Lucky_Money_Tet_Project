import { Observable, from } from 'rxjs';
import * as Keychain from 'react-native-keychain';

export class LocalAuthenticationDataSource {
  saveToken(username: string, token: string): Observable<boolean> {
    return from(Keychain.setGenericPassword(username, token).then(() => true));
  }

  getToken(): Observable<string> {
    return from(
      Keychain.getGenericPassword().then((result) => {
        if (result) {
          return result.password;
        }
        throw new Error('No token found');
      })
    );
  }
}
