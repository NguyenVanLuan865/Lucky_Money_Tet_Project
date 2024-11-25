import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Animated, ActivityIndicator, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../shared-state/redux/store'; 
import { resetSuccess } from '../../shared-state/redux/reducers/loadingSlice'; 
import { ANIMATION_TICKED ,ICON_TICKED} from '../../../../assets'; 

const FullScreenLoadingIndicator: React.FC = () => {
  const { isLoading, message, isSuccess } = useSelector((state: RootState) => state.loading);
  const dispatch = useDispatch();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading || isSuccess) {
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

    if (isSuccess) {
      const timer = setTimeout(() => {
        dispatch(resetSuccess()); 
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, isSuccess, fadeAnim, dispatch]);

  return (
    <Modal transparent animationType="fade" visible={isLoading || isSuccess}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {isSuccess ? (
          <>
            <Image source={ICON_TICKED} style={styles.ticked} />
            <Text style={styles.successText}>Hoàn thành!</Text>
          </>
        ) : (
          <>
            <ActivityIndicator size="large" color="#fff" />
            {message && <Text style={styles.message}>{message}</Text>}
          </>
        )}
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
  ticked: {
    width: 100,
    height: 100,
  },
  successText: {
    marginTop: 10,
    fontSize: 18,
    color: '#77cc00',
    fontFamily: 'SVN-Cookiesk',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
});

export default FullScreenLoadingIndicator;
