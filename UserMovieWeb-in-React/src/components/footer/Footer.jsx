import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';

const Footer = () => {
    return (
        <>
            <footer className="footer bg-[#0d1117] pt-5">
                <Container>
                    <Row className="gap-y-6">
                        <Col lg={3}>
                            <div className="logo">
                                <h3 className="text-white">Movie<span className="text-[#2764b7] text-[14px] ps-1">Mate</span></h3>
                            </div>
                            <div className="description">
                                <p className="text-white">Movies & TV Shows, Online cinema, Movie database HTML Template.</p>
                            </div>
                            <div className="icon">
                                <ul className="m-0 p-0 list-none flex items-center gap-x-5">
                                    <li><Link to={"#"}><FacebookIcon  className="text-white !transition-all !duration-300 !text-4xl hover:!text-[#204e8e]"/></Link></li>
                                    <li><Link to={"#"}><TwitterIcon className="text-white !transition-all !duration-300 !text-4xl hover:!text-[#1da1f2]"/></Link></li>
                                    <li><Link to={"#"}><InstagramIcon className="text-white !transition-all !duration-300 !text-4xl hover:!text-[#c13584]"/></Link></li>
                                    <li><Link to={"#"}><GoogleIcon className="text-white !transition-all !duration-300 !text-4xl hover:!text-[#ea4335]"/></Link></li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="logo mb-3">
                                <h3 className="text-white h5">Flix&nbsp;TV</h3>
                            </div>
                            <div className="list">
                                <ul className="m-0 p-0 list-none flex flex-col gap-y-4">
                                    <li><Link to={"/about"} className="text-white no-underline transition-all duration-300 hover:!text-[#2764b7]">About&nbsp;Us</Link></li>
                                    <li><Link to={"/profile"} className="text-white no-underline transition-all duration-300 hover:!text-[#2764b7]">My&nbsp;Profile</Link></li>
                                    <li><Link to={"/pricing"} className="text-white no-underline transition-all duration-300 hover:!text-[#2764b7]">Pricing&nbsp;plans</Link></li>
                                    <li><Link to={"/contact"} className="text-white no-underline transition-all duration-300 hover:!text-[#2764b7]">Contacts</Link></li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="logo mb-3">
                                <h3 className="text-white h5">Browse</h3>
                            </div>
                            <div className="list">
                                <ul className="m-0 p-0 list-none flex flex-col gap-y-4">
                                    <li><Link to={"#"} className="text-white no-underline transition-all duration-300 hover:!text-[#2764b7]">Live&nbsp;TV</Link></li>
                                    <li><Link to={"#"} className="text-white no-underline transition-all duration-300 hover:!text-[#2764b7]">Live&nbsp;News</Link></li>
                                    <li><Link to={"#"} className="text-white no-underline transition-all duration-300 hover:!text-[#2764b7]">Live&nbsp;Sports</Link></li>
                                    <li><Link to={"#"} className="text-white no-underline transition-all duration-300 hover:!text-[#2764b7]">Streaming&nbsp;Library</Link></li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="logo mb-3">
                                <h3 className="text-white h5">Help</h3>
                            </div>
                            <div className="list">
                                <ul className="m-0 p-0 list-none flex flex-col gap-y-4">
                                    <li><Link to={"#"} className="text-white no-underline transition-all duration-300 hover:!text-[#2764b7]">Account&nbsp;&&nbsp;Billing</Link></li>
                                    <li><Link to={"#"} className="text-white no-underline transition-all duration-300 hover:!text-[#2764b7]">Plans&nbsp;&&nbsp;Pricing</Link></li>
                                    <li><Link to={"#"} className="text-white no-underline transition-all duration-300 hover:!text-[#2764b7]">Supported&nbsp;devices</Link></li>
                                    <li><Link to={"#"} className="text-white no-underline transition-all duration-300 hover:!text-[#2764b7]">Accessibility</Link></li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div className="subfooter flex items-center justify-between py-4 flex-col flex-lg-row border-t-2 border-[#1b273b] mt-5">
                                <p className="text-white m-0">© FlixTV.template, 2021. Created by Paradva Nilesh.</p>
                                <div className="pri-policy flex items-center gap-x-3">
                                    <Link to={"#"} className="text-[#2764b7] no-underline">Privacy&nbsp;policy</Link>
                                    <Link to={"#"} className="text-[#2764b7] no-underline">Terms&nbsp;and&nbsp;conditions</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    )
}

export default Footer