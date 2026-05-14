function Rental(props) {
  return (
    <div className="Rental">
       <h3>{props.title}</h3>
       <p>
        <strong>Location:</strong> {props.suburb}, {props.state}
       </p>
        <p>
        <strong>Rent:</strong> {props.rent} per week
       </p>
        <p>
        <strong>Details:</strong> {props.bedrooms} Bedrooms, {props.bathrooms} Bathrooms,
         {props.parkingSpaces} Parking Spaces
       </p>
    </div>
  );
}
export default Rental;