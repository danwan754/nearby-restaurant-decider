import { data } from 'mock_data';


export function fetchPhoto(photoID) {
    return new Promise((resolve, reject) => {
        resolve(data.photo_url);
    })
}


export function getPlaceDetails(placeID) {
    return new Promise((resolve, reject) => {
        resolve(data.place_details);
    })
}

export function getNearByEstablishments(stringQuery) {
    return new Promise((resolve, reject) => {
        resolve(data.place_ids);
    })
}