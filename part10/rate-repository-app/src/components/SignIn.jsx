import React, {useContext} from 'react';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';


const initialValues= {
    username:'',
    password:''
};

const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required'),
  });

const styles = StyleSheet.create({
    submitButton:{
        padding:10,
        borderRadius:5,
        width:350,
        margin:5,
        alignItems:"center",
        backgroundColor:"blue"
    }
  });




export const SignInContainer = ({onSubmit})=>{
  

return (

  <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
    {({ handleSubmit }) => 
      
      <View style={{alignItems:"center", flexGrow:1, marginTop:20}} >
        <FormikTextInput testID="signIn-username" name="username" placeholder="Username" />
        <FormikTextInput testID="signIn-password" name="password" placeholder="Password" />
        <Pressable testID='signIn-submitButton' style={styles.submitButton} onPress={handleSubmit}>
          <Text style={{color:"white", fontWeight:"bold"}} >Sign In</Text>
        </Pressable>
      </View>

    }
  </Formik>
);
};




const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit =async (values) =>{
    const { username, password } = values;
    
    try {
      const {data} = await signIn({username, password});
      console.log(data);
      history.push('/');
      //const token = await authStorage.getAccessToken()
      //console.log(token);
      
    }
    catch(e){
      console.log(e);
    }
  };

  return (

    <SignInContainer onSubmit={onSubmit} />
  );
};

export default SignIn;