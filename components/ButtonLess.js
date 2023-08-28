import {useContext} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Theme from '../constants/Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {AppStateContext} from '../store/app.context';

function ButtonLess({
  onPress,
  icon,
  value,
  isActive = true,
  visible,
  height,
  width,
  fluid = false,
  shadow,
  isDisabled = false,
  iconSize = 18,
  customPath,
  border = 'circle',
}) {
  const appContext = useContext(AppStateContext);
  const colors = Theme(appContext.darkTheme);

  const styles = StyleSheet.create({
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 65,
      height: 30,
      margin: 5,
      backgroundColor: colors.secondary,
      borderColor: colors.secondary,
      borderWidth: 2
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    active: {
      backgroundColor: colors.secondary
    },
    nonActive: {
      backgroundColor: colors.primary
    },
    borderCircle: {
      borderRadius: 50,
    },
    borderSquare: {
      borderRadius: 5,
    },
    disabled: {
      opacity: 0.5,
    },
    pressed: {
      opacity: 0.7,
    },
    visible: {
      display: 'none',
    },
  });

  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        pressed && styles.pressed,
        visible && styles.visible,
        fluid && {width: '100%', paddingHorizontal: 0, marginHorizontal: 0},
        shadow && styles.shadow,
        isActive ? styles.active : styles.nonActive,
        isDisabled && styles.disabled,
        height && {height: height},
        width && {width: width},
        border === 'circle' && styles.borderCircle,
        border === 'square' && styles.borderSquare,
      ]}
      onPress={onPress}
      disabled={isDisabled}>
      {value ? (
        <Text
          style={{
            width: '100%',
            color: colors.text,
            textAlign: 'center',
          }}>
          {value}
        </Text>
      ) : customPath ? (
        <EvilIcons
          name={customPath}
          size={iconSize}
          style={{
            height: 22,
            width: 18,
            color: colors.text,
          }}
        />
      ) : (
        <Ionicons
          name={isActive ? icon : icon + '-outline'}
          size={iconSize}
          style={{
            height: 22,
            width: 18,
            color: colors.text,
          }}
        />
      )}
    </Pressable>
  );
}

export default ButtonLess;
