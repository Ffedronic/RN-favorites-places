import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import { Colors } from "../constants/color";
import { fetchPlaceDetails } from "../util/database/database";

function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();

  function showOnMapHandler({ lat, lng }) {
    navigation.navigate("Map", { initialLat: lat, initialLng: lng });
  }
  
  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
    }
    loadPlaceData();
  }, [selectedPlaceId]);

  if (fetchedPlace) {
    return (
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
        <View style={styles.locationContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{fetchedPlace.address}</Text>
          </View>
          <OutlineButton
            icon={"map"}
            onPress={showOnMapHandler.bind(this, {
              lat: fetchedPlace.lat,
              lng: fetchedPlace.lng,
            })}
          >
            View On Map
          </OutlineButton>
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
