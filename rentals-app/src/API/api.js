import { useState, useEffect } from "react";

export function rentalCall(filters = {}, pageNum = 1) {
  const params = new URLSearchParams();

  params.set("page", pageNum);
  if (filters.suburb) {
    params.append("suburb", filters.suburb);
  }
  const minRent = parseInt(filters.minRent);
  if (!isNaN(minRent) && minRent >= 0) {
    params.append("minimumRent", minRent);
  }

  if (filters.propertyType && filters.propertyType !== "Any") {
    params.append("propertyType", filters.propertyType);
  }
  const url = `http://4.237.58.241:3000/rentals/search?${params.toString()}`;

  return fetch(url)
    .then(res => res.json())
    .then(res => res);
}

export function useRentals(search, page) {
  const [loading, setLoading] = useState(true);
  const [rentals, setRentals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    rentalCall(search, page)
    .then(data => {
      setRentals(data);
    })
    .catch(e => {
      setError(e);
      setLoading(false);
    })
    .finally(() => setLoading(false));
  }, [search, page]);

  return {
    loading,
    rentals,
    error
  };
}