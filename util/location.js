import { API_KEY } from "@env";

export  function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:P%7C${lat},${lng}&key=${API_KEY}`;
  return imagePreviewUrl;
}

export async function getAdress({lat, lng}) {
  const requestURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
  const response = await fetch(requestURL)
  if(!response.ok){
    throw new Error("failed to fetch adress")
  }

  const data = await response.json()

  const readabledAdress = data.results[0].formatted_address 

  return readabledAdress
}
