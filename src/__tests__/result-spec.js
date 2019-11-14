import React from 'react';
import TestRenderer from 'react-test-renderer';

import Result from '../components/Result';

jest.mock('../requests');


describe('Result Component.', () => {
    var resultObj = new Result();

    xdescribe('Inital states are empty.', () => {
    
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

    xdescribe('selectRandomPlace(placeIDs)', () => {
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

        xit('Should update state.currentPlaceID', () => {
            const index = resultInstance.selectRandomPlace(placeIDs);
            const placeID = resultInstance.state.currentPlaceID;
            const isUpdated = placeIDs.includes(placeID);
            expect(isUpdated).toBe(true);
        });

        xit('renders correctly', () => {
            tree = tree.toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

    xdescribe('deletePlace()', () => {
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

        xit('Returned value should match state.placeIDs.', () => {
            resultInstance.state.placeIDs = ['a', 'b', 'c'];
            resultInstance.state.currentPlaceID = 'b';
            resultInstance.deletePlace();
            let expected = ['a', 'c'];
            const isSame = JSON.stringify(expected) == JSON.stringify(resultInstance.state.placeIDs) ? true : false;
            expect(isSame).toBe(true);
        })
    });

    xdescribe('handleSkip()', () => {
        let tree;
        let resultInstance;

        beforeEach( () => {
            tree = TestRenderer.create(<Result/>);
            resultInstance = tree.getInstance();
        });

        afterEach( () => {
            tree = null;
        });

        it('Should remove previous place and update current place.', async () => {
            let placeIDs = ['a', 'b'];
            resultInstance.state.placeIDs = placeIDs;
            resultInstance.state.currentPlaceID = 'b';
            await resultInstance.handleSkip();

            let newPlaceIDs = resultInstance.state.placeIDs;
            let newCurrentPlaceID = resultInstance.state.currentPlaceID;
            expect(newPlaceIDs).toStrictEqual(['a']);
            expect(newCurrentPlaceID).toBe('a');
        });
    });

    describe('getEstablishments()', () => {
        let tree;
        let resultInstance;

        beforeEach( () => {
            tree = TestRenderer.create(<Result/>);
            resultInstance = tree.getInstance();
        });

        afterEach( () => {
            tree = null;
        });

        it('Should update state.placeIDs.', async () => {
            let queryObject = {
                establishment: 'Restaurant',
                radius: 1000,
                postal_code: 'v2v2v2',
                country_code: 'ca'
            }
            await resultInstance.getEstablishments(queryObject);
            let newPlaceIDs = resultInstance.state.placeIDs;
            expect(newPlaceIDs).toStrictEqual(["place_id1", "place_id2", "place_id3", "place_id4"]);
        });
    });

})