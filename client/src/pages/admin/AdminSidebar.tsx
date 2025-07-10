import { Link, useLocation } from "wouter";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/collections", label: "Collections" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/orders", label: "Orders" },
];

export default function AdminSidebar() {
  const [location] = useLocation();

  return (
    <nav className="p-6 text-primary-brown dark:text-white font-medium">
      <h2 className="text-xl font-serif font-semibold mb-6">Admin Panel</h2>
      <ul className="space-y-2">
        {links.map(({ href, label }) => {
          const isActive = location === href;

          return (
            <li key={href}>
              <Link
                href={href}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-warm-gold text-white"
                    : "hover:bg-soft-gray hover:text-warm-gold dark:hover:bg-neutral-800"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
