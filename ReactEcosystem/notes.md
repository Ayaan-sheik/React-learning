# Type Checking with Prototypes

Type checking ensures correct data types for variables, function parameters, and return values. In React, PropTypes is used to validate component props, helping catch type errors early and making debugging easier. Linters often flag missing prop validations, highlighting their importance in development.

Im Skipping this topic cause isnt available from version 19 onwards..

# React Router

So far, you've only worked with **single-page applications (SPAs)**---apps that show everything on one page and update content dynamically without reloading.

For **larger applications**, multiple pages are needed (e.g., Home, About, Contact). Normally, navigating between pages involves making requests to the server. But in modern web apps, we want **smooth navigation** without full reloads.

That's where the **browser's History API** comes in---it lets JavaScript control the browser's URL and navigation without refreshing the page.

In React, we use **React Router**, a library that builds on top of this API. It makes it easy to define different routes (paths like `/home` or `/about`) and decide which components should render for each path, enabling **seamless, client-side navigation**.


## Client Side Routing

Client Side Routing is a type of routing where javascript takes care of handling the routing in an apllication.

- This helps making Single-Page Application (SPAs) Without refreshing the page.

- In a multiPage Application the page refreshes every time u click a link or when the apps UI changes which is basically like getting up from one chair to another in a Amusement Park .

- Client side routing eliminates getting up from the seat, The ride comes to You BAsically.

- While Client side Routing makes it smoother it comes with own issues like:

    - Unlike a full Browser , client Side Routing doesnt notify the screen readers when a new link is opened. This leads to issues.

    - Many of the issues are already handled by many of the Libraries like React Router.


# React Router:

## Adding a Router

Lets make a dummy website to add and test a router .

Components:
    1. App.jsx
    2. Profile.jsx

```jsx
// Profile.jsx

const Profile = () => {
  return (
    <div>
      <h1>Hello from profile page!</h1>
      <p>So, how are you?</p>
    </div>
  );
};

export default Profile;
```

```jsx
// App.jsx

const App = () => {
  return (
    <div>
      <h1>Hello from the main page of the app!</h1>
      <p>Here are some examples of links to other pages</p>
      <nav>
        <ul>
          <li>
            <a href="profile">Profile page</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default App;
```

- Time To add Router: There are couple of ways to add a router , We will be doin a object based approach

- install the following package `npm install react-router`

- add this in main.js

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import Profile from "./Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```


So after this is done run the website and u can see two routes for app and profile with `/` and `/profile` respectively.So what is exactly happening here?

Here's what's going on step by step:

1.  **Importing React Router tools**

    -   `createBrowserRouter` → used to define your routes.

    -   `RouterProvider` → makes the router available to your React app.

2.  **Creating a router configuration**

    -   You pass an **array of route objects** into `createBrowserRouter`.

    -   Each object has at least two keys:

        -   `path`: the URL (e.g., `/` or `/profile`).

        -   `element`: the React component to show for that path.

3.  **Rendering the router**

    -   The router configuration returned by `createBrowserRouter` is given to the `<RouterProvider>` component.

    -   This tells React Router to use those routes to decide what should be displayed when the user navigates.

👉 So when you run `npm run dev` and visit `/`, you see the Home component. When you go to `/profile`, React Router checks the configuration and renders the Profile component---all **without reloading the page**.


## The link Element

- U may notice that when u click on a link or a button that has a link associated with it it refreshes the page , this defeats the purpose of SPA .

- so we replace `<a>` with `Link` element

```jsx

import { Link } from "react-router";

const App = () => {
  return (
    <div>
      <h1>Hello from the main page of the app!</h1>
      <p>Here are some examples of links to other pages</p>
      <nav>
        <ul>
          <li>
            <Link to="profile">Profile page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default App;
```

## Nested Routes, outlets and Dynamic Segments

Think of nested routes like a webpage that has a main layout (like a menu or header) and a section that changes depending on the URL. The parent stays the same, and the child component changes.

lets create couple components-


```jsx
import { Link } from "react-router";

const Popeye = () => {
  return (
    <>
      <p>Hi, I am Popeye! I love to eat Spinach!</p>
      <Link to="/">Click here to go back</Link>
    </>
  );
};

export default Popeye;
```

```jsx
import { Link } from "react-router";

const Spinach = () => {
  return (
    <>
      <p>Hi, I am Spinach! Popeye loves to eat me!</p>
      <Link to="/">Click here to go back</Link>
    </>
  );
};

export default Spinach;

```


Lets rewrite our routes:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css'
import App from './Components/App.jsx'
import Profile from './Components/Profile.jsx'
import Spinach from "./Components/Spinach";
import Popeye from "./Components/Popeye";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "profile",
    element: <Profile />,
    children:[
      { path: "spinach", element: <Spinach /> },
      { path: "popeye", element: <Popeye /> },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

```
- This allows us to render the child components along side the parent component. 

- No we can add an `Outlet` which wil get replaced by various profiles.

```jsx
import { Outlet } from "react-router";

const Profile = () => {
  return (
    <div>
      <h1>Hello from profile page!</h1>
      <p>So, how are you?</p>
      <hr />
      <h2>The profile visited is here:</h2>
      <Outlet />
    </div>
  );
};

export default Profile;
```

-  now when u visit `/profile/popeye` or `/profile/spinach` pages it will take u to that page 

-  we can also add a default page it renders when no path is added

```jsx
const DefaultProfile = () => {
  return <p>Oh, nothing to see here!</p>;
};

export default DefaultProfile;
```

- Now, add an index property with the DefaultProfile as a child to the `/profile` route.

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import Profile from "./Profile";
import DefaultProfile from "./DefaultProfile";
import Spinach from "./Spinach";
import Popeye from "./Popeye";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "profile",
    element: <Profile />,
    children: [
      { index: true, element: <DefaultProfile /> },
      { path: "spinach", element: <Spinach /> },
      { path: "popeye", element: <Popeye /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
```

# Complete React Router Guide

## 🚨 **STEP 0: Router Setup (Don't Skip This!)**
**Before anything works, you MUST set up the router in your main entry file:**

### main.jsx (or index.jsx)
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Profile from './Profile.jsx'
import ErrorPage from './ErrorPage.jsx'

// ⭐ CREATE THE ROUTER - This is what you were missing!
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />, // Handle 404s gracefully
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/:name", // Dynamic route
    element: <Profile />,
  },
]);

// ⭐ USE RouterProvider instead of just rendering App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
```

### 🔴 **Common Mistake:** 
Forgetting to wrap your app with `<RouterProvider>` and just rendering `<App />` directly. This causes the 404 error you experienced!

---

## **1️⃣ How Dynamic Segments Work**

In your route:
```jsx
{
  path: "/profile/:name", // ⚠️ Use absolute paths (start with /)
  element: <Profile />,
}
```

- The `:name` part is called a **dynamic segment** (or **URL param**)
- Whatever comes after `/profile/` in the URL will be captured in the `name` variable

| URL | `name` value |
| --- | --- |
| `/profile/popeye` | `"popeye"` |
| `/profile/spinach` | `"spinach"` |
| `/profile/anything` | `"anything"` |

---

## **2️⃣ Using `useParams` in Components**

```jsx
import { useParams } from "react-router-dom"; // ⚠️ Use react-router-dom
import Popeye from "./Popeye";
import Spinach from "./Spinach";
import DefaultProfile from "./DefaultProfile";

const Profile = () => {
  const { name } = useParams(); // grabs the dynamic part of the URL

  return (
    <div>
      <h1>Hello from the profile page!</h1>
      <p>So, how are you?</p>
      <hr />
      <h2>The profile visited is:</h2>
      {/* Decide what to render based on the URL param */}
      {name === "popeye" ? (
        <Popeye />
      ) : name === "spinach" ? (
        <Spinach />
      ) : (
        <DefaultProfile />
      )}
    </div>
  );
};

export default Profile;
```

---

## **3️⃣ Creating Links**

### ⚠️ **Important: Use Absolute Paths**
```jsx
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/profile">Profile page</Link> {/* ✅ Absolute path */}
          </li>
          <li>
            <Link to="/profile/popeye">Popeye's Profile</Link>
          </li>
          <li>
            <Link to="/profile/spinach">Spinach's Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
```

### 🔴 **Common Mistakes:**
- ❌ `<Link to="profile">` (relative path - can cause issues)
- ✅ `<Link to="/profile">` (absolute path - always works)

---

## **4️⃣ Error Handling**

### Always include an error boundary:
```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />, // ⭐ This prevents ugly default errors
  },
  // ... other routes
]);
```

### Create an ErrorPage component:
```jsx
const ErrorPage = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, that page doesn't exist.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
};
```

---

## **🛠️ Troubleshooting Checklist**

When you get a 404 error, check these in order:

1. **✅ Router Setup**: Is `RouterProvider` wrapping your app in main.jsx?
2. **✅ Route Definition**: Is the route defined in your router configuration?
3. **✅ Path Matching**: Does your link path exactly match your route path?
4. **✅ Component Import**: Is the component properly imported in your router file?
5. **✅ Absolute Paths**: Are you using `/profile` instead of `profile` in links?

---

## **💡 Quick Summary**

- **Dynamic segments** (`:something`) let URLs change without creating a route for each value
- **`useParams()`** allows your component to read that dynamic value
- You can then **render content dynamically** based on it
- **ALWAYS** set up your router in main.jsx first!
- **ALWAYS** use absolute paths in links (`/profile` not `profile`)
- **ALWAYS** include error boundaries for better UX



## Refactoring The Routes

- so instead of Writing allat code we can just refactor our code and make a seperate file with all routes called `routes.jsx` and move the `routes` array to it.

- Create a new `routes.jsx` and move the route array to it

```jsx
import App from "./App";
import Profile from "./Profile";
import ErrorPage from "./ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "profile/:name",
    element: <Profile />,
  },
];

export default routes;
```

- import routes to ur `main.jsx` file

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```

* * * * *

## Outlets and State (React Router)
================================

### 1\. What is `<Outlet>`?

-   `<Outlet>` is a special component provided by React Router.

-   It acts as a **placeholder** where **child routes** will be rendered.

-   Example: If a parent route has nested routes, the child route's component will appear inside the parent's `<Outlet>`.

* * * * *

### 2\. Passing Data with `context`

-   `<Outlet>` accepts a `context` prop.

-   This allows the parent route to **pass any data/state** (string, number, object, array, even functions) to its child routes.

-   Children can access that data using the `useOutletContext()` hook.

* * * * *

### 3\. Why use it?

-   Lets child routes share data with the parent without **prop drilling**.

-   Keeps state management simple when only parent + nested routes need the data.

-   Perfect for cases like user info, counters, themes, or settings across sub-pages.

* * * * *

### 4\. How to use it

#### Parent component

```
import { useState } from "react";
import { Outlet } from "react-router-dom";

function ParentLayout() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Parent Layout</h1>
      <button onClick={() => setCount(c => c + 1)}>
        Increment in Parent: {count}
      </button>

      {/* Pass state via context */}
      <Outlet context={{ count, setCount }} />
    </div>
  );
}

```

#### Child component

```
import { useOutletContext } from "react-router-dom";

function ChildPage() {
  // Access parent's context
  const { count, setCount } = useOutletContext();

  return (
    <div>
      <h2>Child Page</h2>
      <p>Count from parent: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment from Child
      </button>
    </div>
  );
}

```

#### Router setup

```
{
  path: "/",
  element: <ParentLayout />,
  children: [
    { path: "child", element: <ChildPage /> }
  ]
}

```

* * * * *

### 5\. How it works

-   Visit `/child`.

-   `ParentLayout` renders with its button.

-   Inside `<Outlet>`, React Router renders `ChildPage`.

-   `ChildPage` can read & update the parent's `count` because both share the same state via `Outlet context`.

* * * * *

### 6\. Key points

-   `useOutletContext()` only reads from the **nearest `<Outlet>`** above it.

-   You can nest multiple outlets, each with its own context.

-   Works like React Context, but scoped to **routes**.

-   Great for layouts, dashboards, profile pages, etc.

* * * * *

✅ **Summary:**\
Use `<Outlet context={...}>` in the parent to share data/state with child routes.\
In the child, call `useOutletContext()` to get that data.\
This avoids prop drilling and keeps nested routes connected to the parent's state.

* * * * *

## **Protected Routes and Navigation in React Router v7**:

* * * * *

**1\. Protected Routes**
------------------------

-   **Purpose:** Restrict access to certain routes based on a condition (e.g., user authentication).

-   **Example Use Case:** Dashboard page accessible **only** if the user is logged in; otherwise, redirect to Sign-In page.

-   **Implementation:**

    -   Create a **conditional config** for your router.

    -   Check a condition (like `isLoggedIn`) and decide which component to render.

**Example:**

```jsx
<Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/signin" />} />

```

-   Here, if `isLoggedIn` is false, the user is redirected to `/signin`.

* * * * *

**2\. `<Navigate />` Component**
--------------------------------

-   **Purpose:** Programmatically redirect users to a different URL.

-   **Key Points:**

    -   Renders a navigation action when the component itself is rendered.

    -   Useful for **redirecting after a condition check**, e.g., authentication, role-based access, etc.

-   **Props:**

    -   `to` → URL to navigate to (required)

    -   `replace` → optional, if true replaces the current history entry instead of adding a new one

**Example:**

```
<Navigate to="/signin" replace={true} />

```

-   **Notes:**

    -   Unlike `useNavigate`, `<Navigate />` is used **inside JSX**.

    -   Automatically triggers a navigation when rendered.

**Official Docs:** [React Router Navigate](https://api.reactrouter.com/v7/functions/react_router.Navigate.html)

* * * * *

**3\. `useNavigate` Hook**
--------------------------

-   **Purpose:** Imperative (programmatic) navigation from **inside functions or event handlers**.

-   **How it works:**

    -   Returns a function you can call to navigate to a different route.

-   **Syntax:**

```jsx
const navigate = useNavigate();

// Navigate to /dashboard
navigate('/dashboard');

// Go back in history
navigate(-1);

// Replace current route instead of adding a new entry
navigate('/login', { replace: true });

```

-   **Use Case:** Form submission redirect, button clicks, logout handling.

**Official Docs:** [React Router useNavigate](https://api.reactrouter.com/v7/functions/react_router.useNavigate.html)

* * * * *

**4\. Key Differences**
-----------------------

| Feature | `<Navigate />` | `useNavigate()` |
| --- | --- | --- |
| Type | Component | Hook/function |
| Use Case | Conditional redirect in JSX | Programmatic redirect in logic |
| When Triggered | When component is rendered | When function is called |
| History Control | Can replace with `replace` prop | Can replace with `replace` option |

* * * * *

**5\. Summary / Best Practices**
--------------------------------

-   Use `<Navigate />` for **inline, conditional redirects in JSX** (like protected routes).

-   Use `useNavigate()` for **event-driven redirects** (like after a form submission or logout).

-   Protect routes by **checking conditions** and redirecting accordingly.

-   Combine both to handle most navigation scenarios in React apps.

* * * * *



Here's a concise, easy-to-read set of notes on **Protected Routes and Navigation in React Router v7**:

* * * * *

**1\. Protected Routes**
------------------------

-   **Purpose:** Restrict access to certain routes based on a condition (e.g., user authentication).

-   **Example Use Case:** Dashboard page accessible **only** if the user is logged in; otherwise, redirect to Sign-In page.

-   **Implementation:**

    -   Create a **conditional config** for your router.

    -   Check a condition (like `isLoggedIn`) and decide which component to render.

**Example:**

```
<Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/signin" />} />

```

-   Here, if `isLoggedIn` is false, the user is redirected to `/signin`.

* * * * *

**2\. `<Navigate />` Component**
--------------------------------

-   **Purpose:** Programmatically redirect users to a different URL.

-   **Key Points:**

    -   Renders a navigation action when the component itself is rendered.

    -   Useful for **redirecting after a condition check**, e.g., authentication, role-based access, etc.

-   **Props:**

    -   `to` → URL to navigate to (required)

    -   `replace` → optional, if true replaces the current history entry instead of adding a new one

**Example:**

```
<Navigate to="/signin" replace={true} />

```

-   **Notes:**

    -   Unlike `useNavigate`, `<Navigate />` is used **inside JSX**.

    -   Automatically triggers a navigation when rendered.

**Official Docs:** [React Router Navigate](https://api.reactrouter.com/v7/functions/react_router.Navigate.html)

* * * * *

**3\. `useNavigate` Hook**
--------------------------

-   **Purpose:** Imperative (programmatic) navigation from **inside functions or event handlers**.

-   **How it works:**

    -   Returns a function you can call to navigate to a different route.

-   **Syntax:**

```
const navigate = useNavigate();

// Navigate to /dashboard
navigate('/dashboard');

// Go back in history
navigate(-1);

// Replace current route instead of adding a new entry
navigate('/login', { replace: true });

```

-   **Use Case:** Form submission redirect, button clicks, logout handling.

**Official Docs:** [React Router useNavigate](https://api.reactrouter.com/v7/functions/react_router.useNavigate.html)

* * * * *

**4\. Key Differences**
-----------------------

| Feature | `<Navigate />` | `useNavigate()` |
| --- | --- | --- |
| Type | Component | Hook/function |
| Use Case | Conditional redirect in JSX | Programmatic redirect in logic |
| When Triggered | When component is rendered | When function is called |
| History Control | Can replace with `replace` prop | Can replace with `replace` option |

* * * * *

**5\. Summary / Best Practices**
--------------------------------

-   Use `<Navigate />` for **inline, conditional redirects in JSX** (like protected routes).

-   Use `useNavigate()` for **event-driven redirects** (like after a form submission or logout).

-   Protect routes by **checking conditions** and redirecting accordingly.

-   Combine both to handle most navigation scenarios in React apps.

* * * * *


## *React Router Testing *

* * * * *

**1\. Why special handling is needed**
--------------------------------------

-   Components using **React Router** never render in isolation---they rely on a **routing context**.

-   Hooks like `useNavigate`, `useParams`, and components like `<Link>` need this context.

-   **Without a router wrapper**, these will **throw errors** in tests.

* * * * *

**2\. Lightweight testing: MemoryRouter**
-----------------------------------------

-   Use `MemoryRouter` for **simple tests** when you just need router context.

-   Ideal for components that **contain `<Link>`** or similar, **but don't depend on full routing behavior**.

**Example:**

```jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';

test('renders links in NavBar', () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  expect(screen.getByText(/home/i)).toBeInTheDocument();
});

```

-   `MemoryRouter` keeps the history in memory (no browser needed).

* * * * *

**3\. Full-featured testing: createMemoryRouter + RouterProvider**
------------------------------------------------------------------

-   Use this when your component **depends on router behavior**, like:

    -   Outlet context

    -   Route params (`useParams`)

    -   Error elements

    -   Redirects (`<Navigate />`)

-   `createMemoryRouter` lets you **create a router with the same routes configuration** as your app.

-   Wrap your component in `<RouterProvider>` using this router.

**Example:**

```jsx
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from './routes'; // Your routes config
import App from './App';

test('redirects to login if not authenticated', () => {
  const router = createMemoryRouter(routes, { initialEntries: ['/dashboard'] });

  render(<RouterProvider router={router} />);

  // Check if user is redirected to login page
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});

```

-   `initialEntries` simulates the URL you want to start the test with.

-   This method **fully replicates your app's routing behaviour** in tests.

* * * * *

**4\. Key Points**
------------------

-   **MemoryRouter** → Lightweight, enough for simple components using `<Link>` or `useNavigate`.

-   **createMemoryRouter + RouterProvider** → Needed for full router-dependent behaviour.

-   Always **wrap router-dependent components** in a router context during testing.

* * * * *

**5\. Summary**
---------------

-   React Router hooks/components **require a router context** to work.

-   Pick **MemoryRouter** for basic tests, **createMemoryRouter** for complex route-dependent logic.

-   `initialEntries` lets you simulate specific routes for testing navigation, redirects, and params.

* * * * *


### Additional Links

- [React Router 6.28.0 Tutorial](https://reactrouter.com/6.28.0/start/tutorial)
- [React Router Official Website](https://reactrouter.com/)
- [Understanding SPAs & Client-Side Routing](https://bholmes.dev/blog/spas-clientside-routing/)
