import React from 'react';
import fetchPhoto from '../requests';

import '../css/Gallery.css';

class Gallery extends React.Component {

    state = {
        photoIDs: [],
        photos: [],
        currentIndices: [] // should contain up to 3 indices of state.photos
    }

    constructor() {
        super();
        this.GALLERY_SIZE = 3;
        this.getPhotos = this.getPhotos.bind(this);
        // this.fetchPhoto = this.fetchPhoto.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    componentDidMount() {
        let photoIDs = this.props.photoIDs || [];
        // console.log(photoIDs);
        this.setState({ photoIDs: photoIDs });

        // get the first 3 images
        if (photoIDs.length > 0) {
            this.getPhotos(photoIDs, []);
        }
    }


    // fetchPhoto(photoID) {
    //     return (
    //         fetch('/api/photo?id=' + photoID)
    //         .then(response => {
    //             return response.blob();
    //         })
    //         .then(image => {
    //             let image_url = URL.createObjectURL(image);
    //             // console.log("photo: " + image_url);
    //             return image_url;
    //         })
    //     )
    // }

    // get up to GALLERY_SIZE new photos
    async getPhotos(photoIDs, indices) {
        let photos = this.state.photos;

        // if photos exists for indices, then update this.state.currentIndices; no need to fetch new photos
        if (photos.length - 1 >= indices.length - 1) {
            this.setState({
                currentIndices: indices
            });
            console.log('no fetch needed');
            return;
        }
        // if no more photos to fetch, then do not update and return
        else if (photos.length - 1 >= photoIDs.length -1) {
            console.log("Attempt to get more photos than listed in photoIDs; this should not happen");
            return;
        }

        // fetch photos for the provided indices in this.state.photoIDs
        let promises = [];
        for (var i = 0; i < indices.length; i++) {
            promises.push(fetchPhoto(photoIDs[indices[i]]));
            console.log("append");
        }
        await Promise.all(promises)
        .then(results => {
            // console.log("promises");
            // console.log("currentIndices: " + currentIndices);
            // console.log("photoIDs: " + photoIDs);
            let photos = this.state.photos;
            // console.log("photos: " + photos);
            photos = photos.concat(results);
            this.setState({
                photoIDs: photoIDs, 
                photos: photos,
                currentIndices: indices
            });
        });

        // // start index for the next photos
        // let startIndex = photoIDs.length - (photoIDs.length - photos.length);
        // let endIndex = startIndex + (this.GALLERY_SIZE - 1);

        // // console.log(startIndex);
        // // console.log(endIndex);
        // if (startIndex > photoIDs.length - 1) {
        //     return;
        // }
        // if (photoIDs.length - startIndex - 1 > (this.GALLERY_SIZE - 1)) {
        //     endIndex = startIndex + (this.GALLERY_SIZE - 1);
        // }
        // // set endIndex to last index if not enough remaining indices to statisfy GALLERY_SIZE
        // else {
        //     endIndex = photoIDs.length - 1;
        // }
        // // console.log("startIndex: " + startIndex);
        // // console.log("endIndex: " + endIndex);
        
        // function fetchPhoto(photoID) {
        //     return (
        //         fetch('/api/photo?id=' + photoID)
        //         .then(response => {
        //             return response.blob();
        //         })
        //         .then(image => {
        //             let image_url = URL.createObjectURL(image);
        //             // console.log("photo: " + image_url);

        //             return image_url;
        //         })
        //     )
        // }

        // let promises = [];
        // let currentIndices = [];
        // for (var i = startIndex; i < endIndex + 1; i++) {
        //     promises.push(fetchPhoto(photoIDs[i]));
        //     currentIndices.push(i);
        // }

        // Promise.all(promises)
        // .then(results => {
        //     // console.log("currentIndices: " + currentIndices);
        //     // console.log("photoIDs: " + photoIDs);
        //     let photos = this.state.photos;
        //     // console.log("photos: " + photos);
        //     photos = photos.concat(results);
        //     this.setState({
        //         photoIDs: photoIDs, 
        //         photos: photos,
        //         currentIndices: currentIndices
        //     });
        // });
    }

    handleNext() {

        let indices = this.state.currentIndices;
        let index = indices[indices.length - 1];
        let newIndices = [];

        for (var i = 0; i < this.state.GALLERY_SIZE; i++) {
            if (index > this.state.photoIDs.length - 1) {
                break;
            }
            newIndices.push(index + i);
        }

        this.getPhotos(this.state.photoIDs, newIndices);

        // let currentIndices = this.state.currentIndices;
        // let currentPhotoLength = currentIndices.length;
        // let lastPhotoIndex = this.state.photos.length - 1;
        // if (currentPhotoLength == 0) {
        //     console.log("no current photos");
        //     return;
        // }
        // if (!currentIndices[currentPhotoLength - 1] == lastPhotoIndex) {
        //     // current photos are not the last photos, so get next photos
        //     let index = currentIndices[currentPhotoLength - 1] + 1;
        //     for (var i=0; i<this.GALLERY_SIZE; i++) {
        //         if (index > this.state.photos.length -1) {
        //             break;
        //         }
        //         currentIndices[i] = this.state.photos[index];
        //         index++;
        //     }
        // }

        // if (currentIndices[currentPhotoLengthm - 1] == lastPhotoIndex) {
        //     // disable the 'next' button since there is no more photos to show
        // }

        // this.setState({
        //     currentIndices: currentIndices
        // });

    }

    render() {
        // console.log("currentIndices: " + this.state.currentIndices);
        // console.log("photoIDs: " + this.state.photoIDs);
        // console.log("photos: " + this.state.photos);

        return (
            // <div className="gallery">
            //     { this.state.photos.map( (img, index) => (
            //         <img key={index} src={ img } alt="no image"></img>
            //     ))}
            // </div>
            <div className="gallery">
                { this.state.currentIndices.map( (i, index) => (
                    <img key={index} src={ this.state.photos[i] } alt="no image"></img>
                ))}
            </div>
        )
    }
}

export default Gallery;