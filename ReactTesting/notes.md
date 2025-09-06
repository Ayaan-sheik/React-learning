# Setting up React Testing (with Vite)

- Step 1: install vite on the cli using the command `npm install vitest --save-dev`

- Step 2: add a script in ur package.json file which will run the tests eventually

```json
{
  ...
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest",
    "preview": "vite preview"
  },
  ...
}
```

- Create a test file somewhere in ur project with suffix test eg.App.test.jsx and give the following content

```jsx
import { describe, it, expect } from 'vitest';

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});

```

- run `npm run test` to run tests


# Vitest with React test Library

- Since React Testing Library tests React components, we need to enable HTML in Vitest with a library like jsdom. First, install the library on the command line:

`npm install jsdom --save-dev`

- secondly include the vite configuration file

```jsx
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
});

```

- Third , install react test library on the cli:
` npm install @testing-library/react @testing-library/jest-dom --save-dev`

- Fourth, add a test setup file in tests/setup.js and give it the following implementation:

```jsx
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

- lastly update the vite's config file , in addition make all imports from Vitest global so that u dont have to make these imports in the future.

```jsx
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
});
```

- now u can debug and render components in vitest

```jsx
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders headline', () => {
    render(<App title="React" />);

    screen.debug();

    // check if App components renders headline
  });
});
```

- add a last package `npm install @testing-library/user-event --save-dev`

- As now we have installed all these packages lets go over what they actually do 

    - `@testing-library/react` will give us access to useful functions like `render` which we’ll demonstrate later on.

    - `@testing-library/jest-dom` includes some handy custom matchers (assertive functions) like `toBeInTheDocument` and more. (complete list on [jest-dom’s github](https://github.com/testing-library/jest-dom)). Jest already has a lot of matchers so this package is not compulsory to use.

    - `@testing-library/user-event` provides the `userEvent` API that simulates user interactions with the webpage.


- Add this in vite.config.js to make importing shit from src file easier by using alias

```jsx
...
import path from 'path'   // 👈 add this import
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
});


/// in app.test.jsx file
import App from '@/App.jsx';
```


## our First Query (render)

First, we’ll render the component using render. The API will return an object and we’ll use destructuring syntax to obtain a subset of the methods required. You can read all about what render can do in the [React Testing Library API docs about render](https://testing-library.com/docs/react-testing-library/api/#render).


```jsx
// App.jsx

const App = () => <h1>Our First Test</h1>;

export default App;
// App.test.jsx

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("renders correct heading", () => {
    render(<App />);
    expect(screen.getByRole("heading").textContent).toMatch(/our first test/i);
  });
});

```

Execute `npm test App.test.jsx` on the terminal and see the test pass. `getByRole` is just one of the dozen query methods that we could’ve used. Essentially, queries are classified into three types: `getBy`, `queryBy` and `findBy`. Go through the [React Testing Library docs page about queries](https://testing-library.com/docs/queries/about/). Pay extra attention to the “Types of Queries” and “Priority” sections.

As stated by the React Testing Library docs, `ByRole` methods are favored methods for querying, especially when paired with the `name` option. For example, we could improve the specificity of the above query like so: `getByRole("heading", { name: "Our First Test" })`. Queries that are done through `ByRole` ensure that our UI is accessible to everyone no matter what mode they use to navigate the webpage (i.e. mouse or assistive technologies).

# Simulating User Events in React Testing

There are numerous ways a user can interact with a webpage. Even though live user feedback and interaction is irreplaceable, we can still build some confidence in our components through tests.

Here’s a simple example: a button which changes the heading of the `App` when clicked.

---

## App.jsx

```jsx
import { useState } from "react";

const App = () => {
  const [heading, setHeading] = useState("Magnificent Monkeys");

  const clickHandler = () => {
    setHeading("Radical Rhinos");
  };

  return (
    <>
      <button type="button" onClick={clickHandler}>
        Click Me
      </button>
      <h1>{heading}</h1>
    </>
  );
};

export default App;

// App.test.jsx

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App component", () => {
  it("renders magnificent monkeys", () => {
    // since screen does not have the container property, we'll destructure render to obtain a container for this test
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("renders radical rhinos after button click", async () => {
    const user = userEvent.setup();

    render(<App />);
    const button = screen.getByRole("button", { name: "Click Me" });

    await user.click(button);

    expect(screen.getByRole("heading").textContent).toMatch(/radical rhinos/i);
  });
});
```

The tests speak for themselves:

- In the first test, we utilize snapshots to check whether all the nodes render as we expect them to.

- In the second test, we simulate a click event using `userEvent`. Then we check if the heading changed.

Notice that the callback function for the second test is `async`, as we need this in order to `await user.click()`.

It’s also important to note that after every test, React Testing Library unmounts the rendered components. That’s why we render for each test. For many tests for a component, a custom setup function could prove handy.


## What are snapshots?

Snapshot testing is just comparing our rendered component with an associated snapshot file. For example, the snapshot file which was automatically generated after we ran the “renders magnificent monkeys” test was:

```jsx
// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports[`App component > renders magnificent monkeys 1`] = `
<div>
  <button
    type="button"
  >
    Click Me
  </button>
  <h1>
    Magnificent Monkeys
  </h1>
</div>
`;
```

It’s an HTML representation of the `App` component. And it will be compared against the `App` in future snapshot assertions. If the `App` changes even slightly, the test fails.

Snapshot tests are fast and easy to write. One assertion saves us from writing multiple lines of code. For example, with a `toMatchSnapshot`, we’re spared of asserting the existence of the button and the heading. They also don’t let unexpected changes creep into our code. Read all about what can be achieved with snapshots in the [Vitest snapshot docs](https://vitest.dev/guide/snapshot.html).

Snapshots might seem the best thing that has happened to us while testing thus far. But we are forced to wonder, what exactly are we testing? What’s being validated? If a snapshot passes, what does it convey about the correctness of the component?

Snapshot tests may cause false positives. Since we cannot ascertain the validity of the component from a snapshot test, a bug might go undetected. Over-reliance on snapshots can make developers more confident about their code than they should be.

The other issue with snapshots is false negatives. Even the most insignificant of changes compel the test to fail. Fixing punctuation? Snapshot will fail. Replacing an HTML tag to a more semantic one? Snapshot will fail. This might cause us to lose our confidence in the test suite altogether. Snapshots aren’t inherently bad; they do serve a purpose. But it’s beneficial to understand when to snapshot, and when not to snapshot.