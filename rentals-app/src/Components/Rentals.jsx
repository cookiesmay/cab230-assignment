import { AllCommunityModule, themeBalham } from 'ag-grid-community';
import { AgGridProvider, AgGridReact } from 'ag-grid-react';
import { Container } from "react-bootstrap";
import { rentalCall } from "../API/api.js";
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

const columns = [
  { headerName: "Title", field: "title", flex: 3 },
  { headerName: "Rent", field: "rent", flex: 1 },
  { headerName: "Type", field: "propertyType", flex: 2 },
  { headerName: "Suburb", field: "suburb", flex: 2 },
  { headerName: "State", field: "state", flex: 1 },
  { headerName: "Beds", field: "bedrooms", flex: 1 },
  { headerName: "Baths", field: "bathrooms", flex: 1 },
  { headerName: "Rating", field: "averageRating", flex: 1 }
];

function Rentals({ searchParams = {} }) {
  const [gridApi, setGridApi] = useState(null);
  const { location, minRent, maxRent, propertyType, sortBy, sortOrder } = searchParams;
  const navigate = useNavigate();

  const createDatasource = useCallback((currentParams) => {
    return {
      getRows: async (params) => {
        console.log("Grid requesting rows:", params.startRow, "to", params.endRow);
        const pageSize = 10;
        const pageNum = Math.floor(params.startRow / pageSize) + 1;

        try {
          const responseData = await rentalCall(currentParams, pageNum);
          console.log("API Response:", responseData); 
          const rows = Array.isArray(responseData) ? responseData : (responseData.rentals || responseData.data || []);
          if (!rows || rows.length === 0) {
            params.successCallback([], params.startRow);
          } else {
            const lastRow = rows.length < pageSize ? params.startRow + rows.length : -1;
            params.successCallback(rows, lastRow);
          }
        } catch (err) {
          console.error("Fetch error in Datasource:", err);
          params.failCallback();
        }
      },
    };
  }, []);

  useEffect(() => {
    if (gridApi) {
      console.log("Filter change detected. Resetting grid data...");
      const newDataSource = createDatasource(searchParams);
      gridApi.setGridOption('datasource', newDataSource);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, minRent, maxRent, propertyType, sortBy, sortOrder, gridApi, createDatasource]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.setGridOption('datasource', createDatasource(searchParams));
  };

  return (
    <Container fluid className="mt-3">
      <h4 className="fw-bold mb-3 uppercase">Rental Results</h4>
      <AgGridProvider modules={[AllCommunityModule]}>
        {/* Set a concrete height here (e.g., 600px) to ensure it doesn't collapse */}
        <div className="ag-theme-balham shadow-sm border border-2 border-dark" 
             style={{ width: "100%", height: "600px" }}>
          <AgGridReact
            theme={themeBalham}
            columnDefs={columns}
            rowModelType="infinite"
            onGridReady={onGridReady}
            cacheBlockSize={10}
            maxBlocksInCache={10}
           onRowClicked={(event) => navigate(`/rentals/${event.data.id}`)}
            rowStyle={{ cursor: 'pointer' }}
          />
        </div>
      </AgGridProvider>
    </Container>
  );
}

export default Rentals;