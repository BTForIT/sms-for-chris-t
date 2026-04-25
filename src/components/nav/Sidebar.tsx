"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard", icon: "⬛" },
  { href: "/reports/new", label: "New Report", icon: "➕" },
  { href: "/reports", label: "All Reports", icon: "📋" },
  { href: "/risk-matrix", label: "Risk Matrix", icon: "🔲" },
  { href: "/insights", label: "Insights", icon: "📈" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 bg-slate-900 text-slate-100 flex flex-col min-h-screen">
      <div className="px-5 py-6 border-b border-slate-700">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
          Aviation SMS
        </p>
        <h1 className="text-lg font-bold text-white leading-tight">
          Safety Inspector
        </h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-slate-700">
        <p className="text-xs text-slate-500">Powered by Claude AI</p>
      </div>
    </aside>
  );
}
