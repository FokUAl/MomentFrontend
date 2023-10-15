import {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {AppStateContext} from '../store/app.context';
import Theme from '../constants/Theme';
import apis from '../constants/apis';
import Card from '../components/Card';
import Direction from '../components/Direction';

export default function MyOrdersScreen({navigation}) {
  const appContext = useContext(AppStateContext);
  const colors = Theme(appContext.darkTheme);
  const [data, setData] = useState({isLoading: true, lastOrdersArr: null});
  const [update, setUpdate] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log('isFocused', isFocused);
    console.log('myOrders check');
    axios
      .get(apis.getSavedOrders, {
        headers: {Authorization: appContext.androidId},
        params: {phone: appContext.phoneNumber},
      })
      .then(response => {
        console.log('myOrders ok');
        setData({
          isLoading: false,
          lastOrdersArr: response.data,
        });
        return;
      })
      .catch(error => {
        console.log('myOrders err', error.message);
        return false;
      });
  }, [isFocused, update]);

  const styles = StyleSheet.create({
    safeView: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
    screenWrapper: {
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
    spinnerWrapper: {
      flex: 18,
      justifyContent: 'center',
    },
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.primary,
    },
    noOrders: {
      height: '100%',
      textAlign: 'center',
      textAlignVertical: 'center',
      color: colors.text,
    },
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView styles={styles.safeView}>
        <View style={styles.screenWrapper}>
          <View style={styles.direction}>
            <Direction />
          </View>
          <View style={styles.wrapper}>
            {data.isLoading ? (
              <View style={styles.spinnerWrapper}>
                <ActivityIndicator size="large" color={colors.secondary} />
              </View>
            ) : (
              <View style={styles.container}>
                <ScrollView>
                  {data.lastOrdersArr.List ? (
                    data.lastOrdersArr.List.map((order, index) => {
                      return (
                        <Card
                          key={index}
                          price={order.Price}
                          departureDate={order.SavedTime}
                          departureTime={''}
                          description={order.Description}
                          passengerName={order.PassengerName}
                          addressFrom={order.AddressFrom}
                          addressTo={order.AddressTo}
                          phoneNumber={order.PassengerPhone}
                          cancel
                          setUpdate={setUpdate}
                        />
                      );
                    })
                  ) : (
                    <Text style={styles.noOrders}>Не найдено заказов</Text>
                  )}
                </ScrollView>
              </View>
            )}
          </View>
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
