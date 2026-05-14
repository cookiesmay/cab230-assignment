import { AllCommunityModule, themeBalham } from 'ag-grid-community';
import { AgGridProvider, AgGridReact } from 'ag-grid-react';
import { Container } from "react-bootstrap";
import { rentalCall } from "../API/api.js";
import { useState, useEffect } from 'react';

const columns = [
  { headerName: "Title", field: "title", sortable: true, filter: true, flex: 2 },
  { headerName: "Rent", field: "rent", sortable: true, filter: "agNumberColumnFilter", flex: 2 },
  { headerName: "Property Type", field: "propertyType", sortable: true, filter: true, flex: 2 },
  { headerName: "Postcode", field: "postcode", sortable: true, filter: "agNumberColumnFilter", flex: 2 },
  { headerName: "State", field: "state", sortable: true, filter: true, flex: 2 },
  { headerName: "Suburb", field: "suburb", sortable: true, filter: true, flex: 2 },
  { headerName: "Bathrooms", field: "bathrooms", sortable: true, filter: "agNumberColumnFilter", flex: 2 },
  { headerName: "Bedrooms", field: "bedrooms", sortable: true, filter: "agNumberColumnFilter", flex: 2 },
  { headerName: "Parks", field: "parkingSpaces", sortable: true, filter: "agNumberColumnFilter", flex: 2 },
  { headerName: "Rating", field: "averageRating", sortable: true, filter: "agNumberColumnFilter", flex: 2 }
];


function Rentals({searchParams}) {
    const [gridApi, setGridApi] = useState(null);
    useEffect(() => {
    if (gridApi) {
      // This clears the table and forces a fresh fetch from Page 1
      gridApi.purgeInfiniteCache(); 
    }
  }, [searchParams, gridApi]);
    
    
    const onGridReady = (params) => {
    setGridApi(params.api);

    const dataSource = {
      getRows: (getRowsParams) => {
        const pageNum = (getRowsParams.startRow / 10) + 1;

        rentalCall(searchParams, pageNum)
          .then(response => {
            const rows = response.data; // The array of rentals
            const totalRows = response.pagination.total; // Total in database

            // Passing totalRows makes the footer say "1 to 10 of 194"
            getRowsParams.successCallback(rows, totalRows);
          })
          .catch(() => getRowsParams.failCallback());
      }
    };

    params.api.setGridOption('datasource', dataSource);
  };
  
  return (
  <Container fluid className="mt-3">
    <h1>Rental Results </h1>
    <p>
    </p>
    <AgGridProvider modules={[AllCommunityModule]}>
      <div
      className="ag-theme-balham"
        style={{ height: "70vh", width: "100%" }}
      >
        <AgGridReact
        theme={themeBalham}
        columnDefs={columns}
        rowModelType="infinite" 
        onGridReady={onGridReady} 
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={false}
        cacheBlockSize={10}

        />
      </div>
    </AgGridProvider>
  </Container>
);
}
export default Rentals;