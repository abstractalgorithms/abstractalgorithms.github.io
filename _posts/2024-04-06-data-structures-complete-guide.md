---
layout: post
title: 'Data Structures: Complete Guide'
date: '2024-04-06 08:17:19 +0530'
tags: [data-structures, algorithms]
categories: [Data Structures, Algorithms]
---

## Importance of Data Structures in Programming

Data structures form the backbone of any software application. They provide efficient ways to store, organize, and manage data, enabling developers to perform various operations effectively. Here are some key reasons why data structures are essential in programming:

1. **Optimized Data Storage**: Data structures allow data to be organized and stored in memory efficiently, optimizing memory usage and access times.

2. **Efficient Data Retrieval and Manipulation**: With the right data structure, operations such as searching, inserting, deleting, and updating data can be performed efficiently, leading to better performance of algorithms and applications.

3. **Facilitate Algorithm Design**: Many algorithms rely on specific data structures for their implementation. Understanding data structures is crucial for designing and implementing efficient algorithms.

4. **Problem-Solving Skills**: Proficiency in data structures enhances problem-solving skills. Many programming challenges and interview questions require knowledge of data structures to solve efficiently.

## Overview of Common Data Structures

There are numerous data structures, each with its unique characteristics and use cases. Here's a brief overview of some common data structures we'll be exploring in this series:

1. **Arrays**: One of the simplest data structures, arrays store elements of the same type in contiguous memory locations.

2. **Linked Lists**: Linked lists consist of nodes where each node points to the next node in the sequence. They provide dynamic memory allocation and efficient insertion/deletion operations.

3. **Stacks**: Stacks follow the Last In, First Out (LIFO) principle, allowing elements to be added and removed from one end called the top.

4. **Queues**: Queues adhere to the First In, First Out (FIFO) principle, enabling elements to be inserted at one end (rear) and removed from the other end (front).

5. **Trees**: Trees are hierarchical data structures composed of nodes connected by edges. Common types include binary trees, binary search trees, and balanced trees like AVL and Red-Black trees.

6. **Graphs**: Graphs consist of vertices (nodes) connected by edges. They represent relationships between objects and are used in various applications like social networks, routing algorithms, and more.

7. **Hash Tables**: Hash tables use a hash function to map keys to values, providing fast access to data based on its key.

## Introduction to Arrays and Linked Lists

### Arrays
An array is a collection of elements stored at contiguous memory locations, each identified by its index. It provides fast access to elements using indexing and is suitable for situations where the size of the collection is known in advance.

### Linked Lists
A linked list is a linear data structure consisting of nodes, where each node contains a data element and a reference (or pointer) to the next node in the sequence. Unlike arrays, linked lists provide dynamic memory allocation and efficient insertion and deletion operations.

## Implementation Details

### Arrays
Arrays can be implemented in various programming languages using built-in data structures or custom implementations. In languages like Java, C++, and Python, arrays are available as built-in data types with convenient syntax for declaration, initialization, and access.

### Linked Lists
Linked lists are typically implemented using classes or structures representing nodes. Each node contains the data element and a reference to the next node. The last node in the list points to null to indicate the end of the list.

### Doubly Linked Lists

Doubly linked lists, like singly linked lists, consist of nodes, but each node contains an additional reference to the previous node as well as the next node. This allows for bidirectional traversal of the list.

## Operations and Time Complexity Analysis

### Arrays
- **Access**: O(1)
- **Insertion/Deletion at End**: O(1) (Amortized)
- **Insertion/Deletion at Beginning**: O(n)
- **Search**: O(n) (Linear Search)

### Linked Lists
- **Access**: O(n)

    Accessing an element by index in a singly linked list requires traversing the list from the head node to the desired index.
- **Insertion/Deletion at Beginning**: O(1)
    
    When inserting or deleting elements at the beginning of a linked list, we only need to update the pointers of the newly inserted node or the node after the deleted node. This operation does not depend on the size of the linked list, hence it has constant time complexity O(1).
- **Insertion/Deletion at End**: O(n)

    When inserting or deleting elements at the end of a singly linked list (without maintaining a tail pointer), we need to traverse the entire list to find the last node. As a result, the time complexity for these operations is proportional to the size of the linked list, resulting in linear time complexity O(n).
    
    If we maintain a tail pointer, insertion and deletion at the end of the linked list can be done in constant time O(1) as we can directly access the last node without traversing the entire list. However, without the tail pointer, it requires traversing the entire list, resulting in linear time complexity.
- **Search**: O(n) (Linear Search)

    Searching for a specific value in a singly linked list also requires traversing the list from the head node to the node containing the desired value (if it exists).

#### Time Complexity

| Operation                   | Time Complexity |
|-----------------------------|-----------------|
| Accessing by Index (Get)    | O(n)            |
| Insertion at Beginning      | O(1)            |
| Insertion at End            | O(n)            |
| Insertion at Given Index    | O(n)            |
| Deletion at Beginning       | O(1)            |
| Deletion at End             | O(n)            |
| Deletion at Given Index     | O(n)            |
| Searching for Element       | O(n)            |

### Doubly Linked Lists
- **Access**: O(n)

    Accessing an element at a specific index requires traversing the list from either the head or tail until reaching the desired index. This operation has a time complexity of O(n), where n is the number of elements in the list.
- **Insertion/Deletion at End/Beginning**: O(1)

    Inserting a new element at the end of a doubly linked list involves updating the pointers of the last node and the newly inserted node. Since we can directly access the last node (due to the doubly linked nature), insertion at the end has a time complexity of O(1).
- **Search**: O(n) (Linear Search)

    Searching for a specific value in a doubly linked list also requires traversing the list from either the head or tail until finding the desired value. This operation has a time complexity of O(n), where n is the number of elements in the list.

#### Time Complexity

| Operation             | Time Complexity |
|-----------------------|-----------------|
| Accessing by Index    | O(n)            |
| Insertion at Beginning| O(1)            |
| Insertion at End      | O(1)            |
| Insertion at Index    | O(n)            |
| Deletion at Beginning | O(1)            |
| Deletion at End       | O(1)            |
| Deletion at Index     | O(n)            |
| Searching by Value    | O(n)            |
| Reversing             | O(n)            |

## Example implementation using Java

### Singly Linked List

```java
class ListNode {
    int val;
    ListNode next;

    ListNode(int val) {
        this.val = val;
    }
}

public class SinglyLinkedList {
    private ListNode head;

    public SinglyLinkedList() {
        head = null;
    }

    public void add(int val) {
        ListNode newNode = new ListNode(val);
        if (head == null) {
            head = newNode;
        } else {
            ListNode current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    public void display() {
        ListNode current = head;
        while (current != null) {
            System.out.print(current.val + " ");
            current = current.next;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        SinglyLinkedList list = new SinglyLinkedList();
        list.add(1);
        list.add(2);
        list.add(3);
        list.display();
    }
}
```

In this implementation:

- We have a `ListNode` class to represent each node in the linked list. Each node contains an integer value (`val`) and a reference to the next node (`next`).
- The `SinglyLinkedList` class maintains a reference to the head of the linked list.
- The `add` method adds a new node with the given value to the end of the linked list.
- The `display` method traverses the linked list and prints the values of all nodes.

You can extend this implementation by adding more functionality such as inserting at a specific position, deleting nodes, or searching for a value.

### Doublly Linked List

```java
class Node {
    int data;
    Node prev;
    Node next;

    public Node(int data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

public class DoublyLinkedList {
    private Node head;
    private Node tail;
    private int size;

    public DoublyLinkedList() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public int size() {
        return size;
    }

    public void insertAtHead(int data) {
        Node newNode = new Node(data);
        if (isEmpty()) {
            head = newNode;
            tail = newNode;
        } else {
            newNode.next = head;
            head.prev = newNode;
            head = newNode;
        }
        size++;
    }

    public void insertAtTail(int data) {
        Node newNode = new Node(data);
        if (isEmpty()) {
            head = newNode;
            tail = newNode;
        } else {
            tail.next = newNode;
            newNode.prev = tail;
            tail = newNode;
        }
        size++;
    }

    public void deleteAtHead() {
        if (!isEmpty()) {
            if (head == tail) {
                head = null;
                tail = null;
            } else {
                head = head.next;
                head.prev = null;
            }
            size--;
        }
    }

    public void deleteAtTail() {
        if (!isEmpty()) {
            if (head == tail) {
                head = null;
                tail = null;
            } else {
                tail = tail.prev;
                tail.next = null;
            }
            size--;
        }
    }

    public void display() {
        Node current = head;
        while (current != null) {
            System.out.print(current.data + " ");
            current = current.next;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        DoublyLinkedList dll = new DoublyLinkedList();
        dll.insertAtHead(5);
        dll.insertAtHead(10);
        dll.insertAtTail(15);
        dll.insertAtTail(20);
        dll.display(); // Output: 10 5 15 20
        dll.deleteAtHead();
        dll.deleteAtTail();
        dll.display(); // Output: 5 15
    }
}
```

## Examples and Use Cases

### Arrays
- Storing and accessing elements in a collection where the size is known in advance.
- Implementing dynamic programming solutions, such as calculating Fibonacci numbers using memoization.

### Linked Lists
- Implementing stacks and queues.
- Memory management in dynamic memory allocation scenarios.
- Modeling real-world scenarios where elements need to be dynamically added or removed.

## Introduction to Stacks and Queues

### Stacks
A stack is a linear data structure that follows the Last In, First Out (LIFO) principle. Elements are added and removed from the same end, called the top. Common stack operations include push (addition) and pop (removal).

### Queues
A queue is a linear data structure that follows the First In, First Out (FIFO) principle. Elements are added at one end, called the rear, and removed from the other end, called the front. Common queue operations include enqueue (addition) and dequeue (removal).

## Implementation Details Using Arrays and Linked Lists

### Stacks
#### Implementation using Arrays:
- In array-based stack implementation, we maintain a fixed-size array to store elements.
- We keep track of the top element using an index variable.
- Push operation adds an element to the top of the stack by incrementing the top index.
- Pop operation removes the top element by decrementing the top index.

#### Implementation using Linked Lists:
- In linked list-based stack implementation, we use a singly linked list.
- Each node contains the data element and a reference to the next node.
- Push operation adds a new node to the beginning of the linked list.
- Pop operation removes the first node from the linked list.

### Queues
#### Implementation using Arrays:
- In array-based queue implementation, we use a circular buffer to store elements.
- We maintain two pointers, front and rear, to track the positions for insertion and removal.
- Enqueue operation adds an element to the rear of the queue.
- Dequeue operation removes an element from the front of the queue.

#### Implementation using Linked Lists:
- In linked list-based queue implementation, we use a singly linked list.
- We maintain references to both the front and rear nodes.
- Enqueue operation adds a new node to the end of the linked list.
- Dequeue operation removes the first node from the linked list.

## Operations and Time Complexity Analysis

### Stacks
- **Push**: O(1)
- **Pop**: O(1)
- **Peek**: O(1)

### Queues
- **Enqueue**: O(1)
- **Dequeue**: O(1)
- **Front**: O(1)

## Example implementation using Java

### Stack 

#### Using Array

```Java
public class Stack {
    private int[] array;
    private int top;
    private int capacity;

    // Constructor to initialize the stack with a given capacity
    public Stack(int capacity) {
        this.capacity = capacity;
        this.array = new int[capacity];
        this.top = -1; // Initialize top index to -1 (empty stack)
    }

    // Push operation to add an element to the top of the stack
    public void push(int element) {
        if (isFull()) {
            System.out.println("Stack overflow! Cannot push element " + element);
            return;
        }
        array[++top] = element;
        System.out.println("Pushed element: " + element);
    }

    // Pop operation to remove and return the element at the top of the stack
    public int pop() {
        if (isEmpty()) {
            System.out.println("Stack underflow! Cannot pop element.");
            return -1; // Return a default value indicating stack underflow
        }
        int poppedElement = array[top--];
        System.out.println("Popped element: " + poppedElement);
        return poppedElement;
    }

    // Peek operation to return the element at the top of the stack without removing it
    public int peek() {
        if (isEmpty()) {
            System.out.println("Stack is empty! Cannot peek element.");
            return -1; // Return a default value indicating empty stack
        }
        return array[top];
    }

    // Check if the stack is empty
    public boolean isEmpty() {
        return top == -1;
    }

    // Check if the stack is full
    public boolean isFull() {
        return top == capacity - 1;
    }

    // Print the elements of the stack
    public void printStack() {
        if (isEmpty()) {
            System.out.println("Stack is empty.");
            return;
        }
        System.out.print("Stack elements: ");
        for (int i = 0; i <= top; i++) {
            System.out.print(array[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Stack stack = new Stack(5);
        stack.push(1);
        stack.push(2);
        stack.push(3);
        stack.printStack();
        stack.pop();
        stack.printStack();
        System.out.println("Top element: " + stack.peek());
    }
}
```

#### Using Linked List

```java
class Node {
    int data;
    Node next;

    public Node(int data) {
        this.data = data;
        this.next = null;
    }
}

public class LinkedListStack {
    private Node top;

    public LinkedListStack() {
        this.top = null;
    }

    public void push(int data) {
        Node newNode = new Node(data);
        if (isEmpty()) {
            top = newNode;
        } else {
            newNode.next = top;
            top = newNode;
        }
        System.out.println(data + " pushed to stack.");
    }

    public int pop() {
        if (isEmpty()) {
            System.out.println("Stack is empty. Cannot pop.");
            return -1; // Or throw an exception
        }
        int poppedValue = top.data;
        top = top.next;
        return poppedValue;
    }

    public int peek() {
        if (isEmpty()) {
            System.out.println("Stack is empty. Cannot peek.");
            return -1; // Or throw an exception
        }
        return top.data;
    }

    public boolean isEmpty() {
        return top == null;
    }

    public void printStack() {
        if (isEmpty()) {
            System.out.println("Stack is empty.");
            return;
        }
        System.out.println("Stack elements:");
        Node current = top;
        while (current != null) {
            System.out.println(current.data);
            current = current.next;
        }
    }

    public static void main(String[] args) {
        LinkedListStack stack = new LinkedListStack();
        stack.push(10);
        stack.push(20);
        stack.push(30);
        stack.push(40);

        stack.printStack();

        System.out.println("Top element: " + stack.peek());

        System.out.println("Popped element: " + stack.pop());
        System.out.println("Popped element: " + stack.pop());

        stack.printStack();
    }
}
```

### Queues

```java
import java.util.LinkedList;

public class Queue<T> {
    private LinkedList<T> elements;

    public Queue() {
        elements = new LinkedList<>();
    }

    // Method to add an element to the queue
    public void enqueue(T element) {
        elements.addLast(element);
    }

    // Method to remove and return the element at the front of the queue
    public T dequeue() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue is empty");
        }
        return elements.removeFirst();
    }

    // Method to get the element at the front of the queue without removing it
    public T peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue is empty");
        }
        return elements.getFirst();
    }

    // Method to check if the queue is empty
    public boolean isEmpty() {
        return elements.isEmpty();
    }

    // Method to get the size of the queue
    public int size() {
        return elements.size();
    }

    // Method to clear the queue
    public void clear() {
        elements.clear();
    }

    // Method to print the elements of the queue
    public void printQueue() {
        System.out.println("Queue:");
        for (T element : elements) {
            System.out.print(element + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Queue<Integer> queue = new Queue<>();
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);

        queue.printQueue(); // Output: Queue: 10 20 30

        System.out.println("Dequeued element: " + queue.dequeue()); // Output: Dequeued element: 10

        queue.printQueue(); // Output: Queue: 20 30

        System.out.println("Peeked element: " + queue.peek()); // Output: Peeked element: 20

        System.out.println("Size of queue: " + queue.size()); // Output: Size of queue: 2

        queue.clear();
        System.out.println("Is queue empty? " + queue.isEmpty()); // Output: Is queue empty? true
    }
}
```

In this implementation:
- We use a LinkedList named `elements` to store the elements of the queue.
- The `enqueue` method adds an element to the end of the queue.
- The `dequeue` method removes and returns the element at the front of the queue.
- The `peek` method returns the element at the front of the queue without removing it.
- The `isEmpty` method checks if the queue is empty.
- The `size` method returns the number of elements in the queue.
- The `clear` method clears all elements from the queue.
- The `printQueue` method prints all elements of the queue.

## Real-World Applications

### Stacks
- Expression evaluation and parsing (e.g., infix to postfix conversion)
- Function call stack in programming languages (recursion, method calls)
- Undo functionality in text editors and software applications

### Queues
- Task scheduling in operating systems (job queues)
- Print job management in printer queues
- Message queues in distributed systems and networking

## Introduction to Trees

### Trees
A tree is a hierarchical data structure composed of nodes connected by edges. It consists of a root node, which serves as the starting point, and each node can have zero or more child nodes. Trees are widely used in various applications, including file systems, databases, and hierarchical structures in computer science.

## Binary Trees and Binary Search Trees (BSTs)

### Binary Trees
A binary tree is a tree data structure in which each node has at most two children, referred to as the left child and the right child. The binary tree is a fundamental building block for other tree-based data structures and algorithms.

### Binary Search Trees (BSTs)
A binary search tree (BST) is a binary tree in which every node follows the property that the value of the left child is less than the value of the parent node, and the value of the right child is greater than the value of the parent node. BSTs enable efficient searching, insertion, and deletion operations.

## Traversal Algorithms

### In-Order Traversal
In in-order traversal, nodes are visited in the following order: left subtree, current node, right subtree. It results in nodes being visited in sorted order for a BST.

### Pre-Order Traversal
In pre-order traversal, nodes are visited in the following order: current node, left subtree, right subtree. It is useful for creating a copy of the tree or prefix notation in expression evaluation.

### Post-Order Traversal
In post-order traversal, nodes are visited in the following order: left subtree, right subtree, current node. It is useful for deleting nodes from the tree or postfix notation in expression evaluation.

## Operations and Time Complexity Analysis

### Binary Trees
- **Insertion**: O(n)
- **Deletion**: O(n)
- **Search**: O(n)

### Binary Search Trees (BSTs)
- **Insertion**: O(log n) (Average), O(n) (Worst Case)
- **Deletion**: O(log n) (Average), O(n) (Worst Case)
- **Search**: O(log n) (Average), O(n) (Worst Case)

## Examples and Use Cases

### Binary Trees
- Representing hierarchical data structures (e.g., family trees, organization charts)
- Expression trees for evaluating mathematical expressions

### Binary Search Trees (BSTs)
- Implementing dictionary data structures (e.g., dictionary, spell checker)
- Implementing efficient searching and retrieval mechanisms

## Example implementation using Java

### Inorder Traversal

```Java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    public TreeNode(int val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

public class BinarySearchTree {
    private TreeNode root;

    public BinarySearchTree() {
        this.root = null;
    }

    public void insert(int val) {
        root = insertRec(root, val);
    }

    private TreeNode insertRec(TreeNode root, int val) {
        if (root == null) {
            root = new TreeNode(val);
            return root;
        }

        if (val < root.val) {
            root.left = insertRec(root.left, val);
        } else if (val > root.val) {
            root.right = insertRec(root.right, val);
        }

        return root;
    }

    public boolean search(int val) {
        return searchRec(root, val);
    }

    private boolean searchRec(TreeNode root, int val) {
        if (root == null) {
            return false;
        }

        if (root.val == val) {
            return true;
        }

        if (val < root.val) {
            return searchRec(root.left, val);
        } else {
            return searchRec(root.right, val);
        }
    }

    public void inorderTraversal() {
        inorderTraversalRec(root);
        System.out.println();
    }

    private void inorderTraversalRec(TreeNode root) {
        if (root != null) {
            inorderTraversalRec(root.left);
            System.out.print(root.val + " ");
            inorderTraversalRec(root.right);
        }
    }

    public static void main(String[] args) {
        BinarySearchTree bst = new BinarySearchTree();
        bst.insert(50);
        bst.insert(30);
        bst.insert(20);
        bst.insert(40);
        bst.insert(70);
        bst.insert(60);
        bst.insert(80);

        System.out.println("Inorder traversal of BST:");
        bst.inorderTraversal();

        int searchKey = 30;
        if (bst.search(searchKey)) {
            System.out.println(searchKey + " found in the BST.");
        } else {
            System.out.println(searchKey + " not found in the BST.");
        }
    }
}
```

### Pre-order Traversal

```Java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}

public class BinaryTree {
    TreeNode root;

    public BinaryTree() {
        root = null;
    }

    // Preorder traversal (root -> left -> right)
    public void preorderTraversal(TreeNode node) {
        if (node == null)
            return;

        System.out.print(node.val + " "); // Visit the root
        preorderTraversal(node.left); // Traverse left subtree
        preorderTraversal(node.right); // Traverse right subtree
    }

    public static void main(String[] args) {
        BinaryTree tree = new BinaryTree();
        tree.root = new TreeNode(1);
        tree.root.left = new TreeNode(2);
        tree.root.right = new TreeNode(3);
        tree.root.left.left = new TreeNode(4);
        tree.root.left.right = new TreeNode(5);

        System.out.println("Preorder traversal of binary tree is: ");
        tree.preorderTraversal(tree.root);
    }
}
```

### Post-order Traversal

```Java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    public TreeNode(int val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    TreeNode root;

    public BinaryTree() {
        this.root = null;
    }

    // Method to perform postorder traversal
    public void postorderTraversal(TreeNode node) {
        if (node == null)
            return;

        // Traverse left subtree
        postorderTraversal(node.left);

        // Traverse right subtree
        postorderTraversal(node.right);

        // Visit the current node
        System.out.print(node.val + " ");
    }

    public static void main(String[] args) {
        // Create a binary tree
        BinaryTree tree = new BinaryTree();
        tree.root = new TreeNode(1);
        tree.root.left = new TreeNode(2);
        tree.root.right = new TreeNode(3);
        tree.root.left.left = new TreeNode(4);
        tree.root.left.right = new TreeNode(5);

        // Perform postorder traversal starting from the root
        System.out.println("Postorder traversal:");
        tree.postorderTraversal(tree.root);
    }
}

```

## Introduction to Graphs

### Graphs
A graph is a non-linear data structure consisting of a collection of vertices (nodes) and edges that connect pairs of vertices. Graphs are widely used to model relationships and connections between objects in various domains, including social networks, transportation networks, and computer networks.

## Representations

### Adjacency Matrix
An adjacency matrix is a 2D array used to represent connections between vertices in a graph. The value at position (i, j) represents whether there is an edge between vertex i and vertex j.

### Adjacency List
An adjacency list is a collection of lists or arrays used to represent connections between vertices in a graph. Each vertex has a list of its adjacent vertices.

## Traversal Algorithms

### Breadth-First Search (BFS)
BFS is a graph traversal algorithm that explores vertices level by level, starting from the root (or source) vertex. It explores all the neighbor vertices at the current depth before moving to the vertices at the next depth.

### Depth-First Search (DFS)
DFS is a graph traversal algorithm that explores vertices as far as possible along each branch before backtracking. It explores one branch of the graph as deeply as possible before moving to another branch.

## Operations and Time Complexity Analysis

-   Add Vertex: O(1)
-   Add Edge: O(1)
-   Remove Vertex: O(V + E)
-   Remove Edge: O(V)
-   BFS: O(V + E)
-   DFS: O(V + E)

## Example implementation using Java

```Java
import java.util.*;

// Class to represent a graph using adjacency list
class Graph {
    private int V; // Number of vertices
    private Map<Integer, LinkedList<Integer>> adjList; // Adjacency list representation

    // Constructor
    public Graph(int v) {
        V = v;
        adjList = new HashMap<>();
        for (int i = 0; i < v; i++) {
            adjList.put(i, new LinkedList<>());
        }
    }

    // Method to add an edge to the graph
    public void addEdge(int v, int w) {
        adjList.get(v).add(w);
        adjList.get(w).add(v); // Assuming undirected graph
    }

    // Method to print the adjacency list representation of the graph
    public void printGraph() {
        for (int i = 0; i < V; i++) {
            System.out.print("Vertex " + i + " is connected to: ");
            for (int j : adjList.get(i)) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }

    // Breadth-First Search traversal
    public List<Integer> bfs(int start) {
        List<Integer> result = new ArrayList<>();
        if (!adjList.containsKey(start))
            return result;

        Queue<Integer> queue = new LinkedList<>();
        Set<Integer> visited = new HashSet<>();

        queue.add(start);
        visited.add(start);

        while (!queue.isEmpty()) {
            int current = queue.poll();
            result.add(current);

            for (int neighbor : adjList.get(current)) {
                if (!visited.contains(neighbor)) {
                    queue.add(neighbor);
                    visited.add(neighbor);
                }
            }
        }

        return result;
    }

    public void dfs(int startVertex) {
        Set<Integer> visited = new HashSet<>();
        dfsRecursive(startVertex, visited);
    }

    private void dfsRecursive(int currentVertex, Set<Integer> visited) {
        visited.add(currentVertex);
        System.out.print(currentVertex + " ");

        List<Integer> neighbors = adjList.getOrDefault(currentVertex, new LinkedList<>());
        for (int neighbor : neighbors) {
            if (!visited.contains(neighbor)) {
                dfsRecursive(neighbor, visited);
            }
        }
    }
}

// Main class
public class Main {
    public static void main(String[] args) {
        // Create a graph with 5 vertices
        int V = 5;
        Graph graph = new Graph(V);

        // Add edges
        graph.addEdge(0, 1);
        graph.addEdge(0, 4);
        graph.addEdge(1, 2);
        graph.addEdge(1, 3);
        graph.addEdge(1, 4);
        graph.addEdge(2, 3);
        graph.addEdge(3, 4);

        // Print the adjacency list representation of the graph
        graph.printGraph();

        System.out.println("BFS traversal starting from vertex 0:");
        List<Integer> bfsTraversal = graph.bfs(0);
        System.out.println(bfsTraversal);

        System.out.println("Depth-First Search starting from vertex 0:");
        graph.dfs(0);
    }
}

```

## Applications and Use Cases

### Social Networks
- Modeling friendships and connections between users.
- Analyzing network structures and identifying influencers.

### Computer Networks
- Routing algorithms for data transmission.
- Network topology analysis and optimization.

### Recommendation Systems
- Collaborative filtering for recommending products or content.
- Analyzing user interactions and preferences.

### Game Development
- Pathfinding algorithms for character movement.
- Modeling game worlds and environments.

## Introduction to Hash Tables

### Hash Tables
A hash table is a data structure that stores key-value pairs, where each key is mapped to a unique index using a hash function. It provides fast access to values based on their keys, making it an efficient solution for various applications.

## Hashing Techniques

### Hashing
Hashing is the process of converting keys into indices (hash codes) using a hash function. A good hash function should distribute keys evenly across the available indices to minimize collisions.

## Collision Resolution Methods

### Chaining
Chaining is a collision resolution method where each bucket in the hash table stores a linked list of key-value pairs. When a collision occurs, the new key-value pair is appended to the linked list at the corresponding bucket.

### Open Addressing
Open addressing is a collision resolution method where collisions are resolved by probing into other locations within the hash table until an empty slot is found. Common probing techniques include linear probing, quadratic probing, and double hashing.

## Operations and Time Complexity Analysis

### Operations
- **Insertion**: O(1) (Average), O(n) (Worst Case)
- **Deletion**: O(1) (Average), O(n) (Worst Case)
- **Search**: O(1) (Average), O(n) (Worst Case)

### Time Complexity
- **Hashing**: O(1)
- **Collision Resolution**: O(1) to O(n)

## Example implementation using Java

```Java
import java.util.LinkedList;

class KeyValuePair<K, V> {
    K key;
    V value;

    public KeyValuePair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() {
        return key;
    }

    public V getValue() {
        return value;
    }
}

class HashTable<K, V> {
    private final LinkedList<KeyValuePair<K, V>>[] table;
    private final int capacity;

    public HashTable(int capacity) {
        this.capacity = capacity;
        table = new LinkedList[capacity];
        for (int i = 0; i < capacity; i++) {
            table[i] = new LinkedList<>();
        }
    }

    private int hash(K key) {
        return Math.abs(key.hashCode() % capacity);
    }

    public void put(K key, V value) {
        int index = hash(key);
        LinkedList<KeyValuePair<K, V>> list = table[index];
        for (KeyValuePair<K, V> pair : list) {
            if (pair.getKey().equals(key)) {
                pair.value = value;
                return;
            }
        }
        list.add(new KeyValuePair<>(key, value));
    }

    public V get(K key) {
        int index = hash(key);
        LinkedList<KeyValuePair<K, V>> list = table[index];
        for (KeyValuePair<K, V> pair : list) {
            if (pair.getKey().equals(key)) {
                return pair.getValue();
            }
        }
        return null;
    }

    public void remove(K key) {
        int index = hash(key);
        LinkedList<KeyValuePair<K, V>> list = table[index];
        list.removeIf(pair -> pair.getKey().equals(key));
    }
}

public class Main {
    public static void main(String[] args) {
        HashTable<String, Integer> hashTable = new HashTable<>(10);

        hashTable.put("John", 25);
        hashTable.put("Alice", 30);
        hashTable.put("Bob", 35);

        System.out.println("John's age: " + hashTable.get("John"));
        System.out.println("Alice's age: " + hashTable.get("Alice"));
        System.out.println("Bob's age: " + hashTable.get("Bob"));

        hashTable.remove("Alice");

        System.out.println("Alice's age after removal: " + hashTable.get("Alice"));
    }
}

```
## Examples and Use Cases

### Database Indexing
- Storing and retrieving records based on unique keys.
- Optimizing search queries and data retrieval in databases.

### Caching Mechanisms
- Storing frequently accessed data to improve performance.
- Implementing caching layers in web applications and distributed systems.

### Symbol Tables in Compilers
- Storing identifiers (variables, functions) and their associated attributes.
- Resolving variable names and function calls during compilation.

## Introduction to Advanced Data Structures

### Heaps
A heap is a binary tree-based data structure that satisfies the heap property. It can be either a max-heap or a min-heap, where in a max-heap, the parent node is greater than or equal to its child nodes, and in a min-heap, the parent node is less than or equal to its child nodes. Heaps are commonly used to implement priority queues.

### Tries
A trie (pronounced "try") is a tree-based data structure used for efficient storage and retrieval of strings. Each node in the trie represents a single character, and the edges represent transitions between characters. Tries are commonly used in dictionary implementations, autocomplete systems, and spell checkers.

### AVL Trees
An AVL tree is a self-balancing binary search tree (BST) where the heights of the two child subtrees of any node differ by at most one. AVL trees maintain their balance through rotations during insertion and deletion operations, ensuring efficient search, insertion, and deletion operations.

## Implementation Details

### Heaps
#### Implementation using Arrays:
- In array-based heap implementation, the binary tree is represented using an array.
- The root element is stored at index 0, and for any given node at index i, its left child is at index 2i + 1 and its right child is at index 2i + 2.

### Tries
#### Implementation using Nodes:
- In node-based trie implementation, each node contains a character value and references to its child nodes.
- Special markers may be used to indicate the end of a word or to represent branches in the trie.

### AVL Trees
#### Implementation of Rotations:
- AVL trees use rotations to maintain balance during insertion and deletion operations.
- Rotations include single rotations (left and right rotations) and double rotations (left-right and right-left rotations).

## Operations and Time Complexity Analysis

### Heaps
- **Insertion**: O(log n)
- **Deletion**: O(log n)
- **Find Min/Max**: O(1)

### Tries
- **Insertion**: O(m), where m is the length of the key
- **Deletion**: O(m), where m is the length of the key
- **Search**: O(m), where m is the length of the key

### AVL Trees
- **Insertion**: O(log n)
- **Deletion**: O(log n)
- **Search**: O(log n)

## Examples and Use Cases

### Heaps
- Priority queue implementation for task scheduling.
- Efficiently finding the k largest or smallest elements in a collection.

### Tries
- Autocomplete systems for predicting words or phrases.
- Implementing efficient dictionary lookup and spell checking algorithms.

### AVL Trees
- Database indexing for fast retrieval of records.
- Implementing balanced search trees in programming languages and libraries.

## Example implementation using Java

### Heap - MinHeap

```Java
import java.util.Arrays;

public class MinHeap {
    private int[] heap;
    private int size;
    private int capacity;

    public MinHeap(int capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.heap = new int[capacity];
    }

    private int parent(int i) {
        return (i - 1) / 2;
    }

    private int leftChild(int i) {
        return 2 * i + 1;
    }

    private int rightChild(int i) {
        return 2 * i + 2;
    }

    private void swap(int i, int j) {
        int temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }

    private void heapifyUp(int index) {
        int current = index;
        while (current > 0 && heap[current] < heap[parent(current)]) {
            swap(current, parent(current));
            current = parent(current);
        }
    }

    private void heapifyDown(int index) {
        int smallest = index;
        int left = leftChild(index);
        int right = rightChild(index);

        if (left < size && heap[left] < heap[smallest])
            smallest = left;
        if (right < size && heap[right] < heap[smallest])
            smallest = right;

        if (smallest != index) {
            swap(index, smallest);
            heapifyDown(smallest);
        }
    }

    public void insert(int value) {
        if (size == capacity) {
            System.out.println("Heap is full. Cannot insert more elements.");
            return;
        }
        heap[size] = value;
        size++;
        heapifyUp(size - 1);
    }

    public int extractMin() {
        if (size == 0) {
            System.out.println("Heap is empty. Cannot extract minimum element.");
            return -1;
        }
        int min = heap[0];
        heap[0] = heap[size - 1];
        size--;
        heapifyDown(0);
        return min;
    }

    public void printHeap() {
        System.out.println("Heap elements:");
        for (int i = 0; i < size; i++) {
            System.out.print(heap[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        MinHeap minHeap = new MinHeap(10);
        minHeap.insert(3);
        minHeap.insert(2);
        minHeap.insert(1);
        minHeap.insert(15);
        minHeap.insert(5);
        minHeap.insert(4);

        System.out.println("Min Heap:");
        minHeap.printHeap();

        System.out.println("Extracting minimum element: " + minHeap.extractMin());

        System.out.println("Min Heap after extraction:");
        minHeap.printHeap();
    }
}
```

### Heap - MaxHeap

```java
import java.util.Arrays;

public class MaxHeap {
    private int[] heap;
    private int size;
    private int capacity;

    // Constructor
    public MaxHeap(int capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.heap = new int[capacity];
    }

    // Get index of parent node
    private int parent(int index) {
        return (index - 1) / 2;
    }

    // Get index of left child node
    private int leftChild(int index) {
        return (2 * index) + 1;
    }

    // Get index of right child node
    private int rightChild(int index) {
        return (2 * index) + 2;
    }

    // Check if a node has a parent
    private boolean hasParent(int index) {
        return parent(index) >= 0;
    }

    // Check if a node has a left child
    private boolean hasLeftChild(int index) {
        return leftChild(index) < size;
    }

    // Check if a node has a right child
    private boolean hasRightChild(int index) {
        return rightChild(index) < size;
    }

    // Swap two elements in the heap
    private void swap(int index1, int index2) {
        int temp = heap[index1];
        heap[index1] = heap[index2];
        heap[index2] = temp;
    }

    // Ensure capacity of the heap
    private void ensureCapacity() {
        if (size == capacity) {
            heap = Arrays.copyOf(heap, capacity * 2);
            capacity *= 2;
        }
    }

    // Insert a new element into the heap
    public void insert(int value) {
        ensureCapacity();
        heap[size++] = value;
        heapifyUp();
    }

    // Maintain heap property by bubbling up the newly inserted element
    private void heapifyUp() {
        int index = size - 1;
        while (hasParent(index) && heap[parent(index)] < heap[index]) {
            swap(parent(index), index);
            index = parent(index);
        }
    }

    // Remove and return the maximum element from the heap
    public int extractMax() {
        if (size == 0) {
            throw new IllegalStateException("Heap is empty");
        }
        int max = heap[0];
        heap[0] = heap[size - 1];
        size--;
        heapifyDown();
        return max;
    }

    // Maintain heap property by bubbling down the root element
    private void heapifyDown() {
        int index = 0;
        while (hasLeftChild(index)) {
            int largerChildIndex = leftChild(index);
            if (hasRightChild(index) && heap[rightChild(index)] > heap[leftChild(index)]) {
                largerChildIndex = rightChild(index);
            }

            if (heap[index] < heap[largerChildIndex]) {
                swap(index, largerChildIndex);
            } else {
                break;
            }

            index = largerChildIndex;
        }
    }

    // Print the elements of the heap
    public void printHeap() {
        for (int i = 0; i < size; i++) {
            System.out.print(heap[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        MaxHeap maxHeap = new MaxHeap(10);
        maxHeap.insert(10);
        maxHeap.insert(20);
        maxHeap.insert(15);
        maxHeap.insert(30);
        maxHeap.insert(25);
        maxHeap.printHeap();
        System.out.println("Max element extracted: " + maxHeap.extractMax());
        maxHeap.printHeap();
    }
}
```

### Trie

```java
class TrieNode {
    private TrieNode[] children;
    private boolean isEndOfWord;

    public TrieNode() {
        children = new TrieNode[26]; // Assuming only lowercase English letters
        isEndOfWord = false;
    }

    public boolean containsKey(char ch) {
        return children[ch - 'a'] != null;
    }

    public TrieNode get(char ch) {
        return children[ch - 'a'];
    }

    public void put(char ch, TrieNode node) {
        children[ch - 'a'] = node;
    }

    public void setEnd() {
        isEndOfWord = true;
    }

    public boolean isEnd() {
        return isEndOfWord;
    }
}

public class Trie {
    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode node = root;
        for (char ch : word.toCharArray()) {
            if (!node.containsKey(ch)) {
                node.put(ch, new TrieNode());
            }
            node = node.get(ch);
        }
        node.setEnd();
    }

    public boolean search(String word) {
        TrieNode node = searchPrefix(word);
        return node != null && node.isEnd();
    }

    public boolean startsWith(String prefix) {
        return searchPrefix(prefix) != null;
    }

    private TrieNode searchPrefix(String prefix) {
        TrieNode node = root;
        for (char ch : prefix.toCharArray()) {
            if (node.containsKey(ch)) {
                node = node.get(ch);
            } else {
                return null;
            }
        }
        return node;
    }

    public static void main(String[] args) {
        Trie trie = new Trie();

        trie.insert("apple");
        System.out.println(trie.search("apple"));   // returns true
        System.out.println(trie.search("app"));     // returns false
        System.out.println(trie.startsWith("app")); // returns true
        trie.insert("app");
        System.out.println(trie.search("app"));     // returns true
    }
}
```

In this implementation, the `TrieNode` class represents each node in the trie. It contains an array of `TrieNode` references for each lowercase English letter ('a' to 'z') and a boolean flag to mark if it's the end of a word.

The `Trie` class is the main Trie data structure. It contains methods to insert a word into the trie (`insert`), search for a word in the trie (`search`), and check if a prefix exists in the trie (`startsWith`). Additionally, there are helper methods `containsKey`, `get`, `put`, and `setEnd` in the `TrieNode` class to manipulate the trie nodes efficiently.

In the `main` method, a `Trie` object is created, words are inserted into the trie, and search operations are performed to test the functionality of the Trie data structure.

### AVL Tree

```Java
class Node {
    int key, height;
    Node left, right;

    Node(int d) {
        key = d;
        height = 1;
    }
}

public class AVLTree {
    Node root;

    // Get the height of a node
    int height(Node N) {
        if (N == null)
            return 0;
        return N.height;
    }

    // Get the balance factor of a node
    int getBalance(Node N) {
        if (N == null)
            return 0;
        return height(N.left) - height(N.right);
    }

    // Right rotate subtree rooted with y
    Node rightRotate(Node y) {
        Node x = y.left;
        Node T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;

        // Return new root
        return x;
    }

    // Left rotate subtree rooted with x
    Node leftRotate(Node x) {
        Node y = x.right;
        Node T2 = y.left;

        // Perform rotation
        y.left = x;
        x.right = T2;

        // Update heights
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;

        // Return new root
        return y;
    }

    // Insert a key in the AVL tree
    Node insert(Node node, int key) {
        /* 1. Perform the normal BST insertion */
        if (node == null)
            return (new Node(key));

        if (key < node.key)
            node.left = insert(node.left, key);
        else if (key > node.key)
            node.right = insert(node.right, key);
        else // Duplicate keys not allowed
            return node;

        /* 2. Update height of this ancestor node */
        node.height = 1 + Math.max(height(node.left), height(node.right));

        /* 3. Get the balance factor of this ancestor
              node to check whether this node became
              unbalanced */
        int balance = getBalance(node);

        // If this node becomes unbalanced, then
        // there are 4 cases

        // Left Left Case
        if (balance > 1 && key < node.left.key)
            return rightRotate(node);

        // Right Right Case
        if (balance < -1 && key > node.right.key)
            return leftRotate(node);

        // Left Right Case
        if (balance > 1 && key > node.left.key) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && key < node.right.key) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }

        /* return the (unchanged) node pointer */
        return node;
    }

    // A utility function to print preorder traversal
    // of the tree.
    // The function also prints height of every node
    void preOrder(Node node) {
        if (node != null) {
            System.out.print(node.key + " ");
            preOrder(node.left);
            preOrder(node.right);
        }
    }

    public static void main(String[] args) {
        AVLTree tree = new AVLTree();

        /* Constructing tree given in the above figure */
        tree.root = tree.insert(tree.root, 10);
        tree.root = tree.insert(tree.root, 20);
        tree.root = tree.insert(tree.root, 30);
        tree.root = tree.insert(tree.root, 40);
        tree.root = tree.insert(tree.root, 50);
        tree.root = tree.insert(tree.root, 25);

        /* The constructed AVL Tree would be
                30
               /  \
             20   40
            /  \     \
           10  25    50
        */
        System.out.println("Preorder traversal" +
                           " of constructed tree is : ");
        tree.preOrder(tree.root);
    }
}
```
## Summary

The post is a guide for learning data structures using Java. It covers various essential data structures such as arrays, linked lists, stacks, queues, trees, and graphs. Each data structure is explained along with its implementation in Java, including code examples and explanations of their operations and complexities. Additionally, the post provides recommendations for resources and further reading to deepen understanding and proficiency in data structures and algorithms with Java.