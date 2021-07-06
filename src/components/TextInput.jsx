import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 50,
    margin: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'grey',
  },
});

// eslint-disable-next-line no-unused-vars
const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
