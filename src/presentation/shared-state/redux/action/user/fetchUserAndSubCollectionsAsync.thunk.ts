import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const fetchUserAndSubCollectionsAsync = createAsyncThunk(
  'user/fetchUserAndSubCollections',
  async (userId: string, { rejectWithValue }) => {
    try {
      const userDoc = await firestore().collection('users').doc(userId).get();

      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      const userData = userDoc.data();

      const transformSubCollectionData = (snap: any) =>
        snap.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(), 
        }));

      const lacLocVangSnap = await firestore()
        .collection('users')
        .doc(userId)
        .collection('laclocvang')
        .get();
      const lacLocVang = transformSubCollectionData(lacLocVangSnap);

      const liXiSnap = await firestore()
        .collection('users')
        .doc(userId)
        .collection('lixi')
        .get();
      const liXi = transformSubCollectionData(liXiSnap);

      // const maSoMayManSnap = await firestore()
      //   .collection('users')
      //   .doc(userId)
      //   .collection('masomayman')
      //   .get();
      // const maSoMayMan = transformSubCollectionData(maSoMayManSnap);

      return {
        user: userData,
        laclocvang: lacLocVang,
        lixi: liXi,
        // masomayman: maSoMayMan,
      };
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      return rejectWithValue(error.message || 'Failed to fetch user data');
    }
  }
);
