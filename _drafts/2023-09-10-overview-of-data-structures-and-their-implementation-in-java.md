---
layout: post
title: Overview of Data Structures and Their Implementation in Java
date: '2023-09-10 19:20:04 +0530'
tags: [data-structures, java]
categories: [Data Structures, Algorithms, Programming, Java]
---
## Introduction

Data structures are essential for solving complex problems efficiently. They define the way data is stored, organized, and accessed. In Java, these data structures are typically implemented using classes and interfaces provided by the Java Collections Framework.

## Arrays

An array is a fixed-size, ordered collection of elements of the same type. In Java, arrays are defined using square brackets. Here's an example of declaring and initializing an array in Java:

```java
int[] numbers = {1, 2, 3, 4, 5};
```

## Linked Lists

A linked list is a dynamic data structure where each element is called a "node." Nodes contain both data and a reference to the next node in the sequence. In Java, linked lists can be implemented using `LinkedList` or by creating custom classes.

```java
LinkedList<String> linkedList = new LinkedList<>();
linkedList.add("Apple");
linkedList.add("Banana");
linkedList.add("Cherry");
```

## Stacks

A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. In Java, you can implement a stack using the `Stack` class or by using the `Deque` interface.

```java
Stack<Integer> stack = new Stack<>();
stack.push(1);
stack.push(2);
stack.pop(); // Removes and returns 2
```

## Queues

A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. In Java, you can implement a queue using the `Queue` interface or classes like `LinkedList` or `ArrayDeque`.

```java
Queue<String> queue = new LinkedList<>();
queue.offer("Alice");
queue.offer("Bob");
queue.poll(); // Removes and returns "Alice"
```

## Trees

Trees are hierarchical data structures that consist of nodes connected by edges. Binary trees, binary search trees, and balanced trees like AVL and Red-Black trees are common types. Implementations can vary widely.

```java
// Binary Search Tree
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int val) {
        this.val = val;
    }
}
```

## Graphs

Graphs are a collection of nodes (vertices) and edges that connect them. Java provides various ways to implement graphs, such as adjacency lists or matrices.

```java
// Graph represented as an adjacency list
Map<Integer, List<Integer>> graph = new HashMap<>();
graph.put(0, Arrays.asList(1, 2));
graph.put(1, Arrays.asList(0, 3));
graph.put(2, Arrays.asList(0, 4));
```

## Hash Tables

A hash table is a data structure that uses a hash function to map keys to values. In Java, you can use `HashMap` or `HashTable` for hash table implementations.

```java
HashMap<String, Integer> hashMap = new HashMap<>();
hashMap.put("apple", 5);
hashMap.put("banana", 3);
int count = hashMap.get("apple"); // Retrieves the value 5
```

## PriorityQueue

A `PriorityQueue` is an ordered collection where elements are dequeued based on their priority. It's implemented using a heap data structure. Here's a Java example:

```java
PriorityQueue<Integer> priorityQueue = new PriorityQueue<>();
priorityQueue.add(3);
priorityQueue.add(1);
priorityQueue.add(2);
int min = priorityQueue.poll(); // Retrieves and removes 1
```

## Deque

A `Deque` (Double-Ended Queue) is a linear data structure that supports insertion and removal from both ends. Java provides the `Deque` interface and implementations like `ArrayDeque`.

```java
Deque<String> deque = new ArrayDeque<>();
deque.addFirst("Front");
deque.addLast("Rear");
String front = deque.pollFirst(); // Removes and returns "Front"
```

## BlockingQueue

A `BlockingQueue` is a thread-safe queue that supports blocking operations like waiting for elements to become available. Java provides `BlockingQueue` implementations like `ArrayBlockingQueue` and `LinkedBlockingQueue`.

```java
BlockingQueue<String> blockingQueue = new ArrayBlockingQueue<>(10);
blockingQueue.put("Item");
String item = blockingQueue.take(); // Retrieves and removes "Item"
```

## ArrayBlockingQueue

An `ArrayBlockingQueue` is a bounded `BlockingQueue` with a fixed capacity. It ensures blocking when the queue is full.

```java
BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(5);
queue.put(1);
queue.put(2);
int item = queue.take(); // Retrieves and removes 1
```

## LinkedBlockingQueue

A `LinkedBlockingQueue` is an unbounded `BlockingQueue` that grows dynamically.

```java
BlockingQueue<String> queue = new LinkedBlockingQueue<>();
queue.put("One");
queue.put("Two");
String item = queue.take(); // Retrieves and removes "One"
```

## EnumMap

An `EnumMap` is a specialized map that uses enum constants as

 keys. It offers fast and efficient key-value pair storage for enums.

```java
EnumMap<DayOfWeek, String> enumMap = new EnumMap<>(DayOfWeek.class);
enumMap.put(DayOfWeek.MONDAY, "Work");
String task = enumMap.get(DayOfWeek.MONDAY); // Retrieves "Work"
```

## LinkedHashMap

A `LinkedHashMap` is a map that maintains the order of key-value pairs based on insertion order.

```java
LinkedHashMap<String, Integer> linkedHashMap = new LinkedHashMap<>();
linkedHashMap.put("one", 1);
linkedHashMap.put("two", 2);
Set<String> keys = linkedHashMap.keySet(); // Retrieves keys in insertion order
```

## WeakHashMap

A `WeakHashMap` is a map that allows keys to be garbage collected when they are no longer strongly referenced elsewhere.

```java
WeakHashMap<Key, Value> weakHashMap = new WeakHashMap<>();
Key key = new Key();
weakHashMap.put(key, value);
```

## TreeMap

A `TreeMap` is a map implementation that stores key-value pairs in a sorted order based on the keys' natural ordering or a custom comparator.

```java
TreeMap<String, Integer> treeMap = new TreeMap<>();
treeMap.put("apple", 5);
treeMap.put("banana", 3);
Map.Entry<String, Integer> entry = treeMap.firstEntry(); // Retrieves the first entry
```

## ConcurrentHashMap

A `ConcurrentHashMap` is a thread-safe map that allows multiple threads to read and write concurrently without blocking.

```java
ConcurrentHashMap<String, Integer> concurrentMap = new ConcurrentHashMap<>();
concurrentMap.put("apple", 5);
concurrentMap.put("banana", 3);
int count = concurrentMap.get("apple"); // Retrieves the value 5
```

## HashSet

A `HashSet` is a set implementation that does not allow duplicate elements.

```java
HashSet<String> hashSet = new HashSet<>();
hashSet.add("apple");
hashSet.add("banana");
boolean containsApple = hashSet.contains("apple"); // Checks if "apple" is present
```

## EnumSet

An `EnumSet` is a specialized set for enums, providing fast and efficient storage and operations.

```java
EnumSet<DayOfWeek> days = EnumSet.allOf(DayOfWeek.class);
days.add(DayOfWeek.SATURDAY);
boolean containsSunday = days.contains(DayOfWeek.SUNDAY); // Checks if Sunday is present
```

## LinkedHashSet

A `LinkedHashSet` is a set implementation that maintains the order of elements based on insertion order.

```java
LinkedHashSet<String> linkedHashSet = new LinkedHashSet<>();
linkedHashSet.add("apple");
linkedHashSet.add("banana");
Set<String> elements = linkedHashSet; // Retrieves elements in insertion order
```

## NavigableSet

A `NavigableSet` is a sorted set that provides efficient navigation and range queries.

```java
NavigableSet<Integer> set = new TreeSet<>();
set.add(3);
set.add(1);
set.add(2);
int first = set.first(); // Retrieves the first element
```

## TreeSet

A `TreeSet` is a sorted set implementation that stores elements in a sorted order based on natural ordering or a custom comparator.

```java
TreeSet<String> treeSet = new TreeSet<>();
treeSet.add("apple");
treeSet.add("banana");
String first = treeSet.first(); // Retrieves the first element
```
