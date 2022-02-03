import React from "react";
import { View } from "react-native";
import { Switch, Route, Redirect } from "react-router-native";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import SingleRepository from "./SingleRepository";
import SubmitReview from "./SubmitReview";
import SignUp from "./SignUp";
import UserReviews from './UserReviews'

const Main = ()=>{


    return(
        <View style={{flexDirection:'row'}} >
            
            <Switch>
        <Route path="/createReview" >
        <SubmitReview/>
        </Route>
        <Route path="/userReviews" >
        <UserReviews/>
        </Route>
        <Route path="/signUp" >
        <SignUp/>
        </Route>
        <Route path="/item/:id" >
        <SingleRepository singleView={true} />
        </Route>
        <Route path="/login" >
        <SignIn/>
        </Route>
        <Route path="/" exact>
        <RepositoryList  />		
        </Route>
        <Redirect to="/" />
      </Switch>
        </View>
    );
};

export default Main;