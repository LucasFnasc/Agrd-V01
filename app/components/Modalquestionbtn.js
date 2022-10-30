import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Modal,
  Keyboard,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';



const ModalquestioBtn = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [desc2, setDesc2] = useState('');
  const [desc3, setDesc3] = useState('');

  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(note.Title);
      setDesc(note.desc);
      setDesc2(note.desc2);
      setDesc3(note.desc3);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'desc') setDesc(text);
    if (valueFor === 'desc2') setDesc2(text);
    if (valueFor === 'desc3') setDesc3(text);

  };

 

  const closeModal = () => {
    if (!isEdit) {
      setTitle('');
      setDesc('');
      setDesc2('');
      setDesc3('');
    }
    onClose();
  };

  return (
   
      <Modal visible={visible} animationType='fade'
      transparent={true}  >
        <View 
        style={styles.modalView}
        > 

          <TouchableOpacity style={styles.returnBtn} onPress={closeModal} >
              <Ionicons name='close' size={25} />
            </TouchableOpacity>

            <Text style={ styles.textTitle} >
                Sobre o App
            </Text>

            <Text style={styles.subtitleText} >
                Registre dados dos animais de sua propriedade.

            </Text>
            <Text style={styles.subtitleText} >
                filtre os resultados! 
            </Text>


        </View>
      </Modal>
      
    
  );
};

const styles = StyleSheet.create({

    container: {
      
      

    },
  returnBtn: {
    top: 15,
    left: 255

  },
  modalView:{
    backgroundColor: '#f7f8ff',
    width: 300,
    height: 300,
    alignContent: 'center',
    alignSelf: 'center',
    margin: 100,
    borderRadius: 30,
    elevation: 5
  },
  textTitle:{
    fontSize: 18,
    margin: 10,
    fontWeight: 'bold'
  },
  subtitleText:{
    fontSize: 14,
    margin: 10
  }
});

export default ModalquestioBtn;
