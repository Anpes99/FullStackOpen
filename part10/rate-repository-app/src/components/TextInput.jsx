
import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  
});

const TextInput = ({testID, style, error, ...props }) => {
  const textInputStyle = [style];

  return <NativeTextInput  testID={testID} style={textInputStyle} {...props} />;
};

export default TextInput;