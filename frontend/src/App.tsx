import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar bg="light" variant="light" expand="lg">
          <Container>
            <NavbarBrand>Soma</NavbarBrand>
          </Container>
          <Nav>
            <a href="cart" className="nav-link">
              Cart
            </a>
            <a href="/signin" className="nav-link">
              Sign In
            </a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3"></Container>
      </main>
      <footer>
        <div className="text-center">All Rights Reserved</div>
      </footer>
    </div>
  );
}

export default App;
