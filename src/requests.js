
export function fetchPhoto(photoID) {
    let url = '/api/photo?id=' + photoID;
    return (
        fetch(url)
        .then(response => {
            return response.blob();
        })
        .then(image => {
            let image_url = URL.createObjectURL(image);
            // console.log("photo: " + image_url);
            return image_url;
        })
    )
}

export function getPlaceDetails(placeID) {
    let url = "/api/place-details?place_id=" + placeID;
    return (
        fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error("Error: status code " + response.status);
            }
        })
        .then(result => {
            return result;
        })
        .catch(error => {
            console.log(error);
            return {};
        })
    )
}

export function getNearByEstablishments(queryString) {
    let url = '/api/nearby-establishments?' + queryString;
    return (
        fetch(url)
        .then(response => { 
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error("Error: status code " + response.status);
            }
        })
        .then(result => {
            console.log("result: " + result);
            return result;
        })
        .catch(error => {
            console.log("error caught: " + error);
            return {};
        })
    )
}