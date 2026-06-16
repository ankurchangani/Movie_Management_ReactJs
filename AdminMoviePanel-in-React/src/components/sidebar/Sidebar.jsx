import { Avatar, Button } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WidgetsIcon from '@mui/icons-material/Widgets';
import PeopleIcon from '@mui/icons-material/People';
import userImage from "../../assets/images/user.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AdminLogOutThink } from "../../services/actions/AuthAction";
import { MenuNameAct } from "../../services/actions/MovieAct";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const Sidebar = () => {
    const dispatch = useDispatch();
    const { admin } = useSelector(state => state.AuthReducer);
    const { menuName } = useSelector(state => state.MovieReducer);
    const logoRef = useRef(null);

    const DeleteAdmin = () => {
        dispatch(AdminLogOutThink());
    };

    const handleMenuName = (name) => {
        dispatch(MenuNameAct(name));
    };

    useEffect(() => {
        if (logoRef.current) {
            gsap.fromTo(logoRef.current, 
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            );
        }
    }, []);

    const linkClass = (name) => {
        const base = "px-4 py-3 text-white flex items-center rounded-xl no-underline transition-all duration-300 gap-3 font-medium ";
        if (menuName === name) {
            return base + "bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20 text-white border-l-4 border-indigo-400";
        }
        return base + "hover:bg-white/5 text-slate-300 hover:text-white hover:translate-x-1";
    };

    return (
        <div className="sidebar-wrapper glass-panel border-r border-white/10 h-screen w-[280px] flex flex-col justify-between py-6 px-4 z-50">
            <div>
                {/* Logo Section */}
                <div ref={logoRef} className="logo flex items-center gap-3 border-b border-white/10 pb-6 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <span className="text-white font-extrabold text-xl">M</span>
                    </div>
                    <div>
                        <h1 className="text-white text-xl font-bold tracking-tight">
                            Movie<span className="text-indigo-400 font-semibold ml-0.5">Mate</span>
                        </h1>
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mt-[-2px]">Admin Console</span>
                    </div>
                </div>
            
                {/* User Info Section */}
                {admin ? (
                    <div className="account p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 mb-6 transition-all hover:bg-white/10">
                        <Avatar variant="rounded" sx={{ width: 42, height: 42, borderRadius: '12px' }} className="border border-white/20">
                            <img src={admin.photoURL || userImage} alt="User" className="w-full h-full object-cover" />
                        </Avatar>
                        <div className="overflow-hidden flex-grow">
                            <p className="text-white text-sm font-semibold truncate m-0">{admin.displayName || "Admin User"}</p>
                            <p className="text-slate-400 text-xs truncate m-0">{admin.email}</p>
                        </div>
                    </div>
                ) : (
                    <div className="animate-pulse bg-white/5 h-14 rounded-2xl mb-6"></div>
                )}
            
                {/* Navigation List */}
                <nav className="flex-col gap-2 flex">
                    <Link
                        to={"/"}
                        className={linkClass("Dashboard")}
                        onClick={() => handleMenuName("Dashboard")}
                    >
                        <DashboardIcon className={menuName === "Dashboard" ? "text-white" : "text-slate-400"} />
                        <span>Dashboard</span>
                    </Link>

                    <Link
                        to={"/catalog"}
                        className={linkClass("Catalog")}
                        onClick={() => handleMenuName("Catalog")}
                    >
                        <WidgetsIcon className={menuName === "Catalog" ? "text-white" : "text-slate-400"} />
                        <span>Catalog</span>
                    </Link>

                    <Link
                        to={"/users"}
                        className={linkClass("Users")}
                        onClick={() => handleMenuName("Users")}
                    >
                        <PeopleIcon className={menuName === "Users" ? "text-white" : "text-slate-400"} />
                        <span>Users</span>
                    </Link>
                </nav>
            </div>
        
            {/* Logout Button */}
            <div className="pt-4 border-t border-white/10">
                <Button
                    onClick={DeleteAdmin}
                    fullWidth
                    sx={{
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        color: '#94a3b8',
                        padding: '10px 16px',
                        borderRadius: '12px',
                        gap: '12px',
                        transition: 'all 0.3s',
                        '&:hover': {
                            backgroundColor: 'rgba(239, 68, 68, 0.15)',
                            color: '#ef4444'
                        }
                    }}
                >
                    <ExitToAppIcon />
                    <span className="font-semibold text-sm">Log Out</span>
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
