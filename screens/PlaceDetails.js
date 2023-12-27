import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import { Colors } from "../constants/color";
import { deletePlace, fetchPlaceDetails } from "../util/database/database";

/**
 * The `PlaceDetails` function is a React component that displays the details of a place, including an
 * image, address, and buttons for viewing the place on a map and deleting the place.
 * @returns The function `PlaceDetails` returns a JSX element. If the `fetchedPlace` variable has a
 * value (i.e., if the place data has been fetched successfully), it returns a `ScrollView` component
 * with the details of the place, including an image, address, and two buttons for viewing the place on
 * a map and deleting the place. If the `fetchedPlace` variable is fals
 */
function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();

  /**
   * The function `showOnMapHandler` navigates to a map screen with the specified latitude and
   * longitude.
   */
  function showOnMapHandler({ lat, lng }) {
    navigation.navigate("Map", { initialLat: lat, initialLng: lng });
  }

  const selectedPlaceId = route.params.placeId;

  /* The `useEffect` hook is used to perform side effects in functional components. In this case, it is
  used to fetch the details of a place from the database and update the state with the fetched place
  data. */
  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
    }
    loadPlaceData();
  }, [selectedPlaceId]);

/**
 * The `onDeleteHandler` function deletes a place with the given `id` and navigates to the "AllPlaces"
 * screen.
 * @param id - The `id` parameter is the unique identifier of the place that needs to be deleted.
 */
  async function onDeleteHandler(id) {
    await deletePlace(id)
    navigation.navigate("AllPlaces")
  }

  /* The code block is a conditional rendering statement. It checks if the `fetchedPlace` variable has
  a value (i.e., if the place data has been fetched successfully). If `fetchedPlace` is truthy, it
  returns a ScrollView component with the details of the place, including an image, address, and two
  buttons for viewing the place on a map and deleting the place. */
  if (fetchedPlace) {
    return (
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
        <View style={styles.locationContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{fetchedPlace.address}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <OutlineButton
              icon={"map"}
              onPress={showOnMapHandler.bind(this, {
                lat: fetchedPlace.lat,
                lng: fetchedPlace.lng,
              })}
            >
              View On Map
            </OutlineButton>
            <OutlineButton
              icon={"trash"}
              onPress={onDeleteHandler.bind(this, selectedPlaceId)}
            >
              Delete
            </OutlineButton>
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View>
        <Text style={styles.address}>Loading Place Data...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default PlaceDetails;
