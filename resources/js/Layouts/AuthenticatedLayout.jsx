import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50/50 selection:bg-blue-100 selection:text-blue-700">
            {/* Professional Glass Navbar */}
            <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 justify-between">
                        <div className="flex">
                            {/* B3 Branding */}
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center gap-3">
                                    <div className="bg-blue-600 px-2.5 py-1 rounded-lg shadow-lg rotate-3 transition-transform hover:rotate-0">
                                        <span className="text-white font-black text-lg">B3</span>
                                    </div>
                                    <span className="hidden lg:block font-black text-slate-900 tracking-tight">
                                        RBI <span className="text-blue-600">SYSTEM</span>
                                    </span>
                                </Link>
                            </div>

                            {/* Nav Links */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="text-sm font-bold uppercase tracking-widest"
                                >
                                    Dashboard
                                </NavLink>
                                {/* Add placeholder for future links */}
                                <NavLink
                                     href={(route('inhabitants.index'))}
                                    active={route().current('inhabitants.index')}
                                    className="text-sm font-bold uppercase tracking-widest opacity-50"
                                    >
                                    Inhabitants
                                </NavLink>
                            </div>
                        </div>

                        {/* User Dropdown */}
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition duration-150 ease-in-out hover:border-blue-400 hover:text-blue-600 focus:outline-none shadow-sm"
                                            >
                                                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">
                                                    {user.name.charAt(0)}
                                                </div>
                                                {user.name}
                                                <svg className="-me-0.5 h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content contentClasses="py-2 bg-white rounded-2xl shadow-2xl border border-slate-100">
                                        <Dropdown.Link href={route('profile.edit')} className="font-semibold text-slate-600">
                                            Profile Settings
                                        </Dropdown.Link>
                                        <div className="border-t border-slate-100 my-1"></div>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="font-bold text-red-500"
                                        >
                                            Sign Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>


                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                className="inline-flex items-center justify-center rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-500"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>


                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-white border-b border-slate-100 animate-in slide-in-from-top duration-200'}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>
                    <div className="border-t border-slate-100 pb-1 pt-4">
                        <div className="px-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <div className="text-base font-bold text-slate-900">{user.name}</div>
                                <div className="text-sm font-medium text-slate-500">{user.email}</div>
                            </div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button" className="text-red-500 font-bold">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Header */}
            {header && (
                <header className="bg-white/40 border-b border-slate-200/50">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Page Content */}
            <main className="relative z-0">
                {children}
            </main>
        </div>
    );
}
