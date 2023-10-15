import {useState, useEffect, useContext} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import axios from 'axios';
import Theme from '../../../constants/Theme';
import apis from '../../../constants/apis';
import {AppStateContext} from '../../../store/app.context';

const Profile = () => {
  const appContext = useContext(AppStateContext);
  const colors = Theme(appContext.darkTheme);
  const [data, setData] = useState({isLoading: true});

  function unicodeToChar(text) {
    console.log('username', text)
    if (text) {
      return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
        return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
      });
    }
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginVertical: 10,
      marginHorizontal: 20,
      padding: 20,
      borderRadius: 10,
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 8,
      backgroundColor: colors.third,
    },
    spinnerWrapper: {
      justifyContent: 'center',
      marginVertical: 10,
      marginHorizontal: 20,
      padding: 20,
      borderRadius: 10,
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 8,
      backgroundColor: colors.primary,
    },
    avaArea: {
      flex: 1,
    },
    textArea: {
      flex: 2,
    },
    text: {
      color: colors.text,
    },
    avatar: {
      flex: 1,
      height: null,
      width: null,
      overflow: 'hidden',
      resizeMode: 'contain',
      // objectFit: 'fill'
    },
  });

  useEffect(() => {
    const request = async () => {
      try {
        axios
          .get(apis.getProfile, {params: {phone: appContext.phoneNumber}})
          .then(response => {
            console.log(response.data);
            setData({
              isLoading: false,
              ActiveStatus: response.data.ActiveStatus,
              Balance: response.data.Balance,
              BalanceInd: response.data.BalanceInd,
              Expired: new Date(response.data.Expired),
              AppVersion: response.data.Profile.AppVersion,
              AvatarMedium: response.data.Profile.AvatarMedium,
              CarGosNomer: response.data.Profile.CarGosNomer,
              CarModel: response.data.Profile.CarModel,
              DeviceModel: response.data.Profile.DeviceModel,
              ID: response.data.Profile.ID,
              OsVersion: response.data.Profile.OsVersion,
              Phone: response.data.Profile.Phone,
              Token: response.data.Profile.Token,
              Username: response.data.Profile.Username,
            });
          })
          .catch(error => {
            console.log('profile err', error.message);
          });
      } catch (e) {
        console.error(e);
      }
    };
    request();
  }, []);
  return (
    <View>
      {data.isLoading ? (
        <View style={styles.spinnerWrapper}>
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.avaArea}>
            {data.AvatarMedium && (
              <Image source={{uri: data.AvatarMedium}} style={styles.avatar} />
            )}
          </View>
          <View style={styles.textArea}>
            {data.Username && (
              <Text style={styles.text}>{unicodeToChar(data.Username)}</Text>
            )}
            <Text style={styles.text}>{`+${data.Phone}`}</Text>
            {data.CarModel && <Text style={styles.text}>{data.CarModel}</Text>}
            {data.CarGosNomer && (
              <Text style={styles.text}>{data.CarGosNomer}</Text>
            )}
            <Text style={styles.text}>
              Статус аккаунта:{' '}
              {data.ActiveStatus ? (
                <Text style={{color: colors.second}}>активен</Text>
              ) : (
                <Text style={{color: colors.warning}}>неактивен</Text>
              )}
            </Text>
            {data.Expired && (
              <Text style={styles.text}>
                Следующая оплата:{' '}
                {`${data.Expired.getDate()}.${
                  data.Expired.getMonth() + 1
                }.${data.Expired.getFullYear()}`}
              </Text>
            )}
            {data.Balance && (
              <Text style={styles.text}>
                Баланс AsemKala: {data.Balance} тг.
              </Text>
            )}
            {data.BalanceInd && (
              <Text style={styles.text}>Баланс inDrive: {data.BalanceInd}</Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const MyLoader = () => (
  <ContentLoader viewBox="0 0 380 70">
    <Circle cx="30" cy="30" r="30" />
    <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
);

export default Profile;
