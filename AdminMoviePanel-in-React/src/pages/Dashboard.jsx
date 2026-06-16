import { Outlet, useNavigate } from 'react-router-dom';
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomeNavigateThunk, loginAdminThunk } from '../services/actions/AuthAction';
import { SideBarAct } from "../services/actions/MovieAct";
import gsap from 'gsap';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { sidebarToogle } = useSelector(state => state.MovieReducer);
    
    const sidebarRef = useRef(null);
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        dispatch(loginAdminThunk());
        dispatch(HomeNavigateThunk());
    }, [dispatch]);

    // GSAP Responsive Drawer Animation
    useEffect(() => {
        const sidebar = sidebarRef.current;
        const overlay = overlayRef.current;

        if (sidebar && overlay) {
            if (sidebarToogle) {
                // Open mobile sidebar
                gsap.to(overlay, { 
                    display: "block", 
                    opacity: 1, 
                    duration: 0.3, 
                    ease: "power2.out" 
                });
                gsap.to(sidebar, { 
                    x: 0, 
                    duration: 0.5, 
                    ease: "power3.out" 
                });
            } else {
                // Close mobile sidebar
                gsap.to(sidebar, { 
                    x: "-100%", 
                    duration: 0.4, 
                    ease: "power3.in" 
                });
                gsap.to(overlay, { 
                    opacity: 0, 
                    duration: 0.3, 
                    ease: "power2.in",
                    onComplete: () => {
                        gsap.set(overlay, { display: "none" });
                    }
                });
            }
        }
    }, [sidebarToogle]);

    // Animate main content area fade in on mount
    useEffect(() => {
        if (contentRef.current) {
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
            );
        }
    }, []);

    const closeSidebar = () => {
        if (sidebarToogle) {
            dispatch(SideBarAct());
        }
    };

    return (
        <div className="dashboard-layout min-h-screen flex bg-[#08090d] text-white relative overflow-hidden custom-scrollbar">
            {/* Ambient Background Glows */}
            <div className="ambient-glow-1 top-[-10%] left-[-10%]"></div>
            <div className="ambient-glow-2 bottom-[-10%] right-[-10%]"></div>

            {/* Mobile Sidebar Overlay */}
            <div 
                ref={overlayRef}
                onClick={closeSidebar}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 hidden opacity-0"
            />

            {/* Mobile Sidebar Drawer */}
            <div 
                ref={sidebarRef}
                className="fixed top-0 left-0 h-screen z-50 transform -translate-x-full d-xl-none"
                style={{ width: '280px' }}
            >
                <Sidebar />
            </div>

            {/* Desktop Sidebar Static */}
            <div className="w-[280px] h-screen shrink-0 d-none d-xl-block z-10">
                <Sidebar />
            </div>

            {/* Main Content Pane */}
            <div className="flex flex-col flex-grow min-w-0 relative z-10">
                <Header />
                <main 
                    ref={contentRef}
                    className="content-area flex-grow overflow-y-auto px-6 py-6 custom-scrollbar"
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
