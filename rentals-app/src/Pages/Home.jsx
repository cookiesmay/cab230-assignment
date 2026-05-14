import { useState } from "react";

function fetchRental() {
  const url = `http://4.237.58.241:3000/property/1`;
  return fetch(url)
    .then((res) => res.json());
}

function Rental(props) {
  return (
    <div className="Rental">
      <ul>
        <li>Address: {props.streetAddress}, {props.suburb}</li>
        <li>Rent: ${props.rent} per week</li>
        <li>Type: {props.propertyType}</li>
        <li>Bedrooms: {props.bedrooms}</li>
      </ul>
    </div>
  );
}

function Home() {
  const [rental, setRental] = useState({});
  return (
    <div className="Home">
      <h1>Rentals</h1>
      <button
        onClick={() => {
          fetchRental().then((data) => {
            setRental(data);
          });
        }}
      >
        Get Rental
      </button>
      <Rental {...rental} />
    </div>
  );
}

export default Home;