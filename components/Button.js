import {useContext} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Theme from '../constants/Theme';
import {AppStateContext} from '../store/app.context';

function Button({onPress, value, borderRadius, fluid = false}) {
  const appContext = useContext(AppStateContext);
  const colors = Theme(appContext.darkTheme);

  const styles = StyleSheet.create({
    button: {
      borderRadius: 5,
      backgroundColor: colors.secondary,
      paddingVertical: 5,
      paddingHorizontal: 15,
    },
    pressed: {
      opacity: 0.7,
    },
    buttonText: {
      textAlign: 'center',
      color: colors.buttonText,
      fontSize: 14,
    },
  });

  return (
    <Pressable
      style={({pressed}) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{value}</Text>
    </Pressable>
  );
}

export default Button;
