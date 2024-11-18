import firestore from '@react-native-firebase/firestore';
import { AppDispatch } from '../../../presentation/shared-state';

export const listenToUserData = (userId: string, setData: (data: any) => void) => {
  return firestore()
    .collection('users')
    .doc(userId)
    .onSnapshot((doc) => {
      if (doc.exists) {
        setData(doc.data());
      }
    });
};

export const listenToSubCollection = (userId: string, collectionName: string, setData: (data: any) => void) => {
  return firestore()
    .collection('users')
    .doc(userId)
    .collection(collectionName)
    .onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(data);
    });
};

export const listenToRewards = (setData: (data: any[]) => void) => {
  return firestore()
    .collection('reward')
    .onSnapshot((querySnapshot) => {
      const rewards = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(rewards);
    });
};


export const listenToLixiSubCollection = (
  userId: string, // ID của user
  setData: (data: any) => void // Hàm để cập nhật dữ liệu
) => {
  return firestore()
    .collection('users')
    .doc(userId)
    .collection('lixi') // Truy cập sub-collection lixi
    .onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Chuyển đổi dữ liệu
      setData(data); // Cập nhật dữ liệu vào state
    });
};


const listSubCollections = async (userId: string) => {
  try {
    const userDocRef = firestore().collection('users').doc(userId);

    // Lấy danh sách tất cả các sub-collection
    const subCollections = await userDocRef.listCollections();

    // Log tên sub-collection ra console
    subCollections.forEach((collection) => {
      console.log('Sub-collection name:', collection.id);
    });

    // Trả về danh sách tên sub-collection
    return subCollections.map((collection) => collection.id);
  } catch (error) {
    console.error('Error listing sub-collections:', error);
    return [];
  }
};

const getPlayerNamesAndClassify = async (roomId: string, userId: string) => {
  try {
    // Lấy thông tin game room từ Firestore
    const roomDoc = await firestore().collection('gameRooms').doc(roomId).get();

    if (!roomDoc.exists) {
      throw new Error('Game room không tồn tại.');
    }

    const { player1, player2 } = roomDoc.data() || {};

    // Lấy thông tin của player1 và player2 từ collection users
    const player1Doc = await firestore().collection('users').doc(player1).get();
    const player2Doc = await firestore().collection('users').doc(player2).get();

    if (!player1Doc.exists || !player2Doc.exists) {
      throw new Error('Không tìm thấy thông tin người chơi.');
    }

    const player1Name = player1Doc.data()?.name || 'Chưa xác định';
    const player2Name = player2Doc.data()?.name || 'Chưa xác định';

    // Phân loại bạn và đối thủ
    const isPlayer1 = player1 === userId;
    const yourName = isPlayer1 ? player1Name : player2Name;
    const opponentName = isPlayer1 ? player2Name : player1Name;

    return {
      yourName,
      opponentName,
    };
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người chơi:', error);
    return null;
  }
};