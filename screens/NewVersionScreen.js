import {useEffect, useContext} from 'react';
import {Text, View, StyleSheet, StatusBar, Linking, BackHandler} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {AppStateContext} from '../store/app.context';
import Button from '../components/Button';
import Theme from '../constants/Theme';


export default function NewVersionScreen({navigation}) {
  const appContext = useContext(AppStateContext);
  const colors = Theme(appContext.darkTheme)
  const openLink = async () => {
    await Linking.openURL(appContext.needUpdate.link);
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
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
      backgroundColor: colors.primary
    },
    title: {
      textAlign: 'center',
      color: colors.text,
      marginBottom: 10,
    },
    button: {
      paddingHorizontal: '30%',
    },
  });
  
  return (
    <SafeAreaProvider>
      <SafeAreaView styles={styles.safeView}>
        <View style={styles.container}>
          <Text style={styles.title}>Необходимо обновление</Text>
          <View style={styles.button}>
            <Button value="Скачать" onPress={openLink} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
