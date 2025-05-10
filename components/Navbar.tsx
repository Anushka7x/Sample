'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Plus, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [showPolicies, setShowPolicies] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [expandAddBusiness, setExpandAddBusiness] = useState(false);
  const [showImportSubmenu, setShowImportSubmenu] = useState(false);
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);


  return (
    <nav className="bg-blue-900 text-white px-4 py-2 flex items-center justify-between shadow-md">
      {/* Left: Logo + Brand */}
      <div className="flex items-center space-x-3">
        <Image src="/images/logo.jpg" alt="Logo" width={32} height={32} className="rounded bg-white p-1" />
        <span className="font-bold text-lg">Sample</span>
        <Link href="/" className="ml-4 hover:underline">Home</Link>

             {/* Policies Dropdown */}
             <div className="relative group ml-4">
          <button
            className="flex items-center gap-1 hover:underline"
            onClick={() => setShowPolicies(!showPolicies)}
          >
            Policies <ChevronDown size={16} />
          </button>
          {showPolicies && (
            <div className="absolute z-40 top-8 left-0 w-48 bg-white text-black border shadow-md rounded">
              <div
                className="relative group"
                onMouseEnter={() => setShowUpcoming(true)}
                onMouseLeave={() => setShowUpcoming(false)}
              >
                <div className="flex justify-between items-center px-4 py-2 bg-gray-700 text-white cursor-pointer">
                  Upcoming <ChevronRight size={14} />
                </div>
                {showUpcoming && (
                  <div className="absolute left-full top-0 w-40 bg-white text-black border rounded shadow-md">
                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Fresh</Link>
                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Renewals</Link>
                  </div>
                )}
              </div>
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Converted</Link>
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Installments</Link>
            </div>
          )}
        </div>
      </div>

      {/* Right: Progress + Add + User */}
      <div className="flex items-center gap-4 relative">
        {/* Progress bar with tooltip */}
        <div className="relative group">
          <div className="w-52 h-2 rounded-full bg-white bg-opacity-60 overflow-hidden">
            <div className="h-2 bg-green-500" style={{ width: '0%' }}></div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
            <div className="bg-white text-black text-sm px-3 py-1 rounded shadow-md relative">
              Daily Task Progress (0%)
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45 -mt-1 shadow-md"></div>
            </div>
          </div>
        </div>

        {/* + icon */}
        <div className="relative">
          <button onClick={() => setShowAddMenu(!showAddMenu)}>
            <Plus className="cursor-pointer hover:text-gray-300" />
          </button>

          {/* First level: Add Business */}
          {showAddMenu && (
            <div
              className="absolute right-0 mt-2 w-44 bg-white text-black border shadow-md rounded z-50"
              onMouseLeave={() => {
                setShowAddMenu(false);
                setExpandAddBusiness(false);
                setShowImportSubmenu(false);
              }}
            >
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                onMouseEnter={() => setExpandAddBusiness(true)}
              >
                Add Business <ChevronRight size={14} />
              </div>

              {/* Second level: Add Business submenu */}
              {expandAddBusiness && (
                <div className="absolute top-0 right-full mr-1 w-60 bg-white text-black border shadow-md rounded z-50">
                  {[
                    'Prospect', 'Premium', 'Policy Request', 'Policy',
                    'Endorsement Request', 'Endorsement', 'Outward',
                    'Group Outward', 'Acknowledgement'
                  ].map((item) => (
                    <div key={item} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{item}</div>
                  ))}

                  {/* Import → submenu */}
                  <div
                    className="relative px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                    onMouseEnter={() => setShowImportSubmenu(true)}
                  >
                    Import <ChevronRight size={14} />

                    {showImportSubmenu && (
                      <div className="absolute top-0 right-full mr-1 w-40 bg-white text-black border shadow-md rounded z-50">
                        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Prospect</div>
                        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Policy</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <span className="text-sm font-semibold">AKS</span>
        {/* User Info Dropdown */}
<div className="relative">
  <div
    className="w-8 h-8 rounded-full bg-gray-300 text-blue-900 flex items-center justify-center font-bold cursor-pointer"
    onClick={() => setShowUserDropdown((prev) => !prev)}
  >
    A
  </div>
  {showUserDropdown && (
    <div className="absolute right-0 mt-2 w-48 bg-white text-black border shadow-md rounded z-40">
      <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
      <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Change Password</Link>
      <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Logout</Link>
    </div>
  )}
</div>

      </div>
    </nav>
  );
}
