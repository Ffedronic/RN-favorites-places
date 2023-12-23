import PlaceForm from "../components/Places/PlaceForm";

function AddPlaces() {
  function onCreatePlace(placeData) {
    console.log(placeData);
  }

  return <PlaceForm onCreatePlace={onCreatePlace} />;
}

export default AddPlaces;
