import {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import Theme from '../constants/Theme';
import {FilterStateContext} from '../store/filter.context';
import {AppStateContext} from '../store/app.context';
import {OrderStateContext} from '../store/order.context';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import OrdersListScreen from '../screens/OrdersListScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';
import data from '../data';

const Tab = createBottomTabNavigator();

function TabGroup({navigation}) {
  const filter = useContext(FilterStateContext);
  const appContext = useContext(AppStateContext);
  const orderContext = useContext(OrderStateContext);
  const colors = Theme(appContext.darkTheme);
  const [update, setUpdate] = useState(false);
  let ping;

  const sendPing = connect => {
    connect.send(JSON.stringify({}));
    console.log('WebSocket ping', Date.now());
  };

  useEffect(() => {
    console.log('connection is', filter.filterConfigurations.isSearching);
    let ws;
      if (filter.filterConfigurations.isMail) {
        ws = new WebSocket('ws://3.76.124.47:8000/ws/get-parcel-phone');
        console.log('WebSocket connection');
      } else {
        ws = new WebSocket('ws://3.76.124.47:8000/ws/get-phone');
        console.log('WebSocket connection');
      }

      if (!filter.filterConfigurations.isSearching) {
        ws.close(8);
        ws.send(JSON.stringify('close'));
        console.log('WebSocket just closed');
        clearInterval(ping);
        filter.setFilterConfigurations(prev => {
          return {
            ...prev,
            isSearching: false,
          };
        });
      } else {
        ws.onopen = async () => {
          // Connection opened
          console.log('WebSocket connection opened');
          try {
            ws.send(
              JSON.stringify({
                phone: appContext.phoneNumber,
                price: filter.filterConfigurations.priceStart
                  ? filter.filterConfigurations.priceStart
                  : '0',
                city: appContext.cityFrom,
                destination: appContext.cityTo,
              }),
            );
            filter.setFilterConfigurations(prev => {
              return {
                ...prev,
                isSearchDelay: false
              };
            });
            console.log('delay off')
            ping = setInterval(sendPing, 100, ws);
          } catch (e) {
            console.error(e);
          }
        };
      }
      ws.onmessage = e => {
        if (filter.filterConfigurations.isSearching) {
          console.log('on message', e.data);
          if (e.data.Error) {
            Alert.alert('Ошибка', e.data.Error);
          } else {
            const newData = JSON.parse(e.data);
            if (newData.Order.PassengerPhone) {
              RNImmediatePhoneCall.immediatePhoneCall(
                newData.Order.PassengerPhone,
              );
              filter.setFilterConfigurations(prev => {
                return {
                  ...prev,
                  isSearching: false,
                  isSearchDelay: false
                };
              });
              console.log('newData',newData)
              orderContext.setOrder({
                price: newData.Order.Price,
                departureDate: newData.Order.DepartureDate,
                departureTime: newData.Order.DepartureTime,
                description: newData.Order.Description,
                passengerName: newData.Order.PassengerName,
                addressFrom: newData.Order.AddressFrom,
                addressTo: newData.Order.AddressTo,
                phoneNumber: newData.Order.PassengerPhone,
              });
              orderContext.setModalVisible(true);
              setUpdate(prev => !prev);
            }
            clearInterval(ping);
            ws.send(JSON.stringify('close'));
          }
        }
      };
      ws.onerror = e => {
        console.log('on error', e.message);
        clearInterval(ping);
      };
      ws.onclose = e => {
        console.log('on close', e.code, e.reason);
        filter.setFilterConfigurations(prev => {
          return {
            ...prev,
            isSearching: false,
            isSearchDelay: false
          };
        });
        clearInterval(ping);
        ws.send(JSON.stringify('close'));
      };

      if (!filter.filterConfigurations.isSearching) {
        filter.setFilterConfigurations(prev => {
          return {
            ...prev,
            isSearching: false,
          };
        });
      }

      return () => {
        clearInterval(ping);
        ws.send(JSON.stringify('close'));
      };
  }, [filter.filterConfigurations.isSearching]);

  return (
    <Tab.Navigator
      initialRouteName={'Профиль'}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Заказы') {
            iconName = focused ? 'car-sharp' : 'car-outline';
          } else if (route.name === 'Мои заказы') {
            iconName = focused ? 'folder' : 'folder-outline';
          } else if (route.name === 'Профиль') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {zIndex: 1000, backgroundColor: colors.primary},
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.text,
        headerShown: false,
      })}>
      <Tab.Screen
        name="Заказы"
        component={OrdersListScreen}
        initialParams={{navigation: navigation, update: update}}
      />
      <Tab.Screen
        name="Мои заказы"
        component={MyOrdersScreen}
        initialParams={{navigation: navigation}}
      />
      <Tab.Screen
        name="Профиль"
        component={ProfileScreen}
        initialParams={{
          navigation: navigation,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Nav() {
  return (
    <View style={styles.tabsBottom}>
      <TabGroup
        cityFrom={data.Direction.cityFrom}
        cityTo={data.Direction.cityTo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabsBottom: {
    flex: 1,
    marginBottom: 0,
  },
});
