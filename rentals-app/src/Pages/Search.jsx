import { useState, useEffect } from "react";

function Search() {
  const [rental, setRental] = useState([]);
  useEffect(()=> {
     const url = `http://4.237.58.241:3000/rentals/search`;
     fetch(url)
    .then((res) => res.json())
    .then((json) => setRental(json.data)); // Using .data as per your API info
}, []);
  return (
    <div className="Search">
      <h1>Rental search</h1>
      <ul>
      {rental.map((rental) => (
        <li key={rental.id}>{rental.title}</li>
      ))}
    </ul>
    </div>
  );
}
export default Search;