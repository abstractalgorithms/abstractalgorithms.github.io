---
layout: post
title: Controlled Input vs. Uncontrolled Input in React.js
date: '2023-11-05 22:44:16 +0530'
categories: [React, Web Development]
tags: [React.js, Form Handling, Controlled Inputs, Uncontrolled Inputs]
---

In React.js, handling form inputs is a crucial aspect of building interactive web applications. Two primary approaches for managing input elements are controlled and uncontrolled inputs. In this post, we'll explore both concepts and provide examples to illustrate their differences.

## Controlled Inputs

Controlled inputs are React components where the value of the input element is controlled by the state of the component. You have full control over the input element's value, making it easy to manage and respond to user input.

### Example: Controlled Input

Let's create a simple controlled input using React:

```jsx
import React, { Component } from 'react';

class ControlledInput extends Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: '' };
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
        <p>Input Value: {this.state.inputValue}</p>
      </div>
    );
  }
}

export default ControlledInput;
```

In this example, the `inputValue` is stored in the component's state. The value of the input field is controlled by the state, and changes are managed through the `handleInputChange` event handler.

## Uncontrolled Inputs

Uncontrolled inputs, on the other hand, allow the DOM to handle the input's value. They are often used when you want to integrate React with non-React code or libraries.

### Example: Uncontrolled Input

Let's create an uncontrolled input using React:

```jsx
import React, { useRef } from 'react';

const UncontrolledInput = () => {
  const inputRef = useRef();

  const handleButtonClick = () => {
    alert(`Input Value: ${inputRef.current.value}`);
  }

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleButtonClick}>Alert Value</button>
    </div>
  );
}

export default UncontrolledInput;
```

In this example, we use the `ref` attribute to obtain the input's current value directly from the DOM. React is not responsible for tracking or updating the input value.

## Key Differences

**Controlled Inputs**:
- React controls the input value through state.
- Allows for easy validation and manipulation of the input value.
- Suitable for most use cases, especially in React-controlled environments.

**Uncontrolled Inputs**:
- Input value is controlled by the DOM.
- Useful for integrating with non-React code and libraries.
- Less common in pure React applications.

## Conclusion

The choice between controlled and uncontrolled inputs in React depends on your specific requirements. Controlled inputs offer more predictability and control, while uncontrolled inputs can be useful in certain integration scenarios. Understanding the differences between these approaches will help you make informed decisions in your React projects.