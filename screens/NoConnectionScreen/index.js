import {View, Text, StyleSheet} from 'react-native'
import Button from '../../components/Button'

const NoConnectionScreen = ({navigation}) => {
    const Update = () => {
        navigation.navigate('InitScreen')
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
      },
      card: {
        justifyContent: 'center'
      }
    });
    return (
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={{marginBottom: 20}}>Нет соединения</Text>
            <Button value="Обновить" onPress={Update}></Button>
            </View>
        </View>
    )
}

export default NoConnectionScreen