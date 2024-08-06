import Tree from './tree.js';
import Node from './node.js';
let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let test = new Tree(array);
console.log(test.root);
console.log(test.root.right);

// function expression for printing our BST:
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

// BST print
prettyPrint(test.root);
// insert testing
test.insert(10);
test.insert(7);
test.insert(225);
test.insert(227);
test.insert(0);
prettyPrint(test.root);
console.log('--------------------------');

test.deleteItem(0);
prettyPrint(test.root);
console.log('--------------------------');
test.deleteItem(5);
test.deleteItem();
prettyPrint(test.root);
console.log('----------delete 67----------------');
test.deleteItem(67);
prettyPrint(test.root);
console.log('----------delete 225----------------');
test.deleteItem(225);
prettyPrint(test.root);
console.log('----------delete 8----------------');
test.deleteItem(8);
prettyPrint(test.root);

// testing destructuring
// function tester(x) {
//     let y = x + 1;
//     let z = x + 2;
//     return [y, z];
// }

// let [yy, zz] = tester(1);
// console.log(yy);
// console.log(zz);

// let test4 = new Tree([50, 30, 20, 40, 32, 34, 36, 50, 70, 60, 65, 80, 75, 85]);
// test4.buildTree;
// prettyPrint(test4.root);
// test4.deleteItem(32);
// prettyPrint(test4.root);
// console.log('--------------------------');
