import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-700">
            <nav className="glass-effect sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-blue-600 text-white font-black rounded-lg transform -rotate-3">B3</div>
                        <span className="font-bold text-slate-900 tracking-tight">Barangay 3 <span className="text-blue-600">RBI</span></span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600">Admin Login</Link>
                        <Link href="/register" className="px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 transition">Get Started</Link>
                    </div>
                </div>
            </nav>

            <main>{children}</main>

            <footer className="bg-white border-t border-slate-200 py-12 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-slate-400 text-sm font-medium">Official Registry of Barangay Inhabitants System &bull; Barangay 3</p>
                </div>
            </footer>
        </div>
    );
}
