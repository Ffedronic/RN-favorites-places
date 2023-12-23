import PlaceForm from "../components/Places/PlaceForm";

function AddPlaces({ navigation }) {
  function onCreatePlaceHandler(placeData) {
    navigation.navigate("AllPlaces", { place: placeData });
  }

  return <PlaceForm onCreatePlace={onCreatePlaceHandler} />;
}

export default AddPlaces;
