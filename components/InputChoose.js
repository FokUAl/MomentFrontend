import {useContext} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppStateContext} from '../store/app.context';
import Theme from '../constants/Theme';

const InputChoose = ({variantsArr, setVariant, variantIndex}) => {
  const appContext = useContext(AppStateContext);
  const colors = Theme(appContext.darkTheme);

  const styles = StyleSheet.create({
    wrapper: {
      width: '60%',
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: 5,
      borderWidth: 2,
      borderRadius: 10,
      marginBottom: 10,
      borderColor: colors.secondary
    },
    active: {
      backgroundColor: colors.secondary,
    },
    cityName: {
      textAlign: 'right',
      textAlignVertical: 'center',
      fontSize: 16,
      color: colors.text,
      flex: 2,
    },
    cityNameFrom: {
      textAlign: 'right',
    },
    cityNameTo: {
      textAlign: 'left',
    },
    iconsWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      flex: 1,
    },
    icon: {
      textAlign: 'center',
      textAlignVertical: 'center',
      color: colors.textInput,
    },
  });

  const optionsGenerator = variantsArr.map((option, index) => {
    return (
      <Pressable
        key={Math.random()}
        style={[styles.wrapper, variantIndex === index + 1 && styles.active]}
        onPress={() => setVariant(index + 1)}>
        <Text style={[styles.cityName, styles.cityNameFrom]}>
          {option.cityFrom}
        </Text>
        <View style={styles.iconsWrapper}>
          <Ionicons name="chevron-forward" style={[styles.icon]} />
          <Ionicons name="chevron-forward" style={[styles.icon]} />
          <Ionicons name="chevron-forward" style={[styles.icon]} />
        </View>
        <Text style={[styles.cityName, styles.cityNameTo]}>
          {option.cityTo}
        </Text>
      </Pressable>
    );
  });

  return <View>{optionsGenerator}</View>;
};

export default InputChoose;
