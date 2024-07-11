---
layout: post
title: Traversal Mechanisms in Binary Search Trees
date: '2023-09-10 09:38:12 +0530'
tags: [binary-search-tree, traversal, java]
categories: [Data Structures, Algorithms]
---

In computer science, binary search trees (BSTs) are a fundamental data structure used for efficient searching, insertion, and deletion of elements. Traversing a BST is a common operation to process its elements in a specific order. In this post, we'll explore three common traversal mechanisms: in-order, pre-order, and post-order, and provide Java code examples for each.

### Binary Search Tree Structure

Before we dive into traversals, let's understand the structure of a Binary Search Tree. Each node in a BST has at most two children: a left child and a right child. The left child contains values less than the node, and the right child contains values greater than the node. Here's a simple BST:

```plaintext
        10
       /  \
      5    15
     / \   / \
    3   7 12  18
```

### In-Order Traversal

In-order traversal visits the nodes of a BST in ascending order. It first visits the left subtree, then the current node, and finally the right subtree. Here's the Java code for in-order traversal:

```java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    
    TreeNode(int val) {
        this.val = val;
    }
}

public class BSTTraversal {
    public void inOrder(TreeNode root) {
        if (root != null) {
            inOrder(root.left);
            System.out.print(root.val + " ");
            inOrder(root.right);
        }
    }
}
```

### Pre-Order Traversal

Pre-order traversal visits the current node before its children. It starts at the root, then visits the left subtree, and finally the right subtree. Here's the Java code for pre-order traversal:

```java
public class BSTTraversal {
    public void preOrder(TreeNode root) {
        if (root != null) {
            System.out.print(root.val + " ");
            preOrder(root.left);
            preOrder(root.right);
        }
    }
}
```

### Post-Order Traversal

Post-order traversal visits the children of a node before the node itself. It starts at the left subtree, then the right subtree, and finally the current node. Here's the Java code for post-order traversal:

```java
public class BSTTraversal {
    public void postOrder(TreeNode root) {
        if (root != null) {
            postOrder(root.left);
            postOrder(root.right);
            System.out.print(root.val + " ");
        }
    }
}
```

### Conclusion

Traversal mechanisms are essential for working with Binary Search Trees. In-order, pre-order, and post-order traversals provide different ways to process the elements in a BST. These mechanisms are the building blocks for various tree-related algorithms.
