import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database/database";

function AddPlaces({ navigation }) {
  async function onCreatePlaceHandler(placeData) {
    await insertPlace(placeData)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    navigation.navigate("AllPlaces");
  }

  return <PlaceForm onCreatePlace={onCreatePlaceHandler} />;
}

export default AddPlaces;
