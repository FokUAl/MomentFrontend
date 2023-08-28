import React, {useState} from 'react';
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
import ButtonLess from '../../../components/ButtonLess';
import ModalContent from './FilterContent';

const ModalScreen = ({modalVisible, setModalVisible}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}></View>
          </TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <View style={styles.button}>
              <ButtonLess
                onPress={() => setModalVisible(false)}
                icon='close-sharp'
                iconSize={20}
                height={60}
                width={60}
                visible={!modalVisible}
                shadow
                color="fourth"
                isActive
              />
            </View>
            <ModalContent />
          </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    height: '100%',
    zIndex: 50,
  },
  modalContainer: {
    width: '100%',
    height: '100%',
  },
  modalView: {
    width: '100%',
    position: 'absolute',
    marginBottom: 0,
    bottom: 49.5,
    alignItems: 'center',
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

export default ModalScreen;
