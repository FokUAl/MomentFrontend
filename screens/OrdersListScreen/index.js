import {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import Theme from '../../constants/Theme';
import {AppStateContext} from '../../store/app.context';
import apis from '../../constants/apis';
import Card from '../../components/Card';
import ButtonLess from '../../components/ButtonLess';
import Direction from '../../components/Direction';
import ModalContent from './components/FilterContent';
import OrderModal from './components/OrderModal';

export default function OrdersListScreen({navigation, update}) {
  const appContext = useContext(AppStateContext);
  const colors = Theme(appContext.darkTheme);
  const isFocused = useIsFocused();
  const [data, setData] = useState({isLoading: true, lastOrdersArr: null});

  useEffect(() => {
    const request = async () => {
      try {
        axios
          .get(apis.getLastOrders, {
            params: {
              City: appContext.cityFrom,
              Destination: appContext.cityTo,
              Phone: appContext.phoneNumber,
            },
          })
          .then(response => {
            setData({
              isLoading: false,
              lastOrdersArr: response.data,
            });
            console.log('orders ok');
            return;
          })
          .catch(error => {
            console.log('ordersList err', error);
            return false;
          });
      } catch (e) {
        console.error(e);
      }
    };
    request();
  }, [isFocused, update]);

  const styles = StyleSheet.create({
    safeView: {
      marginTop: StatusBar.currentHeight,
    },
    main: {
      height: '100%',
      backgroundColor: colors.primary,
    },
    cardsView: {
      flex: 3.3,
    },
    filterWrapper: {
      flex: 1,
    },
    spinnerWrapper: {
      flex: 18,
      justifyContent: 'center',
    },
    cardsArea: {
      flex: 14,
    },
    direction: {
      flex: 1,
    },
    noOrders: {
      height: '100%',
      textAlign: 'center',
      textAlignVertical: 'center',
      color: colors.text,
    },
    button: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      marginBottom: 0,
    },
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView styles={styles.safeView}>
        <View style={styles.main}>
          <View style={styles.cardsView}>
            <View style={styles.direction}>
              <Direction />
            </View>
            {data.isLoading ? (
              <View style={styles.spinnerWrapper}>
                <ActivityIndicator size="large" color={colors.secondary} />
              </View>
            ) : (
              <View style={styles.cardsArea}>
                <ScrollView>
                  {data.lastOrdersArr.Orders ? (
                    data.lastOrdersArr.Orders.map((order, index) => {
                      return (
                        <Card
                          key={index}
                          price={order.Price}
                          departureDate={order.DepartureDate}
                          departureTime={order.DepartureTime}
                          description={order.Description}
                          passengerName={order.PassengerName}
                          addressFrom={order.AddressFrom}
                          addressTo={order.AddressTo}
                          orderId={order.OrderId}
                          clientId={order.ClientId}
                        />
                      );
                    })
                  ) : (
                    <Text style={styles.noOrders}>Не найдено заказов</Text>
                  )}
                </ScrollView>

                <View modal style={{height: '0%', width: '100%'}}>
                  <OrderModal />
                </View>
              </View>
            )}
          </View>
          <View style={styles.filterWrapper}>
            <ModalContent update={update} />
          </View>
          {/* <View style={styles.button}>
            <ButtonLess
              onPress={() => setModalVisible(true)}
              icon="search-sharp"
              iconSize={20}
              height={60}
              width={60}
              visible={modalVisible}
              isActive
            />
          </View>
          {filter.filterConfigurations.isSearching && (
            <View style={styles.searchWrapper}>
              <Text style={styles.searchText}>Идет поиск</Text>
            </View>
          )}
          <ModalScreen
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          /> */}
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
