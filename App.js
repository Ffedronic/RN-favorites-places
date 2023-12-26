import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPlaces from "./screens/AddPlaces";
import { NavigationContainer } from "@react-navigation/native";
import AllPlaces from "./screens/AllPlaces";
import PlaceDetails from "./screens/PlaceDetails";
import Map from "./screens/Map";
import IconButton from "./UI/IconButton";
import { Colors } from "./constants/color";
import { useEffect, useState } from "react";
import { init } from "./util/database/database";
import AppLoading from "expo-app-loading";

export default function App() {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon={"add"}
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlaces}
            options={{
              title: "Add A New Place",
            }}
          />
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
