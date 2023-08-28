import React, {useState, useEffect, useContext} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {AppStateContext} from '../../../store/app.context';
import {OrderStateContext} from '../../../store/order.context';
import Theme from '../../../constants/Theme';
import ButtonLess from '../../../components/ButtonLess';
import ModalContent from './FilterContent';
import Card from '../../../components/Card';

const OrderModal = ({update}) => {
  const appContext = useContext(AppStateContext);
  const orderContext = useContext(OrderStateContext);
  const colors = Theme(appContext.darkTheme);

  const styles = StyleSheet.create({
    centeredView: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.third,
    },
    modalContainer: {
      width: '100%',
      height: '100%',
    },
    modalView: {
      width: '100%',
      height: '100%',
    },
    button: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    modalOverlay: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  });
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={orderContext.modalVisible}
        onRequestClose={() => {
            orderContext.setModalVisible(prev => !prev);
        }}>
        <TouchableWithoutFeedback
          onPress={() => orderContext.setModalVisible(false)}>
          <View style={styles.modalOverlay}></View>
        </TouchableWithoutFeedback>
        <View style={styles.modalView}>
          <View style={styles.button}>
            <ButtonLess
              onPress={() => orderContext.setModalVisible(false)}
              icon="close-sharp"
              iconSize={20}
              height={60}
              width={60}
              visible={!orderContext.modalVisible}
              shadow
              isActive
            />
          </View>
          <Card
            price={orderContext.order.price}
            departureDate={orderContext.order.departureDate}
            departureTime={orderContext.order.departureTime}
            description={orderContext.order.description}
            passengerName={orderContext.order.passengerName}
            addressFrom={orderContext.order.addressFrom}
            addressTo={orderContext.order.addressTo}
            phoneNumber={orderContext.order.phoneNumber}
            modal={false}
          />
        </View>
      </Modal>
    </View>
  );
};

export default OrderModal;
