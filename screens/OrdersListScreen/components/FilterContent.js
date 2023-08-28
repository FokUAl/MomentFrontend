import {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Theme from '../../../constants/Theme.js';
import {FilterStateContext} from '../../../store/filter.context.js';
import ButtonLess from '../../../components/ButtonLess.js';
import Input from '../../../components/Input.js';
import InputDate from '../../../components/InputDate.js';
import DropShadow from 'react-native-drop-shadow';
import {AppStateContext} from '../../../store/app.context.js';

const ModalContent = () => {
  const appContext = useContext(AppStateContext);
  const colors = Theme(appContext.darkTheme);
  const filter = useContext(FilterStateContext);
  const [openDate, setOpenDate] = useState(false);
  const [openTimeStart, setOpenTimeStart] = useState(false);
  const [openTimeEnd, setOpenTimeEnd] = useState(false);
  const [connection, setConnection] = useState(false);

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
  });

  return (
    <DropShadow style={styles.shadow}>
      <View style={styles.container}>
        <View style={[styles.contentArea, {gap: 10}]}>
          <View style={{flex: 1}}>
            <Input
              value={filter.filterConfigurations.priceStart}
              onChangeText={e =>
                filter.setFilterConfigurations(prev => {
                  return {...prev, priceStart: e};
                })
              }
              placeholder="Цена с"
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
              placeholder="Время с"
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
              placeholder="Время до"
              // isDisabled={filter.filterConfigurations.isSearching}
              isDisabled={true}
            />
          </View>
        </View>
        <View style={styles.contentArea}>
          <View style={{flex: 1}}>
            <ButtonLess
              icon="file-tray-full"
              fluid
              isActive={filter.filterConfigurations.isMail}
              onPress={() =>
                filter.setFilterConfigurations(prev => {
                  return {...prev, isMail: !filter.filterConfigurations.isMail};
                })
              }
              isDisabled={filter.filterConfigurations.isSearching}
            />
          </View>
          <View style={{flex: 1}}>
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
                })
                setOpenDate(false);
                setOpenTimeEnd(false);
                setOpenTimeStart(false);
                setConnection(prev => !prev);
                console.log('delay on')
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
