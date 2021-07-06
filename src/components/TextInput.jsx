import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 50,
    marginVertical: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'grey',
  },
  error: {
    borderColor: theme.colors.error,
  },
});

// eslint-disable-next-line no-unused-vars
const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, error && styles.error, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
