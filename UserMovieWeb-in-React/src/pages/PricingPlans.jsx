import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentsIcon from '@mui/icons-material/Payments';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { HomeNavigateThunk, loginAdminThunk } from "../services/actions/AuthAction";
import Footer from "../components/footer/Footer";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Button } from "@mui/material";

const PricingPlans = () => {
    const { user } = useSelector(state => state.AuthReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(HomeNavigateThunk());
    }, []);

    useEffect(() => {
        dispatch(loginAdminThunk());
    }, []);

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
    }, [user]);

    return (
        <>
            <Header />
            <section className="pt-32 bg-[#0f172a] text-white min-h-screen">
                <Container>
                    <Row className="gap-y-5">
                        <Col lg={12}>
                            <div className="discription mb-9">
                                <h1 className="text-white text-4xl mb-4 font-semibold">Pricing Plans</h1>
                                <p className="text-gray-300">Many desktop publishing packages and <span><Link to="/" className="text-blue-400 underline">Web Page</Link></span> editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
                                <p className="text-gray-300 mt-2">Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                            </div>
                        </Col>

                        {[{
                            icon: <AccountBalanceWalletIcon className="text-blue-500 text-5xl" />,
                            text: "It to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining"
                        }, {
                            icon: <PaymentsIcon className="text-blue-500 text-5xl" />,
                            text: "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text"
                        }, {
                            icon: <PaymentIcon className="text-blue-500 text-5xl" />,
                            text: "It to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially"
                        }, {
                            icon: <AccountBalanceIcon className="text-blue-500 text-5xl" />,
                            text: "Various versions have evolved over the years, sometimes by accident, sometimes on purpose"
                        }].map((plan, idx) => (
                            <Col lg={3} key={idx}>
                                <div className="bg-[#1e293b] rounded-xl shadow-lg p-4 h-full border border-[#334155] transition hover:scale-105">
                                    <div className="flex items-center">
                                        <span>{plan.icon}</span>
                                        <h5 className="text-white m-0 ps-3">Choose your Plan</h5>
                                    </div>
                                    <div className="mt-3">
                                        <p className="text-gray-300 text-[18px]">{plan.text}</p>
                                    </div>
                                </div>
                            </Col>
                        ))}

                        <Col lg={12}>
                            <div className="table-price py-16 overflow-x-auto">
                                <table className="w-[1250px] text-center border-collapse">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            {["REGULAR", "PREMIUM", "PREMIUM + TV channels"].map((title, index) => (
                                                <th key={index} className="text-center px-4">
                                                    <p className="text-blue-500 font-semibold">{title}</p>
                                                    <h2 className="text-white text-3xl">
                                                        {index === 0 ? "$11.99" : index === 1 ? "$34.99" : "$49.99"}
                                                    </h2>
                                                    <p className="text-gray-400">/&nbsp;month</p>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            "FlixTV Originals",
                                            "Get unlimited access to the largest streaming library with no ads",
                                            "Watch Live TV online and on supported devices",
                                            "Switch plans or cancel anytime",
                                            "Record live TV with 50 hours of Cloud DVR storage",
                                            "Stream 65+ top Live",
                                            "TV channels"
                                        ].map((feature, idx) => (
                                            <tr key={idx}>
                                                <td className="text-start text-gray-300 p-3">{feature}</td>
                                                {[0, 1, 2].map((col) => (
                                                    <td key={col}>
                                                        {(idx < 4 || (idx === 4 && col > 0) || (idx === 5 && col > 0) || (idx === 6 && col === 2)) ? (
                                                            <DoneIcon className="text-green-500" />
                                                        ) : (
                                                            <CloseIcon className="text-red-500" />
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        <tr>
                                            <td></td>
                                            {[0, 1, 2].map((col) => (
                                                <td key={col}>
                                                    <Button variant="contained" className="bg-blue-600 hover:bg-blue-700">
                                                        <Link to="#" className="text-white no-underline px-3 py-2 block">SELECT PLAN</Link>
                                                    </Button>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    );
};

export default PricingPlans;
