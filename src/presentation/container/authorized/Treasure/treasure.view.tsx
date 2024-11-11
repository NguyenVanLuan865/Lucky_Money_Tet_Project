import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { BACKGROUND_TREASURE, LOGO_1 } from '../../../../../assets';
import { styles } from './treasure.style';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { scaleHeight, scaleWidth, scale, WITDH, HEIGHT } from '../../../resource/values';
const button_tabview = [
  {
    id: 1,
    tilte: 'Lắc lộc vàng',
  },
  {
    id: 2,
    tilte: 'Lì xì vàng',
  },
  {
    id: 3,
    tilte: 'Mã số \nmay mắn',
  },
]
const _Treasure: React.FC = () => {
  const [selectedButtonId, setSelectedButtonId] = useState(button_tabview[0].id);
  const handlePress = (id: number) => {
    setSelectedButtonId(id);
  };
  return (
    <ImageBackground source={BACKGROUND_TREASURE} style={styles.background} resizeMode='stretch'>
      <MaskedView
        style={styles.header}
        maskElement={
          <Text style={styles.textheader}>Kho lộc</Text>
        }
      >
        <LinearGradient
          colors={['#FCD60E', '#FFF9E1', '#FCD60E']}
          locations={[0, 0.05, 0.5]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1, height: '100%' }}
        />
      </MaskedView>
      <Image source={LOGO_1} style={styles.logo} />
      <View style={styles.tabview}>
        {button_tabview.map((button) => (
          <TouchableOpacity
            key={button.id}
            style={[
              styles.button,
              selectedButtonId === button.id && styles.selectedButton,
            ]}
            onPress={() => handlePress(button.id)}
          >
            <Text
              style={[
                styles.tilteButton,
                selectedButtonId === button.id && styles.selectedTilteButton,
              ]}
            >
              {button.tilte}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.label}>

      </View>
    </ImageBackground>



  );
};


export const Treasure = React.memo(_Treasure)

