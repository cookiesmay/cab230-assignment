import { AllCommunityModule, themeBalham } from 'ag-grid-community';
import { AgGridProvider, AgGridReact } from 'ag-grid-react';
import { Container } from "react-bootstrap";
import { rentalCall } from "../API/api.js";
import { useState, useEffect } from 'react';

const columns = [
  { headerName: "Title", field: "title", sortable: true, flex: 3 },
  { headerName: "Rent", field: "rent", sortable: true, flex: 1 },
  { headerName: "Property Type", field: "propertyType", sortable: true, flex: 2 },
  { headerName: "Postcode", field: "postcode", sortable: true, flex: 1 },
  { headerName: "State", field: "state", sortable: true, flex: 1 },
  { headerName: "Suburb", field: "suburb", sortable: true, flex: 2 },
  { headerName: "Bathrooms", field: "bathrooms", sortable: true, flex: 1 },
  { headerName: "Bedrooms", field: "bedrooms", sortable: true, flex: 1 },
  { headerName: "Parks", field: "parkingSpaces", sortable: true, flex: 1 },
  { headerName: "Rating", field: "averageRating", sortable: true, flex: 1 }
];


function Rentals({searchParams}) {
    const [gridApi, setGridApi] = useState(null);
    useEffect(() => {
    if (gridApi) {
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
            const rows = response.data; 
            const totalRows = response.pagination.total; 
            getRowsParams.successCallback(rows, totalRows);
          })
          .catch(() => getRowsParams.failCallback());
      }
    };

    params.api.setGridOption('datasource', dataSource);
  };

  return (
  <Container fluid className="mt-3">
    <div className="d-flex flex-column flex-grow-1 px-3 py-2" style={{ minHeight: 0 }}></div>
    <h4>Rental Results </h4>
    <AgGridProvider modules={[AllCommunityModule]}>
      <div
      className="ag-theme-balham flex-grow-1 shadow-sm rounded" 
        style={{ width: "100%", height: 0, minHeight: "400px" }}
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