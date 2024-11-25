import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../shared-state';
import { showLoading, hideLoading } from '../../../shared-state/redux/reducers/loadingSlice';

export const useRankingsLogic = () => {
    const [topUsers, setTopUsers] = useState<any[]>([]); // Top 5 người dùng
    const [userRank, setUserRank] = useState<number | null>(null); // Thứ hạng của người dùng hiện tại
    const [userData, setUserData] = useState<any>(null); // Dữ liệu của người dùng hiện tại
    const [isWaiting, setIsWaiting] = useState<boolean>(true); // Đợi một khoảng thời gian trước khi tải

    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.authentication.token); // ID người dùng từ Redux
    const navigation = useNavigation();
    const handlePress1 = () => {
        navigation.navigate('Congress');
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsWaiting(false); 
            fetchLeaderboardData(); 
            dispatch(showLoading('Đang tải bảng xếp hạng...'));
        }, 5000);

        return () => clearTimeout(timeout); 
    }, [userId]);

    // Hàm lấy dữ liệu bảng xếp hạng
    const fetchLeaderboardData = async () => {
        try {
            dispatch(showLoading('Đang tải bảng xếp hạng...'));

            // Lấy top 5 người dùng
            const topSnapshot = await firestore()
                .collection('users')
                .orderBy('lixi', 'desc')
                .limit(5)
                .get();
            const topUsers = topSnapshot.docs.map((doc, index) => ({
                id: doc.id,
                ...doc.data(),
                rank: index + 1,
            }));
            setTopUsers(topUsers);

            // Lấy thông tin người dùng hiện tại
            const userDoc = await firestore().collection('users').doc(userId!).get();
            const userData = userDoc.data();
            setUserData(userData);

            // Lấy thứ hạng của người dùng hiện tại
            const allUsersSnapshot = await firestore()
                .collection('users')
                .orderBy('lixi', 'desc')
                .get();
            const allUsers = allUsersSnapshot.docs.map((doc) => ({
                id: doc.id,
                lixi: doc.data().lixi,
            }));

            const userRank = allUsers.findIndex((user) => user.id === userId) + 1;
            setUserRank(userRank);
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
        } finally {
            dispatch(hideLoading('Hoàn thành'));
        }
    };

    return {
        isWaiting, // Trạng thái chờ ban đầu
        topUsers, // Top 5 người dùng
        userRank, // Thứ hạng người dùng
        userData, // Dữ liệu người dùng hiện tại
        handlePress1, // Hàm xử lý quay lại
    };
};
