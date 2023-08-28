import {useState, useEffect, useRef, useContext} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import apis from '../constants/apis';
import Theme from '../constants/Theme';
import {AppStateContext} from '../store/app.context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function InitScreen({navigation}) {
  const appContext = useContext(AppStateContext);
  const [newVer, setNewVer] = useState();
  const [curVer, setCurVer] = useState();
  const link = useRef(null);

  useEffect(() => {
    axios
    .get(apis.getLatestVersion)
    .then(response => {
      console.log('Get latest version ok');
      setNewVer(response.data.Version);
      link.current = response.data.Link;
    })
    .catch(error => {
      console.log('Get latest version err', error.message);
    });
  }, [])

  useEffect(() => {
    const getMode = async() => {
      try {
        const value = await AsyncStorage.getItem('darkMode')
        appContext.setDarkTheme(value === 'dark' ? false : true)
        console.log('getMode', value)
      } catch(e) {
        console.error(e)
      }
    }
    getMode()

    setCurVer(DeviceInfo.getVersion());
    if (curVer && newVer) {
      if (
        parseInt(newVer.split('.').join('')) >
        parseInt(curVer.split('.').join(''))
      ) {
        appContext.setNeedUpdate(prev => {
          return {need: true, link: link.current};
        });
        console.log('NEED UPDATE');
        navigation.navigate('NewVersionScreen');
      } else {
        navigation.navigate('LoginScreen');
        console.log('NAVIGATE to login after version')
      }
    }
  }, [curVer, newVer]);
  console.log('init cur', curVer, 'new', newVer);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {/* <ActivityIndicator size="large" color={colors.secondary} /> */}
    </View>
  );
}