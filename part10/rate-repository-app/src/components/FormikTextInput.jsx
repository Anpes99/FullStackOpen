
import React from 'react';
import { StyleSheet,View } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';



const FormikTextInput = ({multiline, testID, name, ...props }) => {
  const [field, meta, helpers] = useField(name);	// useField has to be under Formik component to work
  const showError = meta.touched && meta.error;


  const styles = StyleSheet.create({
    errorText: {
      color:'#d73a4a',
      alignSelf:"flex-start",
      marginBottom:9
    },
    TextInput:{
        borderStyle:"solid",
        borderWidth:2,
        borderColor: showError ? '#d73a4a' : "#D2D2D2",
        padding:5,
        paddingLeft:10,
        borderRadius:5,
        flexGrow:1,
        marginBottom:5
    }
  });



  return (
    <View style={{flexDirection:'row'}} >

    <View style={{width:330, margin:7}} >
      <TextInput
      multiline={multiline}
        testID={testID}
      style={styles.TextInput}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
      </View>
      
      </View>
  );
};

export default FormikTextInput;