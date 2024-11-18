<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { BACKGROUND_TREASURE, LOGO_1 } from '../../../../../assets';
import { styles } from './treasure.style';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
<<<<<<< HEAD
import { listenToUserData, listenToSubCollection } from '../../../../data/data-source/user';
import { RootState } from '../../../shared-state';
import { useSelector } from 'react-redux';
import { LacLocVang } from './laclocvang.view';
import LiXiVang from './lixivang.view';
import MaSoMayMan from './masomayman.view';
const button_tabview = [
  { id: 1, title: 'Lắc lộc vàng' },
  { id: 2, title: 'Lì xì vàng' },
  { id: 3, title: 'Mã số \nmay mắn' },
];

const _Treasure: React.FC = () => {
  const [selectedButtonId, setSelectedButtonId] = useState(button_tabview[0].id);
  const [userData, setUserData] = useState<any>(null);
  const [lacLocVang, setLacLocVang] = useState<any[]>([]);
  const [liXi, setLiXi] = useState<any[]>([]);
  const [maSoMayMan, setMaSoMayMan] = useState<any[]>([]);
  const token = useSelector((state: RootState) => state.authentication.token);

  const handlePress = (id: number) => {
    setSelectedButtonId(id);
  };

  useEffect(() => {
    if (token) {
      // Lắng nghe dữ liệu user document
      const unsubscribeUser = listenToUserData(token, setUserData);

      // Lắng nghe sub-collections
      const unsubscribeLacLocVang = listenToSubCollection(token, 'laclocvang', setLacLocVang);
      const unsubscribeLiXi = listenToSubCollection(token, 'lixi', setLiXi);
      const unsubscribeMaSoMayMan = listenToSubCollection(token, 'masomayman', setMaSoMayMan);

      // Cleanup khi unmount component
      return () => {
        unsubscribeUser();
        unsubscribeLacLocVang();
        unsubscribeLiXi();
        unsubscribeMaSoMayMan();
      };
    }
  }, [token]);

  const renderContent = () => {
    switch (selectedButtonId) {
      case 1:
        return <LacLocVang userId={token!}/>;
      case 2:
        return <LiXiVang userId={token!}/>;
      case 3:
        return <MaSoMayMan userId={token!}/>;
      default:
        return <Text>Chọn tab để xem dữ liệu</Text>;
    }
  };

  return (
    <ImageBackground source={BACKGROUND_TREASURE} style={styles.background} resizeMode="stretch">
      <MaskedView
        style={styles.header}
        maskElement={<Text style={styles.textheader}>Kho lộc</Text>}
=======
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
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
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
<<<<<<< HEAD
              {button.title}
=======
              {button.tilte}
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
            </Text>
          </TouchableOpacity>
        ))}
      </View>
<<<<<<< HEAD
      <View style={styles.label}>{renderContent()}</View>
    </ImageBackground>
  );
};

export const Treasure = React.memo(_Treasure);
=======
      <View style={styles.label}>

      </View>
    </ImageBackground>



  );
};


export const Treasure = React.memo(_Treasure)

>>>>>>> b19083247395aec8135ea41e63760732b49f483b
