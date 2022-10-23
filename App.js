import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  useEffect(() => {

    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('Notes')
        console.log("i am string ", jsonValue);
        jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log(jsonValue);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, [])

  const [value, setvalue] = useState("");
  const [textArray, setTextArray] = useState([]);
  const [red, setRed] = useState(null)
  const d = new Date();
  let time = d.getTime();
  const renderItem = ({ item }) => (
    <View View style={{ display: 'flex', flexDirection: "row", width: windowWidth, paddingVertical: 5 }}>
      <Text style={{ width: windowWidth / 2, textAlign: "center" }}>{item.message}</Text>
      <TouchableOpacity style={[styles.DeleteBtn, { textAlign: "center" }]} onPress={deleteItemById(item.id)} ><Text style={styles.DeleteText}>Delete</Text></TouchableOpacity>

    </View >
  );
  const sendMessage = async () => {
    if (value == "") {
      console.log("please write something");
    }
    else {
      const messageObject = {
        message: value,
        id: time
      }
      setRed(messageObject.id)
      setTextArray([messageObject, ...textArray]);
      console.log(textArray);
      try {
        const jsonValue = JSON.stringify(textArray)
        await AsyncStorage.setItem('Notes', jsonValue)
        console.log(jsonValue);
      } catch (e) {
        console.log(e);
      }
    }
  }
  const deleteItemById = id => () => {
    console.log("hello");
    console.log(id);
    const filteredData = textArray.filter(item => item.id !== id);
    setTextArray(filteredData);
    // const value = await AsyncStorage.getItem('Notes')
  }
  return (
    <View style={styles.WholeScreen}>
      <View style={styles.AppHeader}>
        <Text style={styles.AppHeaderText}>Toddies</Text>
      </View>
      <View>
        <TextInput
          style={styles.NotesInput}
          placeholder='Enter your notes here'
          placeholderTextColor="black"
          onChangeText={(value) => { setvalue(value) }}
        />
      </View>
      <TouchableOpacity style={styles.AddNotesbtn} onPress={sendMessage}>
        <Text style={styles.AddNotesbtnText}>Add</Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.SavedNotesBox}>
          <Text style={styles.SavedNotesBoxText}>Your Saved Notes</Text>
        </View>
        <View style={styles.OperationView}>
          <Text style={styles.OperationViewText}>Notes</Text>
          <Text style={styles.OperationViewText}>Action</Text>
        </View>
        <View>
          <FlatList
            data={[...textArray]}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  WholeScreen: {
    height: windowHeight,
  },
  AppHeader: {
    // borderWidth: 1,
    marginVertical: 10,

  },
  AppHeaderText: {
    fontSize: 30,
    color: "black",
    textAlign: "center",
    fontFamily: "monospace"
  },
  NotesInput: {
    borderWidth: 2,
    height: windowHeight / 5,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    backgroundColor: "lightgrey"
  },
  AddNotesbtn: {
    // width: windowWidth,
    borderWidth: 0.5,
    marginHorizontal: 30,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#e68932",
    paddingVertical: 5
  },
  AddNotesbtnText: {
    fontSize: 25,
    color: 'black',
    fontWeight: "700",
    textAlign: "center",
    color: "white"
  },
  OperationView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  OperationViewText: {
    color: "black",
    fontSize: 20,
    marginVertical: 10,
    // borderWidth: 1
  },
  SavedNotesBox: {
    // borderWidth: 1,
    marginTop: 50,
    marginHorizontal: 25
  },
  SavedNotesBoxText: {
    fontSize: 25,
    color: "darkorange"
  },
  DeleteBtn: {
    borderWidth: 1,
    backgroundColor: "red",
    borderRadius: 10,
    marginLeft: 55
  },
  DeleteText: {
    color: 'white',
    textAlign: "center",
    paddingVertical: 3,
    paddingHorizontal: 10,
  }
});

export default App;
