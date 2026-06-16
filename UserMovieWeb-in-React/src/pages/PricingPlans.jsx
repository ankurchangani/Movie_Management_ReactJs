import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentsIcon from '@mui/icons-material/Payments';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { HomeNavigateThunk, loginAdminThunk } from "../services/actions/AuthAction";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import gsap from "gsap";

const PricingPlans = () => {
    const { user } = useSelector(state => state.AuthReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const headerRef = useRef(null);
    const cardsRef = useRef([]);
    const tableRef = useRef(null);

    useEffect(() => {
        dispatch(HomeNavigateThunk());
        dispatch(loginAdminThunk());
    }, []);

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
    }, [user]);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(headerRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
          .fromTo(cardsRef.current.filter(Boolean), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, "-=0.4")
          .fromTo(tableRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3");
    }, []);

    return (
        <section className="pt-36 pb-20 bg-[#0b0f19] text-white min-h-screen px-6">
            <div className="max-w-7xl mx-auto space-y-16">
                
                {/* Header Description */}
                <div ref={headerRef} className="max-w-3xl space-y-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">Pricing Plans</h1>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                        Flexible plans tailored to your streaming needs. Whether you want basic movie discovery or full-throttle TV channel packages, choose the tier that fits your cinema vibe. Cancel or upgrade anytime!
                    </p>
                </div>

                {/* Sub Plan Informational Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[{
                        icon: <AccountBalanceWalletIcon className="text-blue-500 !text-4xl" />,
                        title: "Secure Checkout",
                        text: "All payment transactions are encrypted and processed safely using our automated merchant network."
                    }, {
                        icon: <PaymentsIcon className="text-blue-500 !text-4xl" />,
                        title: "No Hidden Fees",
                        text: "The price you see is the price you pay. Taxes are fully accounted for, without surprise costs."
                    }, {
                        icon: <PaymentIcon className="text-blue-500 !text-4xl" />,
                        title: "Anytime Cancellation",
                        text: "If you decide to step away, you can pause or cancel your subscription directly from your settings."
                    }, {
                        icon: <AccountBalanceIcon className="text-blue-500 !text-4xl" />,
                        title: "Institutional access",
                        text: "Special packages available for families, schools, and offices looking for enterprise viewing options."
                    }].map((plan, idx) => (
                        <div 
                            key={idx}
                            ref={(el) => (cardsRef.current[idx] = el)}
                            className="bg-[#101626]/40 border border-slate-800/80 p-6 rounded-2xl flex flex-col gap-4 hover:border-blue-500/30 hover:bg-[#101626]/60 transition-all duration-300 shadow-lg"
                        >
                            <div className="flex items-center gap-3">
                                <span className="bg-blue-500/10 p-2.5 rounded-xl border border-blue-500/20">{plan.icon}</span>
                                <h3 className="text-white font-bold text-lg">{plan.title}</h3>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">{plan.text}</p>
                        </div>
                    ))}
                </div>

                {/* Pricing Table Section */}
                <div ref={tableRef} className="bg-[#101626]/30 border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-xl overflow-x-auto">
                    <table className="w-[1000px] xl:w-full border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800/60 pb-6">
                                <th className="text-left py-4 text-slate-400 font-medium">Features</th>
                                {["REGULAR", "PREMIUM", "PREMIUM + TV channels"].map((title, index) => (
                                    <th key={index} className="text-center px-4 py-4">
                                        <p className="text-blue-500 font-bold text-xs uppercase tracking-wider mb-1">{title}</p>
                                        <h2 className="text-white text-3xl font-extrabold">
                                            {index === 0 ? "$11.99" : index === 1 ? "$34.99" : "$49.99"}
                                        </h2>
                                        <p className="text-slate-400 text-xs mt-1">/ month</p>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/40">
                            {[
                                "FlixTV Originals",
                                "Get unlimited access to the largest streaming library with no ads",
                                "Watch Live TV online and on supported devices",
                                "Switch plans or cancel anytime",
                                "Record live TV with 50 hours of Cloud DVR storage",
                                "Stream 65+ top Live Channels",
                                "HD and Ultra HD Streaming available"
                            ].map((feature, idx) => (
                                <tr key={idx} className="hover:bg-slate-900/10 transition-colors">
                                    <td className="text-left text-slate-300 py-4 font-medium text-sm md:text-base">{feature}</td>
                                    {[0, 1, 2].map((col) => (
                                        <td key={col} className="text-center py-4">
                                            {(idx < 4 || (idx === 4 && col > 0) || (idx === 5 && col > 0) || (idx === 6 && col === 2)) ? (
                                                <div className="inline-flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-1.5 rounded-full">
                                                    <DoneIcon className="!text-sm" />
                                                </div>
                                            ) : (
                                                <div className="inline-flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-500 p-1.5 rounded-full">
                                                    <CloseIcon className="!text-sm" />
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                {[0, 1, 2].map((col) => (
                                    <td key={col} className="text-center pt-8 pb-4">
                                        <Link 
                                            to="#" 
                                            className="inline-block w-[150px] text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wider uppercase py-3 rounded-xl transition-all duration-300 hover:scale-[1.03] shadow-lg hover:shadow-blue-600/25"
                                        >
                                            Select Plan
                                        </Link>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </section>
    );
};

export default PricingPlans;
