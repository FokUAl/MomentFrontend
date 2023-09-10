import {createContext, useState} from 'react';

export const AppStateContext = createContext();

export const AppStateProvider = props => {
  const [cityFrom, setCityFrom] = useState();
  const [cityTo, setCityTo] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [needUpdate, setNeedUpdate] = useState({need: false, link: undefined});
  const [darkTheme, setDarkTheme] = useState(false)
  const [offerTimer, setOfferTimer] = useState(false)
  return (
    <AppStateContext.Provider
      value={{
        cityFrom,
        cityTo,
        phoneNumber,
        setCityFrom,
        setCityTo,
        setPhoneNumber,
        needUpdate,
        setNeedUpdate,
        darkTheme,
        setDarkTheme,
        offerTimer,
        setOfferTimer
      }}>
      {props.children}
    </AppStateContext.Provider>
  );
};
