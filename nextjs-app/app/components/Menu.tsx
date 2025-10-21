'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu() {
  const pathname = usePathname();

    const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Courses", href: "/courses" },
    { label: "Blog", href: "/posts" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav>
      <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-lg font-medium hover:text-red-500 transition-colors ${
                  isActive ? "text-red-500" : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}   