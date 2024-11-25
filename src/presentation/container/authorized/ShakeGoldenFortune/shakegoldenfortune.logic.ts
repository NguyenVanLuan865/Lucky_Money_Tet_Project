import { useState, useEffect } from 'react';
import useGoldenFortune from './shakegoldenfortune.hook';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../shared-state';
import { showLoading, hideLoading } from '../../../shared-state/redux/reducers/loadingSlice';
import { ICON_CHANGE_100K, ICON_GOLDEN, ICON_PHUKIEN, ICON_HALFGOLDEN} from '../../../../../assets';
export const useGoldenFortuneLogic = () => {
    const dispatch = useDispatch();
    const [lacloc, setLacloc] = useState<number>(0);
    const [showPopup, setShowPopup] = useState(false);
    const [isTenTimes, setIsTenTimes] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { handleShakeOnce } = useGoldenFortune();
    const userId = useSelector((state: RootState) => state.authentication.token);
    const [isProcess, setIsProcess] = useState(false);
    useEffect(() => {
        const userRef = firestore().collection('users').doc(userId!);
        const unsubscribe = userRef.onSnapshot((doc) => {
            setLacloc(doc.data()?.lacloc || 0);
        });

        return () => unsubscribe();
    }, []);

    const rewardDisplayMap: Record<string, string> = {
        phieu_100k: '1 Phiếu mua hàng 100k',
        phieu_200k: '1 Phiếu mua hàng 200k',
        phieu_500k: '1 Phiếu mua hàng 500k',
        phieu_motchivang: '1 Chỉ vàng PNJ 999',
        phieu_nuachivang: 'Nửa chỉ vàng PNJ 999',
        phieu_phukien: '1 Phiếu mua phụ kiện',
    };

    const rewardIconMap: Record<string, any> = {
        phieu_100k: ICON_CHANGE_100K,
        phieu_200k: ICON_CHANGE_100K,
        phieu_500k: ICON_CHANGE_100K,
        phieu_motchivang: ICON_GOLDEN,
        phieu_nuachivang: ICON_HALFGOLDEN,
        phieu_phukien: ICON_PHUKIEN,
    };

    const onShakeOnce = async () => {
        if (lacloc <= 0) {
            Alert.alert('Thông báo', 'Bạn không đủ số lượt lắc lộc. Vui lòng chờ hoặc nạp thêm lượt lắc!');
            return;
        }
        try {
            setIsProcess(true);
            dispatch(showLoading('Đang lắc một lượt...'));
            const { reward, luckyCode } = await handleShakeOnce(userId!);

            if (!reward || !luckyCode) {
                throw new Error('Không nhận được phần thưởng hoặc mã code');
            }

            setResults([{ reward, luckyCode }]);
            const userRef = firestore().collection('users').doc(userId!);

            await userRef.update({
                lacloc: firestore.FieldValue.increment(-1),
            });


            setShowPopup(true);
        } catch (error) {
            console.error('Error during shake:', error);
        } finally {
            dispatch(hideLoading());
        }
    };

    const onShakeTenTimes = async () => {
        if (lacloc < 10) {
            Alert.alert('Thông báo', 'Bạn không đủ số lượt lắc lộc. Vui lòng chờ hoặc nạp thêm lượt lắc!');
            return;
        }
        try {
            setIsProcess(true);
            dispatch(showLoading('Đang lắc 10 lượt...'));
            const newResults = [];
            for (let i = 0; i < 10; i++) {
                const { reward, luckyCode } = await handleShakeOnce(userId!);
                if (reward && luckyCode) {
                    newResults.push({ reward, luckyCode });
                }
            }
            const userRef = firestore().collection('users').doc(userId!);

            await userRef.update({
                lacloc: firestore.FieldValue.increment(-10), // Trừ đi 1 lượt
            });
            setResults(newResults);
            setCurrentIndex(0);
            setIsTenTimes(true);
            setShowPopup(true);
        } catch (error) {
            console.error('Error during shake:', error);
        } finally {
            dispatch(hideLoading(''));
        }
    };

    const onAcceptReward = async () => {
        try {
            dispatch(showLoading('Nhận quà...'));
            for (const { reward, luckyCode } of results) {
                if (reward) {
                    const rewardNameMap: Record<string, string> = {
                        phieu_100k: 'phieu100k',
                        phieu_200k: 'phieu200k',
                        phieu_500k: 'phieu500k',
                        phieu_motchivang: 'motchivang',
                        phieu_nuachivang: 'nuachivang',
                        phieu_phukien: 'phukien',
                    };

                    const rewardKey = rewardNameMap[reward.id];
                    if (rewardKey) {
                        const rewardRef = firestore()
                            .collection('users')
                            .doc(userId!)
                            .collection('laclocvang')
                            .doc(rewardKey);

                        const rewardDoc = await rewardRef.get();
                        if (rewardDoc.exists) {
                            await rewardRef.update({
                                soLuong: firestore.FieldValue.increment(1),
                            });
                        } else {
                            await rewardRef.set({
                                soLuong: 1,
                                trangThai: false,
                            });
                        }
                    }
                }

                if (luckyCode) {
                    await firestore()
                        .collection('users')
                        .doc(userId!)
                        .collection('masomayman')
                        .add({
                            codes: luckyCode.codes,
                            prefix: luckyCode.prefix,
                        });
                }
            }
            setShowPopup(false);
            setResults([]);
            setIsTenTimes(false);
        } catch (error) {
            console.error('Error accepting rewards:', error);
        } finally {
            dispatch(hideLoading('Hoàn thành!'));
            setIsProcess(false);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleNextReward = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, results.length - 1));
    };

    const handlePreviousReward = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    return {
        lacloc,
        showPopup,
        isTenTimes,
        results,
        currentIndex,
        onShakeOnce,
        onShakeTenTimes,
        onAcceptReward,
        closePopup,
        rewardDisplayMap,
        rewardIconMap,
        handleNextReward,
        handlePreviousReward,
        isProcess,
    };
};
