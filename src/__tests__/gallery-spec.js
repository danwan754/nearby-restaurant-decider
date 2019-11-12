/* Start up the test server (/server/test-server.js) before running this script. */

import React from 'react';
import TestRenderer from 'react-test-renderer';

import Gallery from '../components/Gallery';

jest.mock('../requests');


describe('Gallery Component.', () => {
    var galleryObj = new Gallery();

    xdescribe('Inital states are empty.', () => {

        it('photoIDs array should have length of zero.', () => {
            expect(galleryObj.state.photoIDs.length).toBe(0);
        });
        it('photos array should have length of zero.', () => {
            expect(galleryObj.state.photos.length).toBe(0);
        });

        it('currentIndices array should have length of zero.', () => {
            expect(galleryObj.state.currentIndices.length).toBe(0);
        });
    });

    xdescribe('getPhotos(photoIDs, indices)', () => {
        let tree;
        let galleryInstance;

        beforeEach( () => {
            tree = TestRenderer.create(<Gallery/>);
            galleryInstance = tree.getInstance();
        });

        afterEach( () => {
            tree = null;
        });

        it('Should update state.currentIndices to empty array', () => {
            let photoIDs = [];
            let indices = [];
            galleryInstance.getPhotos(photoIDs, indices);
            let currentIndices = galleryInstance.state.currentIndices;
            expect(currentIndices.length).toBe(0);
        });

        it('Should update state.currentIndices to [0, 1, 2]', async () => {
            let photoIDs = ['a', 'b', 'c', 'd'];
            let indices = [0, 1, 2];
            await galleryInstance.getPhotos(photoIDs, indices);
            let currentIndices = galleryInstance.state.currentIndices;
            let photos = galleryInstance.state.photos;
            expect(currentIndices).toStrictEqual(indices);
            expect(photos).toStrictEqual(["/src/assets/canada.png","/src/assets/canada.png","/src/assets/canada.png"]);
        });

        it('Should update state.currentIndices when all photos are present in state.photos', async () => {
            let photoIDs = ['a', 'b', 'c', 'd'];
            galleryInstance.state.photos = ['aa', 'bb', 'cc', 'dd'];
            let indices = [3];
            await galleryInstance.getPhotos(photoIDs, indices);
            let currentIndices = galleryInstance.state.currentIndices;
            expect(currentIndices).toStrictEqual(indices);
        });

        it('Should update state.currentIndices and state.photos when photo is not in state.photos', async () => {
            let photoIDs = ['a', 'b', 'c', 'd'];
            galleryInstance.state.photos = ['aa', 'bb', 'cc'];
            let indices = [3];
            await galleryInstance.getPhotos(photoIDs, indices);
            let currentIndices = galleryInstance.state.currentIndices;
            let photos = galleryInstance.state.photos;
            expect(currentIndices).toStrictEqual(indices);
            expect(photos).toStrictEqual(['aa','bb','cc','/src/assets/canada.png']);
        });


        it('Should not update state.currentIndices when attempting to get photo out of index', async () => {
            let photoIDs = ['a', 'b', 'c', 'd'];
            galleryInstance.state.currentIndices = [1,2,3];
            let indices = [4];
            await galleryInstance.getPhotos(photoIDs, indices);
            let currentIndices = galleryInstance.state.currentIndices;
            expect(currentIndices).toStrictEqual([1,2,3]);
        });

    });

    xdescribe('handleNext()', () => {
        let tree;
        let galleryInstance;

        beforeEach( () => {
            tree = TestRenderer.create(<Gallery/>);
            galleryInstance = tree.getInstance();
        });

        afterEach( () => {
            tree = null;
        });

        it('should update state.currentIndices to contain next 3 indices', async () => {
            let photoIDs = ['a', 'b', 'c', 'd'];
            galleryInstance.state.photoIDs = photoIDs;
            galleryInstance.state.currentIndices = [];
            await galleryInstance.handleNext();
            let currentIndices = galleryInstance.state.currentIndices;
            expect(currentIndices).toStrictEqual([0,1,2]);
        });

        it('should update state.currentIndices to contain final index only', async () => {
            let photoIDs = ['a', 'b', 'c', 'd'];
            galleryInstance.state.photoIDs = photoIDs;
            galleryInstance.state.currentIndices = [0,1,2];
            await galleryInstance.handleNext();
            let currentIndices = galleryInstance.state.currentIndices;
            expect(currentIndices).toStrictEqual([3]);
        });

        it('should not update state.currentIndices', async () => {
            let photoIDs = ['a', 'b', 'c', 'd'];
            galleryInstance.state.photoIDs = photoIDs;
            galleryInstance.state.currentIndices = [2,3];
            await galleryInstance.handleNext();
            let currentIndices = galleryInstance.state.currentIndices;
            expect(currentIndices).toStrictEqual([2,3]);
        });

    });

    describe('handlePrev()', () => {
        let tree;
        let galleryInstance;

        beforeEach( () => {
            tree = TestRenderer.create(<Gallery/>);
            galleryInstance = tree.getInstance();
        });

        afterEach( () => {
            tree = null;
        });

        it('should update state.currentIndices to contain previous 3 indices.', async () => {
            let photoIDs = ['a', 'b', 'c', 'd'];
            galleryInstance.state.photoIDs = photoIDs;
            galleryInstance.state.currentIndices = [3];
            await galleryInstance.handlePrev();
            let currentIndices = galleryInstance.state.currentIndices;
            expect(currentIndices).toStrictEqual([0,1,2]);
        });

        it('should not update state.currentIndices when state.currentIndices is empty.', async () => {
            galleryInstance.state.currentIndices = [];
            await galleryInstance.handlePrev();
            let currentIndices = galleryInstance.state.currentIndices;
            expect(currentIndices).toStrictEqual([]);
        });

        it('should not update state.currentIndices when state.currentIndices contains index of first photo.', async () => {
            let photoIDs = ['a', 'b', 'c', 'd'];
            galleryInstance.state.photoIDs = photoIDs;
            galleryInstance.state.currentIndices = [0,1,2];
            await galleryInstance.handlePrev();
            let currentIndices = galleryInstance.state.currentIndices;
            expect(currentIndices).toStrictEqual([0,1,2]);
        });

    });

});