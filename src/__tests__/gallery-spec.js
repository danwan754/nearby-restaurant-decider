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

    describe('getPhotos(photoIDs, indices)', () => {
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


        it('Should not update state.currentIndices', async () => {
            let photoIDs = ['a', 'b', 'c', 'd'];
            galleryInstance.state.currentIndices = [1,2,3];
            let indices = [4];
            await galleryInstance.getPhotos(photoIDs, indices);
            let currentIndices = galleryInstance.state.currentIndices;
            expect(currentIndices).toStrictEqual([1,2,3]);
        });

    });


});