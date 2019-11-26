import React from 'react';
import { fetchPhoto } from '../requests';

import '../css/Gallery.css';

class Gallery extends React.Component {
    _isMounted = false;

    state = {
        photos: [],
        currentIndices: [],
        GALLERY_SIZE: 3,
        isLoading: false
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
            promises.push(fetchPhoto(photoIDs[indices[i]]));
        }

        this.setState({ isLoading: true });
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
        this.setState({ isLoading: false });
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
        await this.getPhotos(this.props.photoIDs, newIndices);
    }

    async handlePrev() {
        let indices =  this.state.currentIndices;

        let startIndex, endIndex;
        if (indices.length === 0 || indices[0] < 1) {
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
        await this.getPhotos(this.props.photoIDs, newIndices);
    }

    render() {
        let indices = this.state.currentIndices;
        let photos = this.state.photos;
        let photoIDs = this.props.photoIDs;
        let size = this.state.GALLERY_SIZE;
        let prevClassName = indices[0] > 0 ? "" : "invisible";
        let nextClassName = indices[indices.length-1] < photoIDs.length-1 ? "" : "invisible";
        return (
            <div className="gallery-container">
                { indices.length > 0 ?
                    this.state.isLoading ?
                        "Loading pictures..."
                        :
                        <React.Fragment>
                            <input 
                                onClick={ this.handlePrev } 
                                className={"next-images-button inline " + prevClassName} 
                                type="button" 
                                value="<">                            
                            </input>
                            <div className="gallery inline">
                                { Array(size).fill().map( (i, index) => (
                                    <div className="gallery-img-container" key={index}>
                                        <img src={ photos[indices[index]] } alt="N/A"></img>
                                    </div>
                                ))}
                            </div>
                            <input 
                                onClick={ this.handleNext } 
                                className={"next-images-button inline " + nextClassName}
                                type="button" 
                                value=">">
                            </input>
                        </React.Fragment>
                    :
                    <React.Fragment>No photos available.</React.Fragment>
                }
            </div>
        )
    }
}

export default Gallery;