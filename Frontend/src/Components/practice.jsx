import { PanelRight, Landmark, LayoutDashboard, Settings, ShieldQuestionMark } from 'lucide-react';
import { Users, UserCircle, ChevronDown } from 'lucide-react';
import { ScrollText } from 'lucide-react';
import { Clock9 } from 'lucide-react';
import { ChartColumn } from 'lucide-react';
import { Clock2 } from 'lucide-react';
import { User } from 'lucide-react';
import { Search } from 'lucide-react';
import { Newspaper } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

function SideBar({ onLinkClick }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("LoggedIn");
        navigate("/signin");
    };

    return (
        <div className="flex flex-col h-full border-gray-300 text-gray-800">
            {/* Logo Section */}
            <div className="flex justify-between items-center border-b mb-6 border-gray-300 py-8 px-4">
                <div className="flex items-center gap-3">
                    <span className="bg-purple-600 p-2 text-white rounded-lg">
                        <Landmark />
                    </span>
                    <span className="font-bold text-xl text-gray-900">Employee Portal</span>
                </div>
                <PanelRight />
            </div>

            {/* Scrollable Menu Section */}
            <div className="flex-1 overflow-y-auto px-4">
                <ul>
                    <li className="mb-2">
                        <NavLink
                            to="/dashboard/dashboard"
                            onClick={onLinkClick}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? "bg-gray-200" : ""}`
                            }>
                            <LayoutDashboard />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink
                            to="/dashboard/people"
                            onClick={onLinkClick}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? "bg-gray-200" : ""}`
                            }>
                            <Users />
                            <span>People</span>
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink
                            to="/dashboard/payslip"
                            onClick={onLinkClick}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? "bg-gray-200" : ""}`
                            }>
                            <ScrollText />
                            <span>Payslip</span>
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink
                            to="/dashboard/timetools"
                            onClick={onLinkClick}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? "bg-gray-200" : ""}`
                            }>
                            {({ isActive }) => (
                                <>
                                    <Clock9 className={isActive ? "text-purple-900" : ""} />
                                    <span>Time Tools</span>
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink
                            to="/dashboard/benefited"
                            onClick={onLinkClick}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? "bg-gray-200" : ""}`
                            }>
                            <ChartColumn />
                            <span>Benefited</span>
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink
                            to="/dashboard/performance"
                            onClick={onLinkClick}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? "bg-gray-200" : ""}`
                            }>
                            <Clock2 />
                            <span>Performance</span>
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink
                            to="/dashboard/personaldetails"
                            onClick={onLinkClick}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? "bg-gray-200" : ""}`
                            }>
                            <User />
                            <span>Personal Details</span>
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink
                            to="/dashboard/jobref"
                            onClick={onLinkClick}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? "bg-gray-200" : ""}`
                            }>
                            {({ isActive }) => (
                                <>
                                    <Search className={isActive ? "text-purple-900" : ""} />
                                    <span>Job & References</span>
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink
                            to="/dashboard/document"
                            onClick={onLinkClick}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? "bg-gray-200" : ""}`
                            }>
                            <Newspaper />
                            <span>Document</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Fixed Bottom Section */}
            {/* Fixed Bottom Section (works on desktop & mobile) */}
            <div className="sticky bottom-0 bg-white px-4 border-t border-gray-200">
                <NavLink
                    to="/setting"
                    className={({ isActive }) =>
                        `flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${isActive ? "bg-gray-200" : ""}`}>
                    <Settings />
                    <span>Setting</span>
                </NavLink>

                <div className="mb-3">
                    <NavLink
                        to="/help"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 ${isActive ? "bg-gray-200" : ""}`}>
                        <ShieldQuestionMark />
                        <span>Support</span>
                    </NavLink>
                </div>

                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-xl font-bold text-gray-800 rounded cursor-pointer">
                    Logout
                </button>

                <div className="border-b my-4 border-gray-300"></div>

                <div className="p-2 flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                        <UserCircle />
                        <div>
                            <p className="text-sm font-medium">Shahid Miah</p>
                            <p className="text-xs text-gray-400">hello@wavespace.agency</p>
                        </div>
                    </div>
                    <ChevronDown />
                </div>
            </div>

        </div>
    );
}

export default SideBar;
