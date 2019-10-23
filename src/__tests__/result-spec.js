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
        let placeIDs;

        beforeEach( () => {
            // resultObj.state.placeIDs = ['a', 'b', 'c'];
            placeIDs = ['a', 'b', 'c'];
        });

        it('Should return null.', () => {
            placeIDs = [];
            const index = resultObj.selectRandomPlace(placeIDs);
            const isNull = index === null;
            expect(isNull).toBe(true);
        });

        it('Should return an index between 0-2 inclusive.', () => {
            const index = resultObj.selectRandomPlace(placeIDs);
            expect(index >= 0 && index <= 2).toBe(true);
        });
    });





})