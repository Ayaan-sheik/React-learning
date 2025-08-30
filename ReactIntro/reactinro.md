# React notes


## Introduction

**React** is a JavaScript **library** (not a framework) for building user interfaces for web and native applications. It enables the creation of reusable components and provides tools to build interfaces of any complexity.

## Why Learn React?

- **Widely used & well-supported**: Large community and extensive resources.
- **Reusable components**: Facilitates scalable and efficient app development.
- **Not opinionated**: Offers flexibility in project structure and logic.
- **Smaller learning curve**: Easier to pick up if you know JavaScript, HTML, and CSS.

## Getting Started with React

There are several ways to start using React, ranging from simple `<script>` tags via CDN to advanced toolchains and frameworks for scalability and optimization.

**Popular toolchains include:**
- Vite (React template)
- Gatsby
- Next.js
- Create React App (deprecated)

**Why use toolchains?**

Manual React setup requires configuring:
- Package management (NPM, Yarn)
- Module bundling (Webpack, Parcel)
- Compilation (Babel)
- React itself

Create React App (CRA) was the standard, but it's now deprecated. The recommended way to create a React app is with Vite.

## Creating a React App with Vite

Ensure you have the **latest LTS version of Node.js** installed.

Open your terminal in your projects folder and run:

```bash
npm create vite@latest my-first-react-app -- --template react
```

You may see:

```
Need to install the following packages:
  create-vite@5.X.X
Ok to proceed? (y)
```

Press `y` and hit enter.

**Next steps:**

```bash
cd my-first-react-app
npm install
npm run dev
```

This will provide a local development link. You can open it in your browser or, in VS Code, use the Command Palette (`Ctrl + Shift + P`) and search for "Simple Browser" to view your app directly in the editor.

## Linking to github 

make a repo in github clone in ur pc and thn make the app normally.

## Project Structure

After creating your React app with Vite, your project folder will look like this:

```
my-first-react-app/
├── node_modules/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
```

**Key folders and files:**

- `public/`: Static assets (e.g., images, icons).
- `src/`: Application source code.
  - `App.jsx`: Main app component.
  - `main.jsx`: Entry point for rendering the app.
  - `index.css`: Global styles.
- `.gitignore`: Specifies files to exclude from Git.
- `package.json`: Project metadata and dependencies.
- `README.md`: Project documentation.

Entry point: src/main.jsx

```jsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

```
### Additional links

https://www.debugbear.com/blog/react-devtools for learnign react developer tools which will be useful in debugging code



# Getting started with react


## React components

What is a React components??
basically we split the app into bunch of reusable chunks that are independent of each other, combined to build a website.

![A diagram showing the flow of components in a React application.](https://cdn.statically.io/gh/TheOdinProject/curriculum/91485eec76445d86b29d35894e83324e2967f2fb/react/imgs/00.png)

for this website we have 4 components 

- App : which holds the other 3 components together and is the parent component
- Navbar
- Main article
- Newsletter signup - has inputs of email to get weekly newsletter.


### how to create components

make a new file called Greeting.jsx and thn write this function down which looks like plain js.

```jsx

function Greeting() {
  return <h1>&quot;I swear by my pretty floral bonnet, I will end you.&quot;</h1>;
}

```

Note: React components must be capatalized or wont work as intentianol

HTML escape code 

if we type " instead of &quot it wont work as intentional for some reason

## Where components live & how they share code

- Each component typically sits in its own file → keeps things modular.

- You share components via export / import.

- Since React 17+, you don’t have to import React in every component file just to use JSX.


### Additional links

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#description 

check this for any issues regarding import export issue. read through once

## What is JSX ?

- JSX is an extension of js which help us write markup in concise way . 

- not actually needed but helpful 

jsx is a synatic sugar , basically means converts

```jsx

const element = <h1>Hello, world!</h1>;

```

to 

``` js

const element = React.createElement("h1", null, "Hello, world!");

```

- it is basically js but looks like html also can embed variables using {}

## why are we using jsx?

Basically whenever we write code for webpages the markup and logic is inherently coupled but we endup writing in two seperrate files , jsx makes it so this is not needed and only each component is in a seperate file.

## Rules of JSX 

1. Should always return only one root element

  - a component must have only one root element

  - if multiple elements are present wrap it in  a <div> or a fragment (<> .... </>)

✅ Correct:

``` jsx
function App() {
  return (
    <div>
      <h1>Hello</h1>
      <p>Welcome!</p>
    </div>
  );
}

```

``` jsx 
function App() {
  return (
    <>
      <h1>Hello</h1>
      <p>Welcome!</p>
    </>
  );
}
```

❌ Incorrect:
``` jsx
function App() {
  return (
    <h1>Hello</h1>
    <p>Welcome!</p>   // ❌ Multiple root elements not allowed
  );
}
```


2. Close all tags

- all tags should be closed including the self closing ones

✅ Correct:

``` jsx

<img src="logo.png" />
<br />

```

❌ Incorrect:

``` jsx

<img src="logo.png">   // ❌ Not allowed
<br>                  // ❌ Not allowed

```

3. Use className instead of class

- Since class is a reserved JavaScript keyword, JSX uses className for CSS classes.

✅ Correct:

``` jsx

<div className="container">Hello</div>

```

❌ Incorrect:

``` jsx

<div class="container">Hello</div>   // ❌ Will throw an error

```
4. must use camelCase for attributes

- Most JSX attributes follow camelCase naming instead of HTML style.

Examples:

- onClick (not onclick)

- tabIndex (not tabindex)

- htmlFor (not for)

5. jsx must be wrapped 

- If JSX spans multiple lines, wrap it in parentheses (...) to avoid errors.

✅ Correct:

``` jsx

return (
  <div>
    <h1>Hello</h1>
  </div>
);

```
❌ Incorrect:

``` jsx

return
  <div>
    <h1>Hello</h1>
  </div>;   // ❌ Automatic semicolon insertion breaks it
```

6. Components should be capitalized (as said previously)


## Converting to html to jsx


``` html

<h1>Test title</h1>
<svg>
  <circle cx="25" cy="75" r="20" stroke="green" stroke-width="2" />
</svg>
<form>
  <input type="text">
</form>

```

- returning this would lead to many errors so lets apply the rules

``` jsx

<div>
  <h1>Test title</h1>
  <svg>
    <circle cx="25" cy="75" r="20" stroke="green" strokeWidth="2" />
  </svg>
  <form>
    <input type="text"/>
  </form>
</div>

```

- wrapped in around div for one rooot element thn closed all tags thn camelcased all atributes


## Rendering Techniques

## Rendering a list of elements

rather than listing out muliple elements from a list use array / mapping which is used in js to make life easier


Example:

basic

``` jsx
function App() {
  return (
    <div>
      <h1>Animals: </h1>
      <ul>
        <li>Lion</li>
        <li>Cow</li>
        <li>Snake</li>
        <li>Lizard</li>
      </ul>
    </div>
  );
}

```

better code 

``` jsx

function App() {
  const animals = ["Lion", "Cow", "Snake", "Lizard"];

  return (
    <div>
      <h1>Animals: </h1>
      <ul>
        {animals.map((animal) => {
          return <li key={animal}>{animal}</li>;
        })}
      </ul>
    </div>
  );
}
```

most clean code or alternative

``` jsx
function App() {
  const animals = ["Lion", "Cow", "Snake", "Lizard"];
  const animalsList = animals.map((animal) => <li key={animal}>{animal}</li>)

  return (
    <div>
      <h1>Animals: </h1>
      <ul>
        {animalsList}
      </ul>
    </div>
  );
}
```


## Rendering a list of components in jsx 

We are using props here will learn about them in detail

```jsx

function ListItem(props) {
  return <li>{props.animal}</li>
}

function List(props) {
  return (
    <ul>
      {props.animals.map((animal) => {
        return <ListItem key={animal} animal={animal} />;
      })}
    </ul>
  );
}

function App() {
  const animals = ["Lion", "Cow", "Snake", "Lizard"];

  return (
    <div>
      <h1>Animals: </h1>
      <List animals={animals} />
    </div>
  );
}

```

1. ListItem componetnt  

- This is a functional component.

- It takes props (properties passed to it by a parent component).

- Specifically, it expects a prop called animal.

- It renders an <li> (list item) with the value of props.animal.

``` jsx

function ListItem(props) {
  return <li>{props.animal}</li>
}

```

2. List component

- This is a functional component.

- It takes props (properties passed to it by a parent component).

- Specifically, it expects a prop called animal.

- It renders an <li> (list item) with the value of props.animal.

``` jsx

function List(props) {
  return (
    <ul>
      {props.animals.map((animal) => {
        return <ListItem key={animal} animal={animal} />;
      })}
    </ul>
  );
}
```

3. App Component

- Defines a constant array animals.

Renders:

- A heading <h1>Animals:</h1>.

- A List component, passing the animals array as a prop.

So now, List receives ["Lion", "Cow", "Snake", "Lizard"] and displays them as list items.

```jsx

function App() {
  const animals = ["Lion", "Cow", "Snake", "Lizard"];

  return (
    <div>
      <h1>Animals: </h1>
      <List animals={animals} />
    </div>
  );
}
```


Note: if u notice squigly lines in ur props thn add 
```js
  rules: {
    // Your other rules
    "react/prop-types": "off"
  }
```
in ur eslint.config.js file


## Conditional rendering

✅ Summary of Conditional Rendering

- Ternary (condition ? A : B) → choose between two elements.

```jsx
function List(props) {
  return (
    <ul>
      {props.animals.map((animal) => {
        return animal.startsWith("L") ? <li key={animal}>{animal}</li> : null;
      })}
    </ul>
  );
}
```

- Logical AND (condition && A) → show something only if condition is true.

```jsx
function List(props) {
  return (
    <ul>
      {props.animals.map((animal) => {
        return animal.startsWith("L") && <li key={animal}>{animal}</li>;
      })}
    </ul>
  );
}

function App() {
  const animals = ["Lion", "Cow", "Snake", "Lizard"];

  return (
    <div>
      <h1>Animals: </h1>
      <List animals={animals} />
    </div>
  );
}
```

- -If statements → best when you need multiple checks (cleaner than nested ternaries).

```jsx

function List(props) {
  if (!props.animals) {
    return <div>Loading...</div>;
  }

  if (props.animals.length === 0) {
    return <div>There are no animals in the list!</div>;
  }

  return (
    <ul>
      {props.animals.map((animal) => {
        return <li key={animal}>{animal}</li>;
      })}
    </ul>
  );
}
```

- Guard clauses → exit early with a return.

## Keys in React

1. What are keys?

- A key is a special attribute that React uses when rendering lists of elements.

- It’s usually placed on list items when you create them with .map().

```jsx 

const animals = ["Lion", "Cow", "Snake", "Lizard"];

function List() {
  return (
    <ul>
      {animals.map((animal) => (
        <li key={animal}>{animal}</li>
      ))}
    </ul>
  );
}

```
- Here, the key={animal} is the key.

- keys are like classes or ids in html css used to track the component down to add, remove or modify

### What will happen if we dont use keys ??

- React will show a error saying ⚠️ “Warning: Each child in a list should have a unique “key” prop.”

- without keys react has trouble matching elements btw renders

- this can cause bugs like loose input values

## what should a key look like 

- make it smthng unique but not smthng random by using .randomUUID() . Reason: every render will create a new key which will cause bugs

- using array indices may cause issues if elements are deleted or added in the render


### Additional info abt keys

- https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key

- https://youtu.be/xlPxnc5uUPQ


## Passing data between components

in reacts data transfer is from parent to children , which is unidirectional . Any changes made to data will only affect children not siblings.This restriction of flow of data gives us explicit control over it.

### Using props in react

Lets say we want to create ten buttons with different messages in them or some changes are we gonna make 10 different buttons???? 

```jsx

function Button() {
  return (
    <button>Click Me!</button>
  );
}

function Button2() {
  return (
    <button>Don't Click Me!</button>
  );
}

export default function App() {
  return (
    <div>
      <Button />
      <Button2 />
      <Button />
    </div>
  );
}

```

- here we are making two different buttons what if we want to be more efficient

- lets use props

```jsx 

function Button(props) {
  const buttonStyle = {
    color: props.color,
    fontSize: props.fontSize + 'px'
  };

  return (
    <button style={buttonStyle}>{props.text}</button>
  );
}

export default function App() {
  return (
    <div>
      <Button text="Click Me!" color="blue" fontSize={12} />
      <Button text="Don't Click Me!" color="red" fontSize={12} />
      <Button text="Click Me!" color="blue" fontSize={20} />
    </div>
  );
}

```



### prop destructuring 

basically instead of putting props as parameter in function button we use {text,fontSize,color}.  

```jsx

function Button({ text, color, fontSize }) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + "px"
  };

  return <button style={buttonStyle}>{text}</button>;
}

export default function App() {
  return (
    <div>
      <Button text="Click Me!" color="blue" fontSize={12} />
      <Button text="Don't Click Me!" color="red" fontSize={12} />
      <Button text="Click Me!" color="blue" fontSize={20} />
    </div>
  );
}
```

We can have default props by using =

```jsx
function Button({ text = "Click Me!", color = "blue", fontSize = 12 }) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + "px"
  };

  return <button style={buttonStyle}>{text}</button>;
}

export default function App() {
  return (
    <div>
      <Button />
      <Button text="Don't Click Me!" color="red" />
      <Button fontSize={20} />
    </div>
  );
}
```


### Functions as props

we can also pass functions through props lets see an example.

```jsx 

function Button({ text = "Click Me!", color = "blue", fontSize = 12, handleClick }) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + "px"
  };

  return (
    <button onClick={handleClick} style={buttonStyle}>
      {text}
    </button>
  );
}

export default function App() {
  const handleButtonClick = (url) => {
    window.location.href = url;
  };

  return (
    <div>
      <Button handleClick={() => handleButtonClick("https://www.theodinproject.com")} />
      <Button handleClick={() => handleButtonClick("https://www.google.com")} />
    </div>
  );
}

```


- why () => syntax is used??
  - If you wrote handleClick={handleButtonClick("https://...")}, the function would execute immediately during render.

  - By wrapping it in an anonymous function (() => handleButtonClick("...")), you only call it when the button is actually      clicked.


### curried functions
A curried function is a function that doesn’t take all its arguments at once.
Instead, it takes them one at a time and returns a new function until all arguments are provided.

Normal function 

``` jsx

function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5

```
curried function
```jsx
function curriedAdd(a) {
  return function(b) {
    return a + b;
  };
}

console.log(curriedAdd(2)(3)); // 5
```


- curried functions are usually used for urls . Like below

```jsx
const handleButtonClick = (url) => () => {
  window.location.href = url;
};

<Button handleClick={handleButtonClick("https://google.com")} />
<Button handleClick={handleButtonClick("https://theodinproject.com")} />
```
this is better than writing "() =>" everysingle time and doesnt render instantly
