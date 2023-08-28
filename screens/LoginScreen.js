import {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import apis from '../constants/apis';
import Theme from '../constants/Theme';
import {AppStateContext} from '../store/app.context';
import Input from '../components/Input';
import Button from '../components/Button';
import DownloadAndInstall from '../functions/DownloadAndInstall';

export default function LoginScreen({navigation}) {
  const appContext = useContext(AppStateContext);
  const colors = Theme(appContext.darkTheme);
  const [warningSms, setWarningSms] = useState(false);
  const [warningPhone, setWarningPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sms, setSms] = useState('');

  const skip = () => {
    navigation.navigate('DirectionChoose');
    if (phoneNumber) {
      appContext.setPhoneNumber(phoneNumber)
    }
  };

  const onChangePhone = value => {
    setWarningPhone(false);
    setPhoneNumber(value);
  };

  const onChangeSms = value => {
    setWarningSms(false);
    setSms(value);
  };

  const savePhoneNumber = async value => {
    try {
      await AsyncStorage.setItem('phoneNumber', value);
    } catch (e) {
      console.log(e);
    }
  };

  const removePhoneNumber = async () => {
    try {
      await AsyncStorage.removeItem('phoneNumber');
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = ({value}) => {
    if (!phoneNumber && !value) {
      setWarningPhone(true);
      console.log('phone number empty');
      return;
    }
    if (!sms) {
      setWarningSms(true);
      return;
    }
    axios
      .post(apis.sendMessageCode, {Code: sms, Phone: phoneNumber})
      .then(response => {
        console.log('Send Message Code ok');
        savePhoneNumber(phoneNumber);
        appContext.setPhoneNumber(phoneNumber);
        navigation.navigate('DirectionChoose');
      })
      .catch(error => {
        console.log('sendMessageCode err: ', error.message);
        removePhoneNumber()
        Alert.alert(error.message);
      });
  };


  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(()=> {
    const getPhoneNumber = async () => {
      try {
        const value = await AsyncStorage.getItem('phoneNumber');
        if (value) {
          console.log('phone ok', value);
          setPhoneNumber(value);
          setWarningPhone(false);
          setWarningSms(false);
          appContext.setPhoneNumber(value);
          navigation.navigate('DirectionChoose');
        }
      } catch (e) {
        console.error(e);
      }
    };
    getPhoneNumber()
  }, [])

  const styles = StyleSheet.create({
    safeView: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
    container: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary,
    },
    inputWrapper: {
      width: '50%',
    },
    loginText: {
      marginBottom: 10,
      color: colors.text,
    },
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView styles={styles.safeView}>
        <View style={styles.container}>
          <Text style={styles.loginText}>Авторизация</Text>
          <View style={styles.inputWrapper}>
            <Input
              value={phoneNumber}
              onChangeText={onChangePhone}
              placeholder="Номер телефона"
              warning={warningPhone}
              type="numeric"
              leftIcon="+"
              fluid
            />
          </View>

          <View style={styles.inputWrapper}>
            <Input
              login={sms}
              onChangeText={onChangeSms}
              placeholder="Код из смс"
              warning={warningSms}
              type="numeric"
              fluid
            />
          </View>
          <Button onPress={onSubmit} value={'Войти'} />
          <Button onPress={skip} value={'Пропустить'} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
