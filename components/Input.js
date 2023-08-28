import {useContext} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {AppStateContext} from '../store/app.context';
import Theme from '../constants/Theme';

export default function Input({
  value,
  onChangeText,
  placeholder,
  warning,
  fluid = false,
  isDisabled = false,
  type = 'default',
  leftIcon,
  rightIcon,
}) {
  const appContext = useContext(AppStateContext);
  const colors = Theme(appContext.darkTheme);

  const styles = StyleSheet.create({
    inputWrapper: {
      flexDirection: 'row',
      width: 150,
      height: 40,
      borderWidth: 0.5,
      borderColor: colors.border,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
      backgroundColor: colors.input,
      alignItems: 'center',
    },
    textInput: {
      color: colors.textInput,
      padding: 0,
      margin: 0,
      height: '100%',
      width: '100%',
    },
    icon: {
      color: colors.textInput,
      textAlignVertical: 'top',
    },
    disabled: {
      opacity: 0.4,
    },
    warning: {
      borderColor: colors.warning,
      borderWidth: 2,
    },
  });

  return (
    <View
      style={[
        styles.inputWrapper,
        warning ? styles.warning : '',
        fluid && {width: '100%'},
        isDisabled && styles.disabled,
      ]}>
      {leftIcon && value && <Text style={styles.icon}>{leftIcon}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        style={styles.textInput}
        keyboardType={type}
        editable={!isDisabled}
      />
    </View>
  );
}
