import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GoldenLuckyMoney } from '../container';
import { Treasure } from '../container';
import { ShakeGoldenFortune } from '../container';
import { CustomTabBar } from '../component';
import { GoldenLuckyMoneyStack } from './GoldenLuckyMoneyStack';


const Tab = createBottomTabNavigator();
export const TabNavigator: React.FC = () => {
    return (
        <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
            <Tab.Screen name="ShakeGoldenFortune" component={ShakeGoldenFortune} options={{ headerShown: false }} />
            <Tab.Screen name="GoldenLuckyMoney" component={ GoldenLuckyMoneyStack} options={{ headerShown: false, tabBarStyle: { display: 'none' }  }} />
            <Tab.Screen name="Treasure" component={Treasure} options={{ headerShown: false }} />
        </Tab.Navigator>

    );
}
