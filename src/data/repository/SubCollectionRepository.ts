import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import firestore from '@react-native-firebase/firestore';
import { LacLocVang, LiXi, MaSoMayMan } from '../../domain';

export class SubCollectionRepository {
  constructor(private userId: string) {}

  // Lấy tất cả các item từ sub-collection `laclocvang`
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

  // Lấy tất cả các item từ sub-collection `lixi`
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

  // Lấy tất cả các item từ sub-collection `masomayman`
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
