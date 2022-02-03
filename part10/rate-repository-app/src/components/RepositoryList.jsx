import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Link } from 'react-router-native';
import {Picker} from '@react-native-picker/picker';
import { TextInput } from 'react-native';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor:"#F5F5F5"
  },
  searchBar:{
    width:40
  }
  
});



const ItemSeparator = () => <View style={styles.separator} />;


export const RepositoryListContainer = ({ repositories , onEndReach}) => {

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
<FlatList
      testID='RepositoryListContainer'
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      // other props
      renderItem={({ item }) => (
          <Link to={`/item/${item.id}`} ><RepositoryItem item={item} /></Link> 
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={1.5}
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading, refetch } = useRepositories();
  const [orderBy, setOrderBy] = useState('CREATED_AT')
  const [orderDirection, setOrderDirection] = useState('ASC')
  const [searchWord, setSearchWord] = useState('')
  const [deBouncedSearchWord] = useDebounce(searchWord, 500);

  const onEndReach = () => {
    console.log('You have reached the end of the list');
  };

  useEffect(()=>{
  refetch(orderBy, orderDirection, deBouncedSearchWord)
  },[deBouncedSearchWord])

  return <div>



    <div style={{
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-evenly',
    height:100,
    alignSelf:'stretch',
    alignItems:'center',
  }}>
    <TextInput style={{backgroundColor:'white', borderStyle:"solid", borderColor:'grey', borderWidth:2, borderRadius:5}} onChange={(event)=>{
  setSearchWord(event.target.value)}} />
    <Picker
  selectedValue={orderBy}
  onValueChange={(itemValue, itemIndex) =>{
     setOrderBy(itemValue)
     refetch(itemValue, orderDirection, searchWord) 
  }
  }>
  <Picker.Item label="Date" value="CREATED_AT" />
  <Picker.Item label="Rating" value="RATING_AVERAGE" />
</Picker>
    <Picker
  selectedValue={orderDirection}
  onValueChange={(itemValue, itemIndex) =>{
     setOrderDirection(itemValue);
     refetch(orderBy, itemValue, searchWord); 
  }
  }>
  <Picker.Item label="Lowest to highest" value="ASC" />
  <Picker.Item label="Highest to to lowest" value="DESC" />
</Picker>

    </div>
    
    
    
    
    <RepositoryListContainer repositories={repositories} onEndReach={onEndReach}/></div>;
};


export default RepositoryList;
