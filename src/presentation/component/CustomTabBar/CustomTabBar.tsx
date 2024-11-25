import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { WITDH, scaleHeight, scale, scaleWidth } from '../../resource';
import { LightTheme } from '../../resource';
import { GOLDEN_LUCKEY_MONEY, TREASURE, SHAKE_GOLDEN_FORTUNE } from '../../../../assets';

const RouteName_Title = [
  {
    id: 1,
    route: 'ShakeGoldenFortune',
    title: 'Lắc lộc vàng',
    image: SHAKE_GOLDEN_FORTUNE,
    imageStyle: { width: scaleWidth(29), height: scaleHeight(29) },
  },
  {
    id: 2,
    route: 'GoldenLuckyMoney',
    title: 'Lì xì vàng',
    image: GOLDEN_LUCKEY_MONEY,
    imageStyle: { width: scaleWidth(30), height: scaleHeight(30) },
  },
  {
    id: 3,
    route: 'Treasure',
    title: 'Kho lộc',
    image: TREASURE,
    imageStyle: { width: scaleWidth(37.58), height: scaleHeight(25.05) },
  },
];

const _CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const handleTabPress = (route: string, index: number) => {
    if (state.index === index) return; 
    navigation.navigate(route); 
  };

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
        const isFocused = state.index === index;

        const routeInfo = RouteName_Title.find(item => item.route === route.name);

        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleTabPress(route.name, index)}
            disabled={isFocused} 
            style={[
              styles.tabButton,
              isFocused && styles.tabButtonFocused, 
            ]}
          >
            {routeInfo?.image && (
              <Image
                source={routeInfo.image}
                resizeMode="contain"
                style={routeInfo.imageStyle}
              />
            )}
            <Text style={styles.tabLabel}>
              {routeInfo ? routeInfo.title : label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: scaleHeight(71),
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
  },
  tabButton: {
    height: '100%',
    width: WITDH / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonFocused: {
    backgroundColor: LightTheme.colorScheme.secondaryButtonBackground,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.5,
    elevation: 5,
  },
  tabLabel: {
    fontSize: scale(14),
    color: LightTheme.colorScheme.primaryText,
    fontFamily: 'SVN-Cookies',
  },
});

export const CustomTabBar = React.memo(_CustomTabBar);
