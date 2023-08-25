import { useContext, useEffect } from "react";
import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  NavbarBrand,
} from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Store } from "./Store";
import { LinkContainer } from "react-router-bootstrap";
import Search from "./components/Search";
import { GreetingMessage } from "./components/GreetingMessage";

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

  const location = useLocation();
  const isHomepageActive = location.pathname === "/";

  return (
    <div className="entire-body d-flex flex-column">
      <div
        className={`landingPage ${
          mode === "light" && isHomepageActive
            ? "light"
            : mode === "dark" && isHomepageActive
            ? "dark"
            : ""
        }`}
      >
        <header>
          <Navbar variant={mode} expand="lg" className="d-flex  p-3 ">
            <Container className="d-flex justify-content-between align-items-end ">
              <div>
                <LinkContainer to="/">
                  <NavbarBrand className="fs-1">Soma</NavbarBrand>
                </LinkContainer>
              </div>
              <Nav className=" d-flex align-items-end flex-row justify-content-between gap-2">
                <Link
                  to="#"
                  className="nav-link header-link"
                  onClick={switchModeHandler}
                >
                  <i
                    className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}
                  ></i>
                </Link>

                <a href="/signin" className="nav-link">
                  <i className="far fa-user"></i>
                </a>
                <NavDropdown
                  className="header-link dropdown"
                  title="Categories"
                >
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
                    <NavDropdown.Item>
                      Science Fiction & Fantasy
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/teens&ya">
                    <NavDropdown.Item>Teens & YA</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <div className="w-70 container">
          <Search />
          <GreetingMessage />
        </div>
      </div>

      <main>
        <Container className="mt-3 mb-5">
          <Outlet />
        </Container>
      </main>
      <footer className=" p-1 page-footer font-small  ">
        <div className="   text-center">All Rights Reserved</div>
      </footer>
    </div>
  );
}

export default App;
