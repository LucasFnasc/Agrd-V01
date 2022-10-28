import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {  Image, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";

import RoundIconBtn from '../components/RoundIconBtn';


const Intro = ({onFinish}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const handleOnChangeText = text => setName(text);

  const handleSubmit = async () => {
    const user = { name: name };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    if(onFinish) onFinish()
   
  };

  return(

    <>
    <Image
       style={Styles.logoSt}
      source={require('../../assets/logo1.png')} />
  
    <View style={Styles.Container}>
      <Text style={Styles.inputTitle}>Nome</Text>
    <TextInput value={name}
          onChangeText={handleOnChangeText}
          
          style={Styles.textInput} />



    </View>  
    
    
    
     {name.trim().length >= 3 ? (
        <TouchableOpacity style={Styles.TouchableStyle} onPress={handleSubmit}>
            <Text style={Styles.TextEntrar} >Entrar</Text>
            </TouchableOpacity>
          
        ) : null}

    </>
  )
};

const Styles = StyleSheet.create({
  Container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  
  textInput: {
    borderWidth: 1,
    borderColor: "#161616",
    color: "#141414",
    width:300,
    height: 40,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 17,
    marginBottom: 30,
  },
  inputTitle: {
    alignSelf: 'flex-start',
    paddingLeft: 25,
    marginBottom: 2,
    opacity: 0.5,
  },
  TextEntrar:{
    fontSize: 20,
    marginTop:10
  },
  TouchableStyle:{
    width:200,
    height:50,
    backgroundColor:"#29cd6c",
    borderRadius:40,
    alignItems:'center',
    alignContent:'center',
    marginBottom:20,
    marginLeft:90
  },
  logoSt:{
    width:400,
    height:400,
    marginBottom:0
   
  }
});


export default Intro;