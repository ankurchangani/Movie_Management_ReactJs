import { useState } from "react";
import { Button } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SideBarAct } from "../../services/actions/MovieUserAct";
import { AdminLogOutThink } from "../../services/actions/AuthAction";

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TextureIcon from '@mui/icons-material/Texture';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const dispatch = useDispatch();
  const { sidebarToogle } = useSelector((state) => state.MovieReducer);
  const { user } = useSelector((state) => state.AuthReducer);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const SignOutUser = () => {
    dispatch(AdminLogOutThink());
  };

  const handleMobileToggle = () => {
    setMobileNavOpen(!mobileNavOpen);
    dispatch(SideBarAct());
  };

  return (
    <header className="py-4 px-2 fixed top-0 w-full z-50 bg-[#0f172a] border-b border-[#1e293b] shadow-md">
      <Container fluid>
        <Row className="align-items-center justify-content-between gx-2">
          {/* Logo & Toggle */}
          <Col xs={6} sm={4} md={3} className="d-flex align-items-center gap-2">
            {/* Sidebar Toggle for mobile */}
            <div className="d-xl-none">
              <Button
                onClick={handleMobileToggle}
                className="!bg-[#1e293b] hover:!bg-[#3b82f6] !text-white rounded-3 p-2 !min-w-0"
              >
                {mobileNavOpen ? <CloseIcon /> : <TextureIcon />}
              </Button>
            </div>

            {/* Logo */}
            <h2 className="text-[#e2e8f0] text-xl font-bold m-0">
              Movie<span className="text-[#3b82f6] text-sm">Mate</span>
            </h2>
          </Col>

          {/* Desktop Navigation */}
          <Col lg={6} className="d-none d-xl-flex justify-content-center">
            <nav className="d-flex gap-4 align-items-center">
              <Link to="/" className="text-[#e2e8f0] hover:text-[#3b82f6] transition-all">Home</Link>

              <Link to="/about" className="text-[#e2e8f0] hover:text-[#3b82f6] transition-all">About</Link>

              <Link to="/pricingplans" className="text-[#e2e8f0] hover:text-[#3b82f6] transition-all">Pricing</Link>

              <Link to = '/faviourtemovie' className="text-[#e2e8f0] hover:text-[#3b82f6] transition-all">Favourite</Link>

              <Link to="/contact" className="text-[#e2e8f0] hover:text-[#3b82f6] transition-all">Contact</Link>
            </nav>
          </Col>

          {/* Right Section */}
          <Col xs={6} sm={8} md={9} lg={3} className="d-flex justify-content-end align-items-center gap-2 gap-md-3">
            {user?.email && (
              <span className="text-[#e2e8f0] text-sm d-none d-md-inline-block text-truncate" style={{ maxWidth: '150px' }}>
                Welcome, {user.email}
              </span>
            )}

            <Button
              onClick={SignOutUser}
              className="!bg-[#1e293b] hover:!bg-[#3b82f6] !text-white d-flex align-items-center gap-2 px-2 rounded-3"
            >
              <span className="d-none d-sm-inline">Sign Out</span>
              <ExitToAppIcon />
            </Button>
          </Col>
        </Row>

        {/* Mobile Navigation Menu */}
        {mobileNavOpen && (
          <div className="d-xl-none mt-2 px-3">
            <nav className="d-flex flex-column gap-2">
              <Link to="/" className="text-[#e2e8f0] hover:text-[#3b82f6]">Home</Link>

              <Link to="/about" className="text-[#e2e8f0] hover:text-[#3b82f6]">About</Link>

              <Link to="/pricingplans" className="text-[#e2e8f0] hover:text-[#3b82f6]">Pricing</Link>

                <Link to="/contact" className="text-[#e2e8f0] hover:text-[#3b82f6]">Contact</Link>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
