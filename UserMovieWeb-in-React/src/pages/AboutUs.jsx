import { useEffect, useRef } from "react";
import About from "../assets/images/About/about.avif";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
    const headingRef = useRef(null);
    const textRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
          .fromTo(textRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5");

        gsap.fromTo(
            cardsRef.current.filter(Boolean),
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardsRef.current[0],
                    start: "top 90%",
                }
            }
        );
    }, []);

    return (
        <div className="bg-[#0b0f19] text-white min-h-screen">
            {/* Top Background Section */}
            <section
                className="relative pt-40 pb-24 px-6 md:px-12 flex items-center justify-center min-h-[50vh]"
                style={{
                    backgroundImage: `url(${About})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                {/* Background Masking Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f19]/90 via-[#0b0f19]/70 to-[#0b0f19] z-0"></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
                    <h1 ref={headingRef} className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-100">
                        About <span className="text-blue-500 bg-blue-500/10 px-3 py-1 rounded-xl border border-blue-500/20">Us</span>
                    </h1>
                    <p ref={textRef} className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto drop-shadow-sm font-light">
                        Inspired by the spirit of exploration seen in the movie <span className="italic font-normal text-blue-400">Contact</span>, our journey is driven by curiosity, connection, and the belief that there is always more to discover. Just as the stars guide explorers through the unknown, we strive to push boundaries, seek truth, and create meaningful experiences that transcend time and space.
                    </p>
                </div>
            </section>

            {/* Additional Section */}
            <section className="bg-[#0b0f19] py-20 px-6 md:px-12">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center max-w-3xl mx-auto space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-white">Why Choose <span className="text-blue-500">Us</span>?</h2>
                        <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                            Our mission is to blend innovation with human connection. We don’t just build solutions—we build relationships, experiences, and futures. With a dedicated team, a deep-rooted passion for progress, and a mindset of curiosity, we help people and businesses reach beyond the imaginable.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Innovation",
                                desc: "We’re always exploring new ideas and technologies to deliver cutting-edge experiences.",
                                gradient: "from-blue-500/10 to-indigo-500/5",
                                border: "group-hover:border-blue-500/50"
                            },
                            {
                                title: "Dedication",
                                desc: "From idea to execution, we stay committed to excellence in every step.",
                                gradient: "from-violet-500/10 to-fuchsia-500/5",
                                border: "group-hover:border-violet-500/50"
                            },
                            {
                                title: "Connection",
                                desc: "At the core, we believe in the power of genuine human connection.",
                                gradient: "from-emerald-500/10 to-teal-500/5",
                                border: "group-hover:border-emerald-500/50"
                            }
                        ].map((item, idx) => (
                            <div 
                                key={item.title}
                                ref={(el) => (cardsRef.current[idx] = el)}
                                className="group relative p-8 bg-[#101626]/40 border border-slate-800/80 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-slate-900/60 hover:shadow-2xl overflow-hidden"
                            >
                                {/* Gradient Background Tint */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                
                                <div className="relative z-10 space-y-4">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Decorative glow border effect */}
                                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${idx === 0 ? "from-blue-500 to-indigo-500" : idx === 1 ? "from-violet-500 to-fuchsia-500" : "from-emerald-500 to-teal-500"} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
