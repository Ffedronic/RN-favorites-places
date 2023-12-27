import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../UI/IconButton";
import { Colors } from "../constants/color";

/**
 * The `Map` function is a JavaScript component that renders a map view with the ability to select and
 * save a location.
 * @returns The `Map` component returns a `View` component containing a `MapView` component. The
 * `MapView` component is responsible for rendering a map with the specified initial region and user
 * location. It also allows the user to select a location on the map by tapping on it, and displays a
 * marker at the selected location if one has been chosen. The `View` component has a flex of 1
 */
function Map({ route }) {
  const navigation = useNavigation();

  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  let region = {
    latitude: initialLocation ? initialLocation.lat : 46.227638,
    longitude: initialLocation ? initialLocation.lng : 2.213749,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  /* The `useLayoutEffect` hook is used to perform side effects after the component has rendered and the
layout has been updated. In this case, it is used to set the options for the navigation header, a button icon allowing you to save a picked location on the map screen. */
  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon={"save"}
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  /**
   * The function `selectLocationHandler` takes an event object and extracts the latitude and longitude
   * coordinates from it, then sets the selected location using those coordinates.
   * @param event - The event parameter is an object that contains information about the event that
   * triggered the function. In this case, it is an event related to selecting a location on a map. The
   * event object has a property called `nativeEvent` which contains information specific to the native
   * platform (e.g., iOS or Android
   */
  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, lng: lng });
  }

  /**
   * The function saves the picked location and navigates to the "AddPlace" screen with the latitude and
   * longitude of the selected location.
   * @returns nothing (undefined).
   */
  function savePickedLocationHandler() {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked",
        "you have to pick a location by tapping the map."
      );
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width: "100%", height: "100%" }}
        initialRegion={region}
        onPress={selectLocationHandler}
        showsUserLocation={true}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
            title="test"
            description="test"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    marginVertical: 8,
    height: 200,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: Colors.primary100,
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});
export default Map;
