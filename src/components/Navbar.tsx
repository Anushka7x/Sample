'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Download,
  Plus,
  Settings,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Policies',
    submenu: [
      { name: 'Upcoming', submenu: ['Fresh', 'Renewals'] },
      'Converted',
      'Installments',
    ],
  },
  {
    name: 'Claims',
    submenu: ['Claim A', 'Claim B'],
  },
  {
    name: 'Accounts',
    submenu: ['Account A', 'Account B'],
  },
  {
    name: 'Reports',
    submenu: ['Report A', 'Report B'],
  },
];

export default function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav className="bg-primary text-white px-6 shadow-md flex justify-between items-center font-medium">
      <div className="flex items-center gap-1">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={42} // increase from 12
          height={42} // increase from 12
          className=""
        />

        <span className="text-md font-semibold">SIBRO V3</span>

        {navItems.map((item) => (
          <div key={item.name} className="relative group text-sm" onMouseLeave={() => setHovered(null)}>
            <button
              onMouseEnter={() => setHovered(item.name)}
              className="flex items-center gap-1 px-3 py-4 hover:bg-primary-hover"
            >
              {item.name}
              {item.submenu && <ChevronDown size={16} />}
            </button>
            {hovered === item.name && item.submenu && (
              <div className="absolute top-full left-0 z-50 bg-white text-black shadow-md rounded min-w-[180px]">
                {item.submenu.map((sub: any, i: number) => {
                  if (typeof sub === 'string') {
                    return (
                      <Link key={i} href="#" className="block px-4 py-2 hover:bg-gray-300">
                        {sub}
                      </Link>
                    );
                  }
                  return (
                    <div key={sub.name} className="relative group/sub">
                      <div className="flex justify-between items-center px-4 py-2 bg-gray-700 text-white cursor-pointer">
                        {sub.name} <ChevronRight size={14} />
                      </div>
                      <div className="absolute left-full top-0 hidden group-hover/sub:block w-40 bg-white text-black border shadow-md rounded">
                        {sub.submenu.map((s: string, idx: number) => (
                          <Link key={idx} href="#" className="block px-4 py-2 hover:bg-gray-300">
                            {s}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {/* Download Button */}
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 py-4 hover:bg-primary-hover ">
            <Download size={18} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72 p-2">
            <Tabs defaultValue="completed">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
              <TabsContent value="completed" className="text-sm p-2">
                <p className="text-green-600 font-medium">✔ Policy Converted BulkImport - Template is ready to download</p>
                <a href="#" className="text-blue-500 underline">Download</a>
                <p className="mt-2 text-xs">Started on 13-05-2025 12:05 PM</p>
                <p className="text-xs">End on 13-05-2025 12:05 PM</p>
              </TabsContent>
              <TabsContent value="pending" className="text-sm p-2">
                No pending tasks.
              </TabsContent>
            </Tabs>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Progress Tooltip */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative w-52 h-2 rounded-full bg-white bg-opacity-60 overflow-hidden">
                <div className="h-2 bg-green-500" style={{ width: '0%' }}></div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Daily Task Progress (0%)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* + Icon Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 py-4 hover:bg-primary-hover ">
            <Plus size={18} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 text-sm">
            {["Organization", "Policy", "Claims", "User", "Tickets", "Templates", "Automation"].map((section) => (
              <DropdownMenuItem key={section}>{section}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 py-4 hover:bg-primary-hover ">
            <Settings className='border-0' size={18} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 text-sm">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Change Password</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* DEMO + Static D */}

        <DropdownMenu>
          <span className="text-sm font-semibold">DEMO</span>
          <DropdownMenuTrigger className="p-2 py-4 hover:bg-primary-hover ">
            <span className=' rounded-full bg-white text-primary p-1 px-2 items-center justify-center font-bold'>D</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 text-sm">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Change Password</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </nav>
  );
}
