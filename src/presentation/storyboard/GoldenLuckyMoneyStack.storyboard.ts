import { NavigatorScreenParams } from '@react-navigation/native';

export type GoldenLuckyMoneyStackParamList  = {
    WaitingLuckeyMoney: undefined;  // Màn hình không có tham số
  FindOpponent: { opponentId: string }; // Màn hình có tham số opponentId
  Game: { gameId: string }; // Ví dụ: màn hình game với tham số gameId
};
