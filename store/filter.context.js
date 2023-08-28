import {createContext, useState} from 'react';

export const FilterStateContext = createContext();

export const FilterStateProvider = props => {
  const [filterConfigurations, setFilterConfigurations] = useState({
    priceStart: undefined,
    date: undefined,
    timeStart: undefined,
    timeEnd: undefined,
    isMail: false,
    isSearching: false,
    openDate: false,
    openTimeStart: false,
    openTimeEnd: false,
    isSearchDelay: false,
  });

  return (
    <FilterStateContext.Provider
      value={{
        filterConfigurations,
        setFilterConfigurations,
      }}>
      {props.children}
    </FilterStateContext.Provider>
  );
};
