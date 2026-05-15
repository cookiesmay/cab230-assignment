import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Search from "./Pages/Search";
import Login from "./Pages/Login";
import Rentals from "./Pages/Rentals";
import ErrorPage from "./Pages/ErrorPage.jsx";
import Register from "./Pages/Register";
import RatedRentals from "./Pages/RatedRentals";

function AppLayout() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "search", Component: Search },
      { path: "rentals", Component: Rentals },
      { path: "login", Component: Login },
      { path: "register", Component: Register }, 
      { path: "rated", Component: RatedRentals },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;