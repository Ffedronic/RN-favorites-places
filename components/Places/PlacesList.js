import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";

function PlacesList({ places }) {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>No places added! - Start by adding one !</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(place) => place.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  );
}

const styles = StyleSheet.create({
  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallBackText:{
    fontSize: 16
  }
});
export default PlacesList;
