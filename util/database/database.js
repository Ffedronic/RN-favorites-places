import * as SQLite from "expo-sqlite";
import { Place } from "../../models/place";

const database = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL

    )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export async function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?,?,?,?,?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transactionObject) => {
      transactionObject.executeSql(
        "SELECT * FROM places",
        [],
        (_, result) => {
          let places = [];
          for (let element of result.rows._array) {
            const place = new Place(
              element.title,
              element.imageUri,
              {
                address: element.address,
                lat: element.lat,
                lng: element.lng,
              },
              element.id
            );
            places.push(place);
          }

          resolve(places);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transactionObject) => {
      transactionObject.executeSql(
        "SELECT * FROM places WHERE id= ?",
        [id],
        (_, result) => {
          resolve(result.rows._array[0]);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function deletePlace(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transactionObject) => {
      transactionObject.executeSql(
        "DELETE FROM places WHERE id = ?",
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise
}
