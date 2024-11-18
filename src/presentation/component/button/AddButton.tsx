import React from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LightTheme, scaleHeight, scaleWidth } from '../../resource/values';
import { BUTTON_ADD } from '../../../../assets';

export interface AddButton {
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const _AddButton: React.FC<AddButton> = (props) => {
  const { onPress, containerStyle } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        {/* <LinearGradient
          colors={[LightTheme.colorScheme.buttonGradientStart, LightTheme.colorScheme.buttonGradientEnd]}
          style={styles.linearGradient}
        >
          <View style={styles.iconContainer}>
            <MaterialIcons name="add" size={20} color={LightTheme.colorScheme.primaryText} />
          </View>
          
        </LinearGradient> */}
        <Image source={BUTTON_ADD} style={{height: '100%', width: '100%',}} resizeMode='center'/>

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scaleWidth(29),
    height: scaleHeight(29),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: scaleWidth(29),
    height: scaleHeight(29),
    overflow: 'hidden',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15, 
    backgroundColor: LightTheme.colorScheme.iconBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const AddButton = React.memo(_AddButton);
