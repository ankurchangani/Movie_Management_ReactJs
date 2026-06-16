import { Button } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminLogOutThink } from "../../services/actions/AuthAction";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useRef } from "react";
import { MenuNameAct, SideBarAct } from "../../services/actions/MovieAct";
import gsap from "gsap";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const titleRef = useRef(null);

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
        const path = location.pathname;
        if (path === '/additems') {
            handleMenuName('Add Movie');
        } else if (path === '/catalog') {
            handleMenuName('Catalog');
        } else if (path === '/users') {
            handleMenuName('Users');
        } else if (path.startsWith('/edititem/')) {
            handleMenuName('Edit Movie');
        } else if (path.startsWith('/singleviewmovie/')) {
            handleMenuName('View Movie');
        } else {
            handleMenuName('Dashboard');
        }
    }, [location.pathname]);

    // Animate menu name change
    useEffect(() => {
        if (titleRef.current) {
            gsap.fromTo(titleRef.current,
                { opacity: 0, x: -10 },
                { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
            );
        }
    }, [menuName]);

    return (
        <header className="py-4 border-b border-white/10 px-6 w-full glass-panel sticky top-0 z-40 backdrop-blur-md bg-opacity-70 transition-all duration-300">
            <Container fluid className="px-0">
                <Row className="items-center">
                    <Col lg={12}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {/* Mobile Sidebar Toggle */}
                                <span onClick={SideToogle} className="d-xl-none block cursor-pointer">
                                    <Button className="!rounded-xl !bg-white/5 hover:!bg-white/10 !min-w-0 !p-2">
                                        <span className="text-white flex items-center">
                                            {sidebarToogle ? <CloseIcon /> : <MenuIcon />}
                                        </span>
                                    </Button>
                                </span>
                                
                                <div className="logo">
                                    <h2 ref={titleRef} className="text-white font-bold text-xl md:text-2xl tracking-tight m-0">{menuName}</h2>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-x-4">
                                <Link to="/additems" onClick={() => handleMenuName('Add Movie')} className="no-underline">
                                    <Button 
                                        variant="contained" 
                                        className="!rounded-xl !bg-gradient-to-r !from-indigo-600 !to-purple-600 hover:!from-indigo-500 hover:!to-purple-500 !text-white !font-semibold !px-4 !py-2 !shadow-lg !shadow-indigo-500/20 hover:!shadow-indigo-500/45 !transition-all !duration-300 !transform hover:!scale-102 flex items-center gap-1"
                                    >
                                        <AddIcon className="text-white" fontSize="small" />
                                        <span className="text-sm font-semibold capitalize">Add Item</span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
