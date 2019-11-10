import { data } from 'mock_data';


export default function fetchPhoto(photoID) {
    return new Promise((resolve, reject) => {
        resolve(data.photo_url);
    })
}