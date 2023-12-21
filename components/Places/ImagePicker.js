import { useState } from "react";
import { Image, View, Alert, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

import { Colors } from "../../constants/color";
import OutlineButton from "../../UI/OutlineButton";

export default function ImagePicker() {
  const [cameraPermission, requestPermission] = useCameraPermissions();

  async function verifyPermission() {
    if (cameraPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permission needed",
        "The app needs to access your camera to let you share them with your friends."
      );
      return false;
    }

    return true;
  }

  const [image, setImage] = useState(null);

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  let imagePreview = <Text style={styles.text}>No image taken yet.</Text>;

  if (image) {
    imagePreview = <Image source={{ uri: image }} style={styles.image} />;
  }
  
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlineButton icon={"camera"} onPress={takeImageHandler}>
        Take Image
      </OutlineButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    marginVertical: 8,
    height: 200,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: Colors.primary100,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {},
});
