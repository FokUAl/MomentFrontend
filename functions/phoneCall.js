import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

const PhoneCall = (number) => {
    RNImmediatePhoneCall.immediatePhoneCall(number);
}

export default PhoneCall