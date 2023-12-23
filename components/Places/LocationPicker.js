import React, { useEffect, useState } from "react";
import {
  useForegroundPermissions,
  PermissionStatus,
  getCurrentPositionAsync,
} from "expo-location";
import { StyleSheet, View, Text, Image } from "react-native";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

import OutlineButton from "../../UI/OutlineButton";
import { Colors } from "../../constants/color";
import { getMapPreview, getAdress } from "../../util/location";

/**
 * The LocationPicker function is a React component that allows the user to either locate their current
 * position or pick a location on a map.
 * @returns The LocationPicker component is returning a View component that contains a map preview, as
 * well as two buttons for locating the user and picking a location on the map.
 */
function LocationPicker({ saveLocationHandler }) {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

/* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
effect is triggered whenever the `route` or `isFocused` variables change and save a location that has been picked by the user on the map screen. */
  useEffect(() => {
    async function isFocusedLocation() {
      if (isFocused && route.params) {
        const mapPickedLocation = {
          lat: route.params.pickedLat,
          lng: route.params.pickedLng,
        };
        const readabledAdress = await getAdress(mapPickedLocation);

        setPickedLocation(mapPickedLocation);
        saveLocationHandler({ ...mapPickedLocation, address: readabledAdress });
      }
    }

    isFocusedLocation();
  }, [route, isFocused]);

  const [pickedLocation, setPickedLocation] = useState(null);
  const [locationPermission, requestPermission] = useForegroundPermissions();

  /**
   * The function checks the status of location permission and requests it if it is undetermined,
   * displays an alert if it is denied, and returns true if it is granted.
   * @returns The function `verifyPermission` returns a boolean value. It returns `true` if the
   * location permission status is either `UNDETERMINED` or `GRANTED`. It returns `false` if the
   * location permission status is `DENIED`.
   */
  async function verifyPermission() {
    if (locationPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permission needed",
        "The app needs to access your camera to let you share them with your friends."
      );
      return false;
    }

    return true;
  }

 /**
  * The `locateUserHandler` function is an asynchronous function that requests permission from the
  * user, retrieves the current position, sets the picked location with latitude and longitude
  * coordinates, gets the readable address based on the coordinates, and saves the location with the
  * address.
  * @returns The function `locateUserHandler` returns nothing.
  */
  async function locateUserHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const result = await getCurrentPositionAsync({});

    setPickedLocation({
      lat: result.coords.latitude,
      lng: result.coords.longitude,
    });

    const readabledAdress = await getAdress({
      lat: result.coords.latitude,
      lng: result.coords.longitude,
    });
    saveLocationHandler({
      lat: result.coords.latitude,
      lng: result.coords.longitude,
      address: readabledAdress,
    });
  }

  /**
   * The function "pickOnMapHandler" navigates to the "Map" screen.
   */
  async function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No Location taken yet.</Text>;

 /* This code block is checking if a location has been picked by the user. If a location has been
 picked (`pickedLocation` is not null), it logs the map preview URL to the console and sets the
 `locationPreview` variable to an `<Image>` component with the source set to the map preview URL.
 The map preview is displayed in the component with the `styles.mapImage` style. */
  if (pickedLocation) {
    console.log(getMapPreview(pickedLocation.lat, pickedLocation.lng));
    locationPreview = (
      <Image
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
        style={styles.mapImage}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlineButton icon={"location"} onPress={locateUserHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon={"map"} onPress={pickOnMapHandler}>
          Pick On Map
        </OutlineButton>
      </View>
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
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});
export default LocationPicker;
