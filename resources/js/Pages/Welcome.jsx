import { Head, Link } from '@inertiajs/react';
import ActionCard from '../Components/ActionCard';
import StatCard from '../Components/StatCard';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="RBI Barangay 3 - Landing Page" />


            <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <div className="absolute top-0 -left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 -right-1/4 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-full max-w-7xl px-6">


                        <header className="flex justify-between items-center py-8">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-600 p-2 rounded-lg shadow-lg rotate-3">
                                    <span className="text-white font-black text-xl">B3</span>
                                </div>
                                <h1 className="font-bold text-xl tracking-tight hidden sm:block">
                                    Barangay 3 <span className="text-blue-600">Inhabitants</span>
                                </h1>
                            </div>

                            <nav className="flex gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-xl px-5 py-2.5 bg-slate-900 text-white text-sm font-bold shadow-lg hover:bg-slate-800 transition"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-sm font-bold text-slate-600 hover:text-blue-600 px-3 py-2 transition"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-xl px-5 py-2.5 bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition"
                                        >
                                            Staff Registration
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>


                        <main className="mt-12 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
                            <section>
                                <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-100 rounded-full">
                                    Registry of Barangay Inhabitants (RBI)
                                </div>
                                <h2 className="text-5xl lg:text-7xl font-black leading-[1.1] mb-6">
                                    Smart Registry for a <span className="text-blue-600 underline decoration-blue-200">Better Service.</span>
                                </h2>
                                <p className="text-lg text-slate-500 mb-10 max-w-lg mx-auto lg:mx-0">
                                    Efficiently managing Barangay 3's community data. Secure, reliable, and compliant with DILG standards.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition shadow-xl active:scale-95">
                                        Register Inhabitant
                                    </button>
                                    <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition shadow-sm">
                                        View Demographics
                                    </button>
                                </div>
                            </section>


                            <div className="grid grid-cols-2 gap-6">
                                <StatCard label="Total Inhabitants" value="4,829" icon="👥" color="blue" />
                                <StatCard label="Households" value="1,104" icon="🏠" color="indigo" />
                            </div>
                        </main>


                        <div className="mt-24 grid gap-6 md:grid-cols-3">
                            <ActionCard
                                title="Inhabitant Profiling"
                                desc="Add new residents to the system with automated Form A generation."
                                icon="📝"
                            />
                        </div>

                        <footer className="py-20 text-center text-xs font-medium text-slate-400 uppercase tracking-widest">
                            Official B3 RBI System &bull; Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}


