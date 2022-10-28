import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {createStackNavigator} from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native";

import Intro from "./app/screens/Intro";
import NoteScreen from "./app/screens/NoteScreen";
import NoteDetail from "./app/components/NoteDetail";
import NoteProvider from "./app/contexts/NoteProvider";

const stack = createStackNavigator ()

export default function App() {
  const [user, setUser ] = useState({})
  
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if (result !== null){
   setUser(JSON.parse(result))
  };
  }
  useEffect(() => {
    findUser();
 
  }, []);

  const REnderNoteScreen = (props) => <NoteScreen {...props} user={user}/>


  if(!user.name) return <Intro  onFinish={findUser}/>

  return(

    <NavigationContainer>


<NoteProvider>

  <stack.Navigator screenOptions={{headerTitle:'', headerTransparent:true}}  >
    <stack.Screen  component={REnderNoteScreen} name="NoteScreen" />
    <stack.Screen  component={NoteDetail} name="NoteDetail" />
  </stack.Navigator>
  </NoteProvider>
  </NavigationContainer>

  )
  
 
}