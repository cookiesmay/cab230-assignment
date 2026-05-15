import { useState, useEffect } from "react";
const API_URL = "http://4.237.58.241:3000";

export async function getPropertyTypes() {
  const response = await fetch(`${API_URL}/rentals/property-types`);
  return response.json();
}

export async function getStates() {
  const response = await fetch(`${API_URL}/rentals/states`);
  return response.json(); 
}
export async function getRentalById(id) {
  const response = await fetch(`${API_URL}/rentals/${id}`);
  if (!response.ok) throw new Error("Could not fetch property details");
  return response.json();
}

export async function login(email, password) {
  const url = `${API_URL}/user/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Login failed: ${response.status}`);
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  return data;
}

export async function register(email, password) {
  const url = `${API_URL}/user/register`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}


export async function getMyRatings() {
  const url = `${API_URL}/ratings`;
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });
  return response.json();
}

export async function getSpecificRating(id) {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const response = await fetch(`${API_URL}/ratings/rentals/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {

    return null; 
  }
  
  return response.json();
}

export async function postRating(id, ratingValue) {
  const url = `${API_URL}/ratings/rentals/${id}`;
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ rating: ratingValue }),
  });
  return response.json();
}

export async function rentalCall(filters = {}, pageNum = 1) {
  const params = new URLSearchParams();
  params.append("page", pageNum);

  
  if (filters.postcode) params.append("postcode", filters.postcode);
  if (filters.state) params.append("state", filters.state);
  if (filters.suburb) params.append("suburb", filters.suburb);

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
    maxRating: "maximumRating",
    sortBy: "sortBy",
    sortOrder: "sortOrder",
  };

  Object.keys(mapping).forEach(uiKey => {
    const apiKey = mapping[uiKey];
    const value = filters[uiKey];
    if (value !== undefined && value !== null && value !== "") {
      params.append(apiKey, value);
    }
  });

  if (filters.propertyTypes && filters.propertyTypes.length > 0) {
    filters.propertyTypes.forEach(type => {
      params.append("propertyTypes", type);
    });
  }

  const url = `${API_URL}/rentals/search?${params.toString()}`;
  const response = await fetch(url);
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