---
layout: post
title: 'Rules for using ReactJS Hooks'
date: '2023-11-10 23:10:02 +0530'
tags: [ReactJS, Fragments, Web Development, JavaScript]
categories: [React, Frontend Development, JavaScript]
---

## Introduction

ReactJS has evolved over the years, and with the introduction of hooks in version 16.8, managing state and side effects in functional components became more elegant and efficient. In this blog post, we'll delve into the rules for using ReactJS hooks, provide examples, and explore common use cases.

## Understanding ReactJS Hooks

### Rule 1: Only Call Hooks at the Top Level

In a functional component, hooks should always be called at the top level. Avoid placing them inside loops, conditions, or nested functions. This ensures that hooks are called in the same order on every render.

```jsx
// Good: Hooks are called at the top level
function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Rule 2: Call Hooks from React Function Components

Hooks can only be used in React function components or custom hooks. Do not call them from regular JavaScript functions or class components.

```jsx
// Good: Hooks are used in a React function component
function MyComponent() {
  const [value, setValue] = useState('');

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

### Rule 3: Use the Same Order for Hooks

Maintain a consistent order for calling hooks in your component. This order should not change between renders, ensuring that React can correctly associate state and hooks.

```jsx
// Good: Hooks are called in the same order
function MyComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // ...
}
```

## Commonly Used ReactJS Hooks

### useState

The `useState` hook is used to add state to functional components.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### useEffect

`useEffect` is used for handling side effects in functional components, such as data fetching or subscribing to external events.

```jsx
function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from an API
    fetchData().then((result) => setData(result));
  }, []);

  return <div>{data ? <p>Data: {data}</p> : <p>Loading...</p>}</div>;
}
```

## Conclusion

ReactJS hooks provide a powerful and concise way to manage state and side effects in functional components. By following the rules and examples outlined in this post, you can harness the full potential of hooks in your React applications.