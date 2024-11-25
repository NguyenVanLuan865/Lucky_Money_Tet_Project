import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../shared-state';
import { scaleHeight, scaleWidth, scale, LightTheme } from '../../../resource/values';
import { RoundBackButton } from '../../../component';

const _QuestionScreen: React.FC = ({ route }: any) => {
    const { roomId, game } = route.params;
    const [localQuestions, setLocalQuestions] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [countdown, setCountdown] = useState<number>(30);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const navigation = useNavigation();
    const userId = useSelector((state: RootState) => state.authentication.token);
    const timerRef = useRef<NodeJS.Timeout | null>(null); // Dùng ref để lưu trạng thái timer.

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const roomDoc = await firestore().collection('gameRooms').doc(roomId).get();
                if (roomDoc.exists) {
                    const roomData = roomDoc.data();
                    setLocalQuestions(roomData?.questions || []);
                } else {
                    console.error('Room not found.');
                }
            } catch (error) {
                console.error('Error fetching room data:', error);
            }
        };

        fetchQuestions();
    }, [roomId]);

    useEffect(() => {
        if (isTransitioning || currentQuestionIndex >= localQuestions.length) return;

        // Tạo timer đếm ngược.
        timerRef.current = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        // Xử lý hết thời gian.
        if (countdown === 0) {
            handleTimeUp();
            timerRef.current = null;
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [countdown, isTransitioning, currentQuestionIndex, localQuestions]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            setIsTransitioning(true);
        });

        return unsubscribe;
    }, [navigation]);

    const handleTimeUp = async () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        if (selectedAnswer !== null) {
            try {
                const currentQuestion = localQuestions[currentQuestionIndex];
                const isCorrect = selectedAnswer === currentQuestion.answer;

                if (isCorrect) {
                    const roomDoc = await firestore().collection('gameRooms').doc(roomId).get();
                    const scores = roomDoc.data()?.scores || {};
                    const newScore = (scores[userId!] || 0) + 1;

                    await firestore()
                        .collection('gameRooms')
                        .doc(roomId)
                        .update({
                            [`scores.${userId}`]: newScore,
                        });

                    console.log('Correct answer! Score updated.');
                } else {
                    console.log('Incorrect answer. No score added.');
                }
            } catch (error) {
                console.error('Error updating score:', error);
            }
        }

        const nextIndex = currentQuestionIndex + 1;

        if (nextIndex < localQuestions.length) {
            setCurrentQuestionIndex(nextIndex);
            setCountdown(30);
            setSelectedAnswer(null);
        } else {
            try {
                await firestore().runTransaction(async (transaction) => {
                    const roomRef = firestore().collection('gameRooms').doc(roomId);
                    const roomDoc = await transaction.get(roomRef);
                    if (!roomDoc.exists) {
                        throw new Error('Room does not exist!');
                    }
                    const currentFinished = roomDoc.data()?.isGameFinished || 0;

                    const updatedFinished = currentFinished + 1;

                    transaction.update(roomRef, { isGameFinished: updatedFinished });

                    if (updatedFinished === 2) {
                        console.log('Both players have completed the game!');
                    }
                });
                navigation.replace('Result', { roomId, userId, game });
            } catch (error) {
                console.error('Error updating isGameFinished or navigating to result:', error);
            }
        }
        setIsTransitioning(false);
    };

    const handleAnswer = (answer: string) => {
        if (isTransitioning) return;
        setSelectedAnswer(answer);
    };

    if (localQuestions.length === 0) {
        return <Text>Loading questions...</Text>;
    }
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? `0${minutes}` : minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
    };
    const currentQuestion = localQuestions[currentQuestionIndex];

    return (
        <View style={styles.container}>
            <RoundBackButton containerStyle={styles.buttonBack} />
            <View style={styles.viewtime}>
                <Text style={styles.timeText}>{formatTime(countdown)}</Text>
            </View>
            <View style={styles.labelquestion}>
                <Text style={styles.question}>{currentQuestion.question || 'Loading...'}</Text>
            </View>
            <View style={styles.answers}>
                {['A', 'B', 'C', 'D'].map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.optionButton,
                            selectedAnswer === option && styles.selectedButton,
                        ]}
                        onPress={() => handleAnswer(option)}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                selectedAnswer === option && styles.selectedText,
                            ]}
                        >
                            {`${option}. ${currentQuestion[option] || '...loading'}`}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: LightTheme.colorScheme.backgroundgodmonetlucky,
    },
    timerText: {
        fontSize: scale(16),
        fontWeight: 'bold',
        margin: scaleHeight(20),
        color: '#333',
    },
    labelquestion: {
        backgroundColor: LightTheme.colorScheme.backgroundLabel,
        borderWidth: 2,
        borderColor: LightTheme.colorScheme.borderLabel,
        borderRadius: scale(10),
        width: scaleWidth(335),
        height: scaleHeight(211),
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: scaleHeight(49),
        justifyContent: 'center',
    },
    answers: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        padding: 10,
    },
    optionButton: {
        width: '45%',
        backgroundColor: LightTheme.colorScheme.backgroundLabel,
        borderWidth: 2,
        borderColor: LightTheme.colorScheme.borderLabel,
        borderRadius: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
        margin: scale(5),
        padding: scale(8),
    },
    selectedButton: {
        backgroundColor: LightTheme.colorScheme.buttonGradientStart,
    },
    selectedText: {
        color: LightTheme.colorScheme.primaryText,
    },
    optionText: {
        fontSize: scale(14),
        fontFamily: 'SVN-Cookies',
        maxWidth: '90%',
    },
    question: {
        fontSize: scale(14),
        fontFamily: 'SVN-Cookies',
        marginBottom: 24,
        textAlign: 'center',
        maxWidth: '90%',
    },
    buttonBack: {
        left: scaleWidth(20),
        top: scaleHeight(60),
        position: 'absolute',
    },
    progressBar: {
        height: 5,
        backgroundColor: '#4caf50',
        borderRadius: 10,
        position: 'absolute',
    },
    timeText: {
        fontSize: scale(24),
        fontFamily: 'SVN-Cookies',
        color: LightTheme.colorScheme.buttonGradientStart,
        textShadowColor: LightTheme.colorScheme.buttonBorder, 
        textShadowOffset: { width: 1, height: 1 }, 
        textShadowRadius: 1,
    },
    viewtime: {
        width: scaleHeight(120), 
        height: scaleHeight(50), 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: scaleHeight(50) ,
    }
});

export const QuestionScreen = React.memo(_QuestionScreen);
