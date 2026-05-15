import { useRouteError, Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Container className="text-center py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <h1 className="display-1 fw-bold">Oops!</h1>
      <p className="fs-4">Sorry, an unexpected error has occurred.</p>
      <p className="text-muted italic mb-4">
        <i>{error.statusText || error.message}</i>
      </p>
      <Button as={Link} to="/" variant="primary" size="lg">
        Back to Home
      </Button>
    </Container>
  );
}