import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';


const Note = ({ item, onPress }) => {
  const { Title, desc , desc2 , desc3 } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title} >
        {Title}
      </Text>
      <Text style={styles.subtitle} > idade:  <Text style={styles.descText}> {desc}</Text> </Text> 
      
      <Text  style={styles.subtitle}> peso: <Text style={styles.descText}> {desc2}</Text> </Text>
      <Text  style={styles.subtitle} > espécie:<Text style={styles.descText}> {desc3}</Text> </Text> 
      
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0001",
    width: 360,
    height:130,
    padding: 8,
    borderRadius: 10,
    marginTop: 10,
   
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: "#161616",
    marginLeft:130,
    marginBottom: 5,
    marginTop: 10

  },
  subtitle:{
    color: "#0009"
  },
  descText:{
    fontWeight: 'bold',



  }
});

export default Note;
