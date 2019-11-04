import React from 'react';

class Gallery extends React.Component {

    state = {
        photoIDs: [],
        photos: [],
        currentPhotoIndices: [] // should contain up to 3 indices of state.photos
    }

    constructor() {
        super();
        this.getPhotos = this.getPhotos.bind(this);
    }

    componentDidMount() {
        let photoIDs = this.props.photoIDs;
        console.log(photoIDs);
        // get the first 3 images
        if (photoIDs.length > 0) {
            this.getPhotos(photoIDs);
        }

        // this.setState({ photoIDs: photoIDs });
    }

    // get up to 3 new photos
    getPhotos(photoIDs) {
        let photos = this.state.photos;

        // start index for the next photos
        let startIndex = photoIDs.length - (photoIDs.length - photos.length);
        let endIndex = startIndex + 2;

        // console.log(startIndex);
        // console.log(endIndex);
        if (startIndex > photoIDs.length - 1) {
            return;
        }
        if (photoIDs.length - startIndex - 1 > 2) {
            endIndex = startIndex + 2;
        }
        // if only 2 or 1 indices left in state.photoIDs (not including startIndex), set endIndex to last index
        else {
            endIndex = photoIDs.length - 1;
        }
        // console.log("startIndex: " + startIndex);
        // console.log("endIndex: " + endIndex);

        function fetchPhoto(photoID) {
            return (
                fetch('/api/photo?id=' + photoID)
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

        let promises = [];
        let currentPhotoIndices = [];
        for (var i = startIndex; i < endIndex + 1; i++) {
            promises.push(fetchPhoto(photoIDs[i]));
            currentPhotoIndices.push(i);
        }

        Promise.all(promises)
        .then(results => {
            // console.log("currentPhotoIndices: " + currentPhotoIndices);
            // console.log("photoIDs: " + photoIDs);
            let photos = this.state.photos;
            // console.log("photos: " + photos);
            photos = photos.concat(results);
            this.setState({
                photoIDs: photoIDs, 
                photos: photos,
                currentPhotoIndices: currentPhotoIndices
            });
        });
    }

    render() {
        console.log("currentPhotoIndices: " + this.state.currentPhotoIndices);
        console.log("photoIDs: " + this.state.photoIDs);
        console.log("photos: " + this.state.photos);

        return (
            <div className="gallery">
                { this.state.photos.map( (img, index) => (
                    <img key={index} src={ img } alt="no image"></img>
                ))}
            </div>
        )
    }
}

export default Gallery;