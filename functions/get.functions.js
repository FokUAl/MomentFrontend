import {Alert} from 'react-native'
import DeviceInfo from 'react-native-device-info'

const getIMEI = () => {
  DeviceInfo.getSerialNumber().then((serialNumber) => {
    Alert.alert(serialNumber)
  });
};

const getPhoneNumber = () => {
  // DeviceInfo.getModel()
  DeviceNumber.get().then((res) => {
    console.log(res);
  });
};

const getOsVersion = () => {
  return Device.osVersion;
};

const getFunctions = {
  getIMEI,
  getPhoneNumber,
  getOsVersion,
};

export default getFunctions;
