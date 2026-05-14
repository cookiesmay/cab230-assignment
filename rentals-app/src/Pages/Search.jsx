import { useState } from "react";
import { useRentals } from "../API/api.js";
import SearchBar from "../Components/SearchBar.jsx";
import Rental from "../Components/Rentals.jsx";

function Search() {
  const [search, setSearch] = useState("");
  const { loading, rentals, error } = useRentals(search);

  return (
    <div className="Search">
      <h1>Rental Search</h1>
      
        <SearchBar onSubmit={setSearch} />
        <hr />
      {loading && <p>Loading...</p>}
      {loading && <p>Loading {search}...</p>}
     {error && <p className="text-danger">Error: {error.message}</p>}
      {!loading && !error && rentals.length === 0 && <p>No rentals found.</p>}
      {!loading && !error && rentals.length > 0 && (
        <div>
          {rentals.map((rental) => (
            <Rental key={rental.id} {...rental} />
          ))}
        </div>
      )}
    </div>
  );
}
export default Search;
