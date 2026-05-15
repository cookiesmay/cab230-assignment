import { useState, useEffect } from "react";

export async function getPropertyTypes() {
  const response = await fetch('http://4.237.58.241:3000/rentals/property-types');
  return response.json();
}

export async function getStates() {
  const response = await fetch('http://4.237.58.241:3000/rentals/states');
  return response.json(); 
}

export async function rentalCall(filters = {}, pageNum = 1) {
  const params = new URLSearchParams();
  params.append("page", pageNum);

  if (filters.location) {
    const loc = filters.location.trim();
    if (/^\d{4}$/.test(loc)) {
      params.append("postcode", loc);
    } else {
      const stateMap = { "ACT": "ACT", "NSW": "NSW", "NT": "NT", "QLD": "Qld", "SA": "SA", "TAS": "Tas", "VIC": "Vic", "WA": "WA" };
      const upperLoc = loc.toUpperCase();
      if (stateMap[upperLoc]) {
        params.append("state", stateMap[upperLoc]);
      } else {
        params.append("suburb", loc);
      }
    }
  }

  const mapping = {
    minRent: "minimumRent",
    maxRent: "maximumRent",
    minBeds: "minimumBedrooms",
    maxBeds: "maximumBedrooms",
    minBaths: "minimumBathrooms",
    maxBaths: "maximumBathrooms",
    minParks: "minimumParking",
    maxParks: "maximumParking",
    minRating: "minimumRating",
    maxRating: "maximumRating"
  };

  Object.keys(mapping).forEach(uiKey => {
    const apiKey = mapping[uiKey];
    if (filters[uiKey] && filters[uiKey] !== "") {
      params.append(apiKey, filters[uiKey]);
    }
  });

  // 3. Property Types (plural as per spec)
  if (filters.propertyType && filters.propertyType !== "Any") {
    params.append("propertyTypes", filters.propertyType);
  }

  const response = await fetch(`http://4.237.58.241:3000/rentals/search?${params.toString()}`);
  return response.json();
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