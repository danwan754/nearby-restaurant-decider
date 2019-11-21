import React from 'react';
import { fetchPhoto } from '../requests';

import '../css/Gallery.css';

class Gallery extends React.Component {
    _isMounted = false;

    state = {
        photos: [],
        currentIndices: [],
        GALLERY_SIZE: 3
    }

    constructor() {
        super();
        this.getPhotos = this.getPhotos.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        let photoIDs = this.props.photoIDs || [];

        // get the initial photos
        if (photoIDs.length > 0) {
            let indices = [];
            for (var i = 0; i < this.state.GALLERY_SIZE; i++) {
                indices.push(i);
            }
            this.getPhotos(photoIDs, indices);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
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
            console.log("pushed");
            promises.push(fetchPhoto(photoIDs[indices[i]]));
        }
        await Promise.all(promises)
        .then(results => {
            if (this._isMounted) {
                let photos = this.state.photos;
                photos = photos.concat(results);
                this.setState({
                    photos: photos,
                    currentIndices: indices
                });
            }
        });
    }

    async handleNext() {

        let indices = this.state.currentIndices;
        let index = indices.length > 0 ? indices[indices.length - 1] : -1;
        let newIndices = [];
        if (index >= this.props.photoIDs.length - 1) {
            return;
        }

        for (var i = 1; i <= this.state.GALLERY_SIZE; i++) {
            if (index + i > this.props.photoIDs.length - 1) {
                break;
            }
            newIndices.push(index + i);
        }

        // disable 'next' button if no more photos after these indices
        if (newIndices[newIndices.length - 1] >= this.props.photoIDs.length - 1) {
            // disable next button
        }
        await this.getPhotos(this.props.photoIDs, newIndices);
    }

    async handlePrev() {
        let indices =  this.state.currentIndices;

        let startIndex, endIndex;
        if (indices.length === 0 || indices[0] < 1) {
            // console.log("handlePrev; indices.length == 0 || indices[0] < 1; return");
            return;
        }
        else {
            endIndex = indices[0] - 1;
            startIndex = endIndex - this.state.GALLERY_SIZE + 1;
        }

        let newIndices = [];
        for (var i = startIndex; i <= endIndex; i++) {
            if (i < 0) {
                continue;
            }
            newIndices.push(i);
        }

        // disable 'prev' button if no more photos before these indices
        if (newIndices[0] === 0) {
            // disable prev button
        }

        // await this.getPhotos(this.state.photoIDs, newIndices);
        await this.getPhotos(this.props.photoIDs, newIndices);
    }

    render() {
        let indices = this.state.currentIndices;
        return (
            <div className="gallery-container">
                { indices.length > 0 ?
                    <React.Fragment>
                        <input onClick={ this.handlePrev }className="prev-next-buttons inline" type="button" value="<"></input>
                        <div className="gallery inline">
                            { indices.map( (i, index) => (
                                <div className="gallery-img-container" key={index}>
                                    /<img src={ this.state.photos[i] } alt="N/A"></img>
                                </div>
                            ))}
                        </div>
                        <input onClick={ this.handleNext } className="prev-next-buttons inline" type="button" value=">"></input>
                    </React.Fragment>
                    :
                    <React.Fragment>No photos available.</React.Fragment>
                }
            </div>
        )
    }
}

export default Gallery;