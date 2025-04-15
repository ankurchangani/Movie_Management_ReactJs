import { Button } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminLogOutThink } from "../../services/actions/AuthAction";
import TextureIcon from '@mui/icons-material/Texture';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { MenuNameAct, SideBarAct } from "../../services/actions/MovieAct";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { sidebarToogle, menuName } = useSelector(state => state.MovieReducer);

    const { admin } = useSelector((state) => state.AuthReducer);

    const SideToogle = () => {
        dispatch(SideBarAct());
    };

    const handleMenuName = (name) => {
        dispatch(MenuNameAct(name));
    };

    useEffect(() => {
        if (!admin) {
            navigate('/signin');
        }
    }, [admin]);

    useEffect(() => {
        if (location.pathname === '/additems') {
            handleMenuName('Add Movie');
        } else {
            handleMenuName('Dashboard');
        }
    }, [location.pathname]);

    return (
        <header className="py-2 mt-5 border-b-2 px-3 w-full border-[#474E68] bg-[#474E68] mr-2">
            <Container>
                <Row className="items-center">
                    <Col lg={12}>
                        <div className="flex items-center justify-between">
                            <div className="logo">
                                <h2 className="text-white font-semibold text-xl">{menuName}</h2>
                            </div>
                            <div className="flex items-center justify-end gap-x-3">
                                <Link to="/additems" onClick={() => handleMenuName('Add Movie')}>
                                    <Button className="!rounded-lg !bg-[#4d6cdd] hover:!bg-[#50577A] transition duration-200">
                                        <span className="px-3 py-1 text-white font-medium">Add&nbsp;Item</span>
                                    </Button>
                                </Link>

                                <span onClick={SideToogle} className="d-xl-none">
                                    <Button className="!rounded-lg !bg-[#474E68] hover:!bg-[#50577A] !min-w-0">
                                        <span className="py-1 text-[#6B728E]">
                                            {sidebarToogle ? <CloseIcon /> : <TextureIcon />}
                                        </span>
                                    </Button>
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
