import React, {useContext} from 'react';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';
import { CREATE_REVIEW } from '../graphql/queries';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react/cjs/react.development';



const initialValues= {
    repoOwner:'',
    repoName:'',
    rating:'',
    review:''
};

const validationSchema = yup.object().shape({
    repoOwner: yup
      .string()
      .required('repository owner is required'),
    repoName: yup
      .string()
      .required('repository name is required'),
    rating: yup
      .number()
      .required('rating is required'),
    review: yup
      .string()
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


export const SubmitReviewContainer = ({onSubmit})=>{
  

    return (
    
      <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => 
          
          <View style={{alignItems:"center", flexGrow:1, marginTop:20}} >
            <FormikTextInput testID="submitReview-repoOwner" name="repoOwner" placeholder="Repository owner name" />
            <FormikTextInput testID="submitReview-repoName" name="repoName" placeholder="Repository name" />
            <FormikTextInput testID="submitReview-rating" name="rating" placeholder="Rating between 0 and 100" />
            <FormikTextInput multiline={true} testID="submitReview-review" name="review" placeholder="Review" />
            <Pressable testID='submitReview-submitButton' style={styles.submitButton} onPress={handleSubmit}>
              <Text style={{color:"white", fontWeight:"bold"}} >Create a Review</Text>
            </Pressable>
          </View>
    
        }
      </Formik>
    );
    };
    




    const SubmitReview = () => {
        const history = useHistory();
        const [ createReview, result ] = useMutation(CREATE_REVIEW, {
            fetchPolicy: 'cache-and-network',
            onError: (error) => {
              console.log(error);
            }
          });
      
        const onSubmit =async (values) =>{
          const { repoOwner, repoName, rating, review } = values;
          try {
            await createReview({variables:{review:{repositoryName:repoName,ownerName:repoOwner,rating:Number(rating),text:review}}});
            console.log(result);
            history.push(`/item/${result.data.createReview.repositoryId}`);
            //const token = await authStorage.getAccessToken()
            //console.log(token);
            
          }
          catch(e){
            console.log(e);
          }
        };
      
        return (
      
          <SubmitReviewContainer onSubmit={onSubmit} />
        );
      };

export default SubmitReview;