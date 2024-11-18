import firestore from '@react-native-firebase/firestore';

/**
 * Lấy ngẫu nhiên một phần thưởng dựa trên tỷ lệ (`tile`).
 */
const getRandomReward = async () => {
  const rewardsSnapshot = await firestore().collection('rewards').get();
  const rewards = rewardsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const totalRate = rewards.reduce((sum, reward) => sum + reward.tile, 0);
  const randomValue = Math.random() * totalRate;

  let cumulativeRate = 0;
  for (const reward of rewards) {
    cumulativeRate += reward.tile;
    if (randomValue <= cumulativeRate) {
      return reward;
    }
  }

  throw new Error('Không thể chọn phần thưởng.');
};

/**
 * Lấy một mã may mắn từ Firestore.
 */
const getLuckyCode = async () => {
  const codesSnapshot = await firestore().collection('luckycodes').get();
  const availableCodes = codesSnapshot.docs.filter(
    (doc) => doc.data().available > 0
  );

  if (availableCodes.length === 0) {
    throw new Error('Không còn mã may mắn khả dụng.');
  }

  const selectedCodeDoc = availableCodes[Math.floor(Math.random() * availableCodes.length)];
  const selectedCodeData = selectedCodeDoc.data();
  const code = selectedCodeData.codes.pop(); // Lấy mã cuối cùng từ mảng
  selectedCodeData.available -= 1;

  await firestore().collection('luckycodes').doc(selectedCodeDoc.id).update(selectedCodeData);

  return { prefix: selectedCodeData.prefix, code };
};

/**
 * Lắc lộc một lần.
 */
// export const ShakeTheFortuneOnce = async (userId: string) => {
//   try {
//     const reward = await getRandomReward();
//     const luckyCode = await getLuckyCode();

//     // Cập nhật thông tin phần thưởng và mã may mắn cho người dùng
//     await firestore().collection('users').doc(userId).update({
//       rewards: firestore.FieldValue.arrayUnion(reward.id),
//       luckyCodes: firestore.FieldValue.arrayUnion(luckyCode),
//     });

//     return { reward, luckyCode };
//   } catch (error) {
//     console.error('Error in shakeGoldenFortune:', error);
//     throw new Error('Không thể lắc lộc.');
//   }
// };
export const ShakeTheFortuneOnce = async () => {
    try {
        // Lấy toàn bộ danh sách reward từ Firestore
        const rewardSnapshot = await firestore().collection('reward').get();
        const rewards = rewardSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Tạo danh sách phần thưởng theo tỷ lệ
        const weightedRewards: string[] = [];
        rewards.forEach((reward) => {
            for (let i = 0; i < reward.tile; i++) {
                weightedRewards.push(reward.id);
            }
        });

        // Random phần thưởng
        const randomIndex = Math.floor(Math.random() * weightedRewards.length);
        const selectedRewardId = weightedRewards[randomIndex];

        // Lấy phần thưởng được chọn từ danh sách
        const selectedReward = rewards.find((r) => r.id === selectedRewardId);

        if (!selectedReward || selectedReward.soluong <= 0) {
            throw new Error('No rewards available.');
        }

        // Cập nhật số lượng phần thưởng còn lại
        await firestore().collection('reward').doc(selectedReward.id).update({
            soluong: selectedReward.soluong - 1,
        });

        return selectedReward.id; // Trả về phần thưởng được chọn
    } catch (error) {
        console.error('Error in shakeGoldenFortune:', error);
        throw new Error('Failed to shake golden fortune.');
    }
};
/**
 * Lắc lộc nhiều lần.
 */
export const ShakeTheFortuneTenTimes = async (userId: string, count: number) => {
  const results = [];
  for (let i = 0; i < count; i++) {
    const result = await ShakeTheFortuneOnce(userId);
    results.push(result);
  }
  return results;
};
