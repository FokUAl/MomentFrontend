import {useContext} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppStateContext} from '../store/app.context';
import {FilterStateContext} from '../store/filter.context';
import Theme from '../constants/Theme';

const Direction = () => {
  const appContext = useContext(AppStateContext);
  const filterContext = useContext(FilterStateContext);
  const colors = Theme(appContext.darkTheme);

  const styles = StyleSheet.create({
    wrapper: {
      width: '100%',
      borderBottomColor: colors.border,
      borderBottomWidth: 0.2,
      zIndex: 1,
    },
    direction: {
      width: '100%',
      height: '100%',
      justifyContent: 'space-around',
      flexDirection: 'row',
    },
    directionText: {
      textAlign: 'center',
      textAlignVertical: 'center',
      color: colors.text,
    },
    spinnerWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    spinner: {},
  });

  return (
    <View style={styles.wrapper}>
      {filterContext.filterConfigurations.isSearching ? (
        <View style={styles.spinnerWrapper}>
          <Text style={{color: colors.text}}>Идёт</Text>
          <View style={styles.spinner}>
            <ActivityIndicator size="small" color={colors.text} />
          </View>
          <Text style={{color: colors.text}}>поиск</Text>
        </View>
      ) : (
        <View style={styles.direction}>
          <Text style={styles.directionText}>{appContext.cityFrom}</Text>
          <Text style={styles.directionText}>
            <Ionicons name={'chevron-forward'} color={colors.text} />
            <Ionicons name={'chevron-forward'} color={colors.text} />
            <Ionicons name={'chevron-forward'} color={colors.text} />
          </Text>
          <Text style={styles.directionText}>{appContext.cityTo}</Text>
        </View>
      )}
    </View>
  );
};

export default Direction;
