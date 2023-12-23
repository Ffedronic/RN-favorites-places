import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import { Text, View } from "react-native";
import { Colors } from "../../constants/color";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../../UI/Button";
import { Place } from "../../models/place";

/**
 * The PlaceForm function is a component that renders a form for creating a new place, including fields
 * for title, image, and location.
 * @returns The PlaceForm component is returning a ScrollView component that contains a form for
 * entering and saving information about a place. The form includes a TextInput for entering a title,
 * an ImagePicker component for capturing and saving an image, and a LocationPicker component for
 * selecting and saving a location. If all the required information (enteredTitle, capturedImage, and
 * enteredLocation) is present, a Button component is rendered that
 */
function PlaceForm({ onCreatePlace }) {

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
    const placeData = new Place(enteredTitle, capturedImage, enteredLocation);
    onCreatePlace(placeData);
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
        <Button onPress={saveFavoritePlace}>Add Place</Button>
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
