import { AntDesign, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useContext } from "react";
import {
  FlatList,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal
} from "react-native";

import Note from "../components/Note";
import NoteInputModal from "../components/NoteInputModal";
import ModalquestioBtn from "../components/Modalquestionbtn";
import NotFound from "../components/NotFound";
import SearchBar from "../components/SearchBar";
import { useNotes } from "../contexts/NoteProvider";

const NoteScreen = ({ user, navigation }) => {
  const [modalvisible, setmodalvisible] = useState(false);
  const { notes, setNotes, findNotes } = useNotes();
  const [searchQuery, setSearchQuery] = useState("");
  const [resultNotfund, setresultNotFund] = useState(false);
  const [modalvisible2, setmodalvisible2] = useState(false);

  useEffect(() => {}, []);

  const handleONsubmit = async (Title, desc, desc2, desc3) => {
    const note = {
      id: Date.now(),
      Title,
      desc,
      desc2,
      desc3,
      time: Date.now(),
    };
    const updatesNotes = [...notes, note];
    setNotes(updatesNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(updatesNotes));
    console.log(note);
  };

  const OpenNote = (note) => {
    navigation.navigate("NoteDetail", { note });
  };

  const handleSearchInput = async (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery("");
      setresultNotFund(false);
      return await findNotes();
    }
    const filternotes = notes.filter((note) => {
      if (note.Title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      };
      if (note.desc.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
      if (note.desc2.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }

      if (note.desc3.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }

    });

    if (filternotes.length) {
      setNotes([...filternotes]);
    } else {
      setresultNotFund(true);
    }
  };

  const handleonClear = async () => {
    setSearchQuery("");
    setresultNotFund(false);
    await findNotes();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={Styles.Container}>
          <View style={Styles.HeaderProfile}>
            <Text style={Styles.header}> Bem Vindo! {user.name}</Text>
            <TouchableOpacity  style={Styles.Questioniconbtn} 
             onPress={() => setmodalvisible2 (true)}>
            <AntDesign name="questioncircleo"  size={20} />
            </TouchableOpacity>
          </View>
          <Text style={Styles.TextTotais01}>Totais</Text>
          <View style={Styles.TotaisView}>
            <View style={Styles.viewAnimais}>
              <Text style={Styles.TextCardNun}>Animais                                                   {notes.length} </Text>
            </View>
          </View>

          <View style={Styles.FlatView}>
            {notes.length ? (
              <SearchBar
                value={searchQuery}
                onChangeText={handleSearchInput}
                onClear={handleonClear}
              />
            ) : null}

            {resultNotfund ? (
              <NotFound />
            ) : (
              <FlatList
                data={notes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Note onPress={() => OpenNote(item)} item={item} />
                )}
              />
            )}

            <TouchableOpacity
              style={Styles.TouchStylePlus}
              onPress={() => setmodalvisible(true)}
            >
              <AntDesign name="plus" size={24} />
            </TouchableOpacity>
          </View>

          {!notes.length ? (
            <View style={Styles.EmpitHeaderCintaiber}>
              <Text style={Styles.emptyHeader}>A</Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>

      <NoteInputModal
        visible={modalvisible}
        onClose={() => setmodalvisible(false)}
        onSubmit={handleONsubmit}
      />
      <ModalquestioBtn 
       visible={modalvisible2}
       onClose={() => setmodalvisible2(false)}
      />
    </>
  );
};

const Styles = StyleSheet.create({
  Container: {
    backgroundColor: "#29cd6c",
    flex: 1
  },
  header: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 50,
    marginLeft: 20,
    paddingBottom: 10,
    elevation:10
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    opacity: 0.2,
  },

  EmpitHeaderCintaiber: {
    justifyContent: "center",
    height: "80%",
    width: "100%",
    alignItems: "center",
  },
  TouchStylePlus: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "#29cd6c",
    borderRadius: 30,
    position: "absolute",
    elevation:5,
    right: 35,
    marginTop: 450,
  },
  HeaderProfile: {
    height: 90,
    width: "100%",
    backgroundColor: "#29cd6c",
    borderBottomWidth: 1,
    borderBottomColor: "#0002"
  },
  TotaisView: {
    height: 140,
    width: "100%",
    padding: 10,
    backgroundColor: "#29cd6c",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  TextTotais01: {
    fontSize: 17,
    marginLeft: 10,
    marginTop: 5,
  },
  ViewLotes: {
    width: 180,
    height: "100%",
    backgroundColor: "#FFF",
    padding: 10,
    marginright: 2,
    borderRadius: 30,
    marginRight: 2,
  },
  viewAnimais: {
    width: 350,
    height: 50,
    backgroundColor: "#FFF",
    padding: 10,
    marginright: 2,
    borderRadius: 30,
    marginLeft: 2,
  },
  TextCardNun: {
    fontSize: 17,
    marginTop: 2,
    fontWeight: "400"
  },
  TextNunCard: {
    marginLeft: 65,
    marginTop: 10,
    fontSize: 20,
   fontWeight: "bold"
  },
  FlatView: {
    height: 600,
    width: "100%",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    paddingBottom: 55
  },
  Questioniconbtn:{
    height: 30 ,
    width: 30,
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 50
  }
});

export default NoteScreen;
