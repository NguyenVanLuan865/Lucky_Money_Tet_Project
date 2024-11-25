import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import firestore from '@react-native-firebase/firestore';
import { LacLocVang, LiXi, MaSoMayMan } from '../../domain';

export class SubCollectionRepository {
  constructor(private userId: string) {}

  getLacLocVang(): Observable<LacLocVang[]> {
    return from(firestore().collection('users').doc(this.userId).collection('laclocvang').get()).pipe(
      map((querySnapshot) =>
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as LacLocVang[]
      )
    );
  }

  getLiXi(): Observable<LiXi[]> {
    return from(firestore().collection('users').doc(this.userId).collection('lixi').get()).pipe(
      map((querySnapshot) =>
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as LiXi[]
      )
    );
  }

  getMaSoMayMan(): Observable<MaSoMayMan[]> {
    return from(firestore().collection('users').doc(this.userId).collection('masomayman').get()).pipe(
      map((querySnapshot) =>
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as MaSoMayMan[]
      )
    );
  }
}
