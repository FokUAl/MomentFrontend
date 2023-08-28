import { PermissionsAndroid, Alert } from 'react-native';

const requestPhoneStatePermission = async () => {
};

const requestPhoneNumberPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_NUMBERS,
      {
        title: 'Moment State Permission',
        message:
          'Moment application is trying to get your Phone Number',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('I\'ve got your Number)');
    } else {
      console.log('I didn\'t get your Number(');
    }
  } catch (err) {
    console.warn(err);
  }
}

const permissions = {
  requestPhoneStatePermission,
  requestPhoneNumberPermission,
}

export default permissions;
