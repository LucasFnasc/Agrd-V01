import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert, Touchable, TouchableOpacity } from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../contexts/NoteProvider';
import NoteInputModal from './NoteInputModal';
import { AntDesign } from '@expo/vector-icons';

const formatDate = ms => {



  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const NoteDetail = props => {

  const [ note , setNote ] = useState( props.route.params.note)
  const {setNotes} = useNotes()
  const [showModal,  setModal ] = useState(false)
  const [isEdit , setIsEdit] = useState(false)
  
  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => n.id !== note.id);
    setNotes(newNotes)
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      'Deseja Excluir dados Sobre o animal ?',
      '',
      [
        {
          text: 'Excluir ',
          onPress: deleteNote,
        },
        {
          text: 'Cancelar ',
          onPress: () => console.log('Cancelar'),
        },
      ],
      {
        cancelable: true,
      }
    );
  };
  const handleUpdate = async ( Title, desc , desc2 ,  desc3) => {
    const result = await AsyncStorage.getItem('notes')
    let notes = [];
    if ( result !== null ) notes = JSON.parse(result)

   const newNotes = notes.filter( n => {
      if(n.id === note.id){
        n.Title = Title 
        n.desc = desc 
        n.desc2 = desc2
        n.desc3 = desc3
        n.isUpdated = true

        setNote(n)
      }
      return n;
    })
    setNotes (newNotes)
    await AsyncStorage.setItem('notes' , JSON.stringify(newNotes))
  }
  const handleOnclose = () => setModal(false)

  const openEditModal = () => {
    setIsEdit(true)
    setModal(true)
  }

 
  return (
    <>
    <ScrollView contentContainerStyle={[styles.container]}>
      <View style={styles.HeaderView} >
      <Text style={styles.title}>{note.Title}</Text>
      <View  style={styles.btnContainer}  >
       <TouchableOpacity  onPress={displayDeleteAlert}>
         <AntDesign name='delete'  size={20} />
       </TouchableOpacity>
     </View>

      </View>


      <View style={styles.srtView} >
      <Text  style={styles.time} >{`${formatDate(note.time)}`}</Text>
     
     <Text  style={styles.desc} > Idade: {note.desc}</Text>
     <Text  style={styles.desc} > Peso: {note.desc2}</Text>
     <Text  style={styles.desc} > especie: {note.desc3}</Text>

     </View>


      

     

      </ScrollView>

       
     <View  style={styles.btnContainer2}  >
       <TouchableOpacity  onPress={openEditModal} >
         <AntDesign name='edit'  size={20} />
       </TouchableOpacity>
     </View>
    <NoteInputModal  isEdit={isEdit} note={note} onClose={handleOnclose} onSubmit= {handleUpdate }  visible={showModal}
    />
     </>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
  
  
  },
  title: {
    fontSize: 18,
    color: "#151515",
    fontWeight: 'bold',
    marginLeft:70,
    marginTop:46
  },
  desc: {
    fontSize: 20,
    opacity: 0.7,
    marginLeft: 10,
    padding: 10
  },
  time: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
    marginRight:10
  },
  btnContainer: {
    alignItems:'center',
    justifyContent:'center',
    position: 'absolute',
    right: 25,
    bottom: 1,
    width:50,
    height:50,
    backgroundColor: "#29cd6c",
    borderRadius:40,
    marginBottom: 5,
    top: 39
  
    
  },
  btnContainer2: {
    alignItems:'center',
    justifyContent:'center',
    alignContent:"center",
    position: 'absolute',
    right: 30,
    bottom: 100,
    width:50,
    height:50,
    backgroundColor: "#29cd6c",
    borderRadius:40,
    elevation:3
   },
    
  btnStyle : {
    marginBottom: 20
  },
  HeaderView:{
    height:90,
    width:"100%",
    backgroundColor: "#29cd6c",
    borderBottomWidth:1,
    borderBottomColor: "#0002"
  },
  srtView:{ 
    width:  350,
    height: 350,
    backgroundColor: "#0001",
    margin: 20,
    borderRadius: 10
  }
});

export default NoteDetail;
