import { getAuth, signOut } from "firebase/auth";
import useUser from "../hooks/useUser";
import {
  Container,
  Dropdown,
  DropdownButton,
  Nav,
  Navbar,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">Comic Confessions</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Container className="d-flex justify-content-between">
            <Nav className="ml-auto">
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={NavLink} to="/blog">
                Blog
              </Nav.Link>
              <Nav.Link as={NavLink} to="/new-blog-post">
                Create an article
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              {!user && (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/signup">
                    Signup
                  </Nav.Link>
                </>
              )}
              {user && (
                <Container className="ml-2">
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={
                      <>
                        <i className="bi bi-person"></i>
                      </>
                    }
                    variant="secondary"
                  >
                    <Dropdown.Item as={NavLink} to="/user-profile">
                      Your Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        signOut(getAuth());
                        navigate("/");
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </DropdownButton>
                </Container>
              )}
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
