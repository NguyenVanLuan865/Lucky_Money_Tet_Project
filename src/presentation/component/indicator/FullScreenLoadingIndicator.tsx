import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Animated, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

interface LoadingProps {
  message?: string;
}

const FullScreenLoadingIndicator: React.FC<LoadingProps> = () => {
  const { isLoading, message } = useSelector((state: any) => state.loading);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading, fadeAnim]);

  return (
    <Modal transparent animationType="fade" visible={isLoading}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <ActivityIndicator size="large" color="#fff" />
        {message && <Text style={styles.message}>{message}</Text>}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: '#fff',
  },
});

export default FullScreenLoadingIndicator;
