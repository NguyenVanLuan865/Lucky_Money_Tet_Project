import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const _ShakeGoldenFortune: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Shake Golden Fortune Screen</Text>
      <Text style={{    fontFamily: 'SVN-Cookies'}}>dnqw0dqw</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'SVN-Cookies'
  },
});

export const ShakeGoldenFortune = React.memo(_ShakeGoldenFortune)
