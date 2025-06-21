'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiHome, HiChartBar, HiUser } from 'react-icons/hi';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    { name: 'Home', href: '/', icon: HiHome },
    { name: 'Analytics', href: '/analytics', icon: HiChartBar },
    { name: 'Profile', href: '/profile', icon: HiUser },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-zinc-950 border-t border-zinc-800 py-2 px-4 sm:px-6 lg:static lg:w-20 lg:h-screen lg:border-r lg:border-t-0 z-50">
      <div className="max-w-7xl mx-auto lg:max-w-none">
        <ul className="flex justify-around items-center lg:flex-col lg:space-y-8 lg:mt-8">
          {navItems.map((item) => {
            const isItemActive = isActive(item.href);
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 min-w-[60px]
                    ${isItemActive 
                      ? 'text-white bg-zinc-800' 
                      : 'text-gray-400 hover:text-white hover:bg-zinc-900'}`}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-xs mt-1 font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
} 