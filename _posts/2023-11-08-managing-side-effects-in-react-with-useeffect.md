---
layout: post
title: Managing Side Effects in React with useEffect
date: '2023-11-08 02:06:48 +0530'
categories: [React, JavaScript]
tags: [react hooks, useEffect, side effects, cleanup, dependency array]
---

In React, handling side effects, like data fetching, subscriptions, or manually changing the DOM, is a crucial part of building a robust application. The `useEffect` hook is your go-to solution for managing these side effects. In this post, we'll dive into how to use `useEffect`, understand its dependency array, and leverage the cleanup function.

## Using `useEffect`

`useEffect` is a React hook that allows you to perform side effects in your functional components. It accepts two arguments: a function containing your side effect code and an array of dependencies. Let's start with a basic example.

```jsx
import React, { useState, useEffect } from 'react';

function ExampleComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Side effect code here (e.g., data fetching)
    fetchData().then((result) => setData(result));
  }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

  return (
    <div>
      {/* Your component rendering */}
    </div>
  );
}
```

In this example, we use `useEffect` to fetch data when the component mounts (similar to `componentDidMount` in class components). The empty dependency array `[]` ensures that the effect runs once and doesn't re-run during component updates.

## Dependency Array

The dependency array is a critical concept when using `useEffect`. It defines when the effect should run based on changes to certain values. When the array is empty or omitted, the effect runs after every render. If you provide dependencies, the effect runs only when any of those dependencies change.

For instance:

```jsx
useEffect(() => {
  // Effect code
}, [dependency1, dependency2]);
```

In this case, the effect will run whenever `dependency1` or `dependency2` changes.

## Cleanup Function

`useEffect` also allows you to return a cleanup function. This function is useful for cleaning up any resources or subscriptions when the component unmounts. Here's an example:

```jsx
useEffect(() => {
  // Subscribe to a data source
  const subscription = subscribeToData(data => {
    // Handle data
  });

  return () => {
    // Unsubscribe when the component unmounts
    subscription.unsubscribe();
  };
}, [dependency]);
```

In this example, the cleanup function unsubscribes from the data source when the component is about to unmount.

## Conclusion

`useEffect` is a powerful tool for managing side effects in React components. Understanding the dependency array and cleanup function is crucial for using it effectively. Whether you're fetching data, subscribing to events, or managing other side effects, `useEffect` provides a clean and efficient way to handle these tasks in a functional component.