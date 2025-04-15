import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUserGateThunk, MenuNameAct } from "../services/actions/MovieAct";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import UserIcon from "../assets/images/loadingIcon/users.gif"

const GetUsers = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { users, isLoading } = useSelector(state => state.MovieReducer);

    const handleName = (name) => {
        dispatch(MenuNameAct(name));
    };

    useEffect(() => {
        if (location.pathname === `/users`) {
            handleName('Users');
        }
    }, [location.pathname]);

    useEffect(() => {
        dispatch(LoginUserGateThunk());
    }, []);

    return (
        <section className="py-3">
            <Container>
                <Row className="gap-y-5">
                    {isLoading ? <div className="flex justify-center items-center !h-[calc(100vh-10rem)] sm:h-[calc(100vh-8rem)] overflow-hidden"> <img src={UserIcon} alt="Loading" className="!w-[30%]" /></div> :

                        users.length === 0 ? <h2 className="text-center text-gray-400">No users found</h2> :

                        users.map((user) => (
                            <Col lg={4} key={user.uid}>
                                <div key={user.uid} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                                    <div className="w-full h-48 flex justify-center items-center bg-gray-700">
                                        <img src={user.photoURL || "https://via.placeholder.com/150"} alt={user.displayName || "User"} className="w-32 h-32 rounded-full shadow-lg border-4 border-gray-800 object-cover" />
                                    </div>
                                    <div className="p-6 text-center">
                                        <h3 className="text-lg font-semibold text-white">{user.displayName || "Anonymous"}</h3>
                                        <p className="text-gray-400">{user.email || "No email provided"}</p>
                                    </div>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </section>
    );
};

export default GetUsers;