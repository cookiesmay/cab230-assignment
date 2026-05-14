import { useState, useEffect } from "react";

export  function rentalCall(search) {
    const url = search 
     ? `http://4.237.58.241:3000/rentals/search?suburb=${search}`
      : `http://4.237.58.241:3000/rentals/search`;
    return fetch(url)
        .then((res) => res.json())
        .then((res) => res.data)
        .then((data) =>
            data.map((rental) => ({
                id: rental.id,
                title: rental.title,
                suburb: rental.suburb,
                state: rental.state,
                rent: rental.rent,
                bedrooms: rental.bedrooms,
                bathrooms: rental.bathrooms,
                parkingSpaces: rental.parkingSpaces
            }))
        );
        
}

export function useRentals(search) {
  const [loading, setLoading] = useState(true);
  const [rentals, setRentals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    rentalCall(search)
    .then(data => {
      setRentals(data);
    })
    .catch(e => {
      setError(e);
      setLoading(false);
    })
    .finally(() => setLoading(false));
  }, [search]);

  return {
    loading,
    rentals,
    error
  };
}