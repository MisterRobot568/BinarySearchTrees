function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    // divide the array into two halves
    const middleIndex = Math.floor(array.length / 2);
    let left = array.slice(0, middleIndex);
    let right = array.slice(middleIndex);

    // recursively sort each half
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    // merge the sorted halves
    return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // compare element from both arrays and merge them in sorted order
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    //concat any remaining elements from left and right
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function removeDuplicates(sortedArray) {
    if (sortedArray.length === 0) return [];

    let uniqueIndex = 0;

    for (let i = 1; i < sortedArray.length; i++) {
        if (sortedArray[uniqueIndex] !== sortedArray[i]) {
            uniqueIndex++;
            sortedArray[uniqueIndex] = sortedArray[i];
        }
    }

    // Trim the array to include only unique elements
    return sortedArray.slice(0, uniqueIndex + 1);
}

export { mergeSort, removeDuplicates };
