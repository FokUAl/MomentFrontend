import {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {AppStateContext} from '../../../store/app.context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Theme from '../../../constants/Theme';
import Input from '../../../components/Input';
import InputDate from '../../../components/InputDate';
import Button from '../../../components/Button';
import axios from 'axios';
import apis from '../../../constants/apis';

const AddOffer = () => {
  const appContext = useContext(AppStateContext);
  const colors = Theme(appContext.darkTheme);
  const [offer, setOffer] = useState({
    price: undefined,
    comm: undefined,
    date: undefined,
    time: undefined,
  });
  const [opens, setOpens] = useState({
    openDate: false,
    openTime: false,
  });
  const onSubmit = () => {
    if (offer.price && offer.comm && offer.date && offer.time) {
      const request = async () => {
        try {
          axios
            .post(apis.addOffer, {
              City: appContext.cityFrom,
              Destination: appContext.cityTo,
              Departure: `${Intl.DateTimeFormat('en-US', {
                weekday: 'short',
              }).format(
                offer.date,
              )}, ${offer.date.getDate()} ${Intl.DateTimeFormat('en-US', {
                month: 'short',
              }).format(
                offer.date,
              )} ${offer.date.getFullYear()} ${offer.time.getHours()}:${offer.time.getMinutes()}:${offer.time.getSeconds()} +0600`,
              Phone: appContext.phoneNumber,
              Price: offer.price,
              Description: offer.comm,
            })
            .then(response => {
              console.log('response', response.data.Content);
              if (response.data.Content.split(' ')[0] === '"You\'re') {
                Alert.alert('Добавить заказ?', response.data.Content, [
                  {
                    text: 'Отмена',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Добавить',
                    onPress: () => {
                      axios
                        .post(apis.addOfferConfirmation, {
                          City: appContext.cityFrom,
                          Destination: appContext.cityTo,
                          // Departure:"Tue, 8 Aug 2023 20:30:00 +0600",
                          Departure: `${Intl.DateTimeFormat('en-US', {
                            weekday: 'short',
                          }).format(
                            offer.date,
                          )}, ${offer.date.getDate()} ${Intl.DateTimeFormat(
                            'en-US',
                            {
                              month: 'short',
                            },
                          ).format(
                            offer.date,
                          )} ${offer.date.getFullYear()} ${offer.time.getHours()}:${offer.time.getMinutes()}:${offer.time.getSeconds()} +0600`,
                          Phone: appContext.phoneNumber,
                          Price: offer.price,
                          Description: offer.comm,
                        })
                        .then(response => {
                          console.log('add offer confirmation ok', response);
                          Alert.alert('Заказ добавлен');
                        })
                        .catch(error => {
                          console.log(
                            'add offer confirmation err',
                            error.message,
                          );
                          Alert.alert(error.message);
                        });
                    },
                  },
                ]);
              } else {
                Alert.alert('Не хватает средств', response.data.Content);
              }
            })
            .catch(error => {
              console.log('add offer err', error.message);
              Alert.alert(error.message);
            });
        } catch (e) {
          console.error(e);
        }
      };
      request();
    } else {
      Alert.alert('Заполните все поля');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
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
      width: '100%',
      textAlign: 'center',
      color: colors.text,
      marginBottom: 15,
    },
    fiveToFive: {
      flexDirection: 'row',
      gap: 10,
    },
    inputWrapper: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добавить заказ</Text>
      <View style={styles.fiveToFive}>
        <View style={styles.inputWrapper}>
          <Input value={appContext.cityFrom} isDisabled fluid />
        </View>
        <View style={styles.inputWrapper}>
          <Input value={appContext.cityTo} isDisabled fluid />
        </View>
      </View>
      <Input
        value={offer.price}
        onChangeText={e =>
          setOffer(prev => {
            return {...prev, price: e};
          })
        }
        type="numeric"
        placeholder="Цена за место"
        fluid
      />
      <Input
        value={offer.comm}
        onChangeText={e =>
          setOffer(prev => {
            return {...prev, comm: e};
          })
        }
        placeholder="Комментарий пассажиру"
        fluid
      />
      <View style={styles.fiveToFive}>
        <View style={styles.inputWrapper}>
          <InputDate
            value={offer.date}
            onChange={e =>
              setOffer(prev => {
                return {...prev, date: e};
              })
            }
            onPress={e =>
              setOpens(prev => {
                return {...prev, openDate: e};
              })
            }
            open={opens.openDate}
            type="date"
            placeholder="Выберите дату"
          />
        </View>
        <View style={styles.inputWrapper}>
          <InputDate
            value={offer.time}
            onChange={e =>
              setOffer(prev => {
                return {...prev, time: e};
              })
            }
            onPress={e =>
              setOpens(prev => {
                return {...prev, openTime: e};
              })
            }
            open={opens.openTime}
            type="time"
            placeholder="Выберите время"
          />
        </View>
      </View>
      <Button value="Отправить" onPress={onSubmit} />
    </View>
  );
};

export default AddOffer;
