import {useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, BackHandler} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ButtonLess from '../components/ButtonLess';
import Theme from '../constants/Theme';
import data from '../data';
import apis from '../constants/apis';
import {AppStateContext} from '../store/app.context';
import InputChoose from '../components/InputChoose';

export default function DirectionChooseScreen({navigation}) {
  const appContext = useContext(AppStateContext);
  const colors = Theme(appContext.darkTheme);
  const [isLoading, setIsLoading] = useState(true);
  const [directionOne, setDirectionOne] = useState();
  const [directionTwo, setDirectionTwo] = useState();
  const [direction, setDirection] = useState();

  useEffect(() => {
    // axios.post(apis.getDirection, {phone: appContext.phoneNumber})
    // .then(response => {
    //   setDirectionOne({
    //     cityFrom: response.Direction.cityFrom,
    //     cityTo: response.Direction.cityTo,
    //   });
    //   setDirectionTwo({
    //     cityFrom: response.Direction.cityTo,
    //     cityTo: response.Direction.cityFrom,
    //   });
    // })
    setIsLoading(true);
    setDirectionOne({
      //Поменять на response ВАЖНО
      cityFrom: data.Direction.cityFrom,
      cityTo: data.Direction.cityTo,
    });
    setDirectionTwo({
      //Поменять на response ВАЖНО
      cityFrom: data.Direction.cityTo,
      cityTo: data.Direction.cityFrom,
    });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  const onPressHandler = () => {
    switch (direction) {
      case 1: {
        appContext.setCityFrom(directionOne.cityFrom);
        appContext.setCityTo(directionOne.cityTo);
        break;
      }
      case 2: {
        appContext.setCityFrom(directionTwo.cityFrom);
        appContext.setCityTo(directionTwo.cityTo);
        break;
      }
      case 3: {
        appContext.setCityFrom('Астана');
        appContext.setCityTo('Алматы');
        break;
      }
      case 4: {
        appContext.setCityFrom('Алматы');
        appContext.setCityTo('Астана');
        break;
      }
      case 5: {
        appContext.setCityFrom('Алматы');
        appContext.setCityTo('Шымкент');
        break;
      }
      case 6: {
        appContext.setCityFrom('Шымкент');
        appContext.setCityTo('Алматы');
        break;
      }
    }
    navigation.navigate('NavScreen');
  };

  const deletePhone = async () => {
    try {
      const value = await AsyncStorage.removeItem('phoneNumber');
      console.log('removed');
    } catch (e) {
      console.error(e);
    }
  };

  const styles = StyleSheet.create({
    safeView: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.primary,
    },
    wrapper: {
      height: '100%',
      justifyContent: 'center',
    },
    text: {
      textAlign: 'center',
      marginBottom: 10,
      color: colors.text,
    },
    inputsWrapper: {
      width: '100%',
      alignItems: 'center',
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
          {isLoading ? (
            <Text>
              <MyLoader />
            </Text>
          ) : (
            <View style={styles.wrapper}>
              <Text style={styles.text}>Выберите направление</Text>
              <View style={styles.inputsWrapper}>
                <InputChoose
                  variantsArr={[
                    directionOne,
                    directionTwo,
                    {cityFrom: 'Астана', cityTo: 'Алматы'},
                    {cityFrom: 'Алматы', cityTo: 'Астана'},
                    {cityFrom: 'Алматы', cityTo: 'Шымкент'},
                    {cityFrom: 'Шымкент', cityTo: 'Алматы'},
                  ]}
                  setVariant={setDirection}
                  variantIndex={direction}
                />
              </View>
              <View style={styles.button}>
                <ButtonLess
                  onPress={onPressHandler}
                  value={'Выбрать'}
                  width={80}
                  height={30}
                  border="square"
                  isDisabled={!!!direction}
                />
                {/* <ButtonLess value="Удалить" onPress={deletePhone} /> */}
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const MyLoader = () => (
  <ContentLoader viewBox="0 0 380 70">
    <Circle cx="30" cy="30" r="30" />
    <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
);
