import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Search from "./Pages/Search";
import Login from "./Pages/Login";
import Rentals from "./Pages/Rentals";


function AppLayout() {
  return (
    <div className="App">
      <Header />
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "search", Component: Search },
      { path: "rentals", Component: Rentals },
      { path: "login", Component: Login },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;