import {useEffect, useRef, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import KeepAwake from 'react-native-keep-awake';
import InitScreen from './screens/InitScreen';
import TokenScreen from './screens/TokenScreen'
import LoginScreen from './screens/LoginScreen';
import NewVersionScreen from './screens/NewVersionScreen';
import DirectionChooseScreen from './screens/DirectionChooseScreen';
import Nav from './components/Nav';
import {AppStateProvider} from './store/app.context';
import {FilterStateProvider} from './store/filter.context';
import {OrderStateProvider} from './store/order.context';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppStateProvider>
      <FilterStateProvider>
        <OrderStateProvider>
          <NavigationContainer>
            <KeepAwake />
            <Stack.Navigator
              initialRouteName={'InitScreen'}
              screenOptions={{
                headerShown: false,
                gestureEnabled: false,
              }}>
              <Stack.Screen name="InitScreen" component={InitScreen} />
              <Stack.Screen
                name="TokenScreen"
                component={TokenScreen}
              />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen
                name="DirectionChoose"
                component={DirectionChooseScreen}
              />
              <Stack.Screen name="NavScreen" component={Nav} />
              <Stack.Screen
                name="NewVersionScreen"
                component={NewVersionScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </OrderStateProvider>
      </FilterStateProvider>
    </AppStateProvider>
  );
}
