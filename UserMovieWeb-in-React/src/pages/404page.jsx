import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const NotFound = () => {
    const numberRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(numberRef.current, 
            { scale: 0.3, opacity: 0, rotate: -10 }, 
            { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" }
        );
        gsap.fromTo(textRef.current, 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power3.out" }
        );
    }, []);

    return (
        <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center px-6 text-center select-none overflow-hidden relative">
            {/* Background cinematic aura */}
            <div className="absolute w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 space-y-6 max-w-lg">
                <h1 
                    ref={numberRef} 
                    className="text-[120px] md:text-[180px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-indigo-700 leading-none filter drop-shadow-[0_10px_10px_rgba(59,130,246,0.2)]"
                >
                    404
                </h1>
                
                <div ref={textRef} className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">Lost in Cinematic Space?</h2>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                        The reel you are looking for has been cut from the final edit, or it was never filmed. Let's redirect you back to the main feature!
                    </p>
                    <div className="pt-6">
                        <Link 
                            to="/" 
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wider uppercase py-4 px-8 rounded-xl transition-all duration-300 hover:scale-[1.03] shadow-lg hover:shadow-blue-600/25"
                        >
                            Return to Homepage
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;