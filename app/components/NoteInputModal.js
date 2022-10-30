import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
} from 'react-native';

import RoundIconBtn from './RoundIconBtn';

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
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

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim() && !desc2.trim() && !desc3.trim()) return onClose();

    if (isEdit) {
      onSubmit(title, desc, desc2, desc3, Date.now());
    } else {
      onSubmit(title, desc, desc2, desc3);
      setTitle('');
      setDesc('');
      setDesc2('');
      setDesc3('');
    }
    onClose();
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
    <>

      <Modal visible={visible} animationType='fade'  >
        <View style={styles.container}>

          <View style={styles.Header} >

            <TouchableOpacity style={styles.returnBtn} onPress={closeModal} >
              <Ionicons name='arrow-back' size={25} />
            </TouchableOpacity>

            <Text style={styles.TextTop} >Adicionar Novo Animal</Text>

          </View>


          <TextInput
            value={title}
            onChangeText={text => handleOnChangeText(text, 'title')}
            placeholder='Nome/identificador'
            style={[styles.input, styles.title]}
          />

          <View style={styles.Arearow} >
            <TextInput
              value={desc}
              multiline
              placeholder='idade'
              style={[styles.input, styles.desc]}
              onChangeText={text => handleOnChangeText(text, 'desc')}
            />
            <TextInput
              value={desc2}
              multiline
              placeholder='peso'
              style={[styles.input, styles.desc]}
              onChangeText={text => handleOnChangeText(text, 'desc2')}
            />
          </View>
          <TextInput
            value={desc3}
            multiline
            placeholder='espécie'
            style={[styles.input, styles.desc]}
            onChangeText={text => handleOnChangeText(text, 'desc3')}
          />


      {title.trim() || desc.trim() ? (
          <View style={styles.btnContainer}>
            <RoundIconBtn
              size={15}
              antIconName='check'
              onPress={handleSubmit}
            />
          </View>
           ) : null}

        
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
        </View>
      </Modal>
  
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"


  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#0002",
    fontSize: 17,
    color: "#131313",
  },
  title: {
    height: 40,
    marginBottom: 0,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  desc: {
    height: 70,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
    marginTop: 20
  },
  Header: {
    height: 59,
    width: "100%",
    backgroundColor: "#29cd6c",
    borderBottomWidth: 1,
    borderBottomColor: "#0002"
  },
  TextTop: {
    fontSize: 18,
    marginLeft: 70,
    marginTop: 15,
    fontWeight: "bold"
  },
  Arearow: {
    flexDirection: "row"
  },
  returnBtn: {
    width: 40,
    left: 20,
    top: 15,
    position: "absolute",

  }
});

export default NoteInputModal;
