import { createAsyncThunk } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export const registerAsync = createAsyncThunk(
    'authentication/register',
    async (
        { email, password, additionalInfo }: { email: string; password: string; additionalInfo?: any },
        { rejectWithValue }
    ) => {
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);

            const uid = userCredential.user.uid;

            const userDoc = firestore().collection('users').doc(uid);
            await userDoc.set({
                email,
                ...additionalInfo,
                createdAt: firestore.FieldValue.serverTimestamp(),
            });

            const batch = firestore().batch();

            const lacLocVangRef = userDoc.collection('laclocvang');
            const lacLocVangData = [
                { id: 'phieu100k', soluong: 0, trangThai: false },
                { id: 'phieu200k', soluong: 0, trangThai: false },
                { id: 'phieu500k', soluong: 0, trangThai: false },
                { id: 'phukien', soluong: 0,trangThai: false },
                { id: 'motchivang', soluong: 0,trangThai: false },
                { id: 'nuachivang', soluong: 0, trangThai: false},

            ];
            lacLocVangData.forEach((item) => {
                batch.set(lacLocVangRef.doc(item.id), {
                    soLuong: item.soluong,
                    trangThai: item.trangThai,
                });
            });

            const liXiRef = userDoc.collection('lixi');
            const liXiData = [
                { id: 'phieu_50k', name: 'Phiếu mua hàng 50k', soluong: 0, trangThai: false },
                { id: 'phieu_100k',name: 'Phiếu mua hàng 100k', soluong: 0, trangThai: false},
            ];
            liXiData.forEach((item) => {
                batch.set(liXiRef.doc(item.id), {
                    soluong: item.soluong,
                    trangThai: item.trangThai,
                });
            });

            const maSoMayManRef = userDoc.collection('masomayman');
            batch.set(maSoMayManRef.doc('placeholder'), {
                status: 'placeholder',
                createdAt: firestore.FieldValue.serverTimestamp(),
            });

            await batch.commit();

            return uid; 
        } catch (error: any) {
            return rejectWithValue(error.message || 'Registration failed');
        }
    }
);
