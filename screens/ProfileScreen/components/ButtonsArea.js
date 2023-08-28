import {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert, Switch} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Theme from '../../../constants/Theme';
import Button from '../../../components/Button';
import apis from '../../../constants/apis';
import {AppStateContext} from '../../../store/app.context';

const ButtonsArea = ({navigation}) => {
  const appContext = useContext(AppStateContext);
  const colors = Theme(appContext.darkTheme);

  const toggleSwitch = async() => {
    appContext.setDarkTheme(prev => !prev)
    const darkTheme = appContext.darkTheme ? 'dark' : 'light'
    try {
      await AsyncStorage.setItem('darkMode', darkTheme)
    } catch(e) {
      console.error(e)
    }
    console.log(appContext.darkTheme)
  };

  const onLogout = () => {
    axios
      .post(apis.logOut, {Phone: appContext.phoneNumber})
      .then(response => {
        console.log('logout ok');
      })
      .catch(error => {
        console.log('logout err', error.message);
      });
    AsyncStorage.removeItem('phoneNumber');
    navigation.navigate('LoginScreen');
  };

  const onDirectionChoose = () => {
    navigation.navigate('DirectionChoose');
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
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
    buttonsArea: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonsArea}>
        <Text>
          <Button value="Выйти" onPress={onLogout} />
        </Text>
        <Text>
          <Button value="Выбрать маршрут" onPress={onDirectionChoose} />
        </Text>
        <View>
          <Switch
            trackColor={{false: '#dcdcdc', true: 'black'}}
            thumbColor={appContext.darkTheme ? '#dcdcdc' : colors.secondary}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={appContext.darkTheme}
          />
        </View>
      </View>
    </View>
  );
};

export default ButtonsArea;
