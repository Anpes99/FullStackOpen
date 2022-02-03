import React, {useContext} from "react";
import { View,Pressable,Text } from "react-native";
import useAuthStorage from "../hooks/useAuthStorage";
import { useHistory } from "react-router-native";
import { useApolloClient } from "@apollo/client";

const LogOutButton = ({style})=>{
    const authStorage = useAuthStorage();
    const history= useHistory();
    const apolloClient = useApolloClient();

    const logOut = async ()=>{
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
        history.push('/');
    };

    return(<View style={style} >
        <Pressable onPress={()=>logOut()}>
            <Text style={{color:'white'}}  >
                Sign Out
            </Text>
        </Pressable>
    </View>);
};

export default LogOutButton;