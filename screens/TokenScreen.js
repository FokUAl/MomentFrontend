import {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
  BackHandler,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
  Linking,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import apis from '../constants/apis';
import Theme from '../constants/Theme';
import {AppStateContext} from '../store/app.context';
import ButtonLess from '../components/ButtonLess';
import Input from '../components/Input';
import Button from '../components/Button';

export default function TokenScreen({navigation}) {
  const appContext = useContext(AppStateContext);
  const colors = Theme(appContext.darkTheme);
  const [data, setData] = useState({Loading: true});
  const [androidIdSaved, setAndroidIdSaved] = useState(null);

  const skip = () => {
    navigation.navigate('DirectionChoose');
    if (phoneNumber) {
      appContext.setPhoneNumber(phoneNumber);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(androidIdSaved);
    ToastAndroid.show(
      'Код ' + androidIdSaved + ' скопирован',
      ToastAndroid.SHORT,
    );
  };

  const openWhatsapp = async () => {
    await Linking.openURL('https://wa.me/77022031818');
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  async function getId() {
    const androidId = await DeviceInfo.getAndroidId().then(response => {
      setAndroidIdSaved(response);
      return response;
    });
    axios
      .get(apis.checkExistence, {params: {object: androidId}})
      .then(response => {
        if (response.data.Existence) {
          appContext.setAndroidId(androidId);
          navigation.navigate('DirectionChoose');
        } else {
          setData({Loading: false});
          Alert.alert('Ошибка', 'Код еще не добавлен в базу');
        }
      })
      .catch(err => console.error(err.message));
  }

  useEffect(() => {
    getId();
  }, []);

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
      padding: 50,
    },
    inputWrapper: {
      width: '50%',
    },
    fifty: {
      marginVertical: 50,
    },
    text: {
      textAlign: 'center',
      color: colors.text,
    },
    touchable: {
      padding: 5,
      borderColor: 'black',
      borderWidth: 0.2,
      borderRadius: 5,
    },
    textId: {
      textAlign: 'center',
      color: 'blue',
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView styles={styles.safeView}>
        <View style={styles.container}>
          {data.Loading ? (
            <ActivityIndicator
              size="large"
              color={'#07bc67'}
              style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
            />
          ) : (
            <View>
              <View style={styles.fifty}>
                <Text style={styles.text}>
                  Для регистрации в приложении вам нужно отправить этот код
                </Text>
                <TouchableOpacity
                  onPress={copyToClipboard}
                  style={styles.touchable}>
                  <Text style={styles.textId}>{androidIdSaved}</Text>
                </TouchableOpacity>
                <Text style={styles.text}>На WhatsApp</Text>
                <View style={styles.button}>
                  <ButtonLess
                    onPress={openWhatsapp}
                    icon="logo-whatsapp"
                    fluid
                  />
                </View>
              </View>
              <View style={styles.fifty}>
                <Text style={styles.text}>Для обновления статуса</Text>
                <Button value="Обновить" onPress={getId} />
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
