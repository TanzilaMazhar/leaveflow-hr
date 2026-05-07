import React, { useState } from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'
import { Menu, X } from "lucide-react";

function Layout() {
    const [isOpen, setIsOpen] = useState(false);

    // Function to close sidebar after click
    const handleSidebarClick = () => {
        if (window.innerWidth < 768) {
            setIsOpen(false);
        }
    };
    return (
        <div className='flex h-screen'>
            <div className={`
                fixed top-0 left-0 h-full bg-white w-64 z-40
                transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 md:static md:block`
            }>
                {/* close btn for mobile */}
                <div className="flex justify-end md:hidden p-3 border-b">
                    <button onClick={() => setIsOpen(false)}>
                        <X className="h-6 w-6 text-gray-700 cursor-pointer" />
                    </button>
                </div>
                <SideBar onLinkClick={handleSidebarClick} />
            </div>


            <div className='flex-1 ml-0 overflow-y-auto p-6'>
                {/* Menu toggle */}
                <div className='md:hidden mb-4'>
                    <button
                        className="p-2 rounded-md border"
                        onClick={() => setIsOpen(!isOpen)}>
                        <Menu className="h-6 w-6 cursor-pointer" />
                    </button>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout



/// overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200



