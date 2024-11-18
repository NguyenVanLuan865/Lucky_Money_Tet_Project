import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../shared-state';

const _QuestionScreen: React.FC = ({ route }: any) => {
    const { roomId } = route.params;
    const [localQuestions, setLocalQuestions] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [countdown, setCountdown] = useState<number>(5);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const navigation = useNavigation();
    const userId = useSelector((state: RootState) => state.authentication.token);
    const [roomData, setRoomDoc] = useState<any>(null);
    
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const roomDoc = await firestore().collection('gameRooms').doc(roomId).get();
                if (roomDoc.exists) {
                    const roomData = roomDoc.data();
                    setRoomDoc(roomData!)
                    console.log('data question: ',roomData!.questions);
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

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        if (countdown === 0) {
            clearInterval(timer);
            handleTimeUp();
        }

        return () => clearInterval(timer);
    }, [countdown, isTransitioning, currentQuestionIndex, localQuestions]);

    const handleTimeUp = async () => {
        setIsTransitioning(true); 
        setCountdown(5); 
        if (selectedAnswer !== null && roomData) {
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

        setTimeout(() => {
            const nextIndex = currentQuestionIndex + 1;
    
            if (nextIndex < localQuestions.length) {
                setCurrentQuestionIndex(nextIndex); 
                setCountdown(1); 
                setSelectedAnswer(null); 
            } else {
                navigation.navigate('Result', { roomId , userId});
            }
    
            setIsTransitioning(false); 
        }, 5000); 
    };

    
    const handleAnswer = (answer: string) => {
        if (isTransitioning) return;
        setSelectedAnswer(answer); 
    };

    if (localQuestions.length === 0) {
        return <Text>Loading questions...</Text>;
    }

    const currentQuestion = localQuestions[currentQuestionIndex];

    return (
        <View style={styles.container}>
            <Text style={styles.timer}>Time Left: {countdown}s</Text>
            <Text style={styles.question}>{currentQuestion.question}</Text>
            <View style={styles.answers}>
                {['A', 'B', 'C', 'D'].map((option) => (
                    <Button
                        key={option}
                        title={`${option}. ${currentQuestion[option]}`}
                        onPress={() => handleAnswer(option)}
                        color={selectedAnswer === option ? 'green' : undefined}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    timer: { fontSize: 24, marginBottom: 20, color: 'red' },
    question: { fontSize: 18, marginBottom: 20 },
    answers: { flexDirection: 'column', justifyContent: 'center' },
});

export const QuestionScreen = React.memo(_QuestionScreen);
