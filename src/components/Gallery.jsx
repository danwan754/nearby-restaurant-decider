import React from 'react';
import fetchPhoto from '../requests';

import '../css/Gallery.css';

class Gallery extends React.Component {

    state = {
        photoIDs: [],
        photos: [],
        currentIndices: [],
        GALLERY_SIZE: 3
    }

    constructor() {
        super();
        this.getPhotos = this.getPhotos.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    componentDidMount() {
        let photoIDs = this.props.photoIDs || [];
        // console.log(photoIDs);
        this.setState({ photoIDs: photoIDs });

        // get the initial photos
        if (photoIDs.length > 0) {
            this.getPhotos(photoIDs, []);
        }
    }


    // get up to this.state.GALLERY_SIZE new photos
    async getPhotos(photoIDs, indices) {
        let photos = this.state.photos;

        // if photos exists for indices, then update this.state.currentIndices; no need to fetch new photos
        if (photos.length - 1 >= indices[indices.length - 1]) {
            this.setState({
                currentIndices: indices
            });
            console.log('no fetch needed');
            return;
        }
        // if no more photos to fetch, then do not update and return
        else if (indices[indices.length-1] > photoIDs.length - 1) {
            console.log("Attempt to get more photos than listed in photoIDs; this should not happen");
            return;
        }

        // fetch photos for the provided indices in this.state.photoIDs
        let promises = [];
        for (var i = 0; i < indices.length; i++) {
            console.log("fetch");
            promises.push(fetchPhoto(photoIDs[indices[i]]));
        }
        await Promise.all(promises)
        .then(results => {
            console.log(results);
            let photos = this.state.photos;
            photos = photos.concat(results);
            this.setState({
                photoIDs: photoIDs, 
                photos: photos,
                currentIndices: indices
            });
        });
    }

    async handleNext() {

        let indices = this.state.currentIndices;
        let index = indices.length > 0 ? indices[indices.length - 1] : -1;
        // console.log("index: " + index);
        let newIndices = [];
        if (index >= this.state.photoIDs.length - 1) {
            return;
        }

        for (var i = 1; i <= this.state.GALLERY_SIZE; i++) {
            if (index + i > this.state.photoIDs.length - 1) {
                break;
            }
            newIndices.push(index + i);
        }
        await this.getPhotos(this.state.photoIDs, newIndices);
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