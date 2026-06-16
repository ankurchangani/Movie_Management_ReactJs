import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SideBarAct } from "../../services/actions/MovieUserAct";
import { AdminLogOutThink } from "../../services/actions/AuthAction";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TextureIcon from '@mui/icons-material/Texture';
import CloseIcon from '@mui/icons-material/Close';
import gsap from "gsap";

const Header = () => {
  const dispatch = useDispatch();
  const { sidebarToogle } = useSelector((state) => state.MovieReducer);
  const { user } = useSelector((state) => state.AuthReducer);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navLinksRef = useRef([]);
  const rightSectionRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const SignOutUser = () => {
    dispatch(AdminLogOutThink());
  };

  const handleMobileToggle = () => {
    setMobileNavOpen(!mobileNavOpen);
    dispatch(SideBarAct());
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(headerRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo(logoRef.current, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, "-=0.5")
      .fromTo(navLinksRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.4")
      .fromTo(rightSectionRef.current, { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, "-=0.5");
  }, []);

  useEffect(() => {
    if (mobileNavOpen && mobileMenuRef.current) {
      gsap.fromTo(mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [mobileNavOpen]);

  return (
    <header ref={headerRef} className="py-4 px-6 fixed top-0 w-full z-50 bg-[#0b0f19]/80 backdrop-blur-md border-b border-slate-800/50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Left Side: Logo and Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleMobileToggle}
            className="xl:hidden bg-slate-900 hover:bg-blue-600 text-white rounded-xl p-2.5 transition-all duration-300 border border-slate-800"
          >
            {mobileNavOpen ? <CloseIcon /> : <TextureIcon />}
          </button>

          <h2 ref={logoRef} className="text-[#e2e8f0] text-2xl font-black tracking-tight select-none cursor-pointer flex items-center">
            Movie<span className="text-blue-500 text-sm font-semibold bg-blue-500/10 px-2.5 py-1 rounded-lg ml-1.5 border border-blue-500/20">Mate</span>
          </h2>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-8">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/pricingplans", label: "Pricing" },
            { to: "/faviourtemovie", label: "Favourite" },
            { to: "/contact", label: "Contact" }
          ].map((item, idx) => (
            <Link
              key={item.to}
              to={item.to}
              ref={(el) => (navLinksRef.current[idx] = el)}
              className="text-slate-300 hover:text-white font-medium text-[15px] relative group py-1 transition-colors"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right Side: Welcome user & Logout */}
        <div ref={rightSectionRef} className="flex items-center gap-4">
          {user?.email && (
            <div className="hidden md:flex flex-col text-right">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold">User Account</span>
              <span className="text-slate-200 text-xs font-semibold max-w-[150px] truncate">{user.displayName || user.email}</span>
            </div>
          )}
          <button
            onClick={SignOutUser}
            className="bg-slate-900 hover:bg-red-600/90 text-slate-200 hover:text-white flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-800 transition-all duration-300 font-medium text-xs shadow-sm"
          >
            <span>Sign Out</span>
            <ExitToAppIcon className="!text-sm" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileNavOpen && (
        <div ref={mobileMenuRef} className="xl:hidden mt-4 overflow-hidden border-t border-slate-800/40 pt-4">
          <nav className="flex flex-col gap-2">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/pricingplans", label: "Pricing" },
              { to: "/faviourtemovie", label: "Favourite" },
              { to: "/contact", label: "Contact" }
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileNavOpen(false)}
                className="text-slate-300 hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-slate-900 transition-all block border-l-2 border-transparent hover:border-blue-500"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
