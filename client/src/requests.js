
export function fetchPhoto(photoID) {
    let url = '/api/photo?id=' + photoID;
    return (
        fetch(url)
        .then(response => {
            return response.blob();
        })
        .then(image => {
            let image_url = URL.createObjectURL(image);
            return image_url;
        })
        .catch(error => {
            throw new Error(error);
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
                // console.error(response.status + ": " + response.statusText);
                throw new Error("Sorry, something went wrong. Please try again.");
            }
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error + "; " + data.error_message);
            }
            return data;
        })
        .catch(error => {
            throw error;
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
                // console.error(response.status + ": " + response.statusText);
                throw new Error("Sorry, something went wrong. Please try again.");
            }
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error + "; " + data.error_message);
            }
            return data;
        })
        .catch(error => {
            throw error;
        })
    )
}