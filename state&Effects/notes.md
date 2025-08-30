# State & Effects

## What is State???

So we write components that are parts of a page so often times we want to change how to componet works or visually changes when a component is interacted over ,this can be done in React by using smthng called `useState` .

So state is basically just a memory block in react and react changes between memory to show changes .

Lets see this through a example code

``` jsx

import React, { useState } from "react";

const COLORS = ["pink", "green", "blue", "yellow", "purple"];

function App() {
  const [backgroundColor, setBackgroundColor] = useState(COLORS[0]);

  const onButtonClick = (color) => () => {
    setBackgroundColor(color);
  };

  return (
    <div style={{ backgroundColor }}>
      {COLORS.map((color) => (
        <button
          key={color}
          onClick={onButtonClick(color)}
          className={backgroundColor === color ? "selected" : ""}
        >
          {color}
        </button>
      ))}
    </div>
  );
}

```
- in this app.jsx file what is happening is the background changes based on what button is clicked.
- the snippet or how that code works is in the folder 

So we are using smthng new here to change states that is `useState` so lets see how this works exactly

- The `useState` is a builtIn react hook that lets u change the state in react .
- It takes in one parameter i.e the initialValue and return an array of currentState and updated State which we can destruct .

So basically in our case

```jsx

const [stateValue, setStateValue] = useState(initialValue);

// adapted for our use case:
const [backgroundColor, setBackgroundColor] = useState(initialColor);
```

## What is the theory behind React state?

so basically what happens is when u click the blue button react updates the storedState value for background color to pink, thn it compares its stored values to previous DOM and compares with new virtual dom thn only does minimal changes to the new Real DOM.

When you click blue:

1. You don’t get a new state object each time — instead, React updates the stored state value it already has internally.

    - Before click: backgroundColor = "pink"

    - After click: backgroundColor = "blue"

2. React then re-runs your component function.

    - It creates a new virtual DOM tree (with backgroundColor = "blue").

    - So yes, it’s like “recreating the component from scratch” in memory.

3. React compares the old virtual DOM (where background was "pink") with the new one (where background is "blue").

    - This comparison is called reconciliation.

4. React then updates only the differences in the real DOM.

    - It doesn’t wipe the whole DOM.

    - It just changes the <div>’s style.backgroundColor and the className of the selected button.



## Hooks

Hooks are functions that let u use React features.Hooks have a prefix `use`. 

Hooks have two rules:

- Hooks can only be called from the top level of a functional component.
    
- Hooks can’t be called from inside loops or conditions.

### Assignment

add code to the backgorunf color project . so that every time the background color change display it .

*mistakes* while making the code :

- firstly i tried creating a global count and thn incrementing it while also having a useState hook which had count,setCOunt as return types . 

- what i learnt is count is a value storing the current state and setCount is a function to update state so if u do `setcount(5)` it changes count to 5 


## How to structure state ??

Managing the structure is crucial when working with react as it will help in debugging faster and also make the code more readable.

1. State should not be mutated:

- Mutating state is no-go in react as it will lead to unpredictible results . State is treated as immutable but if ur using array or objects dont mutate it .

- to change state use `setState` function .

```jsx

function Person() {
  const [person, setPerson] = useState({ name: "John", age: 100 });

  // BAD - Don't do this!
  const handleIncreaseAge = () => {
    // mutating the current state object
    person.age = person.age + 1;
    setPerson(person);
  };

  // GOOD - Do this!
  const handleIncreaseAge = () => {
    // copy the existing person object into a new object
    // while updating the age property
    const newPerson = { ...person, age: person.age + 1 };
    setPerson(newPerson);
  };

  return (
    <>
      <h1>{person.name}</h1>
      <h2>{person.age}</h2>
      <button onClick={handleIncreaseAge}>Increase age</button>
    </>
  );
}
```
### Objects and arrays in state
``` 
In above example we create a new object and changed the age in it . then setPerson as the new Object instead of mutating the object. This is because if dont give setPErson and new object it wont know what to use to re-render the page.

```
## How state updates:

so if u add a `console.log()` statement after in the component u will notice that the console.log is showing twice!!!.

```jsx
function Person() {
  const [person, setPerson] = useState({ name: "John", age: 100 });

  const handleIncreaseAge = () => {
    console.log("in handleIncreaseAge (before setPerson call): ", person);
    setPerson({ ...person, age: person.age + 1 });
    // we've called setPerson, surely person has updated?
    console.log("in handleIncreaseAge (after setPerson call): ", person);
  };

  // this console.log runs every time the component renders
  // what do you think this will print?
  console.log("during render: ", person);

  return (
    <>
      <h1>{person.name}</h1>
      <h2>{person.age}</h2>
      <button onClick={handleIncreaseAge}>Increase age</button>
    </>
  );
}
```

![code logs](https://cdn.statically.io/gh/TheOdinProject/curriculum/103edd69831b1f0e946258009fe36a462c70c163/react/states_and_effects/more_on_state/imgs/00.png)


So what exactly is happening here:

- So initially renders and sets persons afe to 100.
- the button is clicked makes it re-render before updating the age. so still age is 100
- thn it realises that age needs to be updates the age and thn console.logs 101

(100) => (100) => (101)

## State updater functions

```jsx

setPerson({ ...person, age: person.age + 1 });
setPerson({ ...person, age: person.age + 1 });

```

when  u see this code initially it should increase the persons code by 2??.Why this happens cause react is replacing person.age with the number not person.age + 1. BAsically `person.age() => 101` and not `person.age() => person.age() +1`

to fix this use the state updater function

```jsx 
setPerson((prevPerson) => ({ ...prevPerson, age: prevPerson.age + 1 }));
setPerson((prevPerson) => ({ ...prevPerson, age: prevPerson.age + 1 }));
```
Here, React passes the latest state into your callback each time, so:

- First call → age = 101.
- Second call → age = 102.
State Updater Function:
- A special form of the setState call, where instead of directly passing the new state value, you pass a function that receives the previous state and returns the updated state.

basically :

❌Incorrect:

```jsx 
setCount(count + 1);
```
// works but multiple in same component causes issues

✅Correct:
```jsx
setCount((prevCount) => prevCount + 1);
```

Whenever multiple updates happen to same variable . React ends up re-rendering only once, React smart like that.

updaters arent necessary but are helpful for consistency over verbosity.

## Controlled Compoments:

A controlled component is a form element in React where the input value is driven by React state, making React the single source of truth.

in short lets us have more power over the content .

- controlled components are basically live in React's State , helpful to in RL output info based on input .Like auto search complete , visual changes etc...


- uncontrolled components will function based on browser behaviour.

🔹 Example: Controlled Input

```jsx 

import { useState } from "react";

function Form() {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={name}       // controlled by state
        onChange={handleChange}
      />
      <p>Hello, {name}!</p>
    </div>
  );
}
```

🔹 Uncontrolled component (for contrast)
```jsx
function Form() {
  return (
    <div>
      <input type="text" />
    </div>
  );
}
```
# more core concepts

## Conditional Rendering

In React, you often need to render different UI elements based on certain conditions or state.

*Methods*

  - If/Else statements: Good for complex logic.

  - Ternary operator: condition ? <ExpressionA /> : <ExpressionB /> for simple if/else.

  - Logical AND (&&): condition && <Expression /> for rendering something only if a condition is true.

  - Switch statements: For handling multiple, distinct cases.

Example 1: Ternary Operator
```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h2>Welcome back!</h2> : <h2>Please log in</h2>}
    </div>
  );
}
```

Example 2: Logical AND (&&) Operator
```jsx
function Cart({ items }) {
  return (
    <div>
      <h2>Cart</h2>
      {items.length > 0 && <p>You have {items.length} items</p>}
    </div>
  );
}
```


Example 3: Full If-Else Logic

For more complex scenarios, you can use standard if statements before the return statement.

```jsx
function Status({ status }) {
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  
  if (status === "error") {
    return <p>An error occurred while fetching data.</p>;
  }
  
  return <p>Data loaded successfully!</p>;
}

```


this is also taught in this lesson earlier.
## useEffect

The useEffect hook lets you perform side effects in functional components (things that happen outside rendering, like fetching data, subscriptions, timers, DOM manipulations).

```jsx
useEffect(() => {
  // side effect code
  return () => {
    // cleanup (optional)
  };
}, [dependencies]);
```

- First argument → A function containing your side effect code.

- Return function (optional) → A "cleanup" function that runs before the component unmounts or before the effect runs again (e.g., clearing timers, removing event listeners).

- Dependency array:

  - [] → Run the effect once after the initial render (like componentDidMount).

  - [state, prop] → Run the effect whenever the values in the array change.

  - No array → Run the effect on every single render.

```jsx 
import React, { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Side effect: fetching API data
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []); // runs once

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (<li key={user.id}>{user.name}</li>))}
      </ul>
    </div>
  );
}
```

## useContext

The useContext hook allows you to share state/data between components without "prop drilling" (passing props down through many levels of components).

*Steps*

  1. Create a context with React.createContext().

  2. Wrap the components that need access to the context with a Provider component.

  3. Consume the data in any child component using the useContext hook.

Example: Dark Mode Context

```jsx
import React, { createContext, useContext, useState } from "react";

// 1. Create Context
const ThemeContext = createContext();

// 2. Provider Component
function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Consumer Component
function ThemeToggle() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "Switch to Light" : "Switch to Dark"}
    </button>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <h1>useContext Example</h1>
      <ThemeToggle />
    </ThemeProvider>
  );
}
```

✅ Here, useContext avoids passing darkMode and setDarkMode through props from App to ThemeToggle.

## useRef

The useRef hook gives you a mutable object (.current property) that:

    Persists its value across renders (it doesn’t get reset).

    Does not cause a re-render when its value is updated.

    Can be used to directly reference and interact with DOM elements.


Example 1: Accessing DOM

```jsx
import React, { useRef } from "react";

function InputFocus() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    // direct DOM access via .current
    inputRef.current.focus(); 
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Click button to focus" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
```
Example 2: Storing a Previous Value
```jsx
import React, { useState, useEffect, useRef } from "react";

function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    // update the ref's .current property
    prevCountRef.current = count; 
  }, [count]); // This runs *after* the render

  return (
    <div>
      <h2>Current: {count}</h2>
      {/* The rendered value is from the *previous* render cycle */}
      <h2>Previous: {prevCountRef.current}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
