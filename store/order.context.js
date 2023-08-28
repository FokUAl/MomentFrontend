import {createContext, useState} from 'react';

export const OrderStateContext = createContext();

export const OrderStateProvider = props => {
  const [order, setOrder] = useState({
    price: null,
    departureDate: null,
    departureTime: null,
    description: null,
    passengerName: null,
    addressFrom: null,
    addressTo: null,
    phoneNumber: null,
  });
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <OrderStateContext.Provider
      value={{
        order,
        setOrder,
        modalVisible,
        setModalVisible,
      }}>
      {props.children}
    </OrderStateContext.Provider>
  );
};
