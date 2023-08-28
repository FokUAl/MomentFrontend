import {useState, useContext} from 'react';
import {View, Text, StyleSheet, Alert, Linking} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonLess from './ButtonLess';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import axios from 'axios';
import Theme from '../constants/Theme';
import apis from '../constants/apis';
import {AppStateContext} from '../store/app.context';

export default function Card({
  price,
  departureDate,
  departureTime,
  description,
  passengerName,
  addressFrom,
  addressTo,
  cancel,
  orderId,
  clientId,
  phoneNumber,
  setUpdate,
  modal = true,
}) {
  const date = new Date(departureDate);
  const appContext = useContext(AppStateContext);
  const colors = Theme(appContext.darkTheme);

  const openWhatsapp = async () => {
    await Linking.openURL('https://wa.me/' + phoneNumber);
  };

  const deleteOrder = () => {
    axios
      .post(apis.deleteSavedOrder, {
        phone: phoneNumber,
        date: departureDate,
        driverPhone: appContext.phoneNumber,
      })
      .then(response => {
        console.log('delete Order ok');
        setUpdate(prev => !prev);
      })
      .catch(error => {
        console.log('delete Order err', error.message);
      });
  };

  const request = async () => {
    if (phoneNumber) {
      RNImmediatePhoneCall.immediatePhoneCall(phoneNumber);
    } else {
      try {
        axios
          .get(apis.getOneOrder, {
            params: {
              City: appContext.cityFrom,
              ClientId: clientId,
              OrderId: orderId,
              Phone: appContext.phoneNumber,
              AddressFrom: addressFrom,
              AddressTo: addressTo,
              PassengerName: passengerName,
              Price: price,
              Description: description,
            },
          })
          .then(response => {
            console.log('phoneCall ok', response.data);
            if (response.data.Phone.split(' ')[0] === 'error:') {
              Alert.alert('Неудалось дозвониться', response.data.Phone);
            } else {
              RNImmediatePhoneCall.immediatePhoneCall(response.data.Phone);
            }
            return;
          })
          .catch(error => {
            console.log('phoneCall err', error);
            return false;
          });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const styles = StyleSheet.create({
    card: {
      marginVertical: 10,
      marginHorizontal: 20,
      padding: 20,
      borderRadius: 10,
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 8,
      backgroundColor: colors.third,
    },
    title: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      textAlignVertical: 'center',
    },
    price: {
      fontSize: 18,
      paddingHorizontal: 10,
      paddingVertical: 7,
      color: colors.secondary,
      textAlign: 'center',
      textAlignVertical: 'center',
      borderColor: colors.secondary,
      borderWidth: 3,
      borderRadius: 10,
    },
    timeDeparture: {
      fontSize: 12,
      textAlignVertical: 'center',
      color: colors.text,
    },
    direction: {
      borderColor: colors.border,
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
      marginTop: 5,
      marginBottom: 10,
    },
    directionTextFrom: {
      textAlign: 'justify',
      color: colors.placeholder,
    },
    directionTo: {
      flexDirection: 'row',
      color: colors.placeholder,
    },
    directionIcon: {
      flex: 1,
      textAlign: 'center',
      textAlignVertical: 'top',
      color: colors.placeholder,
    },
    directionTextTo: {
      flex: 10,
      textAlign: 'justify',
      color: colors.placeholder,
    },
    comm: {
      fontSize: 18,
      color: colors.text,
      marginBottom: 5,
    },
    name: {
      fontSize: 18,
      color: colors.text,
    },
    textArea: {},
    buttonsArea: {
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      gap: 5,
    },
    priceArea: {
      flex: 3,
    },
    buttonArea: {
      flex: 1,
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.textArea}>
        <View style={styles.title}>
          <Text style={styles.name}>{passengerName}</Text>
          {departureDate && (
            <Text style={styles.timeDeparture}>
              {date &&
                `${date.getDate()} ${new Intl.DateTimeFormat('ru-RU', {
                  month: 'short',
                }).format(date)} ${date.getFullYear()}${
                  departureTime && ` в ${departureTime}`
                }`}
            </Text>
          )}
        </View>
        <View style={styles.direction}>
          {addressFrom ? (
            <Text style={styles.directionTextFrom}>{addressFrom}</Text>
          ) : (
            <View />
          )}
          {addressTo ? (
            <View style={styles.directionTo}>
              <Ionicons
                name="return-down-forward"
                style={styles.directionIcon}
                size={20}></Ionicons>
              <Text style={styles.directionTextTo}>{addressTo}</Text>
            </View>
          ) : (
            <View />
          )}
        </View>
        {description ? (
          <Text style={styles.comm}>{description}</Text>
        ) : (
          <View />
        )}
      </View>
      <View style={styles.buttonsArea}>
        <View style={styles.priceArea}>
          <Text style={styles.price}>{`${price} тг.`}</Text>
        </View>
        <View style={styles.buttonArea}>
          {modal && (
            <ButtonLess
              icon="logo-whatsapp"
              height={50}
              width={50}
              onPress={openWhatsapp}
            />
          )}
        </View>
        <View style={styles.buttonArea}>
          {modal && (
            <ButtonLess icon="call" height={50} width={50} onPress={request} />
          )}
        </View>
        {cancel ? (
          <View style={styles.buttonArea}>
            <ButtonLess
              icon="trash"
              height={50}
              width={50}
              onPress={deleteOrder}
            />
          </View>
        ) : (
          ''
        )}
      </View>
    </View>
  );
}
