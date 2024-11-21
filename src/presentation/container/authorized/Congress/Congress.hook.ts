import { useNavigation } from '@react-navigation/native';

export const useCongressHandlers = () => {
    const navigation = useNavigation();

    const handlePress1 = () => {
        navigation.navigate('GoldenLuckyMoneyMain');
    };

    const handlePress2 = () => {
        navigation.navigate('TetCompetition');
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return {
        handlePress1,
        handlePress2,
        handleGoBack,
    };
};
