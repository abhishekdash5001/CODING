# BrowserRouter
Wraps app and enables routing.

```js

<BrowserRouter>
  <App />
</BrowserRouter>

```


# Routes
Container for all routes.


```js
<Routes>
  <Route path="/" element={<Home />} />
</Routes>


```


# Route
Maps URL to component.  

```js
<Route path="/about" element={<About />} />
```


# Basic example

```js
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

```


# Link 
Used for internal navigation.

```js
<Link to="/about">About</Link>
```

# NavLink
Same as Link, but supports active styling.

```js
<NavLink
  to="/about"
  className={({ isActive }) => (isActive ? "active" : "")}
>
  About
</NavLink>

```

# useNavigate
Navigate through code.

```js
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return <button onClick={handleLogin}>Login</button>;
}
//GOback
navigate(-1);
//redirect and replace history
navigate("/login", { replace: true });
```

# Dynamic routes

```js
<Route path="/users/:id" element={<UserDetails />} />

import { useParams } from "react-router-dom";

function UserDetails() {
  const { id } = useParams();
  return <h1>User ID: {id}</h1>;
}

```

# Query params


```js
// /products?category=mobile&page=2

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate({
      pathname: "/products",
      search: "?category=shoes&page=2",
    });
  };

  return <button onClick={goToProducts}>Go</button>;
}


import { useSearchParams } from "react-router-dom";

function Products() {
  const [searchParams] = useSearchParams(); // gives search only

  const category = searchParams.get("category");
  const page = searchParams.get("page");

  return <div>{category} - {page}</div>;
}


```


# Nested routes

```js
<Route path="/dashboard" element={<Dashboard />}>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>


import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
}


```


# Index route
Default child route.

```js
<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<DashboardHome />} />
  <Route path="settings" element={<Settings />} />
</Route>

// When URL is /dashboard, DashboardHome renders.

```


# 404 

```js
<Route path="*" element={<NotFound />} />

```


# Protected route

```js
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isAuth, children }) {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


<Route
  path="/dashboard"
  element={
    <ProtectedRoute isAuth={true}>
      <Dashboard />
    </ProtectedRoute>
  }
/>

```


# useLocation 
Get current URL info. 
```js
import { useLocation } from "react-router-dom";

function CurrentPage() {
  const location = useLocation(); //gives full url searhc params in string forat
  return <p>{location.pathname}</p>;
}

```

# Route-based lazy loading
```js
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const About = lazy(() => import("./About"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}
//Used to reduce initial bundle size.

```


## Link works

```js

function LinkLike() {
  const handleClick = (e) => {
    e.preventDefault(); // stop full page reload
    window.history.pushState({}, "", "/about"); // change URL only
    // router notices change and re-renders correct component
  };

  return <a href="/about" onClick={handleClick}>About</a>;
}

```