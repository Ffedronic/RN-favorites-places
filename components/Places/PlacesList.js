import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/color";
import { useNavigation } from "@react-navigation/native";

function PlacesList({ places }) {
  const navigation = useNavigation();

  function onSelectPlaceDetailsHandler(id) {
    navigation.navigate("PlaceDetails", { placeId: id });
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>
          No places added! - Start by adding one !
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(place) => place.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={onSelectPlaceDetailsHandler} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { margin: 24 },
  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallBackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
export default PlacesList;
