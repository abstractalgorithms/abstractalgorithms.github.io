---
layout: post
title: 'Understanding State in React: Class Component vs. Function Component'
date: '2023-11-05 16:55:02 +0530'
categories: [React, JavaScript]
tags: [State Management, Class Component, Function Component, React State]
---

React is a popular JavaScript library for building user interfaces, and one of its core concepts is "state." State represents the dynamic data that a component can maintain and update over time. In this post, we'll explore how to work with state in React, covering both class components and function components.

## State in Class Components

Class components were the traditional way of building React applications before the introduction of hooks. To manage state in class components, you would use the `this.state` object.

Here's an example of a class component that uses state:

```javascript
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}

export default Counter;
```

In this example, we define an initial state for the `count` and use `this.setState` to update it when the "Increment" button is clicked.

## State in Function Components

With the introduction of hooks, function components can also manage state. The `useState` hook allows you to add state to functional components.

Here's the same counter example using a function component:

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}

export default Counter;
```

In this function component, `useState` is used to declare the `count` state variable and the `setCount` function to update it.

## Conclusion

State is a fundamental concept in React, and it's essential to understand how to work with it. Whether you're using class components with `this.state` or function components with hooks like `useState`, React provides you with tools to manage and update your component's state.