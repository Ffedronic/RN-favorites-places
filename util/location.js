import { API_KEY } from "@env";

export default function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:P%7C${lat},${lng}&key=${API_KEY}`;
  return imagePreviewUrl;
}
