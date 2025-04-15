import { Avatar, Button } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WidgetsIcon from '@mui/icons-material/Widgets';
import userImage from "../../assets/images/user.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AdminLogOutThink } from "../../services/actions/AuthAction";
import { MenuNameAct } from "../../services/actions/MovieAct";

const Sidebar = () => {
    const dispatch = useDispatch();
    const { admin } = useSelector(state => state.AuthReducer);

    const DeleteAdmin = () => {
        dispatch(AdminLogOutThink());
    };

    const handleMenuName = (name) => {
        dispatch(MenuNameAct(name));
    };

    return (
        <div className="sidebar-wrapper bg-[#474E68] border-r-2 !z-50 border-[#6B728E] h-screen fixed w-[250px] flex flex-col">
        {/* Logo Section */}
        <div className="logo text-center border-b-2 border-[#6B728E] py-[1.56rem] px-3">
            <h1 className="text-white text-2xl font-bold">
                Movie <span className="text-[14px] text-[#6B728E]">Mate</span>
            </h1>
        </div>
    
        {/* User Info Section */}
        <div className="account py-4 px-3 border-b-2 border-[#6B728E] flex items-center justify-between">
            <div className="flex items-center relative">
                {admin ? (
                    <>
                        <Avatar variant="rounded" sx={{ width: 45, height: 45 }}>
                            <img src={admin.photoURL || userImage} alt="User" />
                        </Avatar>
                        <div className="ml-3">
                            <ul className="m-0 p-0 list-none">
                                <li className="text-white text-lg">{admin.displayName}</li>
                                <li className="text-white text-sm">{admin.email}</li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <p className="text-white">Loading...</p>
                )}
            </div>
        </div>
    
        {/* Logout Button */}
        <div className="logOut text-center mt-3">
            <Button
                className="!min-w-0 !bg-[#50577A] hover:!bg-[#6B728E] inline-block"
                onClick={DeleteAdmin}
            >
                <ExitToAppIcon className="text-white" />
                <span className="ms-2 text-white">Log Out</span>
            </Button>
        </div>
    
        {/* Navigation List */}
        <nav className="flex-grow overflow-y-auto px-3 py-3">
            <ul className="m-0 p-0 list-none">
                <li className="px-2 my-2">
                    <Link
                        to={"/"}
                        className="px-3 py-2 text-white bg-[#50577A] block rounded-lg hover:bg-[#6B728E] hover:text-white no-underline transition duration-200"
                        onClick={() => handleMenuName("Dashboard")}
                    >
                        <DashboardIcon className="mr-3 text-white" />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className="px-2 my-2">
                    <Link
                        to={"/catalog"}
                        className="px-3 py-2 text-white bg-[#50577A] block rounded-lg hover:bg-[#6B728E] hover:text-white no-underline transition duration-200"
                        onClick={() => handleMenuName("Catalog")}
                    >
                        <WidgetsIcon className="mr-3 text-white" />
                        <span>Catalog</span>
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
    
    );
};

export default Sidebar;
