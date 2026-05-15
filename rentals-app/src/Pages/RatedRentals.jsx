import { useState, useEffect } from "react";
import { Container, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { AllCommunityModule, themeBalham } from "ag-grid-community";
import { getMyRatings, getRentalById } from "../API/api";

export default function RatedRentals() {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRatedProperties = async () => {
      try {
        const ratings = await getMyRatings();
        
        const ratingsArray = ratings.data || ratings;

        if (!ratingsArray || ratingsArray.length === 0) {
          setRowData([]);
          setLoading(false);
          return;
        }

        const detailedRatings = await Promise.all(
          ratingsArray.map(async (rateObj) => {
            const targetId = rateObj.rentalId || rateObj.id || rateObj.rental_id; 

            if (!targetId) {
              console.warn("Could not find ID in rating object:", rateObj);
              return null;
            }

            try {
              const property = await getRentalById(targetId); 
              return {
                ...property,
                id: targetId,
                myRating: rateObj.rating || "Rated", 
              };
            } catch (e) {
              console.error(`Failed to fetch property ${targetId}:`, e);
              return null;
            }
          })
        );
        

        setRowData(detailedRatings.filter(item => item !== null));

      } catch (err) {
        console.error("Failed to fetch rated properties:", err);
        setError("Could not load your rated properties. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRatedProperties();
  }, []);

  const columns = [
    { headerName: "Title", field: "title", flex: 3 },
    { headerName: "Rent", field: "rent", flex: 1, valueFormatter: p => `$${p.value}` },
    { headerName: "Type", field: "propertyType", flex: 2 },
    { headerName: "Suburb", field: "suburb", flex: 2 },
    { headerName: "My Rating", field: "myRating", flex: 1, sort: "desc" } 
  ];

  return (
    <Container className="py-5 flex-grow-1 d-flex flex-column">
      <h2 className="fw-bold text-uppercase mb-4">My Rated Rentals</h2>

      {error ? (
        <Alert variant="danger" className="rounded-0">{error}</Alert>
      ) : loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="dark" />
          <p className="mt-3 text-muted">Loading your ratings...</p>
        </div>
      ) : rowData.length === 0 ? (
        <Alert variant="info" className="rounded-0">
          You haven't rated any properties yet. Go search for some!
        </Alert>
      ) : (
        <AgGridProvider modules={[AllCommunityModule]}>
         <div className="ag-theme-balham shadow-sm border border-2 border-dark" style={{ width: "100%", height: "500px" }}>
            <AgGridReact
              theme={themeBalham}
              rowData={rowData}
              columnDefs={columns}
              onRowClicked={(event) => navigate(`/rentals/${event.data.id}`)}
              pagination={true}
              paginationPageSize={15}
              paginationPageSizeSelector={false}
            />
          </div>
        </AgGridProvider>
      )}
    </Container>
  );
}