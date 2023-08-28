import {useEffect, useContext} from 'react';
import {View, Text, StyleSheet, StatusBar, BackHandler} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {AppStateContext} from '../../store/app.context';
import Theme from '../../constants/Theme';
import Profile from './components/Profile';
import AddOffer from './components/AddOffer';
import ButtonsArea from './components/ButtonsArea';
import Direction from '../../components/Direction';

export default function MyOrdersScreen({navigation}) {
  const appContext = useContext(AppStateContext);
  const colors = Theme(appContext.darkTheme);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);
  const styles = StyleSheet.create({
    safeView: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.primary,
    },
    direction: {
      flex: 1,
    },
    wrapper: {
      flex: 18,
    },
    searchWrapper: {
      position: 'absolute',
      width: '100%',
      bottom: 0,
      justifyContent: 'center',
      marginBottom: 10,
    },
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView styles={styles.safeView}>
        <View style={styles.container}>
          <View style={styles.direction}>
            <Direction />
          </View>
          <View style={styles.wrapper}>
            <Profile />
            <AddOffer />
            <ButtonsArea navigation={navigation} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
