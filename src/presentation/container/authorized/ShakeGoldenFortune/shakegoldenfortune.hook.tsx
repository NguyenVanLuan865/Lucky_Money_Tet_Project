import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';

interface LuckyCode {
    codes: string;
    prefix: string;
}

const useGoldenFortune = () => {
   
    const randomAndProcessReward = async (userId: string) => {
        const rewardSnapshot = await firestore().collection('reward').get();
        let rewards = rewardSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    
        rewards = rewards.filter((reward) => reward.tile > 0);
        const totalWeight = rewards.reduce((sum, reward) => sum + reward.tile, 0);
    
        if (totalWeight === 0) {
            throw new Error('Total weight is zero. No valid rewards available.');
        }
    
        const randomValue = Math.random() * totalWeight;
        let cumulativeWeight = 0;
        let selectedReward = null;
    
        for (const reward of rewards) {
            cumulativeWeight += reward.tile;
            if (randomValue <= cumulativeWeight) {
                selectedReward = reward;
                break;
            }
        }
    
        if (selectedReward) {
            await firestore().collection('reward').doc(selectedReward.id).update({
                soluong: selectedReward.soluong - 1,
            });
            return selectedReward;
        }
    
        throw new Error('No reward selected.');
    };
    
    const randomAndProcessLuckyCode = async () => {
        const luckyCodeSnapshot = await firestore().collection('luckycode').get();
        const luckyCodes = luckyCodeSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    
        const availableCodes = luckyCodes.find((code) => code.available > 0);
    
        if (availableCodes) {
            const selectedCode = availableCodes.codes.pop();
            await firestore().collection('luckycode').doc(availableCodes.id).update({
                codes: availableCodes.codes,
                available: availableCodes.available - 1,
            });
    
            return {
                prefix: availableCodes.prefix,
                codes: selectedCode,
            };
        }
    
        throw new Error('No lucky code available.');
    };
    
    const assignLuckyCodeToUser = async (userId: string, luckyCode: LuckyCode) => {
        try {
            if (!luckyCode) return;

            const userCodeData = {
                codes: luckyCode.codes,
                prefix: luckyCode.prefix,
            };

            await firestore()
                .collection('users')
                .doc(userId)
                .collection('masomayman')
                .add(userCodeData);
        } catch (error) {
            console.error('Error assigning lucky code to user:', error);
            throw error;
        }
    };

    const handleShakeOnce = async (userId: string) => {
        try {
            const reward = await randomAndProcessReward(userId); // Gọi hàm xử lý phần thưởng
            const luckyCode = await randomAndProcessLuckyCode(); // Gọi hàm xử lý mã may mắn
    
            if (!reward || !luckyCode) {
                throw new Error('Không lấy được phần thưởng hoặc mã code');
            }
    
            return { reward, luckyCode };
        } catch (error) {
            console.error('Error during shake once:', error);
            throw error;
        }
    };
    

    return {
        handleShakeOnce,
    };
};

export default useGoldenFortune;
