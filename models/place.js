class Place {
  constructor(title, imageUri, adress, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.adress = adress;
    this.location = location;
    this.id = new Date().toString() + Math.random().toString();
  }
}
