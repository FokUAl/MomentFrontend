import {useState, useContext} from 'react';
import {View, Text, StyleSheet, Pressable, Alert} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Theme from '../constants/Theme';
import {AppStateContext} from '../store/app.context';

const InputDate = ({
  value,
  onChange,
  onPress,
  open,
  type,
  placeholder,
  isDisabled,
}) => {
  const appContext = useContext(AppStateContext);
  const colors = Theme(appContext.darkTheme);
  const [dateNow, setDateNow] = useState(new Date());

  const styles = StyleSheet.create({
    input: {
      flexDirection: 'row',
      width: '100%',
      height: '100%',
      height: 40,
      justifyContent: 'center',
      marginBottom: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderWidth: 0.5,
      borderColor: colors.border,
      borderRadius: 5,
      backgroundColor: colors.input,
    },
    inputButton: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    text: {
      color: colors.text,
      flex: 4,
      verticalAlign: 'middle',
    },
    placeholder: {
      color: colors.placeholder,
      flex: 4,
      verticalAlign: 'middle',
    },
    disabled: {
      opacity: 0.5,
    },
  });

  return (
    <View style={styles.inputWrapper}>
      <Pressable
        style={[styles.input, isDisabled && styles.disabled]}
        onPress={() => onPress(true)}>
        {value ? (
          <Text style={styles.text}>
            {value
              ? type === 'date'
                ? `${value.getDate()} ${new Intl.DateTimeFormat('ru-RU', {
                    month: 'short',
                  }).format(value)} ${value.getFullYear()} г.`
                : `${value.getHours()}:${value.getMinutes()}`
              : ''}
          </Text>
        ) : (
          <Text style={styles.placeholder}>{placeholder}</Text>
        )}
        {value && (
          <Pressable
            style={styles.inputButton}
            disabled={isDisabled}
            onPress={() => onChange('')}>
            <Ionicons
              name="close"
              size={20}
              style={{height: 22, width: 22}}
              color={colors.secondary}
            />
          </Pressable>
        )}
      </Pressable>
      <DatePicker
        modal
        open={!isDisabled && open}
        date={dateNow}
        mode={type}
        locale="ru"
        placeholder="select date"
        format="DD/MM/YYYY"
        is24hourSource="locale"
        confirmBtnText="Принять"
        cancelBtnText="Закрыть"
        onConfirm={date => {
          onPress(false);
          setDateNow(date);
          onChange(date);
        }}
        onCancel={() => {
          onPress(false);
        }}
      />
    </View>
  );
};

export default InputDate;
