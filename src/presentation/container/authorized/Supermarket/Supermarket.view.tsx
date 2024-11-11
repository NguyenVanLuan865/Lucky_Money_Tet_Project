import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { FlatButton , AddButton, SubtractButton , RoundBackButton} from '../../../component';
import { BACKGROUND_MARKET, LABEL_MARKET, LABEL_MARKET2, ICON_CHANGE_100K, ICON_CHANGE_50K, LABEL_MARKET3 } from '../../../../../assets';
import { scaleHeight, scaleWidth, scale, HEIGHT, LightTheme, WITDH } from '../../../resource/values';
import { styles } from './Supermarket.style';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
const _Supermarket: React.FC = () => {
  return (
    <ImageBackground source={BACKGROUND_MARKET} style={styles.background} resizeMode='stretch'>
      <RoundBackButton containerStyle={styles.buttonBack} />
      <Text style={styles.headertext}>SIÊU THỊ PHỤ KIỆN</Text>

      <ImageBackground source={LABEL_MARKET} style={[styles.label, { top: scaleHeight(122) }]} resizeMode='stretch'>
        <View style={styles.iconContainer}>

          <View style={styles.iconTextContainer}>
            <Image source={ICON_CHANGE_100K} style={styles.icon} />
            <Text style={styles.text}>(Còn lại: 2500)</Text>
          </View>


          <View style={styles.productInfoContainer}>
            <MaskedView
              style={styles.header}
              maskElement={
                <Text style={styles.textheader}>Phiếu mua hàng 100K</Text>
              }
            >
              <LinearGradient
                colors={['#FCD60E', '#FFF9E1', '#FCD60E']}
                locations={[0.1, 0.3, 0.9]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1, height: '100%' }}
              />
            </MaskedView>
            <Text style={styles.notetextheader}>Yêu cầu: 44 lì xì</Text>
            <View style={styles.quantityContainer}>
              <SubtractButton containerStyle={styles.quantityControlAdd} />
              <Text style={[ { color: '#FFE933' ,fontSize: scale(16),fontFamily: 'SVN-Cookies',}]}>0</Text>
              <AddButton containerStyle={styles.quantityControlAdd} />
            </View>
          </View>
        </View>
      </ImageBackground>

      <ImageBackground source={LABEL_MARKET} style={[styles.label, { top: scaleHeight(378) }]} resizeMode='stretch' >
        <View style={styles.iconContainer}>

          <View style={styles.iconTextContainer}>
            <Image source={ICON_CHANGE_50K} style={styles.icon} />
            <Text style={styles.text}>(Còn lại: 2500)</Text>
          </View>


          <View style={styles.productInfoContainer}>
            <MaskedView
              style={styles.header}
              maskElement={
                <Text style={styles.textheader}>Phiếu mua hàng 50K</Text>
              }
            >
              <LinearGradient
                colors={['#FCD60E', '#FFF9E1', '#FCD60E']}
                locations={[0.1, 0.3, 0.9]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1, height: '100%' }}
              />
            </MaskedView>
            <Text style={styles.notetextheader}>Yêu cầu: 44 lì xì</Text>
            <View style={styles.quantityContainer}>
              <SubtractButton containerStyle={styles.quantityControlAdd} />
              <Text style={[ { color: '#FFE933' ,fontSize: scale(16),fontFamily: 'SVN-Cookies',}]}>0</Text>
              <AddButton containerStyle={styles.quantityControlAdd} />
            </View>
          </View>
        </View>
      </ImageBackground>

      <ImageBackground source={LABEL_MARKET2} style={styles.label2} resizeMode='stretch' >
        <Text style={styles.text2}>Bạn đang có{` `}
          <Text style={styles.highlightedNumber}>11</Text>
          {' '}lì xì
        </Text>
        <FlatButton
                title="Đổi ngay"
                buttonWidth={scaleWidth(132)}
                buttonHeight={scaleHeight(44)}
                // containerStyle={styles.button}
                // onPress={handlePress}
            />
            <Image source={LABEL_MARKET3} style={styles.lable3}/>
      </ImageBackground>
    </ImageBackground>
  );
};

export const Supermarket = React.memo(_Supermarket)

