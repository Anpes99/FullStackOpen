import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import LogOutButton from './LogOutButton';
import useAuthStorage from '../hooks/useAuthStorage';
import { useQuery } from '@apollo/client';
import { AUTHORIZED_USER } from '../graphql/queries';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    justifyContent:'center',
    height: 60,
    backgroundColor: theme.colors.AppBar,
  },
  columnA:{
      alignSelf:'flex-start',
    margin: 5
  },
  ScrollView:{
    flexDirection:"row",
    alignSelf:"center"
  }
  // ...
});

const LinkTab = ({toDest, linkText})=><View style={styles.columnA} >
    <Pressable  ><Link to={toDest} ><Text style={{color:'white'}}  >{linkText}</Text></Link></Pressable>
  </View>;
  

const AppBar = () => {
  const  result= useQuery(AUTHORIZED_USER);
  

  return (
  <View style={styles.container}>
    <ScrollView style={styles.ScrollView} horizontal>
      <LinkTab toDest={"/"} linkText={"Repositories"}  />
      <LinkTab toDest={"/createReview"} linkText={"Create a Review"}  />
      <LinkTab toDest={"/userReviews"} linkText={"My Reviews"}  />
      {result.loading ? null : result.data.authorizedUser ? <LogOutButton style={styles.columnA} /> : <><LinkTab toDest={"/login"} linkText={"login"}  /><LinkTab toDest={"/signUp"} linkText={"Sign Up"}  /></>}
        
        </ScrollView>
    </View>);
};

export default AppBar;