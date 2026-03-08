import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white px-8 py-4">
      <nav className="flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-slate-900">
          Partner Brief
        </Link>
        <div className="flex gap-6">
          <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
            Dashboard
          </Link>
          <Link href="/briefings" className="text-slate-600 hover:text-slate-900">
            Briefings
          </Link>
          <Link href="/partners" className="text-slate-600 hover:text-slate-900">
            Partners
          </Link>
        </div>
      </nav>
    </header>
  );
}
