var app=require("../../utils/bubbleSort.js");


describe("Bubble Sort function.", function () {
    let bubbleSort = app.bubbleSort;

    describe("Sort ascending time value", function () {
        it("Array of 4 unique time values", function () {
            let reviews = [{time: 4}, {time:3}, {time:2}, {time:1}];
            let sortedReviews = [{time: 1}, {time:2}, {time:3}, {time:4}];
            expect(bubbleSort(reviews)).toStrictEqual(sortedReviews);
        });

    });
});
