"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/products", label: "This week" },
  { href: "/profile", label: "Profile" },
  { href: "/account", label: "Account" },
];

export function NavLinks() {
  const pathname = usePathname();

  return links.map(({ href, label }) => {
    const current = pathname === href || pathname.startsWith(`${href}/`);
    return (
      <Link
        key={href}
        href={href}
        aria-current={current ? "page" : undefined}
        className={`inline-flex min-h-11 items-center border-b-2 transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
          current ? "border-gold text-cream" : "border-transparent"
        }`}
      >
        {label}
      </Link>
    );
  });
}
