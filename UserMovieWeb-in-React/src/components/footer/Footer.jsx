import { Link } from "react-router-dom"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(footerRef.current,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 95%",
                }
            }
        );
    }, []);

    return (
        <footer ref={footerRef} className="bg-[#070a13] border-t border-slate-900/60 pt-16 pb-8 px-6 text-slate-400">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Column 1 */}
                <div className="space-y-4">
                    <h3 className="text-white text-2xl font-black tracking-tight">
                        Movie<span className="text-blue-500 text-sm font-semibold bg-blue-500/10 px-2.5 py-1 rounded-lg ml-1.5 border border-blue-500/20">Mate</span>
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-400">
                        Your ultimate cinema companion. Explore, search, and manage your favorite movies and TV shows from anywhere.
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                        {[
                            { icon: <FacebookIcon className="!text-xl" />, to: "#", hoverClass: "hover:text-blue-500 hover:bg-blue-500/10" },
                            { icon: <TwitterIcon className="!text-xl" />, to: "#", hoverClass: "hover:text-sky-400 hover:bg-sky-400/10" },
                            { icon: <InstagramIcon className="!text-xl" />, to: "#", hoverClass: "hover:text-pink-500 hover:bg-pink-500/10" },
                            { icon: <GoogleIcon className="!text-xl" />, to: "#", hoverClass: "hover:text-red-500 hover:bg-red-500/10" }
                        ].map((social, idx) => (
                            <Link 
                                key={idx} 
                                to={social.to} 
                                className={`text-slate-500 bg-slate-950 p-2.5 rounded-xl border border-slate-900 transition-all duration-300 ${social.hoverClass}`}
                            >
                                {social.icon}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                    <h4 className="text-white font-bold text-[14px] tracking-wider uppercase text-xs">MovieMate</h4>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="/about" className="hover:text-blue-400 transition-colors duration-200">About Us</Link></li>
                        <li><Link to="/pricingplans" className="hover:text-blue-400 transition-colors duration-200">Pricing Plans</Link></li>
                        <li><Link to="/contact" className="hover:text-blue-400 transition-colors duration-200">Contacts</Link></li>
                        <li><Link to="/faviourtemovie" className="hover:text-blue-400 transition-colors duration-200">My Favorites</Link></li>
                    </ul>
                </div>

                {/* Column 3 */}
                <div className="space-y-4">
                    <h4 className="text-white font-bold text-[14px] tracking-wider uppercase text-xs">Browse</h4>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="#" className="hover:text-blue-400 transition-colors duration-200">Live TV</Link></li>
                        <li><Link to="#" className="hover:text-blue-400 transition-colors duration-200">Live News</Link></li>
                        <li><Link to="#" className="hover:text-blue-400 transition-colors duration-200">Live Sports</Link></li>
                        <li><Link to="#" className="hover:text-blue-400 transition-colors duration-200">Streaming Library</Link></li>
                    </ul>
                </div>

                {/* Column 4 */}
                <div className="space-y-4">
                    <h4 className="text-white font-bold text-[14px] tracking-wider uppercase text-xs">Help</h4>
                    <ul className="space-y-3 text-sm">
                        <li><Link to="#" className="hover:text-blue-400 transition-colors duration-200">Account & Billing</Link></li>
                        <li><Link to="#" className="hover:text-blue-400 transition-colors duration-200">Supported Devices</Link></li>
                        <li><Link to="#" className="hover:text-blue-400 transition-colors duration-200">Accessibility</Link></li>
                        <li><Link to="#" className="hover:text-blue-400 transition-colors duration-200">System Status</Link></li>
                    </ul>
                </div>
            </div>

            {/* Subfooter */}
            <div className="max-w-7xl mx-auto border-t border-slate-900/40 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
                <p className="text-slate-500">
                    &copy; {new Date().getFullYear()} MovieMate. Built with React, Tailwind & GSAP.
                </p>
                <div className="flex gap-6 text-slate-500">
                    <Link to="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
                    <Link to="#" className="hover:text-blue-400 transition-colors">Terms & Conditions</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;