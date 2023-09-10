import {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Theme from '../../../constants/Theme';
import {AppStateContext} from '../../../store/app.context';
import apis from '../../../constants/apis';

const PingContent = () => {
  const appContext = useContext(AppStateContext);
  const colors = Theme(appContext.darkTheme);
  const [apiPing, setApiPing] = useState();
  const [serverPing, setServerPing] = useState();
  const [netPing, setNetPing] = useState();
  
  useEffect(() => {
    setInterval(() => {
      axios
        .get(apis.apiPing, {
          params: {city: appContext.cityFrom, phone: appContext.phoneNumber},
        })
        .then(response => {
          // console.log('api ping ok', response.data.Ping);
          setApiPing(response.data.Ping);
        })
        .catch(err => {
          console.error(err.message);
        });
    }, 500);
  }, []);

  useEffect(() => {
    setInterval(() => {
      let timeStart = Date.now();
      axios
        .get(apis.serverPing)
        .then(response => {
          // console.log('server ping ok', Date.now() - timeStart)
          setServerPing(Date.now() - timeStart);
        })
        .catch(err => {
          console.error(err.message);
        });
    }, 500);
  }, []);

  // useEffect(() => {
  //   setInterval(async () => {
  //     await NetInfo.fetch().then(state => {
  //       setNetPing(`${state.details.strength} - ${state.details.linkSpeed}`);
  //     });
  //   }, 500);
  // }, []);

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderBottomColor: 'grey',
      borderBottomWidth: .5,
    },
    pingText: {
      flex: 1,
      color: colors.text,
      textAlign: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.pingText}>{apiPing ? apiPing : '0'}</Text>
      <Text style={styles.pingText}>{serverPing ? serverPing > 1000 ? '-' : serverPing : '0'}</Text>
      {/* <Text style={styles.pingText}>{netPing ? netPing : '0'}</Text> */}
    </View>
  );
};

export default PingContent;
