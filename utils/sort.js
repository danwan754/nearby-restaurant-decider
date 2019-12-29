
module.exports = {
    // sort array of review objects based on relative time field from most recent to oldest
    bubbleSort: 
        function bubbleSort(arr) {
            for (let i=0; i<arr.length; i++) {
                for (let j=0; j<arr.length-i-1; j++) {
                    if (arr[j].time < arr[j+1].time) {
                        let temp = arr[j];
                        arr[j] = arr[j+1];
                        arr[j+1] = temp;
                    }
                }
            }
            return arr;
        }
}
