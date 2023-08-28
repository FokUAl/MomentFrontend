function Theme(dark) {
  if (dark) {
    return {
      primary: '#141414',
      secondary: '#07bc67',
      third: '#222222',
      fourth: '#cfcfcf',
      border: '#e0e3e6',
      warning: '#F28181',
      input: '#424242',
      textInput: '#e0e3e6',
      button: '#1a1a1a',
      text: '#e0e3e6',
      buttonText: 'black',
      placeholder: '#afafaf',
    };
  } else {
    return {
      primary: '#f5f5f5',
      secondary: '#07bc67',
      third: '#f5f5f5',
      fourth: '#cfcfcf',
      border: 'black',
      warning: '#F28181',
      input: '#f5f5f5',
      textInput: 'black',
      button: '#07bc67',
      text: 'black',
      buttonText: 'black',
      placeholder: 'grey',
    };
  }
}

export default Theme;
//#1D5B79
