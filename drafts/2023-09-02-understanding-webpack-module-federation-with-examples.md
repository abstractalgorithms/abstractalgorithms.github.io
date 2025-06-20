---
layout: post
title: Understanding Webpack Module Federation with Examples
date: '2023-09-02 19:16:47 +0530'
tags: [Webpack, Module Federation, JavaScript]
categories: [Web Development]
---
Webpack Module Federation is an exciting feature that allows you to share and dynamically load code between different JavaScript applications or micro-frontends. It enables you to build scalable, maintainable, and modular applications.

In this post, we will delve into the concept of Webpack Module Federation and provide practical examples to help you understand how it works.

## Basic Concepts

Webpack Module Federation introduces the following key concepts:

- **Host**: The main application that consumes remote modules.
- **Remote**: A standalone application or micro-frontend that exposes its modules for consumption by the host or other remotes.
- **Shared Modules**: Modules that are shared between different remotes to prevent code duplication.

## Getting Started

Let's start with a basic example to illustrate how Webpack Module Federation works.

### Step 1: Set Up Your Environment

Ensure you have Node.js and npm installed.

### Step 2: Create Host and Remote Applications

Create two separate directories for your host and remote applications:

```bash
mkdir host-app
mkdir remote-app
```

### Step 3: Install Dependencies

In each application directory, initialize a new Node.js project and install the necessary dependencies:

```bash
# In host-app
cd host-app
npm init -y
npm install webpack webpack-dev-server webpack-cli

# In remote-app
cd remote-app
npm init -y
npm install webpack webpack-cli
```

### Step 4: Configure Webpack

In both applications, create a `webpack.config.js` file and configure Webpack. Below is an example configuration for the host application:

```javascript
// host-app/webpack.config.js
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  // ...
  plugins: [
    new ModuleFederationPlugin({
      name: "host_app",
      remotes: {
        remote_app: "remote_app@http://localhost:3001/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
};
```

And for the remote application:

```javascript
// remote-app/webpack.config.js
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  // ...
  plugins: [
    new ModuleFederationPlugin({
      name: "remote_app",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button",
      },
      shared: ["react", "react-dom"],
    }),
  ],
};
```

### Step 5: Create Modules

In the remote application (`remote-app`), create a module that you want to expose. For example, create a `Button.js` file:

```javascript
// remote-app/src/Button.js
import React from "react";

const Button = ({ text }) => {
  return <button>{text}</button>;
};

export default Button;
```

### Step 6: Use the Remote Module in the Host

In the host application (`host-app`), you can now import and use the remote module:

```javascript
// host-app/src/index.js
import React from "react";
import ReactDOM from "react-dom";
import Button from "remote_app/Button";

const App = () => {
  return (
    <div>
      <h1>Host Application</h1>
      <Button text="Click Me!" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```

### Step 7: Start Both Applications

You can now start both applications:

```bash
# In host-app
npm start

# In remote-app
npm start
```

Visit `http://localhost:3000` (host) and `http://localhost:3001` (remote) in your browser to see the remote module being consumed by the host application.

## Advanced Usage

Webpack Module Federation offers various advanced features, such as asynchronous loading, sharing different versions of shared modules, and more. You can explore these features to build complex micro-frontends.
