import { Container } from "react-bootstrap";

export function MainView(props) {
  return (
    <div className="main-menu main-container-bg">
      <Container
        className="d-flex justify-content-center align-items-center outside-container-bg"
        style={{ minHeight: "100vh" }}>
            <Container
            className="inside-container-bg p-2 rounded border btn-danger"
            style={{ padding: "200px", border: "5px solid #ddd" }}>
            {props.children}
            </Container>
      </Container>
    </div>
  );
}
