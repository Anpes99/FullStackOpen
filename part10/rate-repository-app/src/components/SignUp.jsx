import React from 'react';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';
import { CREATE_USER } from '../graphql/queries';
import { useMutation } from '@apollo/client';

const initialValues= {
    username:'',
    password:'',
    passwordConfirm:''
};

const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(1)
      .max(30)
      .required('username is required'),
    password: yup
      .string()
      .min(5)
      .max(50)
      .required('password is required'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null])
      .required('Password confirm is required')
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


export const SignUpContainer = ({onSubmit})=>{
  

    return (
    
      <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => 
          
          <View style={{alignItems:"center", flexGrow:1, marginTop:20}} >
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput  name="password" placeholder="Password" />
            <FormikTextInput  name="passwordConfirm" placeholder="Password again" />
            <Pressable  style={styles.submitButton} onPress={handleSubmit}>
              <Text style={{color:"white", fontWeight:"bold"}} >Sign Up</Text>
            </Pressable>
          </View>
    
        }
      </Formik>
    );
    };
    


const SignUp = ()=>{
    const [signIn] = useSignIn();
    const history = useHistory();

    const [ createUser, result ] = useMutation(CREATE_USER, {
        onError: (error) => {
          console.log(error);
        }
      });
  
    const onSubmit =async (values) =>{
      const { username, password} = values;
      try {
        await createUser({variables:{user:{username,password}}});
        console.log(result);
        await signIn({username, password});
        history.push(`/`);
        //const token = await authStorage.getAccessToken()
        //console.log(token);
        
      }
      catch(e){
        console.log(e);
      }
    };
  
    return (
  
      <SignUpContainer onSubmit={onSubmit} />
    );
}

export default SignUp