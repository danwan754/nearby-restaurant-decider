
export default function fetchPhoto(photoID) {
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