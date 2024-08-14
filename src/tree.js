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
                    // 1) move to our node's right subtree
                    // 2) traverse the left side of right subtree until you reach null
                    // 3) replace our node with left side value, then stitch left node children onto the parent node of the left node

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
        traverseBST(value, this.root, parentNode);
    }

    // find(value) returns the node with the given value
    // potential issue with implementation: find(value) assumes that the binary search tree is built properly
    // if value is added using the insert method, then it may bug
    find(value) {
        // 1) traverse the BST... condition for traversal?
        // 2) if node = value, return it
        // 3) if not, recursively do this to both left and right branches of node
        function traverseBST(value, node) {
            if (node === null) {
                return `${value} does not exist in the BST`;
            }
            if (value === node.data) {
                return node;
            }
            if (value < node.data) {
                return traverseBST(value, node.left);
            }
            if (value > node.data) {
                return traverseBST(value, node.right);
            }
        }
        return traverseBST(value, this.root);
    }

    // levelOrder(callback) levelOrder accepts a callback function which it will use on every
    // node in the tree, traversing them breadth first.
    // (basically like forEach, but for our BST)
    // we're going to use a queue to accomplish this****
    // 1) add current (root) node to the queue
    levelOrder(callBack) {
        // put catch statement if we don't have callback function
        if (typeof callBack !== 'function') {
            throw new Error('Callback function not provided');
        }
        let queue = [];
        queue.push(this.root);
        let currentNode = null;

        while (queue.length > 0) {
            // 1) take first node from queue
            currentNode = queue.shift();
            // 2) use callback function with it
            callBack(currentNode);
            // 3) add it's children to the queue
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }
    }
    // iterative implementation works, now let's try recursive implementation
    // base case(terminating condition): When queue is empty
    // recursive case: when next item is not null?
    levelOrderRec(callBack) {
        // check for callBack function first
        if (typeof callBack !== 'function') {
            throw new Error('Callback function not provided');
        }
        // initialized the queue
        let queue = [];
        queue.push(this.root);

        function helper(callBack, queue) {
            // 1) take first node from queue
            let currentNode = queue.shift();
            // 2) do stuff to first node
            callBack(currentNode);
            // console.log(currentNode.data);
            // 3) add it's children to the queue
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
            if (queue.length > 0) {
                helper(callBack, queue);
            }
        }
        helper(callBack, queue);
    }

    // inOrder(callBack)
    // <left, root, right>
    // Do the same thing as level order, except traverse the tree in "in order" order
    inOrder(callBack) {
        if (typeof callBack !== 'function') {
            throw new Error('Callback function not provided');
        }
        let root = this.root;
        function helper(node, callBack) {
            if (node === null) return;
            // 1) visit left subtree
            helper(node.left, callBack);
            // 3) visit root (print/ callback on root)
            // console.log(node.data);
            callBack(node);
            // 3) visit right subtree
            helper(node.right, callBack);
        }
        helper(root, callBack);
    }
    // preOrder(callBack)
    // <root, left, right>
    // terminating condition: root == null
    // recursive case:
    preOrder(callBack) {
        if (typeof callBack !== 'function') {
            throw new Error('Callback function not provided');
        }
        let root = this.root;
        function helper(node, callBack) {
            if (node === null) return;
            // 1) visit root
            // console.log(node.data);
            callBack(node);
            // 2) visit left subtree
            helper(node.left, callBack);
            // 3) visit right subtree
            helper(node.right, callBack);
        }
        helper(root, callBack);
    }

    // postOrder(callBack)
    // <left, right, root>
    postOrder(callBack) {
        if (typeof callBack !== 'function') {
            throw new Error('Callback function not provided');
        }
        let root = this.root;
        function helper(node, callBack) {
            if (node === null) return;
            // 1) visit left subtree
            helper(node.left, callBack);
            // 2) visit right subtree
            helper(node.right, callBack);
            // 3) visit root (print/ callback on root)
            // console.log(node.data);
            callBack(node);
        }
        helper(root, callBack);
    }

    // height(node) function that returns the given node's height
    // height is defined as the number of edges in the longest path from a given node to a leaf node
    // 1) traverse to/ find the node
    // 2) traverse from the node to the deepest leaf
    // we don't want to double count the same level though
    // maybe we need to implement a queue similar to levelOrder?
    height(node) {
        function helper(node) {
            if (node === null) return -1;
            // subtract 1 because we're counting nodes instead of edges

            // this code is confusing, try to understand better later
            let leftHeight = helper(node.left);
            let rightHeight = helper(node.right);
            return Math.max(leftHeight, rightHeight) + 1;
        }
        return helper(node);
    }

    // depth(node) returns a node's depth. The number of edges in the path
    // from a given node in a tree to the tree's root node
    // can we travel back up to the root node?

    // 1) start at the root node, traverse in the same way we did height
    depth(node) {
        // let root = this.root;
        function helper(currentNode, root) {
            // if the root is null, return -1 indicating that the node is not found
            if (root === null) return -1;
            if (currentNode === root) {
                return 0;
            }
            // recursively search in the left and right subtree, increase depth by 1
            let leftDepth = helper(currentNode, root.left);
            let rightDepth = helper(currentNode, root.right);
            // return Math.max(leftDepth, rightDepth) + 1;
            // if node is found in either the left or right subtree, increase the depth by 1
            if (leftDepth !== -1) {
                return leftDepth + 1;
            } else if (rightDepth !== -1) {
                return rightDepth + 1;
            } else {
                // if the node is not found in either subtree, return -1
                return -1;
            }
        }
        return helper(node, this.root);
    }

    // isBalanced() method checks if a tree is balanced
    // a tree is balanced if the difference in heights of the left subtree and
    // and the right subtree of every node is not more than 1
    isBalanced() {
        // think of the base case. If one subtree is > +1 length over the other subtree is balanced.
        // base case: when node is null
        // 1) look at a node
        // 2) if one child has a child and the other does not have a child, is not balanced
        let self = this;
        // within the helper function, the context of "this" changes. So we store "this" in a variable
        // which we can use in a helper function
        function helper(node) {
            if (node === null) {
                return true; // an empty subtree is balanced
            }
            let leftHeight = self.height(node.left);
            let rightHeight = self.height(node.right);

            if (Math.abs(leftHeight - rightHeight) > 1) {
                // compare heights of left and right subtree
                return false;
            }

            return helper(node.left) && helper(node.right); // recursively call on left and right subtree
        }
        return helper(this.root);
    }
    // rebalance() function rebalances an unbalanced tree
    // 1) use traversal method to provide a new array to buildtree function
    rebalance() {
        // can we use levelOrder() for this? provide it with a helper function to add node to array
        let nodesArray = [];
        // levelorder to traverse each node, array function to add the data from each node to the nodesArray
        this.levelOrder((node) => {
            nodesArray.push(node.data);
        });

        let newTree = this.buildTree(nodesArray);
        this.root = newTree;
    }
}

export default Tree;
