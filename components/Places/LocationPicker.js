import React, { useState } from "react";
import {
  useForegroundPermissions,
  PermissionStatus,
  getCurrentPositionAsync,
} from "expo-location";
import { StyleSheet, View, Text, Image } from "react-native";
import OutlineButton from "../../UI/OutlineButton";
import { Colors } from "../../constants/color";
import getMapPreview from "../../util/location";

function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState(null);
  const [locationPermission, requestPermission] = useForegroundPermissions();

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
  }

  async function pickOnMapHandler() {}

  let locationPreview = <Text>No Location taken yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
        style={styles.map}
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
  map: {
    width: "100%",
    height: "100%",
  },
});
export default LocationPicker;