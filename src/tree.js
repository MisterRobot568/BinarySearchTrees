import Node from './node.js';
import { mergeSort, removeDuplicates } from './additionalFunctions.js';

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    // buildTree(array) is a function tahat takes an array of data and turns it into
    // a balance binary tree full of Node objects appropriately placed.
    // (don't forget to sort and remove duplicates from array)
    // buildTree should return the level 0 root node
    buildTree(array) {
        //1) sort array
        // 2) remove duplicates
        // 3) create BST
        // 4) return the level 0 root node
        let sortedArray = mergeSort(array);
        let finishedArray = removeDuplicates(sortedArray);
        console.log(finishedArray);

        // Create BST
        // We instead opt for a helper function so that we can return the root node
        function buildSubTree(start, end) {
            if (start > end) {
                return null;
            }
            // if middle has 2 elements, then we choose the left one as the middl
            let mid = Math.floor((start + end) / 2);
            let node = new Node(finishedArray[mid]);

            node.left = buildSubTree(start, mid - 1);
            node.right = buildSubTree(mid + 1, end);
            // console.log(`Creating node with data: ${node.data}`);

            return node;
        }
        return buildSubTree(0, finishedArray.length - 1);
    }

    // write insert value and deleteItem value
    // insert(value) will insert a given value in the BST

    // 1) traverse through the BST
    // 2) if value > then traverse right, if value < then traverse left
    // 3) insert new value, then make new value's assign the next value's node.left/ node.right
    // 4) do we need to check if the value appears in the BST already?
    // this may need to be recursion?

    // recursion for sure
    insert(value) {
        let tree = this.root;
        function traverseBST(value, node) {
            // let current = tree.data;
            if (value > node.data) {
                // if value > node
                if (node.right === null) {
                    // add to tree if next node is null
                    let newNode = new Node(value);
                    node.right = newNode;
                } else {
                    // otherwise, traverse the tree to right node
                    return traverseBST(value, node.right);
                }
            }
            if (value < node.data) {
                if (node.left === null) {
                    let newNode = new Node(value);
                    node.left = newNode;
                } else {
                    return traverseBST(value, node.left);
                }
            }
            if (value === node.data) {
                console.log(`Duplicate value: ${value} not allowed!`);
            }
        }
        traverseBST(value, this.root);
    }

    // Delete an item from the BST
    // 1) Traverse through BST
    // 2) Check for 3 cases:
    //       1) Delete a leaf node
    //       2) Delete if node only has one child
    //       3) Delete if node has 2 children
    // for the last case we need to find the in order successor: What are the steps to do that?
    // The in order successor will be the left-most node of the right branch
    deleteItem(value) {
        function traverseLeft(node) {
            // this function takes a node, traverses the left trees of that node
            // and returns the left mode node as well as the right subtree
            let rightSubTree = null;
            while (node.left != null) {
                node = node.left;
                // traverseLeft(node.left);
            }
            rightSubTree = node.right;
            return [node, rightSubTree];
        }

        let parentNode = null;
        function traverseBST(value, node, parentNode) {
            if (value > node.data) {
                // traverse right
                return traverseBST(value, node.right, node);
            }
            if (value < node.data) {
                // traverse left
                return traverseBST(value, node.left, node);
            }
            if (value === node.data) {
                // if value = data, then we need to check if it has children and how many children it has
                if (node.left !== null && node.right !== null) {
                    // if there are 2 children
                    // 1) recursively traverse left subtree until there are no more lefts
                    // 2)

                    let [targetNode, rightSubTree] = traverseLeft(node.right);
                    node.data = targetNode.data;
                    let rightSideReplace = node.right;
                    rightSideReplace.left = rightSubTree;
                    return;
                }
                if (node.left !== null || node.right !== null) {
                    // if there is only one child
                    let tempNode = null;

                    if (node.left !== null) {
                        //
                        tempNode = node.left;
                    } else {
                        tempNode = node.right;
                    }
                    if (node.data < parentNode.data) {
                        // if we want to work with parents left node
                        parentNode.left = tempNode;
                    } else {
                        // if we want to work with parent's right node
                        parentNode.right = tempNode;
                    }
                }
                if (node.left === null && node.right === null) {
                    // if there are no children, simply delete the node
                    // node.data = new Node(null);
                    if (node.left === null) {
                        parentNode.left = null;
                    } else {
                        parentNode.right = null;
                    }
                }
            }
        }
        // function to traverse the left subtree until we reach a null

        traverseBST(value, this.root, parentNode);
    }
}

export default Tree;
