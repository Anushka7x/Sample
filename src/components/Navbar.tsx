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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navItems = [
  { name: 'Home', href: '/' },
  {
    name: 'Policies',
    submenu: [
      {
        name: 'Upcoming',
        submenu: [
          { name: 'Fresh', href: '/upcoming/fresh' },
          { name: 'Renewals', href: '/upcoming/renewals' },
        ],
      },
      { name: 'Converted', href: '/converted' },
      { name: 'Installments', href: '/installments' },
    ],
  },
  {
    name: 'Claims',
    submenu: [{ name: 'All', href: '/claims/all' }],
  },
  {
    name: 'Accounts',
    submenu: [
      { name: 'Uninvoiced', href: '/accounts/uninvoiced' },
      { name: 'Invoice', href: '/accounts/invoice' },
      { name: 'Reconciliation Errors', href: '/accounts/reconciliation-errors' },
      { name: 'TDS Reconciliation', href: '/accounts/tds-reconciliation' },
      { name: 'Pending Payout', href: '/accounts/pending-payout' },
      { name: 'POS Payments', href: '/accounts/pos-payments' },
    ],
  },
  {
    name: 'Reports',
    submenu: [
      { name: 'Report A', href: '/reports/a' },
      { name: 'Report B', href: '/reports/b' },
    ],
  },
];

export default function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progress = 34;

  return (
    <nav className="bg-primary text-white px-4 shadow-md font-medium">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Logo" width={42} height={42} />
          <span className="text-md font-semibold">SIBRO V3</span>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseLeave={() => setHovered(null)}
            >
              <button
                onMouseEnter={() => setHovered(item.name)}
                className="flex items-center gap-1 px-3 py-2 hover:bg-primary-hover"
              >
                {item.name}
                {item.submenu && <ChevronDown size={16} />}
              </button>
              {hovered === item.name && item.submenu && (
                <div className="absolute top-full left-0 z-50 bg-white text-black shadow-md rounded min-w-[180px]">
                  {item.submenu.map((sub: any, i: number) => (
                    sub.submenu ? (
                      <div key={sub.name} className="relative group/sub">
                        <div className="flex justify-between items-center px-4 py-2 bg-gray-700 text-white cursor-pointer">
                          {sub.name} <ChevronRight size={14} />
                        </div>
                        <div className="absolute left-full top-0 hidden group-hover/sub:block w-40 bg-white text-black border shadow-md rounded">
                          {sub.submenu.map((s: any, idx: number) => (
                            <Link key={idx} href={s.href} className="block px-4 py-2 hover:bg-gray-300">
                              {s.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link key={i} href={sub.href} className="block px-4 py-2 hover:bg-gray-300">
                        {sub.name}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Extra Icons */}
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 py-4 hover:bg-primary-hover">
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

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative w-52 h-2 rounded-full bg-white bg-opacity-60 overflow-hidden cursor-pointer">
                  <div className="h-2 bg-green-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Daily Task Progress ({progress}%)
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 py-4 hover:bg-primary-hover">
              <Plus size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-sm">
              {["Organization", "Policy", "Claims", "User", "Tickets", "Templates", "Automation"].map((section) => (
                <DropdownMenuItem key={section}>{section}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 py-4 hover:bg-primary-hover">
              <Settings size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 text-sm">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Change Password</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <span className="text-sm font-semibold">DEMO</span>
            <DropdownMenuTrigger className="p-2 py-4 hover:bg-primary-hover">
              <span className="rounded-full bg-white text-primary p-1 px-2 items-center justify-center font-bold">D</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 text-sm">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Change Password</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-[700px]' : 'max-h-0'}`}>
        <div className="flex flex-col gap-2 py-2">
          {navItems.map((item) => (
            <div key={item.name} className="border-b border-white/20 px-2">
              <p className="font-semibold py-2">{item.name}</p>
              {item.submenu?.map((sub: any, i: number) =>
                sub.submenu ? (
                  <div key={sub.name} className="ml-4">
                    <p className="text-xs font-semibold text-gray-300">{sub.name}</p>
                    {sub.submenu.map((s: any, idx: number) => (
                      <Link key={idx} href={s.href} className="block px-2 py-1 text-sm hover:bg-gray-700 rounded">
                        {s.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link key={i} href={sub.href} className="block ml-4 px-2 py-1 text-sm hover:bg-gray-700 rounded">
                    {sub.name}
                  </Link>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
