---
layout: post
title: JavaScript Import Variations Explained with Examples
date: '2023-09-03 10:19:27 +0530'
tags: [JavaScript, ES6, Import, Modules]
categories: [Web Development]
---
JavaScript's module system has evolved significantly with the introduction of ECMAScript 6 (ES6) and beyond. This post aims to explain the various import variations available for modules in JavaScript.

In JavaScript, the `import` statement is used to import modules, functions, classes, or variables from other JavaScript files or modules. There are several variations of the `import` statement, depending on how you want to import and use the code from another module. Here are some common variations:

1. **Default Import:** This is used to import the default export from a module. In a module that exports something as default, you can import it like this:

   ```javascript
   import myDefault from './my-module';
   ```

2. **Named Import:** This is used to import specific exports (variables, functions, or classes) from a module. You can import multiple named exports by enclosing them in curly braces.

   ```javascript
   import { namedExport1, namedExport2 } from './my-module';
   ```

3. **Namespace Import:** This allows you to import all exports from a module under a namespace object. This is useful when you want to import everything from a module.

   ```javascript
   import * as myModule from './my-module';
   ```

4. **Combining Default and Named Imports:** You can combine default and named imports in a single `import` statement.

   ```javascript
   import myDefault, { namedExport1, namedExport2 } from './my-module';
   ```

5. **Renaming Imports:** You can rename imported variables to avoid naming conflicts.

   ```javascript
   import { namedExport1 as alias1, namedExport2 as alias2 } from './my-module';
   ```

6. **Dynamic Imports (ES6 Import()):** You can use dynamic imports to import modules conditionally or asynchronously. This returns a Promise that resolves to the module.

   ```javascript
   import('./my-module')
     .then((module) => {
       // Use module.default or module.namedExport1
     })
     .catch((error) => {
       console.error('Error loading module:', error);
     });
   ```

7. **Importing All Exports with 'import *':** You can import all exports (both default and named) from a module using the `* as` syntax.

   ```javascript
   import * as myModule from './my-module';
   // Access as myModule.default and myModule.namedExport1
   ```

Note that the exact syntax and capabilities of `import` statements depend on the module system you are using (CommonJS, ES6 Modules, AMD, etc.) and the JavaScript environment (Node.js, browsers) in which your code is running. The examples provided above are primarily for ES6 Modules, which is the modern module system used in modern JavaScript environments like browsers and recent versions of Node.js.
