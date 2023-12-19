import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function Place({ place, onSelect }) {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{uri: place.imageUri}} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.adress}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  
});
export default Place;
