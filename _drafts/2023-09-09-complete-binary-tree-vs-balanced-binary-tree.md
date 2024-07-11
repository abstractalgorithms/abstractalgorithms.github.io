---
layout: post
title: Complete Binary Tree vs Balanced Binary Tree
date: '2023-09-09 10:30:39 +0530'
categories: [Data Structures, Binary Trees]
tags: [Binary Trees, Complete Binary Tree, Balanced Binary Tree, Data Structure Comparison]
---

A complete binary tree and a balanced binary tree are two different concepts in binary tree data structures, and they have distinct characteristics:

**Complete Binary Tree**:
1. In a complete binary tree, every level of the tree is completely filled except possibly for the last level. In the last level, all nodes are as left as possible.

2. This means that if you were to traverse the tree level by level (from top to bottom, left to right), you would encounter all nodes in the top levels before moving to the next level, and the last level is filled from left to right.

3. Complete binary trees are used in various data structures like heaps, where the shape of the tree ensures efficient operations. For example, a binary heap is a complete binary tree where the parent node is always less (for a min-heap) or greater (for a max-heap) than its children.

4. Complete binary trees may not necessarily be balanced. The height of a complete binary tree can vary from O(log N) to O(N), depending on the number of nodes (N).

**Balanced Binary Tree**:
1. A balanced binary tree is a binary tree in which the depth (height) of the left and right subtrees of every node differ by at most one. In other words, the tree is balanced such that it's not skewed or heavily biased to one side.

2. Balanced binary trees aim to maintain a relatively even distribution of nodes in the left and right subtrees, which ensures that operations like searching, insertion, and deletion have a time complexity of O(log N), where N is the number of nodes.

3. Examples of balanced binary trees include AVL trees and Red-Black trees. These trees have specific rules and mechanisms to ensure balance is maintained during insertion and deletion operations.

4. A balanced binary tree is typically more efficient for search and manipulation operations compared to an unbalanced tree, where the height can become O(N), making operations less efficient.


## Examples

Let's illustrate the concepts of a complete binary tree and a balanced binary tree with examples:

**Complete Binary Tree**:
A complete binary tree is a binary tree in which every level of the tree is completely filled except possibly for the last level, and all nodes in the last level are as left as possible.

Example:
```
        1
       / \
      2   3
     / \ /
    4  5 6
```
In this example, every level of the tree is completely filled except the last level. All nodes in the last level (4, 5, 6) are positioned as left as possible. This tree is a complete binary tree.

**Balanced Binary Tree**:
A balanced binary tree is a binary tree in which the depth (height) of the left and right subtrees of every node differ by at most one.

Example (Balanced Binary Search Tree, commonly known as AVL Tree):
```
       3
      / \
     2   5
    /   / \
   1   4   6
```
In this example, the tree is balanced because for every node (e.g., 3), the depth of the left subtree and the depth of the right subtree differ by at most one. Specifically:
- The depth of the left subtree of node 3 is 2, and the depth of the right subtree is 2, so the difference is 0.
- The depth of the left subtree of node 2 is 1, and the depth of the right subtree is 0, so the difference is 1.
- The depth of the left subtree of node 5 is 1, and the depth of the right subtree is 1, so the difference is 0.
- And so on for all other nodes.

This balanced property ensures that the height of the tree is O(log N), where N is the number of nodes in the tree, making operations like search, insertion, and deletion efficient.


## Performance

Let's compare a Complete Binary Tree and a Balanced Binary Search Tree (BST) with examples and demonstrate the performance of various operations.

**Complete Binary Tree**:
A complete binary tree is characterized by its filling pattern, where every level of the tree is completely filled except possibly for the last level, and all nodes in the last level are as left as possible.

**Balanced Binary Search Tree (BST)**:
A balanced binary search tree is characterized by the property that the depth (height) of the left and right subtrees of every node differs by at most one. It also satisfies the Binary Search Tree property, where values to the left are less than the root, and values to the right are greater than the root.

Let's demonstrate the performance of these trees with examples:

**Complete Binary Tree**:
```
        1
       / \
      2   3
     / \
    4   5
```

**Balanced Binary Search Tree (BST)**:
```
        3
       / \
      2   5
     /   /
    1   4
```

Let's evaluate various operations:

**Insertion**:
- **Complete Binary Tree**: Insertion is efficient. For example, inserting 6 would make it the leftmost child of node 3.
- **Balanced BST**: Insertion is efficient, and the tree maintains balance. Inserting 6 would require restructuring to maintain balance.

**Search**:
- **Complete Binary Tree**: Searching is efficient, similar to a binary search in a sorted array.
- **Balanced BST**: Searching is efficient, with a time complexity of O(log N) in the average case, where N is the number of nodes.

**Deletion**:
- **Complete Binary Tree**: Deletion can be efficient for specific cases. For example, deleting 2 involves replacing it with 5.
- **Balanced BST**: Deletion involves maintaining balance. Deleting 2 requires restructuring to ensure balance.

**Insertion/Deletion of Nodes**:
- **Complete Binary Tree**: Efficient for maintaining completeness but not for general insertions and deletions.
- **Balanced BST**: Efficient for general insertions and deletions, including balancing.

**Space Complexity**:
- **Complete Binary Tree**: Tends to be less space-efficient because it requires storage for all nodes, even if some are not used.
- **Balanced BST**: Tends to be more space-efficient because it stores only nodes in use, and the height is O(log N).

**Ordered Traversal** (e.g., In-order, Pre-order, Post-order):
- **Complete Binary Tree**: Ordered traversals work efficiently and provide elements in a sorted order.
- **Balanced BST**: Ordered traversals also work efficiently and provide elements in sorted order.

**Performance Conclusion**:
- For scenarios where you need efficient search, insertion, and deletion, especially when data is frequently modified, a balanced BST is a better choice. It maintains balance, ensuring that operations remain efficient.
- Complete binary trees are more suitable when you need to ensure that all levels are filled, but they may not be as efficient for general insertions, deletions, or searches.

In summary, a complete binary tree is characterized by its filling pattern, while a balanced binary tree is characterized by the equal or nearly equal heights of left and right subtrees. Both concepts have different applications and properties, but a balanced binary tree is typically used when you want to ensure efficient operations in a binary tree data structure.