import React from 'react';
import TestRenderer from 'react-test-renderer';

import Result from '../components/Result';


describe('Result Component.', () => {
    var resultObj = new Result();

    describe('Inital states are empty.', () => {
    
        it('placeIDs array should have length of zero.', () => {
            expect(resultObj.state.placeIDs.length).toBe(0);
        });

        it('currentPlaceID should be empty string.', () => {
            expect(resultObj.state.currentPlaceID).toBe('');
        });

        it('place object should be empty.', () => {
            const size = Object.keys(resultObj.state.place).length;
            expect(size).toBe(0);
        });
    });

    describe('selectRandomPlace(placeIDs)', () => {
        let placeIDs = ['a', 'b', 'c'];
        let tree;
        let resultInstance;

        beforeEach( () => {
            tree = TestRenderer.create(<Result/>);
            resultInstance = tree.getInstance();
        });

        afterEach( () => {
            tree = null;
        });

        it('Should return null.', () => {
            const emptyPlaceIDs = [];
            const index = resultInstance.selectRandomPlace(emptyPlaceIDs);
            const isNull = index === null;
            expect(isNull).toBe(true);
        });

        it('Should return an index between 0-2 inclusive.', () => {
            const index = resultInstance.selectRandomPlace(placeIDs);
            expect(index >= 0 && index <= 2).toBe(true);
        });

        it('Should update state.currentPlaceID', () => {
            const index = resultInstance.selectRandomPlace(placeIDs);
            const placeID = resultInstance.state.currentPlaceID;
            const isUpdated = placeIDs.includes(placeID);
            expect(isUpdated).toBe(true);
        });

        it('renders correctly', () => {
            tree = tree.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

    describe('deletePlace()', () => {
        let placeIDs = ['a', 'b', 'c'];
        let place = 'b';
        let tree;
        let resultInstance;

        beforeEach( () => {
            tree = TestRenderer.create(<Result/>);
            resultInstance = tree.getInstance();
        });

        afterEach( () => {
            tree = null;
        });

        it('Should return empty array.', () => {
            const emptyPlaceIDs = [];
            const newPlaceIDs = resultInstance.deletePlace();
            const length = newPlaceIDs.length;
            expect(length).toBe(0);
        });

        it('Should return ["a", "c"].', () => {
            resultInstance.state.placeIDs = ['a', 'b', 'c'];
            resultInstance.state.currentPlaceID = 'b';
            const newPlaceIDs = resultInstance.deletePlace();
            let expected = ['a', 'c'];
            const isSame = JSON.stringify(expected) == JSON.stringify(newPlaceIDs) ? true : false;
            expect(isSame).toBe(true);
        });

        it('Returned value should match state.placeIDs.', () => {
            resultInstance.state.placeIDs = ['a', 'b', 'c'];
            resultInstance.state.currentPlaceID = 'b';
            resultInstance.deletePlace();
            let expected = ['a', 'c'];
            const isSame = JSON.stringify(expected) == JSON.stringify(resultInstance.state.placeIDs) ? true : false;
            expect(isSame).toBe(true);
        })
    }); 
})