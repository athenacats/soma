import { useContext, useEffect } from "react";
import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  NavbarBrand,
} from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { Store } from "./Store";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  const {
    state: { mode },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };
  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar variant={mode} expand="lg" className="d-flex  p-3">
          <Container className="flex-grow-1">
            <LinkContainer to="/">
              <NavbarBrand>Soma</NavbarBrand>
            </LinkContainer>
          </Container>
          <Nav className="d-flex flex-grow-1 flex-row justify-content-between ">
            <Link
              to="#"
              className="nav-link header-link"
              onClick={switchModeHandler}
            >
              <i className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}></i>
            </Link>

            <a href="/signin" className="nav-link">
              <i className="far fa-user"></i>
            </a>
            <NavDropdown className="header-link" title="Categories">
              <LinkContainer to="/fiction">
                <NavDropdown.Item>Fiction</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/mystery&crime">
                <NavDropdown.Item>Mystery & Crime</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/romance">
                <NavDropdown.Item>Romance</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/science&tech">
                <NavDropdown.Item>Science & Technology</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/scifi&fantasy">
                <NavDropdown.Item>Science Fiction & Fantasy</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/teens&ya">
                <NavDropdown.Item>Teens & YA</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">All Rights Reserved</div>
      </footer>
    </div>
  );
}

export default App;
