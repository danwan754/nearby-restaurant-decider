var sort=require("../../utils/sort.js");


describe("Bubble Sort function.", function () {
    let bubbleSort = sort.bubbleSort;

    describe("Sort descending time value", function () {
        it("Array of 4 unique time values", function () {
            let reviews = [{time: 1}, {time:2}, {time:3}, {time:4}];
            let sortedReviews = [{time: 4}, {time:3}, {time:2}, {time:1}];
            expect(bubbleSort(reviews)).toStrictEqual(sortedReviews);
        });

    });
});
