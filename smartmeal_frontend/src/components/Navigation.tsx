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
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-2 px-4 sm:px-6 lg:fixed lg:top-0 lg:left-0 lg:w-20 lg:h-screen lg:border-r lg:border-t-0 z-50 shadow-lg">
      <div className="flex justify-around lg:flex-col lg:items-center lg:space-y-8 lg:h-full lg:py-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
              pathname === item.href
                ? ''
                : 'text-gray-500 hover:bg-gray-50'
            }`}
            style={pathname === item.href ? { 
              color: '#7a9365',
              backgroundColor: '#e8f0e0'
            } : {}}
            onMouseEnter={(e) => {
              if (pathname !== item.href) {
                e.currentTarget.style.color = '#9cb481';
              }
            }}
            onMouseLeave={(e) => {
              if (pathname !== item.href) {
                e.currentTarget.style.color = '';
              }
            }}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
} 