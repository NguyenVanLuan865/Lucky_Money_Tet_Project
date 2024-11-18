import React from 'react';
import {
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LightTheme, scaleHeight, scaleWidth, scale } from '../../resource/values';

export interface FlatButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title: string | [string, string];
  onPress?: () => void;
  secondaryTitleStyle?: object;
  containerWidth?: number;  // Chiều rộng tùy chỉnh của container
  containerHeight?: number; // Chiều cao tùy chỉnh của container
  buttonWidth?: number;     // Chiều rộng tùy chỉnh của button
  buttonHeight?: number;    // Chiều cao tùy chỉnh của button
}

const _FlatButton: React.FC<FlatButtonProps> = (props) => {
  const {
    title,
    onPress,
    containerStyle,
    titleStyle,
    secondaryTitleStyle,
    buttonWidth = scaleWidth(179),
    buttonHeight = scaleHeight(44),
  } = props;

  const isMultiLine = Array.isArray(title);
  return (
      <TouchableOpacity onPress={onPress} style={[styles.button, containerStyle, { width: buttonWidth, height: buttonHeight }]}>
        <LinearGradient colors={[LightTheme.colorScheme.buttonGradientStart, LightTheme.colorScheme.buttonGradientEnd]} style={styles.linearGradient}>
          {isMultiLine ? (
            <>
              <Text style={[styles.title, titleStyle]}>{title[0]}</Text>
              <Text style={[styles.secondaryTitle, secondaryTitleStyle]}>{title[1]}</Text>
            </>
          ) : (
            <Text style={[styles.title, titleStyle]}>{title}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: scaleWidth(179),
    height: scaleHeight(44),
    borderRadius: 18,
    borderWidth: 2,
    borderColor: LightTheme.colorScheme.buttonBorder,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: "#C2030B",
    fontFamily: 'SVN-Cookies',
    textShadowColor: LightTheme.colorScheme.buttonBorder, 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 1,
    fontSize: scale(18),
  },
  secondaryTitle: {
    color: "#C2030B",
    fontSize: scale(14),
    textAlign: 'center',
    fontFamily: 'SVN-Gotham',
    textShadowColor: LightTheme.colorScheme.buttonBorder, 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 1,
  },
});

export const FlatButton = React.memo(_FlatButton);
