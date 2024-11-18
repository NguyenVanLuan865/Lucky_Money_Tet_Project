import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const redeemRewardAsync = createAsyncThunk(
    'reward/redeemReward',
    async (
        {
            userId,
            rewardType,
            quantity,
            lixiCost,
        }: {
            userId: string;
            rewardType: 'phieu_100k' | 'phieu_50k';
            quantity: number;
            lixiCost: number;
        },
        { rejectWithValue }
    ) => {
        try {
            const userRef = firestore().collection('users').doc(userId);
            const rewardRef = firestore().collection('reward').doc(rewardType);
            const lixiVangRef = firestore()
                .collection('users')
                .doc(userId)
                .collection('lixi')
                .doc(rewardType);

            await firestore().runTransaction(async (transaction) => {
                const userSnap = await transaction.get(userRef);
                const rewardSnap = await transaction.get(rewardRef);
                const lixiVangSnap = await transaction.get(lixiVangRef)
                if (!userSnap.exists || !rewardSnap.exists) {
                    throw new Error('User or Reward not found.');
                }

                const currentLixi = userSnap.data()?.lixi || 0;
                const currentReward = rewardSnap.data()?.soluong || 0;

                if (currentLixi < lixiCost * quantity) {
                    throw new Error('Not enough lì xì.');
                }

                if (currentReward < quantity) {
                    throw new Error('Not enough rewards available.');
                }
                const currentLixiVang = lixiVangSnap.exists
                    ? lixiVangSnap.data()?.soluong || 0
                    : 0;
                const currentTrangThai = lixiVangSnap.exists
                    ? lixiVangSnap.data()?.trangThai || false
                    : false;

                transaction.update(userRef, {
                    lixi: currentLixi - lixiCost * quantity,
                });

                transaction.update(rewardRef, {
                    soluong: currentReward - quantity,
                });

                // transaction.set(
                //     lixiVangRef,
                //     { soluong: quantity, trangThai: false },
                //     { merge: true }
                // );
                if (currentTrangThai === false) {

                    transaction.set(
                      lixiVangRef,
                      { soluong: currentLixiVang + quantity, trangThai: false },
                      { merge: true }
                    );
                  } else {
                    transaction.set(
                      lixiVangRef,
                      { soluong: quantity, trangThai: false },
                      { merge: true }
                    );
                  }
            });

            return { rewardType, updatedLixi: quantity * lixiCost };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Đổi thưởng thất bại.');
        }
    }
);


