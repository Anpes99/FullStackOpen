import { AUTHORIZED_USER } from "../graphql/queries";
import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useLazyQuery } from "@apollo/client";
import { GET_REPOSITORY, GET_REVIEWS } from "../graphql/queries";
import { useParams } from "react-router-native";
import { useEffect } from "react/cjs/react.development";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const styles = StyleSheet.create({
    ReviewItemContainer:{

    },
    ReviewItemRowA:{
        flexDirection:'row',
        marginTop:10

    },
    ReviewItemRowB:{
        flexDirection:'row',
        marginBottom:10
    },
    ReviewItemRowA_colA:{
        width:75,
        justifyContent:'center',
        alignItems:'center'
    },
    ReviewItemRowA_colB:{

    },
    ReviewItemRowB_colA:{
        width:75
    },
    ReviewItemRowB_colB:{
        maxWidth:300
    },
    separator: {
        height: 10,
        backgroundColor:"#F5F5F5"
      },
      ratingCircle:{
          padding:1,
          borderColor:'blue',
          borderStyle:'solid',
          borderWidth:2,
          borderRadius:45/2,
          width:45,
          height:45,
          justifyContent:'center',
          alignItems:'center',
          color:'blue'
          
      },
      ratingText:{
          color:'blue',
          fontWeight:theme.fontWeights.bold
      },
      descriptionText:{
          fontStyle:theme.fonts.main,
          fontWeight:theme.fontWeights.normal,
          fontSize:theme.fontSizes.body
      },
      usernameText:{
        color:theme.colors.textPrimary,
        fontStyle:theme.fonts.main,
        fontWeight:theme.fontWeights.bold,
        fontSize:theme.fontSizes.body
      },
      dateText:{
          color:theme.colors.textSecondary,
          fontStyle:theme.fonts.main,
          fontWeight:theme.fontWeights.normal,
          fontSize:theme.fontSizes.body
      },
      fullNameText:{
        color:theme.colors.textPrimary,
        fontStyle:theme.fonts.main,
        fontWeight:theme.fontWeights.bold,
        fontSize:theme.fontSizes.body
      }
})
const ItemSeparator = () => <View style={styles.separator} />;

const formatTimeString = (time)=>{
    const date = new Date(time)
    return `${date.getUTCDay()+1}.${date.getUTCMonth()+1}.${date.getUTCFullYear()}`
}

const ReviewItem = ({review})=>{
    console.log(review)
    
        return(
    <View style={styles.ReviewItemContainer} >
            <View style={styles.ReviewItemRowA} >
                <View style={styles.ReviewItemRowA_colA} >
                    <View style={styles.ratingCircle} ><Text style={styles.ratingText} >{review.rating}</Text></View>
                </View>
                <View style={styles.ReviewItemRowA_colB} >
                    <Text style={styles.fullNameText} >{review.repository.fullName}</Text>
                    <Text style={styles.dateText} >{formatTimeString(review.createdAt)}</Text>
                </View>
            </View>
            <View style={styles.ReviewItemRowB} >
            <View style={styles.ReviewItemRowB_colA} ></View>
            <View style={styles.ReviewItemRowB_colB} >
                <Text style={styles.descriptionText} >{review.text}</Text>
            </View>
    
    
    
            </View>
    </View>
        )
    }

const userReviews = ()=>{




    
    const [getUserReviews, { data, error, loading }] = useLazyQuery(
        AUTHORIZED_USER,
        {
          fetchPolicy: "cache-and-network",
          // Other options
        }
      );
      useEffect(()=>{
        getUserReviews({variables: {includeReviews:true}});
      },[]);
    const reviews= loading ? []: data?.authorizedUser?.reviews.edges.map(edge=> edge.node)
    return (
      <FlatList
        data={reviews}
        renderItem={({ item} ) => <ReviewItem review={item} />}
        keyExtractor={({id}) => id}
        ItemSeparatorComponent={ItemSeparator}
      />
    );
}


export default userReviews