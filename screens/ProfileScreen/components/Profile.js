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
  const [data, setData] = useState({isLoading: true, Profile: null});

  function unicodeToChar(text) {
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
    textCenter: {
      textAlign: 'center',
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
            setData({
              isLoading: false,
              Profile: response.data,
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
            {data.Profile.AvatarMedium && (
              <Image
                source={{uri: data.Profile.AvatarMedium}}
                style={styles.avatar}
              />
            )}
          </View>
          <View style={styles.textArea}>
            <Text style={styles.textCenter}>
              {unicodeToChar(data.Profile.Username)}
            </Text>
            <Text style={styles.textCenter}>{`+${data.Profile.Phone}`}</Text>
            {data.Profile.CarModel && (
              <Text style={styles.textCenter}>{data.Profile.CarModel}</Text>
            )}
            {data.Profile.CarGosNomer && (
              <Text style={styles.textCenter}>{data.Profile.CarGosNomer}</Text>
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
