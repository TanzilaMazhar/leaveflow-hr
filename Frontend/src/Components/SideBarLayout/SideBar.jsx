import { PanelRight, Landmark, LayoutDashboard, Settings, ShieldQuestionMark } from 'lucide-react';
import { Users, UserCircle, ChevronDown } from 'lucide-react';
import { ScrollText } from 'lucide-react';
import { Clock9 } from 'lucide-react';
import { ChartColumn } from 'lucide-react';
import { Clock2 } from 'lucide-react';
import { User } from 'lucide-react';
import { Search } from 'lucide-react';
import { Newspaper } from 'lucide-react';
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import api from "../../api";

function SideBar({ onLinkClick }) {

    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const displayName = storedUser.name || "Logged in user";
    const displayEmail = storedUser.email || "No email available";

    const handleLogout = async () => {
        try {
            await api.post("/api/auth/logout", {});

            localStorage.removeItem("LoggedIn");
            localStorage.removeItem("user");
            navigate("/signin");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <div className='flex flex-col h-full border-r text-gray-800 border-gray-300'>
            <div className='flex justify-between items-center py-8 px-4 shrink-0'>
                <div className='flex items-center gap-3'>
                    <span className='bg-purple-600 p-2 text-white rounded rounded-lg'> <Landmark /></span>
                    <span className='font-bold text-xl text-gray-900'>MarcoHR</span>
                </div>
                <PanelRight />
            </div>
            <div className='border-b mr-4 ml-4 border-gray-300 mb-3'></div>
            {/* Middle scrollable section */}
            <div className='flex-1 overflow-y-auto px-4'>
                <ul>
                    <li className='mb-2'>
                        <NavLink
                            to='/dashboard/dashboard' onClick={onLinkClick}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-200' : ''}
                        `}>
                            <LayoutDashboard />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li className='mb-2'>
                        <NavLink
                            to='/dashboard/people' onClick={onLinkClick}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-200' : ''} `}>
                            <Users />
                            <span>People</span>
                        </NavLink>
                    </li>
                    <li className='mb-2'>
                        <NavLink
                            to='/dashboard/payslip' onClick={onLinkClick}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-200' : ''} `}>
                            <ScrollText />
                            <span>Payslip</span>
                        </NavLink>
                    </li>
                    <li className='mb-2'>
                        <NavLink
                            to='/dashboard/timetools' onClick={onLinkClick}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-200' : ''} `}>
                            {({ isActive }) => (
                                <>
                                    <Clock9 className={isActive ? "text-purple-900" : ""} />
                                    <span>Time & Leave</span>
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li className='mb-2'>
                        <NavLink
                            to='/dashboard/benefits' onClick={onLinkClick}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-200' : ''} `}>
                            <ChartColumn />
                            <span>Benefits</span>
                        </NavLink>
                    </li>
                    <li className='mb-2'>
                        <NavLink
                            to='/dashboard/performance' onClick={onLinkClick}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-200' : ''} `}>
                            <Clock2 />
                            <span>Performance</span>
                        </NavLink>
                    </li>
                    <li className='mb-2'>
                        <NavLink
                            to='/dashboard/personaldetails' onClick={onLinkClick}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-200' : ''} `}>
                            <User />
                            <span>Personal Details</span>
                        </NavLink>
                    </li>
                    <li className='mb-2'>
                        <NavLink
                            to='/dashboard/jobref' onClick={onLinkClick}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-200' : ''} `}>
                            {({ isActive }) => (
                                <>
                                    <Search className={isActive ? "text-purple-900" : ""} />
                                    <span>Job & References</span>
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li className='mb-2'>
                        <NavLink
                            to='/dashboard/document' onClick={onLinkClick}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-200' : ''} `}>
                            <Newspaper />
                            <span>Documents</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* ___Bottom Section_______ */}
            <div className='border-t mr-4 ml-4 border-gray-300'></div>
            <div className='shrink-0 sticky bottom-0 bg-white px-4 py-2'>
                <NavLink
                    to='/dashboard/setting'
                    onClick={onLinkClick}
                    className={({ isActive }) =>
                        `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-200' : ''}`}>
                    <Settings />
                    <span>Settings</span>
                </NavLink>
                <div className='mb-3'>
                    <NavLink
                        to="/dashboard/support"
                        onClick={onLinkClick}
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 ${isActive ? 'bg-gray-200' : ''}`}>
                        <ShieldQuestionMark />
                        <span>Support</span>
                    </NavLink>
                </div>

                <button
                    onClick={handleLogout}
                    className="px-4 py-2 border-none text-xl font-bold text-gray-800 rounded cursor-pointer">
                    Logout
                </button>
                <div className='border-b mr-4 ml-4 border-gray-300'></div>

                <div className="p-2 flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                        <UserCircle />
                        <div>
                            <p className="text-sm font-medium">{displayName}</p>
                            <p className="text-xs text-gray-400">{displayEmail}</p>
                        </div>
                    </div>
                    <ChevronDown />
                </div>
            </div>
        </div>
    );
}

export default SideBar;
