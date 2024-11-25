import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../shared-state';

export const useLoadingOnFocus = (
  message: string,
  duration: number = 2000,
  resetOnBlur: boolean = false
) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isFocused) {
      if (!isLoaded) {
        // Hiển thị loading nếu màn hình chưa được tải
        dispatch(showLoading(message));

        const timer = setTimeout(() => {
          dispatch(hideLoading(''));
          setIsLoaded(true); // Đánh dấu màn hình đã được tải
        }, duration);

        return () => clearTimeout(timer);
      }
    } else if (resetOnBlur) {
      // Reset trạng thái khi màn hình bị blur (nếu cần)
      setIsLoaded(false);
    }
  }, [isFocused, isLoaded, resetOnBlur, dispatch, message, duration]);

  return isLoaded;
};
