import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const SearchBar = ({ containerStyle, value, onClear, onChangeText }) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.searchBar}
        placeholder='Buscar..'
      />
      {value ? (
        <AntDesign
          name='close'
          size={20}
          color={"#131313"}
          onPress={onClear}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 0.5,
    borderColor: "#0006",
    height: 40,
    width:370,
    borderRadius: 30,
    paddingLeft: 15,
    fontSize: 15,
    marginTop: 10,
    marginLeft:20,
    marginRight:20,
    backgroundColor: "#fff",
    marginBottom: 10
    
  },
  container: {
  
   
  },
  clearIcon: {
    position: 'absolute',
    right: 
    30,
    marginTop:30
    
  },
});

export default SearchBar;
