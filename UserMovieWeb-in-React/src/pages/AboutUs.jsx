import { Col, Container, Row } from "react-bootstrap";
import About from "../assets/images/About/about.avif"; // Assuming this is the image path

const AboutUs = () => {
    return (
        <>
            {/* Top Background Section */}
            <section
                className="pt-32 pb-5"
                style={{
                    backgroundImage: `url(${About})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                <Container>
                    <Row>
                        <Col lg={12}>
                            <h1 className="text-[#e2e8f0] text-xl font-bold m-0 text-center">
                                About <span className="text-[#3b82f6]">Us</span>
                            </h1>
                            <p className="text-white text-center px-4 md:px-16 lg:px-32 text-lg leading-relaxed mt-4">
                                Inspired by the spirit of exploration seen in the movie <span className="italic">Contact</span>, our journey is driven by curiosity, connection, and the belief that there is always more to discover. Just as the stars guide explorers through the unknown, we strive to push boundaries, seek truth, and create meaningful experiences that transcend time and space. This isn't just about technology or progress—it's about the human desire to reach out, understand, and grow together.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Additional Section */}
            <section className="bg-[#0f172a] text-white py-16">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={10}>
                            <h2 className="text-3xl font-bold mb-4">Why Choose <span className="text-blue-500">Us</span>?</h2>
                            <p className="text-lg text-gray-300 leading-relaxed mb-8">
                                Our mission is to blend innovation with human connection. We don’t just build solutions—we build relationships, experiences, and futures. With a dedicated team, a deep-rooted passion for progress, and a mindset of curiosity, we help people and businesses reach beyond the imaginable.
                            </p>
                        </Col>
                    </Row>
                    <Row className="text-center mt-8">
                        <Col md={4}>
                            <div className="p-5 bg-[#1e293b] rounded-xl shadow-md hover:shadow-lg transition duration-300">
                                <h3 className="text-xl font-semibold text-blue-400">Innovation</h3>
                                <p className="text-gray-400 mt-2">We’re always exploring new ideas and technologies to deliver cutting-edge experiences.</p>
                            </div>
                        </Col>
                        <Col md={4} className="mt-6 mt-md-0">
                            <div className="p-5 bg-[#1e293b] rounded-xl shadow-md hover:shadow-lg transition duration-300">
                                <h3 className="text-xl font-semibold text-blue-400">Dedication</h3>
                                <p className="text-gray-400 mt-2">From idea to execution, we stay committed to excellence in every step.</p>
                            </div>
                        </Col>
                        <Col md={4} className="mt-6 mt-md-0">
                            <div className="p-5 bg-[#1e293b] rounded-xl shadow-md hover:shadow-lg transition duration-300">
                                <h3 className="text-xl font-semibold text-blue-400">Connection</h3>
                                <p className="text-gray-400 mt-2">At the core, we believe in the power of genuine human connection.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default AboutUs;
