import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Search from "./Pages/Search";
import Login from "./Pages/Login";
import Rentals from "./Components/Rentals";
import ErrorPage from "./Pages/ErrorPage.jsx";
import Register from "./Pages/Register";
import RatedRentals from "./Pages/RatedRentals";
import RentalDetails from "./Pages/RentalDetails";
import { useState } from "react";

function AppLayout() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header token={token} setToken={setToken} />
      <main className="flex-grow-1">
        <Outlet context={{ token, setToken }} />
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
      { path: "rentals/:id", Component: RentalDetails },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;