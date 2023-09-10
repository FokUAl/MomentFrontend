import {useState, useContext} from 'react';
import {View, StyleSheet, Text, ActivityIndicator, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Switch} from 'react-native-switch';
import {AppStateContext} from '../../../store/app.context.js';
import Theme from '../../../constants/Theme.js';
import {FilterStateContext} from '../../../store/filter.context.js';
import ButtonLess from '../../../components/ButtonLess.js';
import Input from '../../../components/Input.js';
import InputDate from '../../../components/InputDate.js';
import DropShadow from 'react-native-drop-shadow';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ModalContent = () => {
  const appContext = useContext(AppStateContext);
  const colors = Theme(appContext.darkTheme);
  const filter = useContext(FilterStateContext);
  const [openDate, setOpenDate] = useState(false);
  const [openTimeStart, setOpenTimeStart] = useState(false);
  const [openTimeEnd, setOpenTimeEnd] = useState(false);
  const [connection, setConnection] = useState(false);

  const deleteOfferTimer = async () => {
    try {
      await AsyncStorage.removeItem('offerTimer');
    } catch (e) {
      console.error(e);
    }
  };

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      borderTopLeftRadius: 20,
      borderTopEndRadius: 20,
      backgroundColor: colors.primary,
      paddingVertical: 20,
      paddingHorizontal: 20,
    },
    shadow: {
      width: '100%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -15,
      },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    button: {
      // padding: 35,
    },
    contentArea: {
      flexDirection: 'row',
      gap: 20,
    },
    indicator: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
    },
    switchContainer: {
      flexDirection: 'row',
      // borderWidth: .5,
      borderColor: 'black',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
  });

  return (
    <DropShadow style={styles.shadow}>
      <View style={styles.container}>
        <View
          style={{opacity: filter.filterConfigurations.isSearching ? 0.7 : 1}}>
          <View style={[styles.contentArea, {gap: 10}]}>
            <View style={{flex: 1}}>
              <Input
                value={filter.filterConfigurations.priceStart}
                onChangeText={e =>
                  filter.setFilterConfigurations(prev => {
                    return {...prev, priceStart: e};
                  })
                }
                placeholder="Цена минимум"
                fluid
                isDisabled={filter.filterConfigurations.isSearching}
                type="numeric"
              />
            </View>
            <View style={{flex: 1}}>
              <InputDate
                value={filter.filterConfigurations.date}
                onChange={e => {
                  filter.setFilterConfigurations(prev => {
                    return {...prev, date: e};
                  });
                }}
                onPress={setOpenDate}
                open={openDate}
                type="date"
                placeholder="Дата"
                // isDisabled={filter.filterConfigurations.isSearching}
                isDisabled={true}
              />
            </View>
          </View>
          <View style={[styles.contentArea, {gap: 10}]}>
            <View style={{flex: 1}}>
              <InputDate
                value={filter.filterConfigurations.timeStart}
                onChange={e => {
                  filter.setFilterConfigurations(prev => {
                    return {...prev, timeStart: e};
                  });
                }}
                onPress={setOpenTimeStart}
                open={openTimeStart}
                type="time"
                placeholder="Время выезда с"
                // isDisabled={filter.filterConfigurations.isSearching}
                isDisabled={true}
              />
            </View>
            <View style={{flex: 1}}>
              <InputDate
                value={filter.filterConfigurations.timeEnd}
                onChange={e => {
                  filter.setFilterConfigurations(prev => {
                    return {...prev, timeEnd: e};
                  });
                }}
                onPress={setOpenTimeEnd}
                open={openTimeEnd}
                type="time"
                placeholder="Время выезда до"
                // isDisabled={filter.filterConfigurations.isSearching}
                isDisabled={true}
              />
            </View>
          </View>
          <View style={styles.indicator}>
            {filter.filterConfigurations.isSearching && (
              <ActivityIndicator
                size="large"
                style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
              />
            )}
          </View>
        </View>
        <View style={styles.contentArea}>
          <View style={[{flex: 1, opacity: filter.filterConfigurations.isSearching ? .5 : 1}, styles.switchContainer]}>
            <Switch
              value={filter.filterConfigurations.isMail}
              onValueChange={() =>
                filter.setFilterConfigurations(prev => {
                  return {...prev, isMail: !filter.filterConfigurations.isMail};
                })
              }
              disabled={filter.filterConfigurations.isSearching}
              circleSize={30}
              barHeight={15}
              circleBorderWidth={0.1}
              circleBorderActiveColor={colors.border}
              circleBorderInActiveColor={colors.textInput}
              backgroundActive={colors.fourth}
              backgroundInactive={colors.fourth}
              circleActiveColor={colors.secondary}
              circleInActiveColor={colors.fourth}
              renderInsideCircle={() => (
                <Text>
                  <Ionicons
                    name="briefcase"
                    size={20}
                    style={{
                      height: 22,
                      width: 18,
                      color: colors.text,
                    }}
                  />
                </Text>
              )}
              innerCircleStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              renderInActiveText={false}
              renderActiveText={false}
            />
          </View>
          <View style={{flex: 3}}>
            <ButtonLess
              value={
                filter.filterConfigurations.isSearching
                  ? 'Идёт поиск'
                  : 'Начать поиск'
              }
              fluid
              isActive={filter.filterConfigurations.isSearching}
              onPress={() => {
                filter.setFilterConfigurations(prev => {
                  return {
                    ...prev,
                    isSearching: !filter.filterConfigurations.isSearching,
                    isSearchDelay: true,
                  };
                });
                setOpenDate(false);
                setOpenTimeEnd(false);
                setOpenTimeStart(false);
                setConnection(prev => !prev);
                console.log('delay on');
              }}
              isDisabled={filter.filterConfigurations.isSearchDelay}
            />
          </View>
        </View>
        <View style={styles.button}></View>
      </View>
    </DropShadow>
  );
};

export default ModalContent;
