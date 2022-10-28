import React from 'react';
import {  StyleSheet, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const RoundIconBtn = ({ antIconName, size, style, onPress }) => {
  return (
    <AntDesign
      name={antIconName}
      size={size || 24}
      color={"#fff"}
      style={[styles.icon, { ...style }]}
      onPress={onPress}
    />
      
    
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "#29cd6c",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  
  
  },
});

export default RoundIconBtn;
