import Tree from './tree.js';
import Node from './node.js';

//  TESTING
console.log('1) create a BST from an array of random numbers <100');
function generateRandomArray(length) {
    const array = [];
    for (let i = 0; i < length; i++) {
        // Generate a random number between 0 and 99
        const randomNumber = Math.floor(Math.random() * 100);
        array.push(randomNumber);
    }
    return array;
}

let arr = generateRandomArray(20);
let bst = new Tree(arr);
prettyPrint(bst.root);
console.log('2) confirm the tree is balanced by calling isBalanced');
console.log(bst.isBalanced());

console.log('3) Print out all element in level, pre, and in post and in order');

// bst.levelOrder((node) => [console.log(node.data)]);
// bst.inOrder((node) => [console.log(node.data)]);
// bst.preOrder((node) => [console.log(node.data)]);
// bst.postOrder((node) => [console.log(node.data)]);

console.log('4) Unbalance the tree by adding several numbers > 100');
bst.insert(200);
bst.insert(101);
bst.insert(302);
bst.insert(197);
bst.insert(169);
prettyPrint(bst.root);

console.log('5) confirm that the tree is unbalanced by calling isBalanced');
console.log(bst.isBalanced());
console.log('6) Balance the tree by calling rebalance');
bst.rebalance();
prettyPrint(bst.root);

console.log('7) confirm the tree is balanced by called isBalanced');
console.log(bst.isBalanced());
console.log('8) Print out all element in level, pre, and in post and in order');

// bst.levelOrder((node) => [console.log(node.data)]);
// bst.inOrder((node) => [console.log(node.data)]);
// bst.preOrder((node) => [console.log(node.data)]);
// bst.postOrder((node) => [console.log(node.data)]);
