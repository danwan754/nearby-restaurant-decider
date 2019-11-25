
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
        .catch(error => {
            // console.log("error in photo fetching:");
            throw new Error(error);
            // console.log(error);
            // return {error: error};
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
            // console.log(data);
            if (data.error) {
                throw new Error(data.error + "; " + data.error_message);
            }
            return data;
        })
        .catch(error => {
            // console.log("error in getPlaceDetails");
            // console.log(error);
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
            // console.log("error in getNearbyEstablishments:");
            // console.log(error);
            throw error;
        })
    )
}