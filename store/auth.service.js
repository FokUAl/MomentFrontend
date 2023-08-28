import AsyncStorage from '@react-native-async-storage/async-storage';

const setAuthToken = async (login, password) => {
  try {
    return await AsyncStorage.setItem('login', login);
  } catch (error) {
    console.error('AsyncStorage#setItem error: ' + error.message);
  }
};

const checkAuthToken = async () => {
  try {
    return await AsyncStorage.getItem('login');
  } catch (error) {
    console.log('checkAuthToken err: ', error);
    return false;
  }
};

const logOut = async () => {
  try {
    await AsyncStorage.removeItem('login');
  } catch (error) {
    console.log('logout err: ', error);
  }
};

const AuthService = {
  setAuthToken,
  checkAuthToken,
  logOut,
};

export default AuthService;
