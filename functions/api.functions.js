import {useContext} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apis from '../constants/apis';
import {AppStateContext} from '../store/app.context';

const getPhoneNumber = async () => {
  try {
    const value = await AsyncStorage.getItem('phoneNumber');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

const getProfile = async () => {
  // const data = useContext(AppStateContext);
  // const phoneNumber = await getPhoneNumber();
  // console.log('phoneNumber: ', phoneNumber);
    axios
    .get(apis.getProfile, {params:{phone: '77022031818'}})
    .then(response => {
      console.log(response.data)
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
};

const getLatestVersion = () => {
  axios
    .get(apis.getLatestVersion)
    .then(response => {
      console.log('get latest version response: ', response.data);
      return response.data
    })
    .catch(error => {
      console.log('get latest version err: ', error);
      return
    });
};

const sendSMS = async (sms, phoneNumber) => {
  axios
    .post(apis.sendMessageCode, {Code: sms, Phone: phoneNumber})
    .then(response => {
      console.log('sendSMS response: ', response.data);
      return true;
    })
    .catch(error => {
      console.log('sendSMS err: ', error);
      return false;
    });
};

const APIFunctions = {
  getProfile,
  getLatestVersion,
  sendSMS,
};

export default APIFunctions;
