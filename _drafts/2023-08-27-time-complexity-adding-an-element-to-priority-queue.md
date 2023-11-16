---
layout: post
title: 'Time Complexity: Adding an Element to Priority Queue'
date: '2023-08-27 17:33:50 +0530'
tags: [time-complexity, priority-queue, data-structures, algorithms]
categories: [Data Structures, Algorithms]
---

The time complexity of adding an element to a priority queue (heap) being O(log m), where m is the number of elements in the queue, is rooted in the fundamental properties of binary heaps, which are commonly used to implement priority queues. Let's delve into the mathematical explanation with an example.

### Binary Heap Basics

A binary heap is a complete binary tree that satisfies the **heap property**: In a min-heap, for example, the value of each node is smaller than or equal to the values of its children (if any). In a max-heap, the value of each node is greater than or equal to the values of its children.

Binary heaps are typically implemented as arrays, where the heap structure is maintained by satisfying the heap property through **heapify** operations. When you add an element to a heap, it's initially added at the end of the array and then moved up the tree until the heap property is satisfied.

### Logarithmic Complexity

When adding an element to a binary heap, the element may need to be moved up the tree to restore the heap property. The height of a complete binary tree with m nodes is  log<sub>2</sub>m. This height determines the number of comparisons or swaps needed to restore the heap property.

The number of comparisons or swaps required when inserting an element is proportional to the height of the tree, which is log<sub>2</sub>m. Hence, the time complexity of adding an element to a heap is \(O(\log m)\).

### Example

Let's say we have the following min-heap:

```
          1
         / \
        2   3
       / \ / \
      4  5 6  7
```

The height of this heap is log2(7) ≈ 3 (rounding up because the height of a tree is an integer). If we add an element 0 to this heap, it initially goes to the next available position:

```
        1
      /   \
     2     3
   /  \   / \
  4    5 6   7
 /
0
```

To restore the heap property, 0 needs to be moved to the root of the tree, which requires 3 swaps (equal to the height of the tree):

```
        0
      /   \
     1     3
   /  \   / \
  4    2 6   7
 /
5
```

So, the time complexity of adding an element to the heap is O(log m).

### Conclusion

The O(log m) time complexity of adding an element to a priority queue (heap) arises from the logarithmic height of a binary heap. The logarithmic growth ensures efficient insertion even as the number of elements in the heap increases. This property makes heaps suitable for implementing priority queues, where the element with the highest (or lowest) priority can be efficiently retrieved.