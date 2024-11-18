import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

/**
 * Thêm người chơi vào hàng đợi match
 * @param userId ID người dùng
 * @param name Tên người dùng
 * @param gameType Loại game
 * @returns Promise<void>
 */
export const joinMatchQueueWithUserData = async (
    userId: string,
    gameType: string
): Promise<string> => {
    try {
        const userDoc = await firestore().collection('users').doc(userId).get();

        if (!userDoc.exists) {
            throw new Error('Người dùng không tồn tại.');
        }

        const userData = userDoc.data();
        const name = userData?.name || 'Unknown';

        // Thêm vào hàng đợi
        await firestore().collection('matchQueue').doc(userId).set({
            userId,
            name,
            status: 'waiting',
            opponentId: null,
            gameType,
            createdAt: firestore.FieldValue.serverTimestamp(),
        });

        console.log(`User ${name} đã tham gia hàng đợi.`);
        return name; // Trả về name để sử dụng
    } catch (error) {
        console.error('Error joining match queue:', error);
        throw new Error('Không thể tham gia hàng đợi.');
    }
};
/**
 * Tạo phòng game sau khi match thành công
 * @param userId ID người dùng
 * @param opponentId ID đối thủ
 * @param gameType Loại game
 * @returns Promise<string> roomId
 */
export const createGameRoom = async (
    userId: string,
    opponentId: string,
    gameType: string
): Promise<string> => {
    try {
        const roomId = `${userId}-${opponentId}-${gameType}`;
        await firestore().collection('gameRooms').doc(roomId).set({
            roomId,
            player1: userId,
            player2: opponentId,
            gameType,
            scores: { [userId]: 0, [opponentId]: 0 },
            status: 'ongoing',
            createdAt: firestore.FieldValue.serverTimestamp(),
        });
        console.log(`Game room ${roomId} đã được tạo thành công.`);
        return roomId;
    } catch (err) {
        console.error('Error creating game room:', err);
        throw new Error('Failed to create game room.');
    }
};

/**
 * Lắng nghe hàng đợi match
 * @param userId ID người dùng
 * @param onMatched Callback khi tìm thấy đối thủ
 * @returns () => void (Hàm để hủy listener)
 */
export const listenAndMatchPlayers = (
    gameType: string,
    onMatch: (roomId: string, player1: string, player2: string) => void
): (() => void) => {
    return firestore()
        .collection('matchQueue')
        .where('status', '==', 'waiting') // Chỉ lấy người chơi đang chờ
        .where('gameType', '==', gameType) // Chỉ lấy người chơi cùng gameType
        .onSnapshot(async (snapshot) => {
            if (snapshot.docs.length >= 2) {
                // Lấy hai người chơi đầu tiên
                const player1 = snapshot.docs[0].data();
                const player2 = snapshot.docs[1].data();

                const player1Id = player1.userId;
                const player2Id = player2.userId;

                // Tạo roomId ngẫu nhiên hoặc kết hợp userId
                const roomId = `${player1Id}-${player2Id}-${gameType}`;

                try {
                    // Tạo phòng game
                    await firestore().collection('gameRooms').doc(roomId).set({
                        roomId,
                        player1: player1Id,
                        player2: player2Id,
                        gameType,
                        scores: { [player1Id]: 0, [player2Id]: 0 },
                        status: 'ongoing',
                        createdAt: firestore.FieldValue.serverTimestamp(),
                    });

                    // Cập nhật trạng thái của hai người chơi trong matchQueue
                    await Promise.all([
                        firestore().collection('matchQueue').doc(player1Id).update({
                            status: 'matched',
                            opponentId: player2Id,
                        }),
                        firestore().collection('matchQueue').doc(player2Id).update({
                            status: 'matched',
                            opponentId: player1Id,
                        }),
                    ]);

                    console.log(`Matched ${player1Id} với ${player2Id} trong phòng ${roomId}`);
                    onMatch(roomId, player1Id, player2Id);
                } catch (err) {
                    console.error('Error matching players:', err);
                }
            }
        });
};

/**
 * Lắng nghe phòng game
 * @param roomId ID phòng game
 * @param onUpdate Callback khi dữ liệu phòng game thay đổi
 * @returns () => void (Hàm để hủy listener)
 */

export const getRandomQuestions = async (): Promise<any[]> => {
    const questionsSnap = await firestore().collection('question').get();
    const questions = questionsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return questions.sort(() => 0.5 - Math.random()).slice(0, 5); // Lấy 5 câu ngẫu nhiên
  };


export const initializeGameRoom = async (roomId: string) => {
    try {
        const questions = await getRandomQuestions();
        await firestore().collection('gameRooms').doc(roomId).update({
            questions: questions.map((q) => ({
                ...q,
                player1Answer: null,
                player2Answer: null,
                answeredBy: null,
            })),
            currentQuestionIndex: 0,
            status: 'ongoing',
        });
        console.log('Game room initialized with questions.');
    } catch (err) {
        console.error('Error initializing game room:', err);
    }
};


export const listenToGameRoom = (
    roomId: string,
    onUpdate: (gameData: any) => void
): (() => void) => {
    return firestore()
        .collection('gameRooms')
        .doc(roomId)
        .onSnapshot((doc) => {
            if (doc.exists) {
                const data = doc.data();
                onUpdate(data);
            }
        });
};


export const submitAnswer = async (
    roomId: string,
    playerId: string,
    questionIndex: number,
    answer: string
  ) => {
    const roomRef = firestore().collection('gameRooms').doc(roomId);
    const roomSnap = await roomRef.get();
    const roomData = roomSnap.exists ? roomSnap.data() : null;
  
    if (!roomData) {
      console.error('Room data not found.');
      return;
    }
  
    const question = roomData.questions?.[questionIndex];
    if (!question) {
      console.error(`Question at index ${questionIndex} not found.`);
      return;
    }
  
    if (!question.answeredBy) {
      const isCorrect = question.answer === answer;
      const scoreIncrement = isCorrect ? 1 : 0;
  
      await roomRef.update({
        [`questions.${questionIndex}.player${playerId === roomData.player1 ? '1' : '2'}Answer`]: answer,
        [`scores.${playerId}`]: firestore.FieldValue.increment(scoreIncrement),
      });
    }
  };
