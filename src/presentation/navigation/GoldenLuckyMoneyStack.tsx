import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { GamePlay } from '../container/authorized/TetCompetition/shoot_the_screw/GamePlay/GamePlay.view';
import { FindOpponent } from '../container/authorized/TetCompetition/shoot_the_screw/FindOpponent/FindOpponent.view';
import { FindOpponentGoldenSaint } from '../container/authorized/Golden_Saint/FindOpponent/FindOpponent.view';
import { TetCompetition } from '../container/authorized/TetCompetition/TetCompetition.view';
import { Win } from '../container/authorized/WIn/Win.view';
import { Supermarket } from '../container/authorized/Supermarket/Supermarket.view';
import { } from '../container/authorized';
import { WaitingLuckeyMoney } from '../container/authorized/WaitingLuckeyMoney/WaitingLuckeyMoney.view';
import { GamePlayGoldenSaint } from '../container/authorized/Golden_Saint/GamePlay/GamePlay.view';
import { 
  Congress, 
  FindOpponents, 
  GoldenLuckyMoney,
  LuckeyMoney,
  Rankings
} from '../container';
import { GoldenLuckyMoneyStackParamList } from '../storyboard';
import { QuestionScreen } from '../container/authorized/Question/Question.view';
import { Result } from '../container/authorized/Result/Result.view';
import { FindOpponentProtected } from '../container/authorized/Protect/FindOpponent/FindOpponent.view';
import { GamePlayProtect } from '../container/authorized/Protect/GamePlay/GamePlay.view';
const GoldenLuckyMoneyStackNavigator = createStackNavigator();

export const GoldenLuckyMoneyStack: React.FC = () => {
  return (
    <GoldenLuckyMoneyStackNavigator.Navigator>
      <GoldenLuckyMoneyStackNavigator.Screen
        name="Congress"
        component={Congress}
        options={{ headerShown: false }}
      />
      <GoldenLuckyMoneyStackNavigator.Screen
       name="GoldenLuckyMoneyMain"
        component={GoldenLuckyMoney}
        options={{ headerShown: false }}
      />
      <GoldenLuckyMoneyStackNavigator.Screen
        name="Supermarket"
        component={Supermarket}
        options={{ headerShown: false }}
      />
      <GoldenLuckyMoneyStackNavigator.Screen
        name="LuckeyMoney"
        component={LuckeyMoney}
        options={{ headerShown: false }}
      />
      <GoldenLuckyMoneyStackNavigator.Screen
        name="WaitingLuckeyMoney"
        component={WaitingLuckeyMoney}
        options={{ headerShown: false }}
      />
      <GoldenLuckyMoneyStackNavigator.Screen
        name="FindOpponents"
        component={FindOpponents}
        options={{ headerShown: false }}
      />
      <GoldenLuckyMoneyStackNavigator.Screen
        name="Win"
        component={Win}
        options={{ headerShown: false }}
      />
      <GoldenLuckyMoneyStackNavigator.Screen
        name="TetCompetition"
        component={TetCompetition}
        options={{ headerShown: false }}
      />
      <GoldenLuckyMoneyStackNavigator.Screen
        name="FindOpponent"
        component={FindOpponent}
        options={{ headerShown: false }}
      />
      <GoldenLuckyMoneyStackNavigator.Screen
        name="GamePlayShootTheScrew"
        component={GamePlay}
        options={{ headerShown: false }}
      />
      <GoldenLuckyMoneyStackNavigator.Screen
        name="FindOpponentGoldenSaint"
        component={FindOpponentGoldenSaint}
        options={{ headerShown: false }}
      />
      <GoldenLuckyMoneyStackNavigator.Screen
        name="GamePlayGoldenSaint"
        component={GamePlayGoldenSaint}
        options={{ headerShown: false }}
      />
      <GoldenLuckyMoneyStackNavigator.Screen
        name="Rankings"
        component={Rankings}
        options={{ headerShown: false }}
      />
      <GoldenLuckyMoneyStackNavigator.Screen
        name="Question"
        component={QuestionScreen}
        options={{ headerShown: false }}
      />
      <GoldenLuckyMoneyStackNavigator.Screen
        name="Result"
        component={Result}
        options={{ headerShown: false }}
      />
      <GoldenLuckyMoneyStackNavigator.Screen
        name="FindOpponentProtected"
        component={FindOpponentProtected}
        options={{ headerShown: false }}
      />
      <GoldenLuckyMoneyStackNavigator.Screen
        name="GamePlayProtect"
        component={GamePlayProtect}
        options={{ headerShown: false }}
      />
    </GoldenLuckyMoneyStackNavigator.Navigator>
  );
};
