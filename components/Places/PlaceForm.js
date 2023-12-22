import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import { Text, View } from "react-native";
import { Colors } from "../../constants/color";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../../UI/Button";

function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredLocation, setEnteredLocation] = useState();
  const [capturedImage, setCapturedImage] = useState();

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function saveEnteredLocationHandler(location) {
    setEnteredLocation(location);
  }

  function saveCapturedImageHandler(image) {
    setCapturedImage(image);
  }

  function saveFavoritePlace() {
    console.log({
      title: enteredTitle,
      location: enteredLocation,
      imageUri: capturedImage,
    });
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker captureImageHandler={saveCapturedImageHandler} />
      <LocationPicker saveLocationHandler={saveEnteredLocationHandler} />
      {enteredLocation && enteredTitle && capturedImage && (
        <Button onPress={saveFavoritePlace} >Add Place</Button>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
export default PlaceForm;
